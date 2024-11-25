import { Button } from '@/components/ui/button'
import React from 'react'
import ListNumber from './ListNumber'
import { itemList } from '@/lib/types'
import { useDispatch } from 'react-redux'
import { removeCheckList } from '@/lib/store/tasksSlice'

const HeaderCheckList = ({ taskId, checkListId, title, item }: { taskId: number, checkListId: string, title: string, item: itemList[] }) => {

  const dispatch = useDispatch();

  const removeCheckListHandler = (checklistId: string) => {
    if (!taskId) {
      return;
    }
    dispatch(removeCheckList({ taskId, checklistId }));
  }


  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{title}</h3>
        <Button variant="outline" size="sm" onClick={() => removeCheckListHandler(checkListId)}>Delete</Button>
      </div>
      <div className='text-xs'>
        <ListNumber item={item} />
      </div>
    </>
  )
}

export default HeaderCheckList