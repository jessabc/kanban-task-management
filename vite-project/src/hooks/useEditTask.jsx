import {Context} from '../Context'
import { useState, useContext, useEffect } from "react"


export function useEditTask({task, updatedTaskData}) {
    
    let {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)

    function editTask(task, updatedTaskData) {
 
        let updatedTaskArray;

        if(task && updatedTaskData) {
    
          //if task has NOT changed status/ moved columns, then update that column/status tasks array with updated task   
          if(task.status === updatedTaskData?.status) {
           
         
            updatedTaskArray = (currentBoardData.columns.find(column => column.name === updatedTaskData.status)).tasks.map(task => task.id === updatedTaskData.id ? updatedTaskData : task)
          

          //if task HAS changed status/ moved columns, then update that column/status tasks array with updated task 
          } else if(task.status != updatedTaskData?.status) {
            updatedTaskArray = (currentBoardData.columns.find(column => column.name === updatedTaskData?.status))?.tasks
            updatedTaskArray = [...updatedTaskArray,  updatedTaskData]
          }
        
        //  update column with updated tasks array
        let updatedColumn = currentBoardData.columns.find(column => column.name === updatedTaskData.status)
    
        updatedColumn = {...updatedColumn, tasks: updatedTaskArray}
       
        // update columns with updated column
        const updatedColumns = boards.find(board => board.name === currentBoardName).columns.map(column => column.name === updatedColumn.name? updatedColumn: column)
    
        //update board with updated columns
        let updatedBoard = boards.find(board => board.name === currentBoardName)
    
        updatedBoard = {...updatedBoard, columns: updatedColumns}
        // console.log(updatedBoard)
        
        // update boards with updated board
        setBoards(prev => (
          prev.map(board => (
              board.name === currentBoardData.name ? updatedBoard : board
          ))
        ))
    }
      
    }
      return [editTask]
}