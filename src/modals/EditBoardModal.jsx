import { useContext, useRef } from 'react'
import {Context} from '../Context'
import { useForm, useFieldArray } from 'react-hook-form';
import { useOnClickOutside } from '../hooks/useOnClickOutside'
import iconCross from '../assets/icon-cross.svg'

 
export default function EditBoardModal({setIsEditBoardModalVisible, isEditBoardModalVisible}) {

    let {setBoards, currentBoardName, setCurrentBoardName, currentBoardData} = useContext(Context)
    
    const ref = useRef()
    useOnClickOutside(ref, () => setIsEditBoardModalVisible(false))

    const columnsArray = currentBoardData?.columns

    // react hook form
    // credit to https://react-hook-form.com/api/usefieldarray/
    // credit to https://codesandbox.io/s/react-hook-form-usefieldarray-rules-iyejbp?file=/src/index.js
    const {
        register,
        control,
        handleSubmit,
    } = useForm({
        defaultValues: {
        columns: columnsArray
        },
        mode: 'onChange'
    })
    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: 'columns',
    })

    function onSubmit(data) {      
        // add id to data
        const updatedBoardData = {...data, id: currentBoardData.id}
    
        // replace old board data with updated
        setBoards(prev => {
            return prev.map(board => {
                return board.name === currentBoardName ? updatedBoardData : board
            })
        })

        // update currentboard name
        setCurrentBoardName(updatedBoardData.name)
        
        // close modal
        setIsEditBoardModalVisible(false)
    }


    return (

        <div className={`${isEditBoardModalVisible ? 'fixed top-0 left-0 w-screen h-screen bg-opacity-50 bg-gray-600  flex items-start justify-center dark:bg-gray-900 dark:bg-opacity-50' : ''}`}>

            <div className={`${isEditBoardModalVisible ? 'w-3/4 sm:w-1/2  h-screen bg-gray-50 shadow-md rounded-lg text-sm text-gray-400' : 'hidden'} flex flex-col overflow-y-auto dark:bg-zinc-700`}  ref={ref}>
            
                <button 
                    onClick={() => setIsEditBoardModalVisible(false)} 
                    className='ml-auto text-2xl bg-gray-200 p-2 rounded-md mt-1 mr-1'>
                    <img src={iconCross} alt='cross icon to close modal' />
                </button>
            
                <div className=' m-5'>
                    <p className='font-semibold text-lg text-gray-900 mb-5 dark:text-zinc-100'>Edit Board</p>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col '>
           
                        <label htmlFor='name'>Name</label>
                        <input 
                            defaultValue={currentBoardName} 
                            {...register('name')} 
                            className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2'/>
                    
                        <p>Columns</p>
                        <ul>
                            {fields.map((item, index) => {
                            return (
                                <li key={item.id} className='flex items-center'>
                                    <input
                                        {...register(`columns.${index}.name`, { required: true })}
                                        className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 w-full mr-1'
                                    />
                                    <button type='button' onClick={() => remove(index)} className='cursor-pointer'>
                                        <img src={iconCross} alt='cross icon to close modal' />
                                    </button>
                                </li>
                            )})}
                        </ul>

                        <button
                            type='button'
                            onClick={() => {append({id: '', name: '', tasks:[]})}}   
                            className='text-indigo-500 bg-gray-200 rounded-full py-2 my-2 mt-3 w-full font-semibold'
                        >
                            +Add New Column
                        </button>

                        <input 
                            type='submit' 
                            value='Save Changes' 
                            className='text-gray-50 bg-indigo-500 hover:bg-indigo-400 rounded-full py-2 my-2 cursor-pointer' />
                    </form>
                </div>
            </div>
        </div>
    )
}