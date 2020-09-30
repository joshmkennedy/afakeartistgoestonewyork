import styled from 'styled-components'
import { useGameStore } from 'src/hooks/hooks'
import ColorPicker from './ColorPicker'
function EnterRoomCard({ socket, className }) {
  const { userName } = useGameStore((state) => state.userInformation)
  const roomId = useGameStore((state) => state.roomId)
  const userColor = useGameStore((state) => state.userInformation.userColor)

  const set = useGameStore((state) => state.set)
  function changeColor(color) {
    console.log('ran change color', color)
    set((state) => {
      state.userInformation.userColor = color.hex
    })
  }
  function updateUserName(e) {
    const { value } = e.target
    set((state) => {
      state.userInformation.userName = value
    })
  }
  function enterRoom(e) {
    e.preventDefault()
    socket.emit(
      'enter_room',
      JSON.stringify({
        room: roomId,
        userInformation: { userName },
      })
    )
  }
  return (
    <div className={`${className} card`}>
      <h3>Enter Your name, pick your color, and enter the game</h3>
      <form onSubmit={enterRoom}>
        <div className="flex">
          <input type="text" value={userName} onChange={updateUserName} />
          <ColorPicker color={userColor} setColor={changeColor} />
        </div>
        <button>Enter the Game</button>
      </form>
    </div>
  )
}
export default styled(EnterRoomCard)`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  form {
  }
  .flex {
    margin-bottom: 20px;
  }
  [type='text'] {
    width: 100%;
    max-width: unset;
    margin-right: 10px;
  }
`
