import {useToggle} from '../hooks/useToggle'
import DeleteBoardModal from './DeleteBoardModal' 
import EditBoardModal from './EditBoardModal'
import {Context} from '../Context'
import { useContext, useRef, useEffect, useState } from 'react'
import { useOnClickOutside } from '../hooks/useOnClickOutside'
import { useHiddenOverflow } from '../hooks/useHiddenOverflow'

export default function EditOrDeleteBoardModal({isEditDeletBoardModalVisible, setIsEditDeletBoardModalVisible}) {
 
    const [isEditBoardModalVisible, setIsEditBoardModalVisible] = useState()

    const [isDeleteBoardModalVisible, setIsDeleteBoardModalVisible] = useState()

    const [hideOverflow] = useHiddenOverflow()

    const ref = useRef()
    // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setIsEditDeletBoardModalVisible(false));

    const {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)
 
    function handleClick(e) {
        if(e.target.id === 'editBoard') {
            setIsEditBoardModalVisible(true)
        } else {
            setIsDeleteBoardModalVisible(true)
        }

        setIsEditDeletBoardModalVisible(false)
    }

    // useEffect(() => {
   
    //     hideOverflow(isEditDeletBoardModalVisible) 

    // //    if(!isCreateNewBoardModalVisible) {
    // //      setIsMenuModalVisible(false) 
    // //    }
               

        
    // }, [isEditDeletBoardModalVisible])

    return (
        <>
{/* overlay */}
        <div className={`${isEditDeletBoardModalVisible ? ' fixed top-0 left-0 w-screen h-screen bg-opacity-50 bg-gray-600  flex items-start justify-center dark:bg-gray-900 dark:bg-opacity-50' : ''}`}>

       

            <div className={`${isEditDeletBoardModalVisible ? "flex flex-col absolute right-7 top-20 w-fit py-5 pl-5 pr-10  text-lg bg-gray-50 shadow-md  gap-1  rounded-lg  text-gray-400 dark:bg-zinc-700 " : "hidden"}  ` } ref={ref}>
                
                <button id='editBoard' onClick={(e) => handleClick(e)} className='text-left hover:text-gray-300'>Edit Board</button>

                <button id='deleteBoard' onClick={(e) => handleClick(e)} className='text-red-400 hover:text-red-300'>Delete Board</button>
            </div>
           
            {isDeleteBoardModalVisible && <DeleteBoardModal setIsDeleteBoardModalVisible={setIsDeleteBoardModalVisible}
            isDeleteBoardModalVisible = {isDeleteBoardModalVisible}
             />}

            {isEditBoardModalVisible && <EditBoardModal setIsEditBoardModalVisible={setIsEditBoardModalVisible}
            isEditBoardModalVisible={isEditBoardModalVisible}
             isEditDeletBoardModalVisible={isEditDeletBoardModalVisible} />}
            </div>
        </>
    )
}