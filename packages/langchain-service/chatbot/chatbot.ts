import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
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

  documentStore: PineconeStore;
  questionIndex: any;
  embeddings: OpenAIEmbeddings;

  init = async () => {
    const embeddings = new OpenAIEmbeddings();
    // {
    //     openAIApiKey: process.env.OPENAI_API_KEY,
    //     modelName: "ada",
    // }

    const documentClient = new PineconeClient();
    await documentClient.init({
      apiKey: process.env.PINECONE_API_KEY_DOCUMENT || "",
      environment: process.env.PINECONE_ENVIRONMENT_DOCUMENT || ""
    });
    const documentIndex = documentClient.Index(
      process.env.PINECONE_INDEX_NAME_DOCUMENT || ""
    );

    const documentStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: documentIndex
    });

    const questionClient = new PineconeClient();
    await questionClient.init({
      apiKey: process.env.PINECONE_API_KEY_QUESTION || "",
      environment: process.env.PINECONE_ENVIRONMENT_QUESTION || ""
    });
    const questionIndex = questionClient.Index(
      process.env.PINECONE_INDEX_NAME_QUESTION || ""
    );

    this.documentStore = documentStore;
    this.questionIndex = questionIndex;
    this.embeddings = embeddings;
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

  addDocuments = async (documents: Document[]) => {
    // Returns Ids of documents for storing and possible future deletion
    const ids = await this.documentStore.addDocuments(documents);
    return ids;
  };

  deleteDocuments = async (ids: string[]) => {
    await this.documentStore.delete({
      ids
    });
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

  initializePineconeStore = async (filePath: string) => {
    const directoryLoader = await this.getDirectoryLoader(filePath);
    const rawDocuments = await this.loadDocuments(directoryLoader);
    const documentChunks = await this.splitDocuments(rawDocuments);

    await this.addDocuments(documentChunks);
  };

  ask = async (query: string, history: Message[]): Promise<ChatbotResponse> => {
    const chainResponse = await this.callQAChain(query, history);

    const similarDocuments = await this.getSimilarDocuments(query);
    const similarQuestions = await this.getSimilarQuestions(query);

    // Convert to nested class to handle PDFs, TXTs, Webpages, etc
    const groupedSourceDocuments: {
      [key: string]: Set<string>;
    } = {};
    chainResponse.sourceDocuments.map((sourceDocument: any) => {
      let group: Set<string> =
        groupedSourceDocuments[sourceDocument.metadata["pdf.info.Title"]];

      if (!group) {
        group = new Set<string>();
      }
      group.add(sourceDocument.metadata["loc.pageNumber"]);
      groupedSourceDocuments[sourceDocument.metadata["pdf.info.Title"]] = group;
    });
    // { 'COSC 404 - R-Trees': Set(5) { 8, 2, 23 }, 'COSC 404 - B-Trees': Set(5) { 4, 9 }}

    const groupedSimilarDocuments: {
      [key: string]: Set<string>;
    } = {};
    similarDocuments.map((similarDocument: any) => {
      let group: Set<string> =
        groupedSimilarDocuments[similarDocument.metadata["pdf.info.Title"]];

      if (!group) {
        group = new Set<string>();
      }
      group.add(similarDocument.metadata["loc.pageNumber"]);
      groupedSimilarDocuments[
        similarDocument.metadata["pdf.info.Title"]
      ] = group;
    });

    // await this.insertQuestion({
    //     query,
    //     answer: chainResponse.text,
    //     sourceDocuments: groupedSourceDocuments,
    //     similarDocuments: groupedSimilarDocuments,
    // });

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
      similarQuestions: similarQuestions.matches
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

  historyToString = (history: Message[]) => {
    history = history.slice(-2);
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
    if (score) {
      return this.documentStore.similaritySearchWithScore(query, k);
    } else {
      return this.documentStore.similaritySearch(query, k);
    }
  };

  insertQuestion = async ({
    questionId,
    query
  }: {
    questionId: number;
    query: string;
  }) => {
    // TODO: Add record to postgres database and retrieve ID of inserted record
    // Update database schema to store sourceDocuments and similarDocuments
    // Update this.createQuestion parameters

    console.log(questionId, query);
    const questionVector = await this.embeddings.embedQuery(query);

    const vectorRecords = [
      {
        id: String(questionId),
        values: questionVector,
        metadata: {
          question: query
        }
      }
    ];

    await this.questionIndex.upsert({
      upsertRequest: {
        vectors: vectorRecords
      }
    });
  };

  getSimilarQuestions = async (question: string) => {
    const questionVector = await this.embeddings.embedQuery(question);

    const similarQuestions = await this.questionIndex.query({
      queryRequest: {
        vector: questionVector,
        topK: 5,
        includeMetadata: true
      }
    });
    return similarQuestions;
  };

  getEmbeddings = () => {
    return this.embeddings;
  };

  // Currently using free version of Pinecone which only allows 1 index. Refactor once paid
  getPineconeDocumentStore = () => {
    return this.documentStore;
  };

  getPineconeQuestionIndex = () => {
    return this.questionIndex;
  };
}
