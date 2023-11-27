import { createContext, useContext, useState } from 'react'
import { ChatbotComponent } from '../components/Chatbot/Chatbot'
import PropTypes from 'prop-types'
const chatbotContext = createContext({
  setCid: null,
  setOpen: null,
})

export function useChatbotContext() {
  return useContext(chatbotContext)
}

export function ChatbotContextProvider({ children }) {
  const [cid, setCid] = useState(null)
  const [open, setOpen] = useState(false)

  const values = { setCid, setOpen }
  return (
    <chatbotContext.Provider value={values}>
      {children}
      {open && cid && <ChatbotComponent cid={cid} />}
    </chatbotContext.Provider>
  )
}

ChatbotContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
