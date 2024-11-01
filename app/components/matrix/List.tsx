import { Task } from "@/lib/types"
import { useDispatch } from 'react-redux'
import { setSelectedTask } from '@/lib/store/tasksSlice'
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const List = ({ filteredTasks }: { filteredTasks: Task[] }) => {
  const dispatch = useDispatch()

  return (
    <ul className="list-none pl-5 space-y-2">
      {filteredTasks.map(task => (
        <li key={task.id} className="text-sm">
          <Card key={task.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <span className="text-sm">{task.text}</span>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => dispatch(setSelectedTask(task))}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit task</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  )
}

export default List