import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '@/lib/store/tasksSlice'
import Page from '@/app/page'
import { act } from 'react'
import { Task } from '@/lib/types'

// Create a test store with initial state
const createTestStore = (initialTasks: Task[] = []) => {
  return configureStore({
    reducer: {
      tasks: tasksReducer
    },
    preloadedState: {
      tasks: {
        tasks: initialTasks,
        addingToQuadrant: null,
        selectedTask: null
      }
    }
  })
}

describe("Page Root Component", () => {
  test('renders a heading', () => {
    render(<Page />)
    const heading = screen.getByText(/The Eisenhower Matrix/i)
    expect(heading).toBeInTheDocument()
  })

  test('shows input when Add Task button is clicked', async () => {
    render(<Page />)
    
    // Find and click the first Add Task button
    const addButtons = screen.getAllByRole('button', { name: /Add a task/i })
    await act(async () => {
      addButtons[0].click()
    })

    // Check if the input field appears
    const inputField = screen.getByPlaceholderText("Enter a new task")
    expect(inputField).toBeInTheDocument()
  })

  // test('shows modal with task text when list item is clicked', async () => {
  //   // Create store with a sample task
  //   const testTask: Task = {
  //     id: 1,
  //     text: "Test Task",
  //     urgency: "urgent",
  //     importance: "important",
  //     // quadrant: "do",
  //     // createdAt: new Date().toISOString()
  //   }
  //   const store = createTestStore([testTask])

  //   // Render with Redux Provider
  //   render(
  //     <Provider store={store}>
  //       <Page />
  //     </Provider>
  //   )
    
  //   // Instead of looking for a listitem with a name, just find the text content
  //   const taskItem = screen.getByText("Test Task")
    
  //   await act(async () => {
  //     taskItem.click()
  //   })

  //   // Check if modal input appears with correct value
  //   const modalInput = screen.getByRole('textbox')
  //   expect(modalInput).toBeInTheDocument()
  //   expect(modalInput).toHaveValue("Test Task")
  // })
});