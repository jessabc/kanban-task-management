import { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './Column'
import NewColumn from './NewColumn'
import Menu from '../../modals/Menu'
import { useWindowSize } from '../../hooks/useWindowSize';
import './styles.css'


export default function Main({isMenuModalVisible, setIsMenuModalVisible}) {
    
  const [columns, setColumns] = useState([])

  const {boards, setBoards, currentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)

  const size = useWindowSize()

  const columnElements = currentBoardData?.columns?.map((column, index) => <Column key={column.name} column={column} index={index}/>)

  useEffect(() => {
    setColumns(currentBoardData?.columns)
  },[currentBoardData])


  //credit to https://dev.to/imjoshellis/codealong-multi-column-drag-and-drop-in-react-3781
  const onDragEnd = ({ source, destination }) => {

    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null
   
    // Set start and end variables
    const start = columns.find(column => column.name === source.droppableId)
    const end = columns.find(column => column.name === destination.droppableId)

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.tasks.filter(
        (_, idx) => idx !== source.index
      )
      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.tasks[source.index])

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        name: source.droppableId,
        tasks: newList
      }

      // Update the state
      setColumns(prev => (
        prev.map(column => (
          column.name === newCol.name ? newCol : column
        ))
      ))

      const updatedColumns = currentBoardData.columns.map(column => column.name === source.droppableId ? newCol : column)

      const updatedBoard = {...currentBoardData, columns: updatedColumns}

      setCurrentBoardData(updatedBoard)

      setBoards(prev => (
        prev.map(board => (
            board.name === currentBoardName ? updatedBoard: board
        ))
      ))  

      return null

    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.tasks.filter(
        (_, idx) => idx !== source.index
      )

      // Create a new start column
      const newStartCol = {
        id: start.id,
        name: source.droppableId,
        tasks: newStartList
      }

      // Make a new end list array
      let newEndList = end.tasks

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.tasks[source.index])

      const newerEndList = newEndList.map(task => (
        task.status === destination.droppableId ? task: {...task, status: destination.droppableId}
      ))
     
      //Create a new end column
      const newEndCol = {
        id: end.id,
        name: destination.droppableId,
        tasks: newerEndList
      }

      // Update the state
      let updatedColumns = currentBoardData.columns.map(column => column.name === source.droppableId ? newStartCol : column)

      updatedColumns = updatedColumns.map(column => column.name === destination.droppableId ? newEndCol : column)

      const updatedBoard = {...currentBoardData, columns: updatedColumns}
      
      setCurrentBoardData(updatedBoard)

      setBoards(prev => (
        prev.map(board => (
          board.name === currentBoardName ? updatedBoard: board
        ))
      ))
    
      return null
    }
  }


  return (
      <DragDropContext onDragEnd={onDragEnd}>
        
        {/* sticky header credit to https://dev.to/cryptic022/sticky-header-and-footer-with-tailwind-2oik */}
        <div className={`flex gap-5 pl-5 pr-10 flex-1 w-screen bg-gray-200 dark:bg-zinc-900 sm:pl-0 overflow-y-auto h-screen ${isMenuModalVisible ? 'sm:pr-20 sm:pl-60 ':'sm:pr-0 sm:pl-0'}`}>
        
          <div className='flex flex-col mt-auto'>
            <Menu 
            isMenuModalVisible={isMenuModalVisible}
            setIsMenuModalVisible={setIsMenuModalVisible}
            boards={boards} 
            />
          </div>

          {columnElements} 

          <NewColumn/>

        </div>
        
      </DragDropContext>
  )
}
