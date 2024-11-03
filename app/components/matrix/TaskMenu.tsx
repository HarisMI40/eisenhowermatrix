import { Task } from "@/lib/types"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Quadrant } from "@/lib/types"
import { MoreVertical } from "lucide-react"
import { useDispatch } from "react-redux"
import { removeTask, moveTask } from "@/lib/store/tasksSlice"

const TaskMenu = ({ task}: { task: Task }) => {
  const dispatch = useDispatch()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
        <MoreVertical className="h-4 w-4" />
        <span className="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onSelect={(e) => {
        e.stopPropagation();
        dispatch(removeTask(task.id));
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      >Delete</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
        <DropdownMenuSubContent onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
          <DropdownMenuItem 
            onSelect={(e) => {
              e.stopPropagation();
              dispatch(moveTask({taskId : task.id, newQuadrant : { urgency: 'urgent', importance: 'important' }}));
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            Do
          </DropdownMenuItem>
          <DropdownMenuItem 
            onSelect={(e) => {
              e.stopPropagation();
              dispatch(moveTask({taskId : task.id, newQuadrant :  { urgency: 'not-urgent', importance: 'important' }}));
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            Schedule
          </DropdownMenuItem>
          <DropdownMenuItem 
            onSelect={(e) => {
              e.stopPropagation();
              dispatch(moveTask({taskId : task.id, newQuadrant : { urgency: 'urgent', importance: 'not-important' }}));
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            Delegate
          </DropdownMenuItem>
          <DropdownMenuItem 
            onSelect={(e) => {
              e.stopPropagation();
              dispatch(moveTask({taskId : task.id, newQuadrant : { urgency: 'not-urgent', importance: 'not-important' }}));
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            Eliminate
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </DropdownMenuContent>
  </DropdownMenu>
)
}

export default TaskMenu