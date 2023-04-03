import { useContext, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form";
import {Context} from '../../../Context'

// react hook form
// credit to https://react-hook-form.com/api/usefieldarray/
// credit to https://codesandbox.io/s/react-hook-form-usefieldarray-rules-iyejbp?file=/src/index.js

export default function CreateNewBoardModal({setisCreateNewBoardModalVisible}) {

    const {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)
    
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
        formState: { errors }
    } = useForm({
        defaultValues: {
        columns:  [{name: '', tasks:[], id:''}],
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

    // reset form when submitted
    // credit to https://www.react-hook-form.com/api/useform/reset/
    useEffect(() => {
        reset({ 
            name: '',
            columns:  [{name: '', tasks:[], id:''}]
        })
      }, [isSubmitSuccessful]);

    function onSubmit(data) {
        // add id to columns
        const columnsId =   data.columns.map((column, index) => !column.id ? {...column, id: index} : '')
     
        // update data with the columns with id
        Object.assign(data.columns, columnsId)
       
        // give new board an id
        data = {...data, id:boards.length}

        // update boards with new board
        setBoards(prev => (
            [...prev, data]
        ))

        setisCreateNewBoardModalVisible(false)
    }

    return (
        <div className="bg-purple-500 absolute top-0 left-0 right-0 bottom-0 mx-auto m-5">
            <button onClick={setisCreateNewBoardModalVisible}>x</button>

            <p>add new board</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">name</label>
                <input id='name' {...register("name")} />

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
                        append({id:'', name: '', tasks:[]});
                    }}
                >
                    add new column
                </button>

                <input type="submit" />

            </form>
        </div>
    )
}