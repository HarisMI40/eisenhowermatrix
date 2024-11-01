export type Task = {
  id: number
  text: string
  urgency: 'urgent' | 'not-urgent'
  importance: 'important' | 'not-important'
} 

export type TaskFormProps = {
  newTask: string
  urgency: 'urgent' | 'not-urgent'
  importance: 'important' | 'not-important'
  onNewTaskChange: (value: string) => void
  onUrgencyChange: (value: 'urgent' | 'not-urgent') => void
  onImportanceChange: (value: 'important' | 'not-important') => void
  onSubmit: (e: React.FormEvent) => void
}

export type Quadrant = {
  urgency: 'urgent' | 'not-urgent'
  importance: 'important' | 'not-important'
}