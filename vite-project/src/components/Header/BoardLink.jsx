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
        <div className={`${currentBoardName === board.name ? 'bg-indigo-500 text-gray-50 rounded-tr-full rounded-br-full hover:bg-indigo-500 hover:text-gray-50 hover:rounded-tr-full hover:rounded-br-full py-3 w-full ' : 'hover:text-gray-50 hover:bg-indigo-400  hover:rounded-tr-full py-3 my-1 hover:rounded-br-full '} flex items-center gap-2  py-1 cursor-pointer `} onClick={handleClick}>
            <img src={iconBoard} alt="" className={`w-4 h-4 ml-5 ${currentBoardName === board.name ? "ml-0  ": " "} `}/>
            <p className="min-w-full ">{board.name}</p>
        </div>
    )
}