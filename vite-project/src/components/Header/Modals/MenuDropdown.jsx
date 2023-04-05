import { useToggle } from '../../../hooks/useToggle'
import { Context } from '../../../Context'
import iconChevronDown from
'../../../assets/icon-chevron-down.svg'
import iconChevronUp from '../../../assets/icon-chevron-up.svg'
import { useState, useContext, useEffect, useRef } from 'react'
import BoardLink from '../BoardLink'
import logoMobile from '../../../assets/logo-mobile.svg'
import iconBoard from '../../../assets/icon-board.svg'
import CreateNewBoardModal from './CreateNewBoardModal'
import iconDarkTheme from '../../../assets/icon-dark-theme.svg'
import iconLightTheme from '../../../assets/icon-light-theme.svg'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { useHiddenOverflow } from '../../../hooks/useHiddenOverflow'

export default function MenuDropdown() {
    
    const [theme, setTheme] = useState('light')

    const [isMenuModalVisible, setIsMenuModalVisible] = useState(false)

    const ref = useRef()
    // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setIsMenuModalVisible(false));

  const [hideOverflow] = useHiddenOverflow()

    const [isCreateNewBoardModalVisible, setIsCreateNewBoardModalVisible] = useState()

    const {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)

    const boardLinks = boards?.map(board => <BoardLink key={board.id} board={board}  setIsMenuModalVisible={setIsMenuModalVisible}/>)
 
    // useEffect(() => {
    //     hideOverflow(isMenuModalVisible)  
    // }, [isMenuModalVisible])

    // light/dark theme
    // credit to https://www.youtube.com/watch?v=VylXkPy-MIc
    useEffect(() => {
        if(theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    },[theme])

    function handleThemeSwitch() {
        setTheme(theme === 'dark'? 'light' : 'dark')
    }

    function handleClick() {
        setIsCreateNewBoardModalVisible(true)
        // setIsMenuModalVisible(false)
    }

    return (
        <div >

            {/* menu */}
            <div className='' >

                <div 
                    onClick={() => setIsMenuModalVisible(prev => !prev)} className='flex gap-1  cursor-pointer  '>

                    {/* current board name on display */}
                    <p className='font-semibold text-xl -mb-1' >{currentBoardName}</p>

                    {/* chevron */}
                    <div 
                    className={`${isMenuModalVisible ? " ml-1 mt-auto mb-auto " : " mt-auto ml-1"} `}>
                        <div>
                            <img src={iconChevronDown} alt="" className={`${isMenuModalVisible ? "hidden " : "block "} `}/> 
                        </div>
                        <div>
                            <img src={iconChevronUp} alt="" className={`${isMenuModalVisible ? "block" : "hidden"}`}/> 
                        </div>  
                    </div>
                </div>
                
                {/* over lay credit to https://stackoverflow.com/questions/45607982/how-to-disable-background-when-modal-window-pops-up */}
                <div className={`${isMenuModalVisible ? ' fixed top-0 left-0 w-screen h-screen bg-opacity-50 bg-gray-600  flex items-start justify-center ' : ''}`}>

                
                
                {/* menu dropdown modal*/}
                <div className={`${isMenuModalVisible ? "mt-20  w-3/4 h-content bg-gray-50 shadow-md  pt-5 pb-5 pr-5 rounded-lg font-semibold text-gray-400 overflow-y-auto" : "hidden"}` }  ref={ref} >

                    {/* nubmer of boards */}
                    <p className='pl-5 text-xs tracking-widest mb-4'>{`ALL BOARDS (${boards?.length})`}</p>

                    {/* board links */}
                    {boardLinks}

                    {/* create new board link */}
                    <div className='flex items-center'>
                        <img src={iconBoard} alt="" className='w-4 h-4 mr-2 ml-5 '/>
                        <button onClick={handleClick} className='hover:text-gray-300 text-indigo-500'>+Create New Board</button>
                    </div>

                    {/* darkmode switch */}
                    {/*credit to https://www.w3schools.com/howto/howto_css_switch.asp */ }
                    <div className='flex bg-gray-100 mt-4 justify-center items-center gap-2 ml-7 mr-2 rounded-lg py-2'>
                        <img src={iconDarkTheme} alt="" className='h-4'/>
                            
                        {/* <!-- Rounded switch --> */}
                        <div className=''>
                            <label className="switch" >
                            <input type="checkbox" onClick={handleThemeSwitch}/>
                            <span className="slider round"></span>
                            </label>
                        </div>

                        <img src={iconLightTheme
                    } alt="" className='h-4' />
                    </div>
                </div>
                </div>
                </div>

            

            {/* create new board modal */}
            <div className={`${isCreateNewBoardModalVisible ? "block" : "hidden"}`}>
                <CreateNewBoardModal setIsCreateNewBoardModalVisible={setIsCreateNewBoardModalVisible}
                isCreateNewBoardModalVisible=
                {isCreateNewBoardModalVisible}
                setIsMenuModalVisible={setIsMenuModalVisible}/>
            </div>
          
        </div>
    )
}