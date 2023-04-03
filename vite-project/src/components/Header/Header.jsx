import logoMobile from '../../assets/logo-mobile.svg'
import iconVerticalEllipsis from '../../assets/icon-vertical-ellipsis.svg'
import AddNewTaskModal from './Modals/AddNewTaskModal'
import { useToggle } from '../../hooks/useToggle'
import MenuDropdown from './MenuDropdown'
import { Context } from '../../Context'
import { useContext } from 'react'
import EditOrDeleteBoardModal from './Modals/EditOrDeleteBoardModal'


export default function Header({}) {

    const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useToggle()

    const [isEditDeletBoardModalVisible, setIsEditDeletBoardModalVisible] = useToggle()

    const {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)
    
   
    return (
        <div className='flex'>

            {/* logo */}
            <div>
               <img src={logoMobile} alt="" /> 
            </div>
            
            <MenuDropdown boards={boards} />

            {/* add new task */}
            <div>
                {/*button for add new task modal */}
                <button onClick={setIsNewTaskModalVisible}className='bg-yellow-500'>+</button>

                {/* add new task modal */}
                <div className={`${isNewTaskModalVisible ? "block" : "hidden"}`}>
                    <AddNewTaskModal boards={boards} currentBoardName={currentBoardName} setIsNewTaskModalVisible={setIsNewTaskModalVisible}/>
                </div>
            </div>
 
            {/* edit or delete board */}
            <div>
                {/* button for edit or delete board */}
               <button onClick={setIsEditDeletBoardModalVisible}>
                    <img src={iconVerticalEllipsis} alt=""  className='cursor-pointer'/>
                </button>

                {/* add/delete board modal*/}
                <div>
                    <EditOrDeleteBoardModal isEditDeletBoardModalVisible={isEditDeletBoardModalVisible} setIsEditDeletBoardModalVisible={setIsEditDeletBoardModalVisible}/>
                </div> 
            </div>
            
        </div>
    )
} 