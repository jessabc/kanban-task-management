import { useState, useContext, useEffect, useRef } from 'react'
import { Context } from '../Context'
import { useForm, useFieldArray } from 'react-hook-form';
import { useDeleteTask } from '../hooks/useDeleteTask';
import { useEditTask} from '../hooks/useEditTask'
import { useOnClickOutside } from '../hooks/useOnClickOutside'
import iconCross from '../assets/icon-cross.svg'

 
export default function EditTaskModal({isEditTaskModalVisible, setIsEditTaskModalVisible, task, setIsTaskModalVisible}) {

    const [updatedTaskData, setUpdatedTaskData] = useState()

    let {boards, currentBoardData} = useContext(Context)

    const [editTask] = useEditTask(task)
    const [deleteTask] = useDeleteTask(task)

    const ref = useRef()
    useOnClickOutside(ref, () => {
        setIsEditTaskModalVisible(false)
        setIsTaskModalVisible(false)
    })

    const subtasksArray = task.subtasks

    const statusOptionElements = currentBoardData?.columns.map((option, index) => <option  key={index} value={option.name}>{option.name}</option>)

    // react hook form
    // credit to https://react-hook-form.com/api/usefieldarray/
    // credit to https://codesandbox.io/s/react-hook-form-usefieldarray-rules-iyejbp?file=/src/index.js
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
        subtasks: subtasksArray
        },
        mode: 'onChange'
    })
    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: 'subtasks',
    })

    function onSubmit(data) {
        //save form data to updatedTaskData state, and add id
        setUpdatedTaskData ({...data, id: task.id, statusId: task.statusId })      
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
            } else {
                setIsEditTaskModalVisible(false)
            setIsTaskModalVisible(false)
            }
        } 
    }, [boards])

    function handleClick() {
        setIsEditTaskModalVisible(false)
        setIsTaskModalVisible(false)
    }

       
    return (

        // overlay
        <div className={`${isEditTaskModalVisible ? 'fixed top-0 left-0 w-screen h-screen bg-opacity-50 bg-gray-600  flex items-start justify-center dark:bg-gray-900 dark:bg-opacity-50' : ''}`}>

            <div className={`${isEditTaskModalVisible ? 'w-3/4 sm:w-1/2 h-screen bg-gray-50 shadow-md rounded-lg text-sm text-gray-400' : 'hidden'} flex flex-col  overflow-y-auto dark:bg-zinc-700`} ref={ref}>
            
                <button onClick={handleClick } className='ml-auto text-2xl bg-gray-200 p-2 rounded-md mt-1 mr-1'>
                    <img src={iconCross} alt='' />
                </button>

                <div className=' m-5'>

                    <p className='font-semibold text-lg text-gray-900 mb-5 dark:text-zinc-100'>Edit Tasks</p>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                
                        <label htmlFor='title'>Title</label>
                        <input 
                            defaultValue={task.title} 
                            {...register('title')} 
                            className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2'
                        />

                        <label htmlFor='description'>Description</label>
                        <input 
                            defaultValue={task.description}
                            {...register('description')} 
                            className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2'
                        />
                    
                        <p>Subtasks</p>
                        <ul>
                            {fields.map((item, index) => {
                            return (
                                <li key={item.id} className='flex items-center'>
                                    <input
                                        {...register(`subtasks.${index}.title`, { required: true })}
                                        className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 w-full mr-1'
                                    />
                                    <button 
                                    type='button' 
                                    onClick={() => remove(index)} 
                                    className='cursor-pointer'>
                                        <img src={iconCross} alt='' />
                                    </button>
                                </li>
                            )})}
                        </ul>

                        <button
                            type='button'
                            onClick={() => {append({title:'', isCompleted: false})}}
                            className='text-indigo-500 bg-gray-200 rounded-full py-2 my-2 mt-3 w-full font-semibold'
                        >
                            +Add New Subtask
                        </button>

                        <section className='my-2 flex flex-col'>
                            <p>Status</p>
                            <select 
                                id='status' 
                                {...register('status')}  
                                className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 pl-2 outline-none focus:border-indigo-500 mb-2'
                            >
                                {statusOptionElements}
                            </select>
                        </section>
        
                        <input 
                        type='submit' 
                        className='text-gray-50 bg-indigo-500 hover:bg-indigo-400 rounded-full py-2 my-2 cursor-pointer'/>

                    </form>
                </div>
            </div>
        </div>
    )

}