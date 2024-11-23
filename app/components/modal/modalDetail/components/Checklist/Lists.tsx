import { Checkbox } from '@/components/ui/checkbox'
import { checkedListItem, removeCheckList, removeListItem } from '@/lib/store/tasksSlice';
import { itemList } from '@/lib/types';
import { X } from 'lucide-react';
import React from 'react'
import { useDispatch } from 'react-redux';

const Lists = ({ taskId, id : checklistId, list }: { taskId: number, id: string, list: itemList[] }) => {
  const dispatch = useDispatch();

  const checkedListItemHandler = (itemId: string, checked: boolean) => {
    dispatch(
      checkedListItem({
        taskId,
        checklistId,
        itemId,
        checked
      })
    );
  }

  const deleteListItemHandler = (itemId : string) => {
    dispatch(removeListItem({
      taskId,
      checklistId,
      itemId
    }));
  }

  return (
    list.map((item) => (
      <div className='flex justify-between' key={item.id}>

        <div key={item.id} className="flex items-center space-x-2">
          <Checkbox
            checked={item.checked}
            onCheckedChange={(checked: boolean) => {
              checkedListItemHandler(item.id, checked)
            }}
          />
          <label className={`text-sm ${item.checked ? "line-through" : null}`}>{item.text}</label>
        </div>

        <X className='hover:text-red-500 hover:cursor-pointer' onClick={() => deleteListItemHandler(item.id)}/>
      </div>
    ))
  )
}

export default Lists;