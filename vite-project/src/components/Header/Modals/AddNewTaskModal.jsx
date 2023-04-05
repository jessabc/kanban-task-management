import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState, useContext, useRef } from "react"
import {Context} from '../../../Context'
import { v4 as uuidv4 } from 'uuid';
import { useStatusOptions } from "../../../hooks/useStatusOptions";
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { useHiddenOverflow } from '../../../hooks/useHiddenOverflow'

// react hook form
// credit to https://react-hook-form.com/api/usefieldarray/
// credit to https://codesandbox.io/s/react-hook-form-usefieldarray-rules-iyejbp?file=/src/index.js


export default function AddNewTaskModal({setIsNewTaskModalVisible, isNewTaskModalVisible}) {
  
    const [newTask, setNewTask] = useState({})
    
    const {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)

    const [statusOptionElements] = useStatusOptions()

    const ref = useRef()
    // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setIsNewTaskModalVisible(false));

  const [hideOverflow] = useHiddenOverflow()

  useEffect(() => {
    hideOverflow(isNewTaskModalVisible)  
}, [isNewTaskModalVisible])
   
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
// overlay
      <div className={`${isNewTaskModalVisible ? ' fixed top-0 left-0 w-screen h-screen bg-opacity-50 bg-gray-600  flex items-start justify-center ' : ''}`}>

        {/* <div onClick={setIsNewTaskModalVisible} className=' '> */}

        <div className={`${isNewTaskModalVisible ? "  w-3/4 h-screen bg-gray-50 shadow-md    rounded-lg text-sm text-gray-400" : "hidden"} flex flex-col  overflow-y-auto`  }  ref={ref}>

            <button onClick={() => setIsNewTaskModalVisible(false)} className='ml-auto text-2xl bg-gray-200 px-2 rounded-md mt-1 mr-1'>x</button>

<div className=" m-5">

            <p className="font-semibold text-lg text-gray-900 mb-5">Add new task</p>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col '>
               
              {/* title */}
              <label htmlFor="title">Title</label>
              <input id='title' {...register('title')} className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2'/>
                
              {/* description */}
              <label htmlFor="description">Description</label>
              <input id='description'  {...register('description')} className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2'/>

              {/* subtasks */}
              <label htmlFor="subtasks">Subtasks</label>

              <div>
                <ul>
                  {fields.map((item, index) => {
                    return (
                      <li key={item.id} className="flex items-start">
                        <input
                          {...register(`subtasks.${index}.title` , { required: true }, `subtasks.${index}.isCompleted:false`)}  className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 w-full mr-1'
                        />
                
                        <button type="button" onClick={() => remove(index)} className='text-2xl px-1  ml-auto font-semibold cursor-pointer text-gray-500'>
                          x
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
                    }}  className='text-indigo-500 bg-gray-200 rounded-full py-2 my-2 mt-3 w-full font-semibold'
                  >
                    + Add New Subtask
                  </button>
                </section>
          
              </div>

              {/* status */}
              <section className="my-2 flex flex-col ">
                <p >Status</p>
              <select id="status" {...register('status')} className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1  pl-2 outline-none focus:border-indigo-500 mb-2' >
                {statusOptionElements}
              </select>
              </section>
              

              <input type="submit" value='Create Task' className='text-gray-50 bg-indigo-500 hover:bg-indigo-400 rounded-full py-2 my-2 cursor-pointer' />
            </form>
            </div>
        </div>
        </div>
      
    )
}