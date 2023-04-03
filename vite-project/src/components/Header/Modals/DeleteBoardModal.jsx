import { useContext, useEffect } from 'react'
import {Context} from '../../../Context'

export default function DeleteBoardModal({setisDeleteBoardModalVisible}) {

    const {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)
    
    function deleteBoard() {
        // sets new boards array removing current board
        setBoards(prev => prev.filter(board => board.name != currentBoardName)) 
        
        // closes modal
        setisDeleteBoardModalVisible(false)
    }

    
    return (
        <div className="bg-orange-500">
            
            <button onClick={setisDeleteBoardModalVisible}>x</button>

            <p>Delete this board?</p>
            <p>Are you sure you want to delete the  board? This action will remove all columns and tasks and cannot be reversed.</p>

            <button onClick={deleteBoard}>delete</button>

            <button onClick={setisDeleteBoardModalVisible}>cancel</button>
        </div>
    )
}