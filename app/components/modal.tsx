import { useSelector, useDispatch } from 'react-redux'
import { setSelectedTask, updateTask, removeTask } from '@/lib/store/tasksSlice'
import { RootState } from '@/lib/store/store'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

const Modal = () => {
  const dispatch = useDispatch()
  const selectedTask = useSelector((state: RootState) => state.tasks.selectedTask)
  const [taskText, setTaskText] = useState('')

  useEffect(() => {
    if (selectedTask) {
      setTaskText(selectedTask.text)
    }
  }, [selectedTask])

  const handleClose = () => {
    dispatch(setSelectedTask(null))
    setTaskText('')
  }

  const handleUpdate = () => {
    if (selectedTask && taskText.trim()) {
      dispatch(updateTask({
        ...selectedTask,
        text: taskText.trim()
      }))
      handleClose()
    }
  }

  if (!selectedTask) return null

  return (
    <Dialog open={!!selectedTask} onOpenChange={() => handleClose()}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="my-8">
            <Input 
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleUpdate()
                }
              }}
              className="border-0 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent focus-visible:border-2 focus-visible:border-input focus-visible:border-blue-500" 
            />
          </DialogTitle>
          <DialogDescription className="flex justify-between">
            <Button 
              variant="destructive" 
              className="rounded-none" 
              size="sm"  
              onClick={() => {
                dispatch(removeTask(selectedTask.id))
                handleClose()
              }}
            >
              Delete Task
              <span className="sr-only">Delete task</span>
            </Button>
            <Button 
              variant="default" 
              className="rounded-none" 
              size="sm"
              onClick={handleUpdate}
            >
              Update Task
              <span className="sr-only">Update task</span>
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Modal