import { createContext, useState, useEffect } from "react"


export const Context = createContext()


export function ContextProvider({children}) {

  //credit to https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/
  //credit to https://upmostly.com/tutorials/how-to-add-local-storage-to-your-react-apps  
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem('boards'))) 

  const [isCreateNewBoardModalVisible, setIsCreateNewBoardModalVisible] = useState()

  const [currentBoardName, setCurrentBoardName] = useState('')
  // console.log(currentBoardName)
  
  const [currentBoardData, setCurrentBoardData] = useState({})
  // console.log(currentBoardData)
  //local storage
  // useEffect(() => {
  //   if(boards) {
  //     localStorage.setItem('boards', JSON.stringify(boards));
  //   // console.log('stored')
  //   }
  // }, [boards]);

  // set the current board
  useEffect(() => {
    setCurrentBoardData(boards?.find(board => board.name === currentBoardName))

    if(boards) {
      setCurrentBoardName(boards[0].name)
    }
    
  },[boards])
    
  // on first time using app ie nothing in local storage, fetch boards
  useEffect(() => {
    if(!boards) {
      fetch("./data.json")
      .then(res => res.json())
      .then(data => {

        setBoards(data.boards)
       
        setCurrentBoardName(data.boards[0]?.name)
          })
        //  setCurrentBoardName(data?.boards[0]?.name)
    } else {
      setCurrentBoardName(boards[0]?.name)
    }
  }, [])

  return (
      <Context.Provider value={{boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData, isCreateNewBoardModalVisible, setIsCreateNewBoardModalVisible}}>
        {children}
      </Context.Provider>
  )
}