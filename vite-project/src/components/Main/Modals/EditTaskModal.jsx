import {Context} from '../../../Context'
import { useState, useContext, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form";
import { useDeleteTask } from '../../../hooks/useDeleteTask';
import { useEditTask} from '../../../hooks/useEditTask'

// react hook form
// credit to https://react-hook-form.com/api/usefieldarray/
// credit to https://codesandbox.io/s/react-hook-form-usefieldarray-rules-iyejbp?file=/src/index.js


export default function EditTaskModal({setIsEditTaskModalVisible, task}) {

    // let task = task
    const [updatedTaskData, setUpdatedTaskData] = useState()

    let {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)

    const [editTask] = useEditTask(task)
    const [deleteTask] = useDeleteTask(task)

    const subtasksArray = task.subtasks

    const statusOptionElements = currentBoardData?.columns.map((option, index) => <option  key={index} value={option.name}>{option.name}</option>)

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
        subtasks: subtasksArray
        },
        mode: "onChange"
    })
    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "subtasks",
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
        }}
    }, [boards])

       
    return (
        <div className='bg-green-500'>
            
            <button onClick={setIsEditTaskModalVisible}>x</button>
            
            <p>edit Tasks</p>

            <form onSubmit={handleSubmit(onSubmit)}>
           
                <label htmlFor="title">title</label>
                <input defaultValue={task.title} {...register("title")} />

                <label htmlFor="description">description</label>
                <textarea {...register("description")} />
            
                <p>subtasks</p>
                <ul>
                    {fields.map((item, index) => {
                    return (
                        <li key={item.id}>
                            <input
                                {...register(`subtasks.${index}.title`, { required: true })}
                            />
                            <button type="button" onClick={() => remove(index)}>
                                Delete
                            </button>
                        </li>
                    )})}
                </ul>

                <button
                    type="button"
                    onClick={() => {
                        append({title:'', isCompleted: false});
                    }}
                >
                    add new subtask
                </button>

                <p>status</p>
                <select id="status" {...register('status')}  >
                  {statusOptionElements}
                </select>
  
                <input type="submit" />

            </form>

        </div>
    )

}