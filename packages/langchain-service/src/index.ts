import express from "express";
import { ChatbotService } from "../chatbot/chatbot";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3003;

app.get("/", (req: any, res: any) => {
  res.send("Hello, World!");
});

app.post("/ask", async (req: any, res: any) => {
  const { question, history } = req.body;

  // Some basic validation
  if (!question || !history) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  const chatbot = new ChatbotService();
  await chatbot.init();

  const result = await chatbot.ask(question, history);

  res.json(result);
});

app.post("/question", async (req: any, res: any) => {
  const { questionId, query } = req.body;

  // Some basic validation
  if (!questionId || !query) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  const chatbot = new ChatbotService();
  await chatbot.init();

  await chatbot.insertQuestion({ questionId, query });

  res.json({});
});

app.get("/seed", async (req: any, res: any) => {
  const chatbot = new ChatbotService();
  await chatbot.init();

  await chatbot.initializeStores("./tempDocs/");

  res.json({});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
