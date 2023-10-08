import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { FaissStore } from "langchain/vectorstores/faiss";
import { PineconeClient } from "@pinecone-database/pinecone";
import { RetrievalQAChain, VectorDBQAChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { VectorOperationsApi } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";
import { PromptTemplate } from "langchain/prompts";

interface GroupedDocument {
  name: string;
  pages: string[];
}

export interface ChatbotResponse {
  answer: string;
  sourceDocuments: GroupedDocument[];
  similarDocuments: GroupedDocument[];
  similarQuestions: any[]; // TODO: Find correct datatype
}

interface Message {
  type: "apiMessage" | "userMessage";
  message: string | void;
}

export class ChatbotService {
  // Could rename 'documents' to 'resources' for more accurate wording when its not only PDFs
  // filePath currently relative

  documentStore: FaissStore;
  documentStoreDirectory: string;

  questionStore: FaissStore;
  questionStoreDirectory: string;

  embeddings: OpenAIEmbeddings;

  init = async (): Promise<void> => {
    this.documentStoreDirectory = "documentStore";
    this.questionStoreDirectory = "questionStore";

    this.embeddings = new OpenAIEmbeddings();

    // Modify to create empty vector store saves upon creation of the chatbot
    try {
      this.documentStore = await FaissStore.load(
        this.documentStoreDirectory,
        this.embeddings
      );
    } catch (e) {
      this.documentStore = await FaissStore.fromDocuments([], this.embeddings);
    }

    try {
      this.questionStore = await FaissStore.load(
        this.questionStoreDirectory,
        this.embeddings
      );
    } catch (e) {
      this.questionStore = await FaissStore.fromDocuments([], this.embeddings);
    }
  };

  getDirectoryLoader = async (filePath: string) => {
    const directoryLoader = new DirectoryLoader(filePath, {
      ".pdf": path => new PDFLoader(path, { splitPages: true }),
      // '.docx': path => new DocxLoader(path),
      // '.json': path => new JSONLoader(path, '/texts'),
      // '.jsonl': path => new JSONLinesLoader(path, '/html'),
      ".txt": path => new TextLoader(path)
      // '.csv': path => new CSVLoader(path, 'text'),
      // '.htm': path => new UnstructuredLoader(path),
      // '.html': path => new UnstructuredLoader(path),
      // '.ppt': path => new UnstructuredLoader(path),
      // '.pptx': path => new UnstructuredLoader(path),
    });

    return directoryLoader;
  };

  // TODO: May have to individually add documents to ensure correct corresponding IDs
  addDocuments = async (documents: Document[]) => {
    // Add documents & retrieve corresponding ids, save new documentStore
    const ids = await this.documentStore.addDocuments(documents);
    await this.documentStore.save(this.documentStoreDirectory);

    return ids;
  };

  deleteDocuments = async (ids: string[]) => {
    const numberOfDocumentsRemoved = await this.documentStore.delete(ids);
    return numberOfDocumentsRemoved;
  };

  loadDocuments = async (directoryLoader: DirectoryLoader) => {
    const documents = directoryLoader.load();
    return documents;
  };

  splitDocuments = async (documents: Document[]) => {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 20
    });

    const documentChunks = splitter.splitDocuments(documents);
    return documentChunks;
  };

  // Assumes empty stores, could be made to delete all data before initializing
  initializeStores = async (filePath: string) => {
    const directoryLoader = await this.getDirectoryLoader(filePath);
    const rawDocuments = await this.loadDocuments(directoryLoader);
    const documentChunks = await this.splitDocuments(rawDocuments);

    await this.addDocuments(documentChunks);
  };

  ask = async (query: string, history: Message[]): Promise<ChatbotResponse> => {
    const chainResponse = await this.callQAChain(query, history);

    const similarDocuments = await this.getSimilarDocuments(query);
    const similarQuestions = await this.getSimilarQuestions(query);
    console.log(similarQuestions);

    // Convert to nested class to handle PDFs, TXTs, Webpages, etc
    const groupedSourceDocuments: {
      [key: string]: Set<string>;
    } = {};
    chainResponse.sourceDocuments.map((sourceDocument: any) => {
      let group: Set<string> =
        groupedSourceDocuments[sourceDocument.metadata.pdf.info.Title];

      if (!group) {
        group = new Set<string>();
      }
      group.add(sourceDocument.metadata.loc.pageNumber);
      groupedSourceDocuments[sourceDocument.metadata.pdf.info.Title] = group;
    });

    const groupedSimilarDocuments: {
      [key: string]: Set<string>;
    } = {};
    similarDocuments.map((similarDocument: any) => {
      let group: Set<string> =
        groupedSimilarDocuments[similarDocument.metadata.pdf.info.Title];

      if (!group) {
        group = new Set<string>();
      }
      group.add(similarDocument.metadata.loc.pageNumber);
      groupedSimilarDocuments[similarDocument.metadata.pdf.info.Title] = group;
    });

    const formattedSourceDocuments: GroupedDocument[] = [];
    for (const key in groupedSourceDocuments) {
      formattedSourceDocuments.push({
        name: key,
        pages: Array.from(groupedSourceDocuments[key])
      });
    }

    const formattedSimilarDocuments: GroupedDocument[] = [];
    for (const key in groupedSimilarDocuments) {
      formattedSimilarDocuments.push({
        name: key,
        pages: Array.from(groupedSimilarDocuments[key])
      });
    }

    return {
      answer: chainResponse.text,
      sourceDocuments: formattedSourceDocuments,
      similarDocuments: formattedSimilarDocuments,
      similarQuestions: similarQuestions
    };
  };

  callQAChain = async (query: string, history: Message[], temperature = 0) => {
    // Can be changed to ConversationalRetrievalQAChain to allow for chat history
    const QA_Template = `
        You are a professor answering questions about a few documents from your class. 
        The following is your current conversation with the student so far but be aware that
        the student may not ask questions in one central theme and may ask unrelated queries.

        Current conversation history:
        ${this.historyToString(history)}

        Here are the resources in this course:
        {context}

        Here is the question that the student is now asking: 
        {question}

        Here are a couple of rules for creating your answer:
        1) If you are unsure or do not know, simply respond with "I don't know".
        2) Try to keep your response to 2 sentences.
        3) If a student asks to clarify one of your answers, you can provide an answer up to 4 sentences. DO NOT provide the same answer.
        4) DO NOT use external sources apart from the ones provided to you.
        5) DO NOT use the internet or assume any answers.
        6) DO NOT provide any answers to exams or assignments if a document like that is provided.
        7) DO NOT add "Answer:", "User:", "Message:", or anything similar to that, simply give the answer.

        Please provide a helpful answer:
        `;

    const prompt = PromptTemplate.fromTemplate(QA_Template);

    const chain = RetrievalQAChain.fromLLM(
      new OpenAI({
        temperature
      }),
      this.documentStore.asRetriever(),
      {
        returnSourceDocuments: true,
        prompt: prompt
      }
    );

    const response = await chain.call({ query });
    return response;
  };

  historyToString = (history: Message[], historyLength = 2) => {
    history = history.slice(-1 * historyLength);
    let str = "";
    for (const message of history) {
      str += `
            role: ${message.type === "userMessage" ? "User" : "System"}
            message: ${message.message}
            `;
    }
    return str;
  };

  getSimilarDocuments = async (query: string, k = 5, score = false) => {
    try {
      if (score) {
        return this.documentStore.similaritySearchWithScore(query, k);
      } else {
        return this.documentStore.similaritySearch(query, k);
      }
    } catch (e) {
      return [];
    }
  };

  getSimilarQuestions = async (query: string, k = 5, score = false) => {
    try {
      if (score) {
        return this.questionStore.similaritySearchWithScore(query, k);
      } else {
        return this.questionStore.similaritySearch(query, k);
      }
    } catch (e) {
      return [];
    }
  };

  insertQuestion = async ({
    questionId,
    query
  }: {
    questionId: number;
    query: string;
  }) => {
    const questionVector = await this.embeddings.embedQuery(query);

    const ids = await this.questionStore.addVectors(
      [questionVector],
      [new Document({ pageContent: query, metadata: { id: questionId } })]
    );

    await this.questionStore.save(this.questionStoreDirectory);
    return ids;
  };

  getEmbeddings = () => {
    return this.embeddings;
  };

  // Currently using free version of which only allows 1 index. Refactor once paid
  getDocumentStore = () => {
    return this.documentStore;
  };

  getQuestionStore = () => {
    return this.questionStore;
  };
}
