import { useState } from 'react'
import { BlockPicker } from 'react-color'
import styled from 'styled-components'
import { COLORS } from 'src/config'
function ColorPicker({ setColor, color, className }) {
  const [isShowing, setIsShowing] = useState(false)

  return (
    <div className={className}>
      <button
        type="button"
        className="color"
        style={{ backgroundColor: color }}
        onClick={() => setIsShowing((prev) => !prev)}
      >
        {''}
      </button>
      {isShowing && (
        <div className="picker-wrapper">
          <ReactColorPicker color={color} setColor={setColor} />
        </div>
      )}
    </div>
  )
}

export default styled(ColorPicker)`
  position: relative;
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
  button.color {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .picker-wrapper {
    position: absolute;
    z-index: 9;
    left: 50%;
    transform: translateX(-50%);
    top: calc(100% + 10px);
  }
`

function ReactColorPicker({ setColor, color }) {
  return (
    <span>
      <BlockPicker
        colors={COLORS}
        color={color}
        onChangeComplete={(color) => setColor(color)}
      />
    </span>
  )
}
