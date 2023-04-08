import { Context } from '../../Context'
import { useState, useContext, useEffect, useRef } from 'react'
import BoardLink from '../Header/BoardLink'
import iconBoard from '../../assets/icon-board.svg'
import iconDarkTheme from '../../assets/icon-dark-theme.svg'
import iconLightTheme from '../../assets/icon-light-theme.svg'
import iconShowSidbar from '../../assets/icon-show-sidebar.svg'
import iconHideSidbar from '../../assets/icon-hide-sidebar.svg'
import { useThemeSwitch } from '../../hooks/useThemeSwitch'


export default function Menu() {

    const {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData, isCreateNewBoardModalVisible, setIsCreateNewBoardModalVisible} = useContext(Context)


    const [isMenuVisible, setIsMenuVisible] = useState(true)

    const boardLinks = boards?.map(board => <BoardLink key={board.id} board={board}  />)
   
    function handleClick() {
        setIsCreateNewBoardModalVisible(true)
       
    }

    const [theme, setTheme, handleThemeSwitch] = useThemeSwitch()
    // const [theme, setTheme] = useState('light')
    // light/dark theme
    // credit to https://www.youtube.com/watch?v=VylXkPy-MIc
    // useEffect(() => {
    //     if(theme === 'dark') {
    //         document.documentElement.classList.add('dark')
    //     } else {
    //         document.documentElement.classList.remove('dark')
    //     }
    // },[theme])

    // function handleThemeSwitch() {
    //     setTheme(theme === 'dark'? 'light' : 'dark')
    // }

    function handleClick() {
        setIsCreateNewBoardModalVisible(true)
       
    }

    return (
       
     <div className={` ${isMenuVisible ? "font-semibold text-gray-400  border-r-2  border-gray-300 bg-white min-w-fit pr-10  sticky top-0  left-0"  : ""} `}>


            {isMenuVisible && <div className={`${isMenuVisible ? 'block' : 'hidden'}`}>
                  {/* nubmer of boards */}
                  <p className='pl-5 text-xs tracking-widest mt-9 mb-4   w-36 '>{`ALL BOARDS (${boards?.length})`}</p>

                {/* board links */}
                <div className=" ">
                    {boardLinks} 
                </div>
                     
                
              

                 {/* create new board link */}
                 <div className='flex items-center my-2'>
                        <img src={iconBoard} alt="" className='w-4 h-4 mr-2 ml-5 '/>
                        <button onClick={handleClick} className='hover:text-gray-300 text-indigo-500 min-w-fit'>+Create New Board</button>
                    </div>

                     {/* darkmode switch */}
                    {/*credit to https://www.w3schools.com/howto/howto_css_switch.asp */ }
                    <div className='flex bg-gray-100  justify-center items-center gap-2 ml-5 mr-2 rounded-lg py-2 mt-20'>
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

                    {/* show/hide sidebar */}
                    
                        <div className='flex items-center gap-2  my-5 ml-5 cursor-pointer text-gray-500 text-sm' onClick={() => setIsMenuVisible(false)} 
                        >
                           <img src={iconHideSidbar} alt="" className='w-4 h-4'/>
                          <p className=''>Hide Sidebar</p>
                        </div>


                      </div>}

                     {!isMenuVisible && <div onClick={() => setIsMenuVisible(true)} className='bg-indigo-500 p-4 pr-6 rounded-tr-full rounded-br-full cursor-pointer  mt-96 absolute'>    
                       <img src={iconShowSidbar} alt="" className='w-6 h-4'/> 
                    
                    </div>}
                   
          </div>
       
    )
}