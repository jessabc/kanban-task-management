import {useToggle} from '../../../hooks/useToggle'
import DeleteBoardModal from './DeleteBoardModal'
import EditBoardModal from './EditBoardModal'
import {Context} from '../../../Context'
import { useContext } from 'react'

export default function EditOrDeleteBoardModal({isEditDeletBoardModalVisible, setIsEditDeletBoardModalVisible}) {

    const [isEditBoardModalVisible, setIsEditBoardModalVisible] = useToggle()

    const [isDeleteBoardModalVisible, setIsDeleteBoardModalVisible] = useToggle()

    const {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)

    function handleClick(e) {
        if(e.target.id === 'editBoard') {
            setIsEditBoardModalVisible(true)
        } else {
            setIsDeleteBoardModalVisible(true)
        }

        setIsEditDeletBoardModalVisible(false)
    }

    return (
        <>
            <div className={`${isEditDeletBoardModalVisible ? "block" : "hidden"} flex`}>
                
                <button id='editBoard' onClick={(e) => handleClick(e)}>Edit Board</button>

                <button id='deleteBoard' onClick={(e) => handleClick(e)}>Delete Board</button>
            </div>
           
            {isDeleteBoardModalVisible && <DeleteBoardModal setisDeleteBoardModalVisible={setIsDeleteBoardModalVisible} />}

            {isEditBoardModalVisible && <EditBoardModal setIsEditBoardModalVisible={setIsEditBoardModalVisible} />}

        </>
    )
}