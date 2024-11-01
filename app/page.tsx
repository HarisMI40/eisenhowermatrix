'use client'
// import Image from "next/image";
import { useEffect, useState } from 'react'

import Matrix from '@/app/components/matrix'
import TaskForm from '@/app/components/form'
import { Task } from '@/lib/types'


export default function Home() {

  const [tasks, setTasks] = useState<Task[]>([])

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


  return (
   <>
      <TaskForm
        onTaskAdd={addTask}
      />
      <Matrix tasks={tasks} />
    </>
  );
}
