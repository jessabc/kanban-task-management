import { Context } from '../Context'
import { useState, useContext, useEffect, useRef } from 'react'
import BoardLink from '../components/Header/BoardLink'
import iconBoard from '../assets/icon-board.svg'


export function useGetMenuContent() {

    const {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData, isCreateNewBoardModalVisible, setIsCreateNewBoardModalVisible} = useContext(Context)

    const boardLinks = boards?.map(board => <BoardLink key={board.id} board={board}  setIsMenuModalVisible={setIsMenuModalVisible}/>)
    
    function handleClick() {
        setIsCreateNewBoardModalVisible(true)
        setIsMenuModalVisible(false)
    }
    function getMenuContent() {
        return (
            <>
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
            
            </>
        )
    }

    return [getMenuContent]
}