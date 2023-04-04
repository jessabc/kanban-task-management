import { useContext, useEffect } from "react"
import iconBoard from '../../assets/icon-board.svg'
import { Context } from '../../Context'
 

export default function BoardLink({board, setIsMenuModalVisible}) {

    const {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)

    // updates board name on display, and closes menu modal
    function handleClick() {
        setCurrentBoardName(board.name)
        setIsMenuModalVisible(false)  
    }

    // when board name is clicked, function above sets that board name to disaplay, and the use effect updates the board data to display
    useEffect(() => {
        setCurrentBoardData(boards.filter(board => board.name === currentBoardName)[0])
   },[currentBoardName])
   
    return (
        <div className={`${currentBoardName === board.name ? 'bg-indigo-600 text-indigo-200 rounded-tr-lg rounded-br-lg w-3/4 pl-5 hover:bg-indigo-600 hover:text-indigo-200 hover:rounded-tr-lg hover:rounded-br-lg hover:w-3/4 hover:pl-5' : ''} flex gap-2 my-3 py-1 cursor-pointer hover:text-indigo-200 hover:bg-indigo-400  hover:rounded-tr-lg hover:rounded-br-lg hover:w-3/4 `} onClick={handleClick}>
            <img src={iconBoard} alt="" className={`w-6 ml-5 ${currentBoardName === board.name ? "ml-0": " "}`}/>
            <p className="">{board.name}</p>
        </div>
    )
}