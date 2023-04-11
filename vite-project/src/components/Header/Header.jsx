import { useContext, useState } from 'react'
import { Context } from '../../Context'
import EditOrDeleteBoardModal from '../../modals/EditOrDeleteBoardModal'
import AddNewTaskModal from '../../modals/AddNewTaskModal'
import { useWindowSize } from '../../hooks/useWindowSize'
import logoMobile from '../../assets/logo-mobile.svg'
import iconVerticalEllipsis from '../../assets/icon-vertical-ellipsis.svg'
import iconAddTaskMobile from '../../assets/icon-add-task-mobile.svg'
import iconChevronDown from
'../../assets/icon-chevron-down.svg'
import iconChevronUp from '../../assets/icon-chevron-up.svg'
import logoLight from '../../assets/logo-dark.svg' 
import logoDark  from '../../assets/logo-light.svg'


export default function Header({isMenuModalVisible, setIsMenuModalVisible}) {

    const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState()
    const [isEditDeletBoardModalVisible, setIsEditDeletBoardModalVisible] = useState()

    const {boards, currentBoardName, theme} = useContext(Context)
   
    const size = useWindowSize();


    return (
        <div className='flex'>

            {/* desktop logo */}
            {size.width > 640 && 
            <div className='flex items-center w-80  h-full pl-5 dark:bg-zinc-800'>
                {theme === 'dark' ? 
                <img src={logoDark} alt='' className=''/> 
                : <img src={logoLight} alt='' className=''/>}
            </div>} 
              
            <div className='flex w-full px-10 py-10 items-center dark:bg-zinc-800 sm:pl-0'>

                {/* mobile logo */}
                {size.width < 640 &&  
                <img src={logoMobile} alt='' className='mr-3'/>} 

                {/* menu */}   
                {size.width < 640 ?
                (<div 
                    onClick={() => setIsMenuModalVisible(prev => !prev)} className='flex gap-1 cursor-pointer'>
                    {/* current board name on display */}
                    <p className='font-bold text-xl -mb-1 dark:text-zinc-100'>{currentBoardName}</p>
                    {/* chevron */}
                    <div 
                    className={`${isMenuModalVisible ? 'ml-1 mt-auto mb-auto' : 'mt-auto ml-1'} `}>
                        <div>
                            <img src={iconChevronDown} alt='' className={`${isMenuModalVisible ? 'hidden' : 'block'} `}/> 
                        </div>
                        <div>
                            <img src={iconChevronUp} alt='' className={`${isMenuModalVisible ? 'block' : 'hidden'}`}/> 
                        </div>  
                    </div>
                </div>) 
                : <p className='font-semibold text-xl -mb-1 dark:text-zinc-100'>{currentBoardName}</p>
                }
        
                {/* add new task */}
                <div className='ml-auto mt-auto mr-3'>
                    {/*button for add new task modal */}
                    <button 
                        onClick={() => setIsNewTaskModalVisible(true)} 
                        className={`${size.width < 640 ? 'bg-indigo-500 py-1 px-3 rounded-full'
                        : 'w-content py-1 px-3 text-md bg-indigo-500 font-bold text-indigo-50 rounded-full   cursor-pointer pb-1'} hover:bg-indigo-400`}> 
                        {size.width < 640 ? <img src={iconAddTaskMobile} alt='' className='w-4 h-4'/> : '+ Add New Task'}
                    </button>
                
                    {/* add new task modal */}
                    <div className={`${isNewTaskModalVisible ? 'block' : 'hidden'}`}>
                        <AddNewTaskModal 
                            boards={boards} 
                            currentBoardName={currentBoardName} 
                            isNewTaskModalVisible={isNewTaskModalVisible}
                            setIsNewTaskModalVisible={setIsNewTaskModalVisible}/>
                    </div>
                </div>
    
                {/* edit or delete board */}
                <div className='flex flex-col'>
                    {/* button for edit or delete board */}
                    <button 
                        onClick={setIsEditDeletBoardModalVisible} 
                        className='mt-auto hover:bg-indigo-100 dark:hover:bg-gray-700 hover:p-2 hover:pb-1 hover:rounded-full p-2 pb-1 cursor-pointer'>
                        <img src={iconVerticalEllipsis} alt=''  className='cursor-pointer'/>
                    </button>

                    {/* add/delete board modal*/}
                    <div>
                        <EditOrDeleteBoardModal 
                            isEditDeletBoardModalVisible={isEditDeletBoardModalVisible}
                            setIsEditDeletBoardModalVisible={setIsEditDeletBoardModalVisible}/>
                    </div> 
                </div>
            
            </div>
        </div>
    )
}  