import React, { useEffect, useState, useContext, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { Context } from '../Context'
import EditOrDeleteTaskModal from './EditOrDeleteTaskModal' 
import EditTaskModal from './EditTaskModal'
import { useStatusOptions } from '../hooks/useStatusOptions';
import { useDeleteTask } from '../hooks/useDeleteTask';
import { useEditTask} from '../hooks/useEditTask'
import { useOnClickOutside } from '../hooks/useOnClickOutside'
import iconCross from '../assets/icon-cross.svg'
import iconCheck from '../assets/icon-check.svg'
import iconVerticalEllipsis from '../assets/icon-vertical-ellipsis.svg'



export default function TaskModal({setIsTaskModalVisible, isTaskModalVisible, task, numCompletedSubtasks}) {

  const [count, setCount] = useState(numCompletedSubtasks);
  const [updatedTaskData, setUpdatedTaskData] = useState()
  const [isEditTaskModalVisible, setIsEditTaskModalVisible] = useState(false)
  const [isEditDeleteTaskModalVisible, setIsEditDeleteTaskModalVisible] = useState()

  const {boards} = useContext(Context)
 
  const [statusOptionElements] = useStatusOptions()
  const [editTask] = useEditTask(task)
  const [deleteTask] = useDeleteTask(task)

  const ref = useRef()
  useOnClickOutside(ref, () => setIsTaskModalVisible(false))

  // react hook form
  // credit to https://react-hook-form.com/api/usefieldarray/
  // credit to https://codesandbox.io/s/react-hook-form-usefieldarray-rules-iyejbp?file=/src/index.js
  const {
      register,
      control,
      handleSubmit,
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

  function handleChange(e) {
    e.target.nextSibling.classList.toggle('line-through')

    // update count ie keep track of subtasks completed
    setCount(prev => (
      e.target.checked ? prev + 1 : prev - 1
    ))
  }
  
  function handleClick() {
    setIsTaskModalVisible(false)
    setCount(numCompletedSubtasks)
  }


    return (
      <>
        {/* // overlay */}
        <div className={`${isTaskModalVisible ? 'fixed top-0 left-0 w-screen h-screen bg-opacity-50 bg-gray-600  flex items-start justify-center dark:bg-gray-900 dark:bg-opacity-50' : ''}`}>

          <div className={`${isTaskModalVisible ? 'w-3/4 sm:w-1/2  h-screen bg-gray-50 shadow-md rounded-lg text-sm text-gray-400' : 'hidden'} flex flex-col  overflow-y-auto dark:bg-zinc-700`} ref={ref}>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col' >
              
              {/* credit to https://codesandbox.io/s/react-hook-form-reset-v7-r7m5s to reset checkboxes if close modal without submitting form */}
              <button type='reset' onClick={handleClick} className='ml-auto text-2xl bg-gray-200 p-2 rounded-md mt-1 mr-1'> <img src={iconCross} alt='' /></button>
              
              <div className='m-10'>

                <div className='flex'>
                  <p className='font-semibold text-lg text-gray-900 mb-5 dark:text-zinc-100'>{task.title}</p> 
                
                  {/* edit/delete task button -*/}
                  <div className='ml-auto'>
                    <div onClick={() => setIsEditDeleteTaskModalVisible(prev => !prev)}>
                      <img src={iconVerticalEllipsis} alt=''  className='cursor-pointer'/>
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
              
                <p className='mb-3'>{task.description ? task.description : 'No description'}</p>

                <p className='text-gray-600 font-semibold mb-3'>Subtasks ({count} of {task.subtasks.length})</p>

                {/* subtasks */}
                <ul>
                  {task.subtasks?.map((subtask) => {
                      return (
                          <li 
                            key={subtask.title} 
                            className='flex items-center my-3 bg-gray-200 py-2 rounded-lg pl-2'
                          >
                            <input
                              style={{ backgroundImage: `url(${iconCheck })`}}
                              {...register( `subtasks.${subtask.title}`)}
                              type='checkbox'
                              defaultChecked={subtask.isCompleted}
                              onChange={(e) => handleChange(e, subtask)}
                              className={`appearance-none border border-slate-400  h-5 w-5  bg-no-repeat bg-center rounded-sm bg-white checked:bg-indigo-500`}
                            />
                            
                            <label 
                              htmlFor={subtask.title}
                              id={subtask.title}
                              className={`text-gray-900 font-semibold text-xs ml-3 ${subtask.isCompleted ? 'line-through' : ''}`}
                            >     
                              {subtask.title}
                            </label>
                          </li> 
                        )})}
                </ul>
                  
                {/* status */}
                <section className='my-2 flex flex-col mt-5'>
                  <p >Status</p>
                  <select 
                    id='status' 
                    {...register('status')} 
                    className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1  pl-2 outline-none focus:border-indigo-500 mb-2'
                  >
                    {statusOptionElements}
                  </select>
                </section>

                <input 
                  type='submit' 
                  value='Save Changes' 
                  className='text-gray-50 bg-indigo-500 hover:bg-indigo-400 rounded-full py-2 my-2 w-full cursor-pointer'
                />
              </div>
            </form>

          {isEditTaskModalVisible && 
          <EditTaskModal 
          task={task}
          isEditTaskModalVisible={isEditTaskModalVisible}
          setIsEditTaskModalVisible={setIsEditTaskModalVisible} 
          setIsTaskModalVisible={setIsTaskModalVisible}/>}

          </div>

        </div>

      </>
    )
}

