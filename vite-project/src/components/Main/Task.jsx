import { useToggle } from '../../hooks/useToggle'
import TaskModal from './Modals/TaskModal'
import { Draggable } from 'react-beautiful-dnd'

export function Task({task, index}) {

    const [isTaskModalVisible, setIsTaskModalVisible] = useToggle()

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
                onClick={setIsTaskModalVisible} 
                className="cursor-pointer da rk:bg-zinc-500 flex flex-col my-1 bg-indigo-50 shadow-md p-3 h-40">
                  <p className='text-gray-900 font-semibold py-2 '>{task.title}</p>
                  <p className='text-gray-400 font-semibold text-xs py-2'>{`${numCompletedSubtasks} of ${task.subtasks.length} subtasks`}</p>
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