import { useEffect, useState, useRef } from 'react'
import _ from 'lodash'
import { useGameStore } from 'src/hooks/hooks'
import styled from 'styled-components'

function Paper({ socket, activeUser, userInformation, room, className }) {
  const [isDrawing, setIsDrawing] = useState(false)
  const { category, pickedWord } = useGameStore((state) => state.words)
  const userColor = useGameStore((state) => state.userInformation.userColor)
  const drawingArea = useRef()
  const [lines, setLines] = useState([])
  const submitLines = (socket, userInformation, lines, room) => {
    if (socket) {
      socket.emit(
        'new_lines_added',
        JSON.stringify({ lines, userId: userInformation.userId, room })
      )
    }
  }
  const fn = useRef(_.throttle(submitLines, 100)).current
  useEffect(() => {
    if (socket && activeUser === userInformation.userId) {
      fn(socket, userInformation, lines, room)
    }
  }, [lines, fn, socket, userInformation, activeUser, room])

  useEffect(() => {
    if (!socket) return
    socket.on('new_lines_added', (data) => {
      const { lines } = JSON.parse(data)
      setLines(lines)
    })
  }, [socket])

  function createRelativePoint(e) {
    const boundingRect = drawingArea.current.getBoundingClientRect()
    const point = {
      x: e.clientX - boundingRect.x,
      y: e.clientY - boundingRect.y,
    }
    return point
  }
  return (
    <div
      className={`paper card ${className}`}
      style={{
        background: `white`,
        border: `3px solid var(--blue)`,
        borderLeftColor: `#85A8DB`,
        borderRadius: `0px 10px 10px 0px`,
      }}
    >
      <svg
        ref={drawingArea}
        onMouseDown={(e) => {
          setIsDrawing(true)
          const point = createRelativePoint(e)
          setLines([...lines, { color: userColor, points: [point] }])
        }}
        onMouseMove={(e) => {
          if (!isDrawing) return
          e.persist()
          setLines((prevState) => {
            const lastLine = prevState[prevState.length - 1]
            const finishedLines = prevState.filter(
              (_, index) => index !== prevState.length - 1
            )
            const point = createRelativePoint(e)
            lastLine.points.push(point)
            const newState = [...finishedLines, lastLine]
            return newState
          })
        }}
        onMouseUp={() => {
          setIsDrawing(false)
        }}
        onMouseLeave={() => {
          setIsDrawing(false)
        }}
        style={{
          width: `100%`,
          height: `600px`,
        }}
      >
        {lines.map((line, id) => (
          <DrawingLine key={id} line={line} />
        ))}
      </svg>
      <div className="top-right pickedWord" style={{ color: `var(--blue)` }}>
        <div style={{ display: `flex`, justifyContent: `start` }}>
          <div style={{ color: `var(--grey-700)`, marginRight: `10px` }}>
            Category:{' '}
          </div>
          {category}
        </div>
        <div style={{ display: `flex`, justifyContent: `start` }}>
          <div style={{ color: `var(--grey-700)`, marginRight: `10px` }}>
            Word:{' '}
          </div>
          <span>{pickedWord}</span>
        </div>
      </div>
    </div>
  )
}

export default styled(Paper)`
  .pickedWord {
    max-width: 135px;
    width: 100%;
  }
`

const DrawingLine = ({ line }) => {
  const pathData = `M ${line.points.map((p) => `${p.x} ${p.y}`).join(' L ')}`
  return (
    <path
      d={pathData}
      stroke={line.color}
      fill={`none`}
      strokeWidth={`5px`}
      strokeLinejoin="round"
      strokeLinecap="round"
    ></path>
  )
}
