import { Quadrant, Task } from "@/lib/types"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip"

import { IconQuestionCircle } from "@/lib/icons"
import List from "./List"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type QuadrantProps = {
  title: string
  description: string
  bgColor: string
  tasks: Task[]
  urgency: 'urgent' | 'not-urgent'
  importance: 'important' | 'not-important'
  updateTask: (updatedTask: Task) => void
  removeTask: (id: number) => void
  addTask: (text: string, quadrant: Quadrant) => void
  addingToQuadrant: Quadrant | null
  setAddingToQuadrant: (quadrant: Quadrant | null) => void
  inputRef: React.RefObject<HTMLInputElement>
}

const MatrixQuadrant = ({ title, description, bgColor, tasks, urgency, importance, updateTask, removeTask, addTask, addingToQuadrant, setAddingToQuadrant, inputRef }: QuadrantProps) => {
  const filteredTasks = tasks.filter(task => 
    task.urgency === urgency && task.importance === importance
  )

  return (
    <div className={`${bgColor} p-6 min-h-[200px]`}>
      <div className="flex justify-between items-center">
      <h3 className="font-semibold mb-2">{title}</h3>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger><IconQuestionCircle /></TooltipTrigger>
            <TooltipContent>
              <p>{description}</p>
            </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      </div>
      <List filteredTasks={filteredTasks} updateTask={updateTask} removeTask={removeTask} />
      {/* <List filteredTasks={filteredTasks} /> */}

      {addingToQuadrant?.urgency === urgency && addingToQuadrant?.importance === importance ? (
            <form className="mt-4" onSubmit={(e) => {
              e.preventDefault()
              const input = e.currentTarget.elements.namedItem('newTask') as HTMLInputElement
              if (input.value.trim()) {
                addTask(input.value.trim(), { urgency, importance})
              }
            }}>
              <Input
                ref={inputRef}
                name="newTask"
                placeholder="Enter a new task"
                className="w-full focus-visible:ring-offset-0 focus-visible:ring-offset-transparent"
                onBlur={() => setAddingToQuadrant(null)}
              />
            </form>
          ) : (
            <Button 
              variant="ghost" 
              className="w-full justify-start mt-4" 
              onClick={() => setAddingToQuadrant({ urgency, importance})}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add a task
            </Button>
          )}

     
    </div>
  )
}

export default MatrixQuadrant 