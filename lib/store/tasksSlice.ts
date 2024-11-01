import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task, Quadrant } from '@/lib/types'

interface TasksState {
  tasks: Task[]
  addingToQuadrant: Quadrant | null
}

const initialState: TasksState = {
  tasks: [],
  addingToQuadrant: null,
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
      localStorage.setItem("todoList", JSON.stringify(state.tasks))
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
      localStorage.setItem("todoList", JSON.stringify(state.tasks))
    },
    setAddingToQuadrant: (state, action: PayloadAction<Quadrant | null>) => {
      state.addingToQuadrant = action.payload
    },
  },
})

export const { setTasks, addTask, updateTask, removeTask, setAddingToQuadrant } = tasksSlice.actions
export default tasksSlice.reducer 