import { Link, routes } from '@redwoodjs/router'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
const HomePage = () => {
  return (
    <MainLayout>
      <h1>HomePage</h1>
      <p>
        Find me in <tt>./web/src/pages/HomePage/HomePage.js</tt>
      </p>
      <p>
        My default route is named <tt>home</tt>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p>
    </MainLayout>
  )
}

export default HomePage
