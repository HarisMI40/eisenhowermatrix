export type Task = {
  id: number
  text: string
  urgency: 'urgent' | 'not-urgent'
  importance: 'important' | 'not-important', 
  description: string,
  // startDate: Date | null,
  startDate: string | null,
  dueDate: string,
  startTime : string,
  completed: boolean,
  category: string,
  checkList : ChecklistItem[]
  createdAt: string,
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

export type itemList = {
    id: string,
    text: string,
    checked: boolean
}


export interface ChecklistItem {
  id: string,
  title: string,
  item: itemList[]
}