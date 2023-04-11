import './App.css'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import { ContextProvider } from './Context'
import { useState } from 'react'

function App() {

  const [isMenuModalVisible, setIsMenuModalVisible] = useState(false)
  

  return (
    //sticky header credit to https://dev.to/cryptic022/sticky-header-and-footer-with-tailwind-2oik
    <div className='flex flex-col h-screen '>
      <ContextProvider>
        <Header 
          isMenuModalVisible={isMenuModalVisible}
          setIsMenuModalVisible={setIsMenuModalVisible}
        />
        <Main 
          isMenuModalVisible={isMenuModalVisible}
          setIsMenuModalVisible={setIsMenuModalVisible}
        />
      </ContextProvider>  
    </div>
  )

}

export default App

// https://kanban-app-jay.netlify.app/
