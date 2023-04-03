import { Task } from "./Task"
import { Droppable } from 'react-beautiful-dnd'

export default function Column({column}) {

    const taskElements = column.tasks.map((task, index) => <Task key={task.title} task={task} index={index}/>)

    return (
        //credit to https://dev.to/imjoshellis/codealong-multi-column-drag-and-drop-in-react-3781
        <Droppable droppableId={column.name}>
          {provided => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <p>{column.name}</p>
              {taskElements}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
  )
}


