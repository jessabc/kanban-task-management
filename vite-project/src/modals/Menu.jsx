import { useToggle } from '../hooks/useToggle'
import { Context } from '../Context'
import iconChevronDown from
'../assets/icon-chevron-down.svg'
import iconChevronUp from '../assets/icon-chevron-up.svg'
import { useState, useContext, useEffect, useRef } from 'react'
import BoardLink from '../components/Header/BoardLink'
import logoMobile from '../assets/logo-mobile.svg'
import iconBoard from '../assets/icon-board.svg'
import CreateNewBoardModal from './CreateNewBoardModal'
import iconDarkTheme from '../assets/icon-dark-theme.svg'
import iconLightTheme from '../assets/icon-light-theme.svg'
import { useOnClickOutside } from '../hooks/useOnClickOutside'
import { useHiddenOverflow } from '../hooks/useHiddenOverflow'
import useWindowSize from '../hooks/useWindowSize'
// import { useThemeSwitch } from '../hooks/useThemeSwitch'
import iconHideSidbar from '../assets/icon-hide-sidebar.svg'
import iconShowSidbar from '../assets/icon-show-sidebar.svg'
import logoDark from '../assets/logo-dark.svg' 

export default function Menu({isMenuModalVisible, setIsMenuModalVisible}) { 
    //  console.log(isMenuModalVisible)

    const [isCreateNewBoardModalVisible, setIsCreateNewBoardModalVisible] = useState()
//    const [theme, setTheme, handleThemeSwitch] = useThemeSwitch()
 const size = useWindowSize();

    const ref = useRef()
    // Call hook passing in the ref and a function to call on outside click
 
         useOnClickOutside(ref, () => {
        if(size.width < 640) {
             setIsMenuModalVisible(false)
     }
         }) 
       
     

//   const [hideOverflow] = useHiddenOverflow()

    // const [isCreateNewBoardModalVisible, setIsCreateNewBoardModalVisible] = useState()

   

    const {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData, theme, setTheme} = useContext(Context)

    const boardLinks = boards?.map(board => <BoardLink key={board.id} board={board}  setIsMenuModalVisible={setIsMenuModalVisible}/>)
 
    // useEffect(() => {
    //     hideOverflow(isMenuModalVisible)  
    // }, [isMenuModalVisible])

    // useEffect(() => {
    //     if(size.width > 640 ) {
    //         setIsMenuModalVisible(true)
    //     }
    // }, [size.width])

    

    function handleClick() {
        setIsCreateNewBoardModalVisible(true)
        setIsMenuModalVisible(false)
    }

    // theme switch
//   const [theme, setTheme] = useState('light')

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

    return (
        <>

            {/* menu */}
            <div className={`flex flex-col`} >

                {/* over lay credit to https://stackoverflow.com/questions/45607982/how-to-disable-background-when-modal-window-pops-up */}
              <div className={`${isMenuModalVisible && size.width < 640? ' fixed top-0 left-0 w-screen h-screen bg-opacity-50 flex bg-gray-600  dark:bg-gray-900 dark:bg-opacity-50  items-start justify-center ' : ''}`}>
                
                    {/* menu dropdown modal*/}
                    <div className={`${isMenuModalVisible ? "mt-20  w-3/4  fixed h-content bg-gray-50 shadow-md  pt-5 pb-5 pr-5 rounded-lg  font-semibold text-gray-400 dark:bg-zinc-700 sm:dark:bg-zinc-800 sm:flex sm:flex-col  " : "hidden "} 
                     sm:w-60    
                  
                    sm:top-28 sm:left-0
                     sm:absolute sm:h-[calc(100vh-8rem)] sm:rounded-none sm:mt-0 sm:pt-0 sm:pb-0

                   
                    

                  `}  ref={ref} >




                        {/* nubmer of boards */}
                        <p className={`pl-5 text-xs tracking-widest mb-4 ${size.width > 640 ? 'pt-5 pb-3': ''}
                    `}>{`ALL BOARDS (${boards?.length})`}</p>

                        {/* board links */}
                        {boardLinks}

                        {/* create new board link */}
                        <div className='flex items-center'>
                            <img src={iconBoard} alt="" className='w-4 h-4 mr-2 ml-5 '/>
                            <button onClick={handleClick} className='hover:text-gray-300 text-indigo-500'>+Create New Board</button>
                        </div>

                        {/* darkmode switch */}
                        {/*credit to https://www.w3schools.com/howto/howto_css_switch.asp */ }
                        <div className={`flex bg-gray-200 dark:bg-zinc-800 sm:dark:bg-zinc-900 mt-4 justify-center items-center gap-2 ml-7 mr-2 rounded-lg py-2 sm:mt-auto ${size.width > 640 ? 'mt-10': ''}` }>
                            <img src={ iconLightTheme} alt="" className='h-4'/>
                                
                            {/* <!-- Rounded switch --> */}
                            <div className=''>
                                <label className="switch" >
                                <input type="checkbox" onClick={handleThemeSwitch}/>
                                <span className="slider round"></span>
                                </label>
                            </div>

                            <img src={iconDarkTheme} alt="" className='h-4' />
                        </div>

                        {/* hide sidebar */}
                        { size.width > 640 && <div className='flex items-center gap-2  my-5 ml-5 cursor-pointer text-gray-500 text-sm' onClick={() => setIsMenuModalVisible(false)} 
                        >
                           <img src={iconHideSidbar} alt="" className='w-4 h-4'/>
                          <p className=''>Hide Sidebar</p>
                        </div>}

                     
                    
                    {/* end menu dropdown modal */}
                    </div>

                {/* end overlay */}
                </div>

            {/* end menu  */}
            </div>

            {/* show sidebar */}                
          {/* bg-indigo-500 p-4 pr-8 pl-8 rounded-tr-full rounded-br-full cursor-pointer mb-10  */}
                    {!isMenuModalVisible && size.width > 640 && <div onClick={() => setIsMenuModalVisible(true)} className='bg-indigo-500 p-2 pr-3 pl-3 rounded-tr-full rounded-br-full cursor-pointer  flex justify-center items-center min-w-max absolute bottom-8'>
                       
                       <img src={iconShowSidbar} alt="" className='w-5'/>  
                     </div>}
                    

            {/* create new board modal */}
            <div className={`${isCreateNewBoardModalVisible ? "block" : "hidden"}`}>
                <CreateNewBoardModal setIsCreateNewBoardModalVisible={setIsCreateNewBoardModalVisible}
                isCreateNewBoardModalVisible=
                {isCreateNewBoardModalVisible}
                setIsMenuModalVisible={setIsMenuModalVisible}/>
            </div>
          
        </>
    )
}