import { useToggle } from '../../../hooks/useToggle'
import DeleteTaskModal from './DeleteTaskModal'
import EditTaskModal from './EditTaskModal'
import { Context } from '../../../Context'
import { useContext } from 'react'

export default function EditOrDeleteTaskModal({task, isEditDeleteTaskModalVisible, setIsTaskModalVisible, isTaskModalVisible}) {
   
    const [isEditTaskModalVisible, setIsEditTaskModalVisible] = useToggle()

    const [isDeleteTaskModalVisible, setIsDeleteTaskModalVisible] = useToggle()
 
    const {boards, setBoards, currentBoardName, setCurrentBoardName} = useContext(Context)

    
    return (
        <>
            <div className={`${isEditDeleteTaskModalVisible ? "block" : "hidden"} flex`}>
                <button onClick={setIsEditTaskModalVisible}>Edit TAsk</button>
                <button onClick={setIsDeleteTaskModalVisible}>Delete Task</button>
            </div>
 
            {isDeleteTaskModalVisible && 
            <DeleteTaskModal task={task} setIsDeleteTaskModalVisible={setIsDeleteTaskModalVisible}
          />}

            {isEditTaskModalVisible && 
            <EditTaskModal task={task}setIsEditTaskModalVisible={setIsEditTaskModalVisible} />}
        </>
    )
}