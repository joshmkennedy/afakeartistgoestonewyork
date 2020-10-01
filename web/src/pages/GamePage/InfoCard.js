import styled from 'styled-components'
import { useGameStore } from 'src/hooks/hooks'

function InfoCard({ className }) {
  const gameState = useGameStore((state) => state.gameState)
  const questionMaster = useGameStore((state) => state.questionMaster)
  const { userRole } = useGameStore((state) => state.userInformation)
  return (
    <div className={`card ${className}`}>
      <div>
        <span className="tag">player role</span>
        <h3>{userRole && userRole}</h3>
      </div>
      <div>
        <span className="tag">Round</span>
        <h3>{gameState}</h3>
      </div>
      <div>
        <span className="tag">Question Master</span>
        <h3>{questionMaster ? questionMaster : 'Computer'}</h3>
      </div>
    </div>
  )
}
export default styled(InfoCard)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`
