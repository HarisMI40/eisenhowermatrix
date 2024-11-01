import { Task } from "@/lib/types"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { useState } from "react"

type TaskFormProps = {
  onTaskAdd: (task: Omit<Task, 'id'>) => void
}

export default function index({
  onTaskAdd
}: TaskFormProps) {

  const [newTask, setNewTask] = useState('')
  const [urgency, setUrgency] = useState<'urgent' | 'not-urgent'>('urgent')
  const [importance, setImportance] = useState<'important' | 'not-important'>('important')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      onTaskAdd({ text: newTask, urgency, importance })
      setNewTask('')
    }
  }


  return (
    <div className="w-full md:w-1/3">
      <h2 className="text-2xl font-semibold mb-4">Add Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="task">Task</Label>
          <Input
            id="task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
          />
        </div>
        <div>
          <Label htmlFor="urgency">Urgency</Label>
          <Select value={urgency} onValueChange={(value: "urgent" | "not-urgent") => setUrgency(value)}>
            <SelectTrigger id="urgency">
              <SelectValue placeholder="Select urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="not-urgent">Not Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="importance">Importance</Label>
          <Select value={importance} onValueChange={(value: 'important' | 'not-important') => setImportance(value)}>
            <SelectTrigger id="importance">
              <SelectValue placeholder="Select importance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="important">Important</SelectItem>
              <SelectItem value="not-important">Not Important</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Add Task</Button>
      </form>
    </div>
  )
} 