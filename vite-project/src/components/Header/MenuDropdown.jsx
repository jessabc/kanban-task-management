import { useToggle } from '../../hooks/useToggle'
import { Context } from '../../Context'
import iconChevronDown from '../../assets/icon-chevron-down.svg'
import iconChevronUp from '../../assets/icon-chevron-up.svg'
import { useState, useContext, useEffect } from 'react'
import BoardLink from './BoardLink'
import logoMobile from '../../assets/logo-mobile.svg'
import iconBoard from '../../assets/icon-board.svg'
import CreateNewBoardModal from './Modals/CreateNewBoardModal'
import iconDarkTheme from '../../assets/icon-dark-theme.svg'
import iconLightTheme from '../../assets/icon-light-theme.svg'


export default function MenuDropdown() {

    const [theme, setTheme] = useState('light')

    const [isMenuModalVisible, setIsMenuModalVisible] = useToggle()

    const [isCreateNewBoardModalVisible, setisCreateNewBoardModalVisible] = useToggle()

    const {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)

    const boardLinks = boards?.map(board => <BoardLink key={board.id} board={board}  setIsMenuModalVisible={setIsMenuModalVisible}/>)

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
        setisCreateNewBoardModalVisible(true)
        setIsMenuModalVisible(false)
    }
   

    return (
        <>
            {/* menu */}
            <div className='dark:bg-green-500'>

                <div 
                    onClick={setIsMenuModalVisible} className='flex cursor-pointer'>

                    {/* current board name on display */}
                    <p className=''>{currentBoardName}</p>

                    {/* chevron */}
                    <div>
                        <div>
                            <img src={iconChevronDown} alt="" className={`${isMenuModalVisible ? "hidden" : "block"} `}/> 
                        </div>
                        <div>
                            <img src={iconChevronUp} alt="" className={`${isMenuModalVisible ? "block" : "hidden"}`}/> 
                        </div>  
                    </div>
                </div>

                {/* menu dropdown */}
                <div className={`${isMenuModalVisible ? "block" : "hidden"}`}>

                    {/* nubmer of boards */}
                    <p>{`all boards (${boards?.length})`}</p>

                    {/* board links */}
                    {boardLinks}

                    {/* create new board link */}
                    <div>
                        <img src={iconBoard} alt="" />
                        <button onClick={handleClick}>+Create New Board</button>
                    </div>

                    {/* darkmode switch */}
                    {/*credit to https://www.w3schools.com/howto/howto_css_switch.asp */ }
                    <div className='flex'>
                        <img src={iconDarkTheme} alt="" />
                            
                        {/* <!-- Rounded switch --> */}
                        <div >
                            <label className="switch" >
                            <input type="checkbox" onClick={handleThemeSwitch}/>
                            <span className="slider round"></span>
                            </label>
                        </div>

                        <img src={iconLightTheme
                    } alt="" />
                    </div>
                </div>
                
            </div>

            {/* create new board modal */}
            <div className={`${isCreateNewBoardModalVisible ? "block" : "hidden"}`}>
                <CreateNewBoardModal setisCreateNewBoardModalVisible={setisCreateNewBoardModalVisible}/>
            </div>
        
        </>
    )
}