import { Task } from "@/lib/types"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip"

import { IconQuestionCircle } from "@/lib/icons"
import List from "./List"

type QuadrantProps = {
  title: string
  description: string
  bgColor: string
  tasks: Task[]
  urgency: 'urgent' | 'not-urgent'
  importance: 'important' | 'not-important'
}

const MatrixQuadrant = ({ title, description, bgColor, tasks, urgency, importance }: QuadrantProps) => {
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
     
      <List filteredTasks={filteredTasks} />

     
    </div>
  )
}

export default MatrixQuadrant 