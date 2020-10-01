import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useFlash } from '@redwoodjs/web'
function Message({ message, className }) {
  const { dismissMessage } = useFlash()
  return (
    <motion.div
      key={message.id}
      initial={{
        x: 200,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      exit={{
        x: -200,
        opacity: 0,
      }}
      className={` ${message.classes} ${className}`}
    >
      <div className="text">{message.text}</div>
      {/* <button type="button" onClick={() => dismissMessage(message.id)}>
        Sounds Good <span role="image">👍</span>
      </button> */}
    </motion.div>
  )
}
export default styled(Message)`
  .text {
    margin-bottom: 10px;
  }
  width: 300px;
  font-size: 18px;
  border-radius: 8px;
  padding: 20px;
  background: var(--dark-blue);
  color: white;
  box-shadow: var(--shadow-2xl);
  button {
    background: white;
    color: var(--blue);
    padding: 5px 10px;
    &:hover {
      background: var(--grey-100);
      box-shadow: var(--shadow-xl);
    }
  }

  width: 400px;

  font-size: 24px;
`
