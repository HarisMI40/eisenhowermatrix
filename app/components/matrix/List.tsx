import { Task } from "@/lib/types"
import { useDispatch } from 'react-redux'
import { setSelectedTask } from '@/lib/store/tasksSlice'
import { Card } from "@/components/ui/card"
import TaskMenu from "./TaskMenu"
import { format } from "date-fns"
import { Clock } from "lucide-react"

const List = ({ filteredTasks }: { filteredTasks: Task[] }) => {
  const dispatch = useDispatch()

  return (
    <ul className="list-none space-y-2">
      {filteredTasks.map(task => (
        <li key={task.id} className="text-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => dispatch(setSelectedTask(task))}>

          <Card key={task.id}
            className="p-3 bg-white hover:shadow-md transition-shadow"
          >

            <div className="flex items-center justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-2">
                  <p className="text-sm">{task.text}</p>
                </div>
                { task.startDate && (
                  <div className="text-xs text-black px-1 rounded bg-gray-200 w-max flex gap-1 items-center"> <Clock size={12} /> {format(task.startDate, "dd MMM yyyy")}</div>
                )}
              </div>
              <TaskMenu task={task} />
            </div>
          </Card>
        </li>
      ))
      }
    </ul >
  )
}

export default List