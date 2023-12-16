import { ChatCompletionRequestMessage } from 'openai'

export const sendMessage = async (messages: ChatCompletionRequestMessage[]) => {
  try {
    const response = await fetch('/chatbot/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    })

    return await response.json()
  } catch (error) {
    console.log(error)
  }
  return
}
