import 'src/index.scss'
import Header from 'src/components/Header'
const MainLayout = ({ children }) => {
  return (
    <>
      <Header />

      <main>{children}</main>
    </>
  )
}
export default MainLayout
