import { itemList } from '@/lib/types'
import { SquareCheckBig } from 'lucide-react';
import React from 'react'

// const ListNumber = ({checkList} : {checklist : ChecklistItem[]}) => {
const ListNumber = ({item} : {item : itemList[]}) => {
  const ItemCompleted = item.reduce( (acc, value) => value.checked ? acc + 1 : acc, 0);
  return (
    <div className="flex gap-2 items-center mb-4">
      <SquareCheckBig size={16} />
      <div>
        {ItemCompleted} / {item.length}
      </div>
    </div>
  )
}

export default ListNumber