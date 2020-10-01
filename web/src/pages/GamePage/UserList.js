import { useMemo } from 'react'
import styled from 'styled-components'
import { useGameStore } from 'src/hooks'
function UserList({ className, socket }) {
  const allUsers = useGameStore((state) => state.allUsers)
  const activeUser = useGameStore((state) => state.activeUser)
  const roomId = useGameStore((state) => state.roomId)
  const gameState = useGameStore((state) => state.gameState)

  const { inRoom, isOwner, userId } = useGameStore(
    (state) => state.userInformation
  )
  const activeUserColor = useMemo(() => {
    return allUsers.find((user) => user.id === activeUser)?.color
  }, [activeUser, allUsers])
  if (allUsers.length <= 0) return null
  function startGame() {
    if (socket) {
      socket.emit(
        'start_game',
        JSON.stringify({
          userId,
          room: roomId,
        })
      )
    }
  }
  function endTurn() {
    if (!socket) return
    socket.emit('end_turn', JSON.stringify({ room: roomId }))
  }

  return (
    <div className={`card ${className}`}>
      {/* eventually move the question master to an icon that is placed by users name */}
      {/* <div>
        <h3>
          {questionMaster &&
            allUsers.find((user) => user.id === questionMaster).name}
        </h3>
      </div> */}
      <ul>
        {allUsers.map((user) => (
          <li
            className="card"
            style={{
              backgroundColor:
                user.id === activeUser ? activeUserColor : `transparent`,
              boxShadow: user.id === activeUser ? `var(--shadow-sm)` : `none`,
              color: user.id === activeUser ? `white` : `var(--grey-800)`,
            }}
            key={user.id}
          >
            <span className="flex">
              <div
                className="color"
                style={{ backgroundColor: user.color }}
              ></div>
              <span>{user.name}</span>
            </span>
            {user.id === activeUser && activeUser === userId && (
              <button className="secondary" onClick={endTurn}>
                End Turn
              </button>
            )}
            {inRoom &&
              isOwner &&
              userId === user.id &&
              gameState === 'WAITING' && (
                <button onClick={startGame}>Start Game</button>
              )}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default styled(UserList)`
  min-width: 170px;
  max-width: 435px;
  width: 100%;
  margin: ${({ flatRight }) => (flatRight ? `0` : `0 auto`)};
  @media (min-width: 950px) {
    margin: ${({ flatRight }) => (flatRight ? `0 0 0 auto` : `0 auto`)};
  }

  border-radius: ${({ flatRight }) =>
    flatRight ? '10px 0px 0px 10px' : '10px'};
  padding: 20px 5px;
  li {
    font-size: 20px;
    font-weight: bold;
    padding: 15px 10px;
    box-shadow: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .color {
      width: 10px;
      min-width: 10px;
      height: 10px;
      min-height: 10px;
      margin-right: 5px;
      border-radius: 50%;
    }
    .flex {
      align-items: center;
    }
    button {
      font-size: 14px;
      background: white;
      color: var(--blue);
      &:hover {
        background: var(--grey-100);
      }
    }
  }
`
