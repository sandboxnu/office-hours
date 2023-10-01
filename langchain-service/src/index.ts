const express = require('express');
const app = express();
const PORT = 3003;

app.get('/', (req: any, res: any) => {
  res.send('Hello, World!');
});
app.post('/prediction', (req: any, res: any) => {
  const { question, history } = req.body;

  // Some basic validation 
  if (!question) {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  // TODO: Insert Langchain logic here...
  // const result = someLangChainFunction(question, history, overrideConfig);

  const mockResult = {
    answer: 'blah',
    resource: 'blah'
  };

  res.json(mockResult);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
