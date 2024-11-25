import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store/store'



import List from "./List"
import Form from '../form'
import DescriptionMatrix from './DescriptionMatrix'


type QuadrantProps = {
  title: string
  description: string
  bgColor: string
  urgency: 'urgent' | 'not-urgent'
  importance: 'important' | 'not-important'
}

const MatrixQuadrant = ({ title, description, bgColor, urgency, importance }: QuadrantProps) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks)

  const filteredTasks = tasks.filter(task =>
    task.urgency === urgency && task.importance === importance
  )

  return (
    <div className={`${bgColor} p-6 min-h-[200px]`}>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold mb-2">{title}</h3>
        <DescriptionMatrix description={description} />
      </div>
      <List filteredTasks={filteredTasks} />

      <Form
        urgency={urgency}
        importance={importance}
      />
    </div>
  ) 
}

export default MatrixQuadrant 