import AddNewColumnModal from "../../modals/AddNewColumnModal"
import { useState } from "react"

export default function NewColumn() {

    const [isAddNewColumnModalVisible, setIsAddNewColumnModalVisible] = useState()

    return (
        <>
        <div className="rounded-lg bg-gray-300 dark:bg-zinc-800 mt-20 h-screen ">
            <div className="text-gray-400  mt-20 mx-10  text-center w-44 font-semibold text-xl ">
                <button className="" onClick={() => setIsAddNewColumnModalVisible
                (true)}>+ New Column</button>
            </div>
            
        </div>

        {isAddNewColumnModalVisible &&<AddNewColumnModal isAddNewColumnModalVisible={isAddNewColumnModalVisible} setIsAddNewColumnModalVisible={setIsAddNewColumnModalVisible}/>}

        </>
    )
}