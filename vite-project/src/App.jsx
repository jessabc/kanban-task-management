import './App.css'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import { ContextProvider } from './Context'


function App() {
  
  return (
    <div className='flex flex-col h-screen '>
      <ContextProvider>
        <Header />
        <Main />
      </ContextProvider>  
    </div>
  )

}

export default App

// https://kanban-app-jay.netlify.app/
