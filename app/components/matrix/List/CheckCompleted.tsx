import { ChecklistItem } from '@/lib/types'
import { SquareCheck } from 'lucide-react'
import React from 'react'

const CheckCompleted = ({item} : {item : ChecklistItem[]}) => {
  const totalList = item.reduce( (acc, list) => list.item ? acc + list.item.length : acc , 0);

  const totalListCompleted = item.reduce((acc, list) => 
    list.item ? acc + list.item.filter(i => i.checked).length : acc, 0);


  return (
    totalList != 0 && (
      <div className='flex gap-1 text-xs items-center'>
        <SquareCheck size={16} /> {totalListCompleted} / {totalList} 
      </div>
    )
  )
}

export default CheckCompleted