import { useRef } from 'react'
import { useDeleteTask } from '../hooks/useDeleteTask'
import { useOnClickOutside } from '../hooks/useOnClickOutside'
import iconCross from '../assets/icon-cross.svg'

export default function DeleteTaskModal({isDeleteTaskModalVisible, setIsDeleteTaskModalVisible, setIsTaskModalVisible, task}) {

    const ref = useRef()
    useOnClickOutside(ref, () => {
        setIsDeleteTaskModalVisible(false)
        setIsTaskModalVisible(false)
    })

    const [deleteTask] = useDeleteTask()

    function  handleClick(e, task) {
        if(e.target.id === 'delete') {
            deleteTask(task)     
        }
        setIsDeleteTaskModalVisible(false)
        setIsTaskModalVisible(false)
    } 


    return ( 
        <>
            {/* overlay */}
            <div className={`${isDeleteTaskModalVisible ? 'fixed top-0 left-0 w-screen h-screen bg-opacity-50 bg-gray-600 flex items-start justify-center dark:bg-gray-900 dark:bg-opacity-50' : ''}`}>

                <div className={`${isDeleteTaskModalVisible ? 'w-3/4 sm:w-1/2 h-screen bg-gray-50 shadow-md    rounded-lg text-sm text-gray-400' : 'hidden'} flex flex-col overflow-y-auto dark:bg-zinc-700`}  ref={ref}>
            
                    <button 
                    type='button' 
                    id='exit' 
                    onClick={(e) => handleClick(e)} 
                    className='ml-auto text-2xl bg-gray-200 p-2 rounded-md mt-1 mr-1'>
                        <img src={iconCross} alt='cross icon to close modal' />
                    </button>

                    <div className=' m-5'>
                        <p className='font-semibold text-lg text-red-500 mb-5'>Delete this task?</p>
                        <p>Are you sure you want to delete the '{task.title}' task and its subtasks? This action cannot be reversed.</p>

                        <div className='flex gap-2 mt-3'>
                            <button 
                                type='button' 
                                id='delete' 
                                onClick={(e) => handleClick(e, task)} 
                                className='bg-red-400 text-white rounded-full py-2 w-1/2'>
                                Delete
                            </button>
                            <button 
                            type='button' 
                            id='cancel' 
                            onClick={(e) => handleClick(e)} 
                            className='text-indigo-500 bg-gray-200 rounded-full py-2  font-semibold w-1/2'>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}