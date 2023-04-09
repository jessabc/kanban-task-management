import TaskModal from '../../modals/TaskModal'
import { Draggable } from 'react-beautiful-dnd'
import { useState } from 'react'

export function Task({task, index}) {

    const [isTaskModalVisible, setIsTaskModalVisible] = useState(false)
    // console.log('task',isTaskModalVisible)
    const numCompletedSubtasks = getNumCompletedSubtasks()

    function getNumCompletedSubtasks() {
        let count = 0
        task.subtasks.forEach(subtask => subtask.isCompleted ? count++ : null)
        return count
    }
    
    return (
      <>
        <Draggable draggableId={task.title} index={index}>
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
            
            {/* Task Card */}
              <div 
                onClick={() => setIsTaskModalVisible(true) } 
                className="cursor-pointer dark:bg-zinc-800 flex flex-col my-3 bg-gray-50 shadow-md p-3 h-40 w-60 rounded-lg ">
                  <p className='text-gray-900 font-bold py-2 dark:text-zinc-200 '>{task.title}</p>
                  <p className='text-gray-400 font-bold text-xs py-2 '>{`${numCompletedSubtasks} of ${task.subtasks.length} subtasks`}</p>
              </div>

            </div>
          )}
        </Draggable>

        {/* Task Modal */}
        <div className={`${isTaskModalVisible ? "block" : "hidden"} bg-pink-600`}>
            <TaskModal key={task.title}setIsTaskModalVisible={setIsTaskModalVisible} 
            isTaskModalVisible={isTaskModalVisible}
            task={task} numCompletedSubtasks={numCompletedSubtasks}/>
        </div>

      </>
    )
}