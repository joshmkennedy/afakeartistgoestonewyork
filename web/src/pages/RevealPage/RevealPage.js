import { useGameStore } from 'src/hooks'
import { Link, navigate, routes } from '@redwoodjs/router'
import styled from 'styled-components'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
const ExposePage = ({ roomId, className }) => {
  const gameState = useGameStore((state) => state.gameState)
  const winners = useGameStore((state) => state.winners)
  const faker = useGameStore((state) => state.faker)
  const isFaker = useGameStore((state) => state.isFaker)
  // if (gameState !== 'EXPOSE') navigate(routes.home())
  return (
    <MainLayout>
      <div className={`${className}`}>
        <h1>{isFaker && isFaker ? 'Exposed!' : 'Fooled!'}</h1>
        {isFaker ? (
          <p>{faker?.userName} was found to be an imposter</p>
        ) : (
          <p>{faker?.userName} succeeded in fooling everyone</p>
        )}
        <div>
          <h3>Winners:</h3>
          <ul>
            {winners?.map((winner) => (
              <li key={winner.userId}>{winner.userName}</li>
            ))}
          </ul>
        </div>
        <Link to={routes.game({ roomId })}>Play Again</Link>
      </div>
    </MainLayout>
  )
}

export default styled(ExposePage)`
  border-radius: 10px;
  box-shadow: var(--shadow-2xl);
  text-align: center;
  padding: 30px 20px;
  background: var(--grey-200);
  h1 {
    color: var(--blue);
    font-size: 4rem;
  }
  p {
    font-size: 1.54rem;
  }
  a {
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    background: var(--blue);
    &.secondary {
      background: var(--green);
    }
    color: white;
    font-weight: 700;
    border: 1px solid transparent;
    border-radius: 4px;
    box-shadow: var(--shadow-md);
    font-size: 1rem;
    padding: 0.65em 0.75em;
    &:hover {
      background: var(--dark-blue);
      box-shadow: var(--shadow-lg);
    }
    &.secondary:hover {
      background: var(--dark-green);
    }
    &:active {
      box-shadow: var(--shadow-lg), var(--shadow-outline);
    }
  }
`
