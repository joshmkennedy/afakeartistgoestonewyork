import { useFlash } from '@redwoodjs/web'
import styled from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import Message from './Message'
function Messages({ className }) {
  const { messages } = useFlash()
  if (!messages.length) {
    return null
  }
  return (
    <div className={className}>
      <AnimatePresence>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </AnimatePresence>
    </div>
  )
}
export default styled(Messages)`
  position: fixed;
  top: 20vh;
  right: 10px;
  z-index: 9999;
`
