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
        <div className='' onClick={handleClick}>
            <img src={iconBoard} alt="" />
            <p >{board.name}</p>
        </div>
    )
}