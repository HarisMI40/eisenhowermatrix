import React from 'react'

import MatrixQuadrant from './MatrixQuadrant'
import MatrixHeaders from './MatrixHeaders'
import { Quadrant, Task } from '@/lib/types'

const Index = ({tasks, updateTask, removeTask, addTask, addingToQuadrant, setAddingToQuadrant, inputRef}: {tasks: Task[], updateTask: (updatedTask: Task) => void, removeTask: (id: number) => void, addTask: (text: string, quadrant: Quadrant) => void, addingToQuadrant: Quadrant | null, setAddingToQuadrant: (quadrant: Quadrant | null) => void, inputRef: React.RefObject<HTMLInputElement>}) => {
  return (
    <div className="w-full md:w-6/12">
      <h1 className="text-3xl font-serif text-center mb-8">The Eisenhower Matrix</h1>
      <div className="relative">
        <MatrixHeaders />

        {/* Matrix Grid */}
        <div className="grid grid-cols-2 gap-0.5 border border-gray-200">
          <MatrixQuadrant
            title="Do"
            description="Tasks that need immediate attention and have high importance."
            bgColor="bg-yellow-100"
            tasks={tasks}
            urgency="urgent"
            importance="important"
            updateTask={updateTask}
            removeTask={removeTask}
            addTask={addTask}
            addingToQuadrant={addingToQuadrant}
            setAddingToQuadrant={setAddingToQuadrant}
            inputRef={inputRef}
          />
          <MatrixQuadrant
            title="Schedule"
            description="Long-term tasks that are crucial but not time-sensitive."
            bgColor="bg-green-100"
            tasks={tasks}
            urgency="not-urgent"
            importance="important"
            updateTask={updateTask}
            removeTask={removeTask}
            addTask={addTask}
            addingToQuadrant={addingToQuadrant}
            setAddingToQuadrant={setAddingToQuadrant}
            inputRef={inputRef}
          />
          <MatrixQuadrant
            title="Delegate"
            description="Tasks that need quick action but won't doom you if they're not accomplished."
            bgColor="bg-blue-100"
            tasks={tasks}
            urgency="urgent"
            importance="not-important"
            updateTask={updateTask}
            removeTask={removeTask}
            addTask={addTask}
            addingToQuadrant={addingToQuadrant}
            setAddingToQuadrant={setAddingToQuadrant}
            inputRef={inputRef}
          />
          <MatrixQuadrant
            title="Eliminate"
            description="Tasks that would be nice to get to but aren't a priority."
            bgColor="bg-pink-100"
            tasks={tasks}
            urgency="not-urgent"
            importance="not-important"
            updateTask={updateTask}
            removeTask={removeTask}
            addTask={addTask}
            addingToQuadrant={addingToQuadrant}
            setAddingToQuadrant={setAddingToQuadrant}
            inputRef={inputRef}
          />
        </div>
      </div>
    </div>
  )
}

export default Index