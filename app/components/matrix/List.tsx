import { Task } from "@/lib/types"
import { useDispatch } from 'react-redux'
import { setSelectedTask } from '@/lib/store/tasksSlice'
import { Card, CardContent } from "@/components/ui/card"
import TaskMenu from "./TaskMenu"

const List = ({ filteredTasks }: { filteredTasks: Task[] }) => {
  const dispatch = useDispatch()

  return (
    <ul className="list-none pl-5 space-y-2">
      {filteredTasks.map(task => (
        <li key={task.id} className="text-sm cursor-pointer" onClick={() => dispatch(setSelectedTask(task))}>
          <Card key={task.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <span className="text-sm">{task.text}</span>
              <TaskMenu task={task} />
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  )
}

export default List