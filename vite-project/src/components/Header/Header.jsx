import logoMobile from '../../assets/logo-mobile.svg'
import iconVerticalEllipsis from '../../assets/icon-vertical-ellipsis.svg'
import AddNewTaskModal from './Modals/AddNewTaskModal'
import { useToggle } from '../../hooks/useToggle'
import MenuDropdown from './Modals/MenuDropdown'
import { Context } from '../../Context'
import { useContext } from 'react'
import EditOrDeleteBoardModal from './Modals/EditOrDeleteBoardModal'


export default function Header({}) {

    const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useToggle()

    const [isEditDeletBoardModalVisible, setIsEditDeletBoardModalVisible] = useToggle()

    const {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)
    
   
    return (
        <div className='flex  items-end  my-5 mx-5 '>

            {/* logo */}
            
               <img src={logoMobile} alt="" className='mr-3'/> 
          
            
                <div className='flex flex-col mt-auto'>
                    <MenuDropdown boards={boards} />
                </div>
                
            

            {/* add new task */}
            <div className='ml-auto mr-3'>
                {/*button for add new task modal */}

                <button onClick={setIsNewTaskModalVisible} className='bg-indigo-600  font-bold text-indigo-50 rounded-full text-xl px-3 cursor-pointer'>+</button>
            
           
        
                

                {/* add new task modal */}
                <div className={`${isNewTaskModalVisible ? "block" : "hidden"}`}>
                    <AddNewTaskModal boards={boards} currentBoardName={currentBoardName} setIsNewTaskModalVisible={setIsNewTaskModalVisible}/>
                </div>
            </div>
 
            {/* edit or delete board */}
            <div className='flex flex-col'>
                {/* button for edit or delete board */}
               <button onClick={setIsEditDeletBoardModalVisible} className='mt-auto'>
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