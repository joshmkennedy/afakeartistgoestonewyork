import styled from 'styled-components'
import { useGameStore } from 'src/hooks/hooks'

import CategoryDropdown from './CategoryDropdown'

function CategoryInfoCard({ className, socket }) {
  const { category, pickedWord } = useGameStore((state) => state.words)
  const gameState = useGameStore((state) => state.gameState)
  const { userRole } = useGameStore((state) => state.userInformation)
  return (
    <div className={`card ${className}`}>
      <h3>Word To Draw</h3>
      {userRole === 'QUESTION_MASTER' && gameState === 'PICKING_WORD' && (
        <CategoryDropdown socket={socket} />
      )}

      {(category || userRole !== 'QUESTION_MASTER') && (
        <>
          <div>
            <span className="tag">Category</span>
            <div style={{ color: 'var(--green)', fontSize: `1.5rem` }}>
              {category ? category : 'being picked'}
            </div>
          </div>
          {category && (
            <div>
              <span className="tag">Picked Word</span>
              <div style={{ color: 'var(--blue)', fontSize: '2rem' }}>
                {pickedWord ? pickedWord : 'being generated'}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
export default styled(CategoryInfoCard)`
  margin-bottom: 10px;
`
