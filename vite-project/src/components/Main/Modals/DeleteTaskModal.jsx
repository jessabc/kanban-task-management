import { useContext } from 'react'
import {Context} from '../../../Context'
import { useDeleteTask } from '../../../hooks/useDeleteTask'

export default function DeleteTaskModal({setIsDeleteTaskModalVisible,  task}) {

    const {boards, setBoards, currentBoardName,  setCurrentBoardName, currentBoardData, setCurrentBoardData}
 = useContext(Context)

 const [deleteTask] = useDeleteTask(task)

    function  handleClick(task) {
       deleteTask(task)
    }

    // useEffect(() => {
    //     console.log(boards[0].name)
    //     setCurrentBoardName(boards[0].name)
    // },[boards])
   
    return ( 
        <div className="bg-orange-500 absolute">
            
            <button onClick={setIsDeleteTaskModalVisible}>x</button>

            <p>Delete this task?</p>
            <p>Are you sure you want to delete the '{task.title}' board? This action will remove all columns and tasks and cannot be reversed.</p>
          
            <button onClick={() => handleClick(task)}>delete</button>

            <button onClick={setIsDeleteTaskModalVisible}>cancel</button>

        </div>
    )
}