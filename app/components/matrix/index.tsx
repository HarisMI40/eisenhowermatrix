import MatrixQuadrant from './MatrixQuadrant'
import MatrixHeaders from './MatrixHeaders'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setTasks } from '@/lib/store/tasksSlice'

const Index = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const dataTodo = localStorage.getItem("todoList");
    if(dataTodo){
      dispatch(setTasks(JSON.parse(dataTodo)));
    }
  }, [dispatch]);

  return (
    <div className="w-full md:w-6/12">
      <h1 className="text-3xl font-serif text-center mb-8">The Eisenhower Matrix</h1>
      <div className="relative">
        <MatrixHeaders />
        <div className="grid grid-cols-2 gap-0.5 border border-gray-200">
          <MatrixQuadrant
            title="Do"
            description="Tasks that need immediate attention and have high importance."
            bgColor="bg-yellow-100"
            urgency="urgent"
            importance="important"
          />
          <MatrixQuadrant
            title="Schedule"
            description="Long-term tasks that are crucial but not time-sensitive."
            bgColor="bg-green-100"
            urgency="not-urgent"
            importance="important"
          />
          <MatrixQuadrant
            title="Delegate"
            description="Tasks that need quick action but won't doom you if they're not accomplished."
            bgColor="bg-blue-100"
            urgency="urgent"
            importance="not-important"
          />
          <MatrixQuadrant
            title="Eliminate"
            description="Tasks that would be nice to get to but aren't a priority."
            bgColor="bg-pink-100"
            urgency="not-urgent"
            importance="not-important"
          />
        </div>
      </div>
    </div>
  )
}

export default Index