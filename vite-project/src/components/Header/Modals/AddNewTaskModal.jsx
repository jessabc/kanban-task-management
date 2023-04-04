import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState, useContext, useRef } from "react"
import {Context} from '../../../Context'
import { v4 as uuidv4 } from 'uuid';
import { useStatusOptions } from "../../../hooks/useStatusOptions";

// react hook form
// credit to https://react-hook-form.com/api/usefieldarray/
// credit to https://codesandbox.io/s/react-hook-form-usefieldarray-rules-iyejbp?file=/src/index.js


export default function AddNewTaskModal({setIsNewTaskModalVisible}) {
  
    const [newTask, setNewTask] = useState({})
    
    const {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)

    const [statusOptionElements] = useStatusOptions()
   
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
        formState: { errors }
      } = useForm({
            defaultValues: {
              subtasks: [{title: '', isCompleted: false}],
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

      // reset form when submitted
      // credit to https://www.react-hook-form.com/api/useform/reset/
      useEffect(() => {
        reset({
          title: '',
          description: '',
          subtasks: [{title: '', isCompleted: false}],
        })
      }, [isSubmitSuccessful])

    function onSubmit(data)  {
      // update newTask state accordingly
      if(!data.status) {
        const updateStatus =currentBoardData?.columns?.map(column => column.name)[0]

        setNewTask({...data, status: updateStatus})

      } else {
              setNewTask(data)
      }
    
    }

    // fires when newTask state has changed 
    useEffect(() => {
      // find which column to add new task
      const columnToEdit =    currentBoardData?.columns?.filter(column => column.name === newTask.status)[0]

      // push new task to tasks array in column
      columnToEdit?.tasks.push({...newTask, id:uuidv4(), statusId: columnToEdit.id}) 
     
      // update the boards with the updated column
      setBoards(prev => {
        return prev?.map(board => board?.name === currentBoardName ? currentBoardData : board)
      })

      // close modal
      setIsNewTaskModalVisible(false)
    }, [newTask])

      
    return (
        <div onClick={setIsNewTaskModalVisible} className=' h-screen absolute top-0 left-0 right-0 bottom-0 bg-violet-600'>

        <div className='bg-blue-500 p-5  absolute top-10 left-0 right-0 bottom-0 mx-auto w-1/2 h-1/2 ' onClick={e => e.stopPropagation()}>

            <button onClick={setIsNewTaskModalVisible}>x</button>

            <p>Add new task</p>

            <form onSubmit={handleSubmit(onSubmit)}>
               
              {/* title */}
              <label htmlFor="title">title</label>
              <input id='title' placeholder='title'{...register('title')} />
                
              {/* description */}
              <label htmlFor="description">description</label>
              <input id='description' placeholder='description' {...register('description')} />

              {/* subtasks */}
              <label htmlFor="subtasks">subtasks</label>

              <div>
                <ul>
                  {fields.map((item, index) => {
                    return (
                      <li key={item.id}>
                        <input
                          {...register(`subtasks.${index}.title` , { required: true }, `subtasks.${index}.isCompleted:false`)}
                        />
                
                        <button type="button" onClick={() => remove(index)}>
                          Delete
                        </button>
                      </li>
                    )
                  })}
                </ul>

                <section>
                  <button
                    type="button"
                    onClick={() => {
                      append({title:'', isCompleted: false });
                    }}
                  >
                    add new subtask
                  </button>
                </section>
          
              </div>

              {/* status */}
              <p >status</p>
              <select id="status" {...register('status')}  >
                {statusOptionElements}
              </select>

              <input type="submit" />
            </form>
        </div>
        </div>
    )
}