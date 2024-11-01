'use client'
// import Image from "next/image";
import { useEffect, useRef, useState } from 'react'

import Matrix from '@/app/components/matrix'
import { Quadrant, Task } from '@/lib/types'


export default function Home() {

  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [addingToQuadrant, setAddingToQuadrant] = useState<Quadrant | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)


  useEffect(() => {
    const dataTodo = localStorage.getItem("todoList");
    if(dataTodo){
      setTasks(JSON.parse(dataTodo));
    }
  }, []);

  useEffect(() => {
    if (addingToQuadrant && inputRef.current) {
      inputRef.current.focus()
    }
  }, [addingToQuadrant])



  const addTask = (text: string, quadrant: Quadrant) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      urgency: quadrant.urgency,
      importance: quadrant.importance
    }
    setTasks([...tasks, newTask])
    setAddingToQuadrant(null)

    localStorage.setItem("todoList", JSON.stringify([...tasks, newTask]));
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
    setEditingTask(null)
  }

  const removeTask = (id: number) => {
    const newData = tasks.filter(task => task.id !== id)
    setTasks(newData)
    localStorage.setItem("todoList", JSON.stringify(newData));
  }


  return (
   <>
      <Matrix tasks={tasks} updateTask={updateTask} removeTask={removeTask} addTask={addTask} addingToQuadrant={addingToQuadrant} setAddingToQuadrant={setAddingToQuadrant} inputRef={inputRef} />
    </>
  );
}
