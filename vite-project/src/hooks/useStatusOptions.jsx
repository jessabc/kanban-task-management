import React, { useContext } from "react"
import { Context } from '../Context'


export function useStatusOptions() {

    const {boards, setBoards, currentBoardName, setCurrentBoardName, currentBoardData, setCurrentBoardData} = useContext(Context)

    const statusOptionElements = currentBoardData?.columns?.map((option, index) => <option  key={index} value={option.name}>{option.name}</option>)

    return [statusOptionElements]
}