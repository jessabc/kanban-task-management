import { useForm, useFieldArray } from "react-hook-form";
import React, { useEffect, useState, useContext, useRef } from "react"
import { Context } from '../../../Context'
import EditOrDeleteTaskModal from "./EditOrDeleteTaskModal" 
import { useStatusOptions } from "../../../hooks/useStatusOptions";
import iconVerticalEllipsis from '../../../assets/icon-vertical-ellipsis.svg'
import { useDeleteTask } from "../../../hooks/useDeleteTask";
import { useEditTask} from '../../../hooks/useEditTask'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { useHiddenOverflow } from '../../../hooks/useHiddenOverflow'
import EditTaskModal from "./EditTaskModal";
 
// react hook form
// credit to https://react-hook-form.com/api/usefieldarray/
// credit to https://codesandbox.io/s/react-hook-form-usefieldarray-rules-iyejbp?file=/src/index.js


export default function TaskModal({setIsTaskModalVisible, isTaskModalVisible, task, numCompletedSubtasks}) {


  const [isEditTaskModalVisible, setIsEditTaskModalVisible] = useState(false)
// console.log('edit',isEditTaskModalVisible)
// console.log('task',isTaskModalVisible)
  const [count, setCount] = useState(numCompletedSubtasks);

  

  const [updatedTaskData, setUpdatedTaskData] = useState()

  const {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)

  const [isEditDeleteTaskModalVisible, setIsEditDeleteTaskModalVisible] = useState()

  const ref = useRef()
    // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setIsTaskModalVisible(false));

  const [hideOverflow] = useHiddenOverflow()

    useEffect(() => {
    hideOverflow(isTaskModalVisible)  
}, [isTaskModalVisible])

  const [statusOptionElements] = useStatusOptions()
  const [editTask] = useEditTask(task)
  const [deleteTask] = useDeleteTask(task)

  const {
      register,
      control,
      reset,
      handleSubmit,
      getValues, 
      formState: { errors }
    } = useForm()


  function onSubmit(data)  {
    // console.log(data)
    // update subtasks array with un/completed subtasks
    const updatedSubtasksArray = task.subtasks.map(subtask => 
      ( {...subtask, isCompleted: data.subtasks[subtask.title] }
      ))
    
    // update task with the updated subtasks array
    setUpdatedTaskData({...task, status:data.status, subtasks: updatedSubtasksArray}) 

    // close modal
    setIsTaskModalVisible(false)
  }

  // fires when updatedTaskData state changes (above function)
  useEffect(() => {
    editTask(task, updatedTaskData)
  },[updatedTaskData])
 
  // fires when boards state changes
  useEffect(() => {
    if(task && updatedTaskData) {
      // if task has changed column/status, then delete task from old column
    if(task?.status != updatedTaskData?.status) {
        deleteTask(task)
    }}
  }, [boards])

  // update count  ie keep track of subtasks completed
  
  const handleChange = (e) => {
 
  e.target.nextSibling.classList.toggle('line-through')
  
    setCount(prev => (
      e.target.checked ? prev + 1 : prev - 1
    ))
  }

  
 
  function handleClick() {
    setIsTaskModalVisible(false)
    setCount(numCompletedSubtasks)
  }

//  credit to https://codesandbox.io/s/react-hook-form-reset-v7-r7m5s to reset checkboxes if close modal without submitting form
    return (
      <>
      {/* // overlay */}
      <div className={`${isTaskModalVisible ? ' fixed top-0 left-0 w-screen h-screen bg-opacity-50 bg-gray-600  flex items-start justify-center ' : ''}`}>

         <div className={`${isTaskModalVisible ? "  w-3/4 h-screen bg-gray-50 shadow-md    rounded-lg text-sm text-gray-400" : "hidden"} flex flex-col  overflow-y-auto`  } ref={ref} >

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col ' >
              
              <input type="reset" onClick={handleClick} value='x' className='ml-auto text-2xl bg-gray-200 px-2 rounded-md mt-1 mr-1 cursor-pointer'/>
         
         <div className="m-10">

            <div className="flex ">
              <p className="font-semibold text-lg text-gray-900 mb-5">{task.title}</p> 
              
              {/* edit/delete task button -*/}
              <div className="ml-auto">
                {/* edit/delete task button -*/}
                <div onClick={() => setIsEditDeleteTaskModalVisible(prev => !prev)}>
                  <img src={iconVerticalEllipsis} alt=""  className='cursor-pointer'/>
                </div>
                </div>

                {/* edit/delete task modal */}
                <div>
                  <EditOrDeleteTaskModal 
                  task={task}  
                  isEditDeleteTaskModalVisible={isEditDeleteTaskModalVisible}
                  setIsEditDeleteTaskModalVisible={setIsEditDeleteTaskModalVisible}
                  setIsTaskModalVisible={setIsTaskModalVisible}
                  isTaskModalVisible={isTaskModalVisible}
                  setIsEditTaskModalVisible={setIsEditTaskModalVisible}
                  />
                </div>
              </div>
          
              <p className="mb-3">{task.description ? task.description : 'No description'}</p>

              <p className="text-gray-600 font-semibold mb-3">Subtasks ({count} of {task.subtasks.length})</p>

              {/* subtasks */}
              <ul>
                {task.subtasks?.map((subtask, index) => {
                    return (
                        <li key={subtask.title} className="flex items-center my-3 bg-gray-200 py-2 rounded-lg pl-2">
                          <input
                            {...register( `subtasks.${subtask.title}`)}
                            type='checkbox'
                            defaultChecked={subtask.isCompleted}
                            // id={subtask.title}
                            onChange={(e) => handleChange(e, subtask)}
                            className={`accent-indigo-500 `}
                          
                          />
                          <label htmlFor={subtask.title}
                          id={subtask.title}
                          className={`text-gray-900 font-semibold text-xs ml-3 ${subtask.isCompleted ? "line-through" : ""}`}
                          
                          >     
                            {subtask.title}
                          </label>
                        </li> 
                        )})}
              </ul>
              
              {/* status */}
              <section className="my-2 flex flex-col mt-5">
                <p >Status</p>
                <select 
                  id="status" 
                  {...register('status')} 
                  className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1  pl-2 outline-none focus:border-indigo-500 mb-2'
                >
                  {statusOptionElements}
                </select>
              </section>

              <input type="submit" value='Save Changes' className='text-gray-50 bg-indigo-500 hover:bg-indigo-400 rounded-full py-2 my-2 w-full cursor-pointer'/>
              </div>
          </form>


{isEditTaskModalVisible && 
            <EditTaskModal task={task}
            isEditTaskModalVisible={isEditTaskModalVisible}
            setIsEditTaskModalVisible={setIsEditTaskModalVisible} 
            setIsTaskModalVisible={setIsTaskModalVisible}/>}

        </div>

        </div>
        

        </>
    )
}

