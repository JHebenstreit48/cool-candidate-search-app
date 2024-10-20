import { Outlet } from 'react-router-dom';
import './CSS/Page.css'
import Navigation from './components/Nav';

function App() {

  return (
    <>

      <Navigation />
      <main>
        <Outlet />
      </main>
    </>

  )
}

export default App
