import { useForm, useFieldArray } from "react-hook-form";
import React, { useEffect, useState, useContext } from "react"
import { Context } from '../../../Context'
import EditOrDeleteTaskModal from "./EditOrDeleteTaskModal" 
import { useStatusOptions } from "../../../hooks/useStatusOptions";
import iconVerticalEllipsis from '../../../assets/icon-vertical-ellipsis.svg'
import { useDeleteTask } from "../../../hooks/useDeleteTask";
import { useToggle } from "../../../hooks/useToggle";
import { useEditTask} from '../../../hooks/useEditTask'
 
// react hook form
// credit to https://react-hook-form.com/api/usefieldarray/
// credit to https://codesandbox.io/s/react-hook-form-usefieldarray-rules-iyejbp?file=/src/index.js


export default function TaskModal({setIsTaskModalVisible, isTaskModalVisible, task, numCompletedSubtasks}) {

  const [count, setCount] = useState(numCompletedSubtasks);

  const [updatedTaskData, setUpdatedTaskData] = useState()

  const {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)

  const [isEditDeleteTaskModalVisible, setIsEditDeleteTaskModalVisible] = useToggle()

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
        <div>
            <form onSubmit={handleSubmit(onSubmit)} >
              <input type="reset" onClick={handleClick} value='x'/>
         
              <p>{task.title}</p> 
              
              {/* edit/delete task button -*/}
              <div>
                {/* edit/delete task button -*/}
                <div onClick={setIsEditDeleteTaskModalVisible}>
                  <img src={iconVerticalEllipsis} alt=""  className='cursor-pointer'/>
                </div>

                {/* edit/delete task modal */}
                <div>
                  <EditOrDeleteTaskModal task={task}  isEditDeleteTaskModalVisible={isEditDeleteTaskModalVisible}
                  setIsTaskModalVisible={setIsTaskModalVisible}
                  isTaskModalVisible={isTaskModalVisible}
                  />
                </div>
              </div>
          
              <p>task description: {task.description}</p>

              <p>subtasks {count} of {task.subtasks.length}</p>

              {/* subtasks */}
              <ul>
                {task.subtasks?.map((subtask, index) => {
                    return (
                        <li key={subtask.title}>
                          <input
                            {...register( `subtasks.${subtask.title}`)}
                            type='checkbox'
                            defaultChecked={subtask.isCompleted}
                            id={subtask.title}
                            onChange={(e) => handleChange(e)}
                          />
                          <label htmlFor={subtask.title}>     
                            {subtask.title}
                          </label>
                        </li> 
                        )})}
              </ul>
              
              {/* status */}
              <div>
                <p >status</p>
                <select 
                  id="status" 
                  {...register('status')} 
                >
                  {statusOptionElements}
                </select>
              </div>

              <input type="submit" />
          </form>

        </div>
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
