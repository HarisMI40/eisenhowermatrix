import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task, Quadrant } from '@/lib/types'

interface TasksState {
  tasks: Task[]
  addingToQuadrant: Quadrant | null
  selectedTask: Task | null
}

const initialState: TasksState = {
  tasks: [],
  addingToQuadrant: null,
  selectedTask: null,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
      localStorage.setItem("todoList", JSON.stringify(state.tasks))
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.map(task => 
        task.id === action.payload.id ? action.payload : task
      )

      state.selectedTask = action.payload;
      
      localStorage.setItem("todoList", JSON.stringify(state.tasks))
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
      localStorage.setItem("todoList", JSON.stringify(state.tasks))
    },
    setAddingToQuadrant: (state, action: PayloadAction<Quadrant | null>) => {
      state.addingToQuadrant = action.payload
    },
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload
    },

     // moveTask : (taskId: number, newQuadrant: Quadrant) => {
    moveTask : (state, action: PayloadAction<{ taskId: number, newQuadrant: Quadrant }>) => {
      const updatedTask = state.tasks.map(task => 
        task.id === action.payload.taskId 
          ? { ...task, urgency: action.payload.newQuadrant.urgency, importance: action.payload.newQuadrant.importance }
          : task
      )
      state.tasks = updatedTask;

      localStorage.setItem("todoList", JSON.stringify(state.tasks))
    },
  },
})

export const { setTasks, addTask, updateTask, removeTask, setAddingToQuadrant, setSelectedTask, moveTask } = tasksSlice.actions
export default tasksSlice.reducer 