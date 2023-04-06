import { useToggle } from '../../../hooks/useToggle'
import DeleteTaskModal from './DeleteTaskModal'
import EditTaskModal from './EditTaskModal'
import { Context } from '../../../Context'
import { useRef, useState, useEffect } from 'react'
import { useContext } from 'react'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { useHiddenOverflow } from '../../../hooks/useHiddenOverflow'

export default function EditOrDeleteTaskModal({task, isEditDeleteTaskModalVisible, setIsEditDeleteTaskModalVisible, setIsTaskModalVisible, isTaskModalVisible, setIsEditTaskModalVisible, isEditTaskModalVisible}) {
   
    // const [isEditTaskModalVisible, setIsEditTaskModalVisible] = useState()

    const [isDeleteTaskModalVisible, setIsDeleteTaskModalVisible] = useState(false)
    

    // const [hideOverflow] = useHiddenOverflow()

  
    const ref = useRef()
    // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => {setIsEditDeleteTaskModalVisible(false)
 }
  );

   
  const {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)

  function handleClick(e) {
    if(e.target.id === 'editTask') {
 
      setIsEditTaskModalVisible(true)
    } else {
    
      setIsDeleteTaskModalVisible(true)
   
    }

    setIsEditDeleteTaskModalVisible(false)
    // setIsTaskModalVisible(false)
   
}
     
    return (
        <>

        {/* overlay */}
        <div className={`${isEditDeleteTaskModalVisible ? ' fixed top-0 left-0 w-screen h-screen bg-opacity-50 bg-gray-600  flex items-start justify-center ' : ''}`}>

            <div className={`${isEditDeleteTaskModalVisible ? "flex flex-col absolute right-20 top-28 w-fit py-5 pl-5 pr-10  text-lg bg-gray-50 shadow-md  gap-1  rounded-lg  text-gray-400" : "hidden"}  ` } ref={ref}>

                {/* <button onClick={() => setIsEditTaskModalVisible(true)} className='text-left hover:text-gray-300'>Edit Task</button> */}

                <button type='button' id='editTask' onClick={(e) => handleClick(e)} className='text-left hover:text-gray-300'>Edit Task</button>

                <button type='button' id='deleteTask' onClick={(e) => handleClick(e)} className='text-red-400 hover:text-red-300'>Delete Task</button>

                {/* <button onClick={() => setIsDeleteTaskModalVisible(true)} className='text-red-400 hover:text-red-300'>Delete Task</button> */}
            </div>
 </div>
            {isDeleteTaskModalVisible && 
            <DeleteTaskModal task={task} 
            isDeleteTaskModalVisible={isDeleteTaskModalVisible} setIsDeleteTaskModalVisible={setIsDeleteTaskModalVisible}
            setIsTaskModalVisible={setIsTaskModalVisible}
          />}

            {/* {isEditTaskModalVisible && 
            <EditTaskModal task={task}
            isEditTaskModalVisible={isEditTaskModalVisible}
            setIsEditTaskModalVisible={setIsEditTaskModalVisible} />} */}
            
        </>
    )
}