// fires when updatedTaskData changes
  // useEffect(() => {
  //   let updatedTaskArray;
  //   if(task && updatedTaskData) {

  //     //if task has NOT changed status/ moved columns, then update that column/status tasks array with updated task   
  //     if(task.status === updatedTaskData?.status) {
  //       updatedTaskArray = (currentBoardData.columns.find(column => column.name === updatedTaskData.status)).tasks.map(task => task.title === updatedTaskData.title ? updatedTaskData : task)

  //     //if task HAS changed status/ moved columns, then update that column/status tasks array with updated task 
  //     } else if(task.status != updatedTaskData?.status) {
  //       updatedTaskArray = (currentBoardData.columns.find(column => column.name === updatedTaskData?.status))?.tasks
  //       updatedTaskArray = [...updatedTaskArray,  updatedTaskData]
  //     }

  //   //  update column with updated tasks array
  //   let updatedColumn = currentBoardData.columns.find(column => column.name === updatedTaskData.status)

  //   updatedColumn = {...updatedColumn, tasks: updatedTaskArray}
    
  //   // update columns with updated column
  //   const updatedColumns = boards.find(board => board.name === currentBoardName).columns.map(column => column.name === updatedColumn.name? updatedColumn: column)

  //   //update board with updated columns
  //   let updatedBoard = boards.find(board => board.name === currentBoardName)

  //   updatedBoard = {...updatedBoard, columns: updatedColumns}
  //   console.log(updatedBoard)
    
  //   // update boards with updated board
  //   setBoards(prev => (
  //     prev.map(board => (
  //         board.name === currentBoardData.name ? updatedBoard : board
  //     ))
  //   ))
  //   }
  // },[updatedTaskData])
