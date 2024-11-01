import React, { useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/lib/store/store'
import { addTask, setAddingToQuadrant } from '@/lib/store/tasksSlice'

type FormProps = {
  urgency: 'urgent' | 'not-urgent'
  importance: 'important' | 'not-important'
}

const index = ({ urgency, importance }: FormProps) => {
  const dispatch = useDispatch()
  const addingToQuadrant = useSelector((state: RootState) => state.tasks.addingToQuadrant)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const handleAddTask = (text: string) => {
    const newTask = {
      id: Date.now(),
      text,
      urgency,
      importance
    }
    dispatch(addTask(newTask))
    dispatch(setAddingToQuadrant(null))
  }
  return (
    <>
    {addingToQuadrant?.urgency === urgency && addingToQuadrant?.importance === importance ? (
      <form className="mt-4" onSubmit={(e) => {
        e.preventDefault()
        const input = e.currentTarget.elements.namedItem('newTask') as HTMLInputElement
        if (input.value.trim()) {
          handleAddTask(input.value.trim())
        }
      }}>
        <Input
          ref={inputRef}
          name="newTask"
          placeholder="Enter a new task"
          className="w-full focus-visible:ring-offset-0 focus-visible:ring-offset-transparent"
          onBlur={() => dispatch(setAddingToQuadrant(null))}
        />
      </form>
    ) : (
      <Button 
        variant="ghost" 
        className="w-full justify-start mt-4" 
        onClick={() => dispatch(setAddingToQuadrant({ urgency, importance}))}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a task
      </Button>
    )}
    </>
  )
}

export default index