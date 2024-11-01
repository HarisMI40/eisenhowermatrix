import { Task } from "@/lib/types"

const List = ({filteredTasks}: {filteredTasks: Task[]}) => {
  return (
    <ul className="list-disc pl-5">
     {filteredTasks.map(task => (
       <li key={task.id} className="text-sm">{task.text}</li>
     ))}
   </ul>
  )
}

export default List