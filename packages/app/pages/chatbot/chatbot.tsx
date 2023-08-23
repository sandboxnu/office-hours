import { NextApiRequest, NextApiResponse } from "next";

export default async function chatbot(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { messages } = req.body;
  const apiKey = "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";
  const url = "https://api.openai.com/v1/chat/completions";

  const body = JSON.stringify({
    messages,
    model: "gpt-3.5-turbo",
    stream: false,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body,
    });
    const data = await response.json();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
