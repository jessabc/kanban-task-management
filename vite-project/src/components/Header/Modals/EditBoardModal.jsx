import {Context} from '../../../Context'
import { useContext } from "react"
import { useForm, useFieldArray } from "react-hook-form";

// react hook form
// credit to https://react-hook-form.com/api/usefieldarray/
// credit to https://codesandbox.io/s/react-hook-form-usefieldarray-rules-iyejbp?file=/src/index.js


export default function EditBoardModal({setIsEditBoardModalVisible}) {

    let {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)

    const columnsArray = currentBoardData?.columns

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
        columns: columnsArray
        },
        mode: "onChange"
    })
    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "columns",
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
        <div className='bg-green-500'>
            
            <button onClick={setIsEditBoardModalVisible}>x</button>
            
            <p>edit board</p>

            <form onSubmit={handleSubmit(onSubmit)}>
           
                <label htmlFor="name">name</label>
                <input defaultValue={currentBoardName} {...register("name")} />
            
                <p>columns</p>
                <ul>
                    {fields.map((item, index) => {
                    return (
                        <li key={item.id}>
                        <input
                            {...register(`columns.${index}.name`, { required: true })}
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
                        append({id: '', name: '', tasks:[]});
                    }}
                >
                    append
                </button>

                <input type="submit" />
            </form>
        </div>
    )
}