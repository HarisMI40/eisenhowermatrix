'use client'
// import Image from "next/image";
import { useEffect, useState } from 'react'

import Matrix from '@/app/components/matrix'
import TaskForm from '@/app/components/form'
import { Task } from '@/lib/types'


export default function Home() {

  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  useEffect(() => {
    const dataTodo = localStorage.getItem("todoList");
    if(dataTodo){
      setTasks(JSON.parse(dataTodo));
    }
  }, []);

  const addTask = (task: Omit<Task, 'id'>) => {
      const newData = [...tasks,  { ...task, id: Date.now() }];
      setTasks(newData)
      localStorage.setItem("todoList", JSON.stringify(newData));
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
    setEditingTask(null)
  }

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }


  return (
   <>
      {/* <TaskForm
        onTaskAdd={addTask}
      /> */}
      <Matrix tasks={tasks} updateTask={updateTask} removeTask={removeTask} />
    </>
  );
}
