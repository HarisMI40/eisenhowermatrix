import MatrixQuadrant from './MatrixQuadrant'
import MatrixHeaders from './MatrixHeaders'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setTasks } from '@/lib/store/tasksSlice'

const Index = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const dataTodo = localStorage.getItem("todoList");
    if (dataTodo) {
      dispatch(setTasks(JSON.parse(dataTodo)));
    }
  }, [dispatch]);

  return (
    <div className="w-full md:w-8/12">
      <div className="text-center text-white space-y-2 mb-8">
        <h1 className="text-4xl font-serif">The Eisenhower Matrix</h1>
        <p className="text-sm">Prioritize tasks based on urgency and importance</p>
      </div>


      <div className="relative">
        <MatrixHeaders />
        <div className="grid grid-cols-2 border bg-white p-1 rounded gap-1 shadow-xl">
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