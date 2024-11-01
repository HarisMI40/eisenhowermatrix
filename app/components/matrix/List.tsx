import { Task } from "@/lib/types"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"



const List = ({ filteredTasks, updateTask, removeTask }: { filteredTasks: Task[], updateTask: (updatedTask: Task) => void, removeTask: (id: number) => void }) => {
  return (
    <ul className="list-none pl-5 space-y-2">
      {filteredTasks.map(task => (
        <li key={task.id} className="text-sm">
          <Card key={task.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <span className="text-sm">{task.text}</span>
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    {/* <Button variant="ghost" size="icon" onClick={() => setEditingTask(task)}> */}
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit task</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-white">
                    <DialogHeader>
                      <DialogTitle className="my-8"><Input type="email" defaultValue={task.text}  className="border-0 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent focus-visible:border-2 focus-visible:border-input focus-visible:border-blue-500" /></DialogTitle>
                      <DialogDescription>
                        <Button variant="destructive" className="rounded-none" size={"sm"}  onClick={() => removeTask(task.id)}>
                            Delete Task
                          <span className="sr-only">Delete task</span>
                        </Button>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                {/* <Button variant="ghost" size="icon" onClick={() => removeTask(task.id)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete task</span>
              </Button> */}
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  )
}

export default List