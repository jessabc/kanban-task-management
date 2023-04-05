import logoMobile from '../../assets/logo-mobile.svg'
import iconVerticalEllipsis from '../../assets/icon-vertical-ellipsis.svg'
import AddNewTaskModal from './Modals/AddNewTaskModal'
import { useToggle } from '../../hooks/useToggle'
import MenuDropdown from './Modals/MenuDropdown'
import { Context } from '../../Context'
import { useContext, useState } from 'react'
import EditOrDeleteBoardModal from './Modals/EditOrDeleteBoardModal'


export default function Header({}) {

    const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState()

    const [isEditDeletBoardModalVisible, setIsEditDeletBoardModalVisible] = useState()

    const {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)
    
   
    return (
        <div className='flex  items-end  my-8 mx-10
        6 '>

            {/* logo */}
            
               <img src={logoMobile} alt="" className='mr-3'/> 
          
            
                <div className='flex flex-col mt-auto'>
                    <MenuDropdown boards={boards} />
                </div>
                
            

            {/* add new task */}
            <div className='ml-auto  mr-3  '>
                {/*button for add new task modal */}

                <button onClick={() => setIsNewTaskModalVisible(true)} className='bg-indigo-500  font-bold text-indigo-50 rounded-full text-xl  w-12 cursor-pointer pb-1 hover:bg-indigo-400'>+</button>
            
           
        
                

                {/* add new task modal */}
                <div className={`${isNewTaskModalVisible ? "block" : "hidden"}`}>
                    <AddNewTaskModal boards={boards} currentBoardName={currentBoardName} 
                    isNewTaskModalVisible={isNewTaskModalVisible}
                    setIsNewTaskModalVisible={setIsNewTaskModalVisible}/>
                </div>
            </div>
 
            {/* edit or delete board */}
            <div className='flex flex-col'>
                {/* button for edit or delete board */}
               <button onClick={setIsEditDeletBoardModalVisible} className='mt-auto hover:bg-indigo-100 hover:p-2  hover:rounded-full p-2 cursor-pointer'>
                    <img src={iconVerticalEllipsis} alt=""  className='cursor-pointer'/>
                </button>

                {/* add/delete board modal*/}
                <div>
                    <EditOrDeleteBoardModal isEditDeletBoardModalVisible={isEditDeletBoardModalVisible} setIsEditDeletBoardModalVisible={setIsEditDeletBoardModalVisible}
                />
                </div> 
            </div>
            
        </div>
    )
} 