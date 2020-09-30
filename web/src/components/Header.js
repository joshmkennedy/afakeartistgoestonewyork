import { useAuth } from '@redwoodjs/auth'
import CreateGameForm from 'src/components/CreateGameForm'

function Header() {
  const { loading, isAuthenticated, logIn, logout } = useAuth()
  console.log(isAuthenticated)
  async function authFn() {
    if (isAuthenticated) {
      await logout()
    } else {
      await logIn()
    }
  }

  return (
    <header>
      <div>
        <div>
          {loading ? null : (
            <button onClick={authFn}>
              {isAuthenticated ? `Logout` : `Login`}
            </button>
          )}
          {isAuthenticated && <CreateGameForm />}
        </div>
      </div>
    </header>
  )
}
export default Header
