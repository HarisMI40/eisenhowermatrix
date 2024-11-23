

import { itemList } from '@/lib/types';

import React from 'react'
import ListItem from './ListItem';

const Lists = ({ taskId, id : checklistId, list }: { taskId: number, id: string, list: itemList[] }) => {

  return (
    list.map((item) => (
      <ListItem key={item.id} taskId={taskId} checklistId={checklistId} itemId={item.id} text={item.text} checked={item.checked}/>
    ))
  )
}

export default Lists;