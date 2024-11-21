import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task, Quadrant, ChecklistItem } from '@/lib/types'
import { generateRandomId } from '../utils'

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

    addList: (state, action: PayloadAction<string>) => {
      const newCheckList: ChecklistItem = {
        "id": generateRandomId(8),
        "title": action.payload,
        "item": []
      };

      // add new checklist to task
      const newTask = state.tasks.map(task => {
        if(task.id == state.selectedTask?.id){
          const updateChecklist = {
            ...task,
            checkList : [...task.checkList, newCheckList]
          }; 

          // update selectedTask
          state.selectedTask = updateChecklist;

          // if task is selected task, then update task : add new checklist
          return updateChecklist;
        }

        return {...task};
      });

      state.tasks = newTask;

      localStorage.setItem("todoList", JSON.stringify(newTask))
    },




    addListItem: (state, action: PayloadAction<{ taskId: number, checkListId : string , newItem: string }>) => {
      console.log("membuat List item")
      const newItem = {
        id: Date.now().toString(),
        text: action.payload.newItem.trim(),
        checked: false
      }


      const updateTasks = state.tasks.map((task) => {
        if (task.id == action.payload.taskId) {

          const updateTaskSelected = {
            ...task,
            checkList : task.checkList.map(checkList => {
              if(checkList.id == action.payload.checkListId){
                return{
                  ...checkList,
                  item : [...checkList.item, newItem]
                }
              }

              return checkList;
            })
          }

          state.selectedTask = updateTaskSelected;

          return updateTaskSelected;
        }

        return task;
      });

      state.tasks = updateTasks;

      localStorage.setItem("todoList", JSON.stringify(updateTasks))
    }
  }
})

export const { setTasks, addTask, updateTask, removeTask, setAddingToQuadrant, setSelectedTask, moveTask, addList, addListItem } = tasksSlice.actions
export default tasksSlice.reducer 