import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '@/app/page'
import { act } from 'react'

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
});