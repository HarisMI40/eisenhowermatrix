import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { checkedListItem, removeListItem } from '@/lib/store/tasksSlice';

const ListItem = ({taskId, checklistId, itemId, text , checked} : {taskId : number, checklistId : string, itemId : string, text : string, checked : boolean}) => {

  const dispatch = useDispatch();

  const checkedListItemHandler = (checked: boolean) => {
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
    <div className='flex justify-between' key={itemId}>

    <div key={itemId} className="flex items-center space-x-2">
      <Checkbox
        checked={checked}
        onCheckedChange={(checked: boolean) => {
          checkedListItemHandler(checked)
        }}
      />
      <label className={`text-sm ${checked ? "line-through" : null}`}>{text}</label>
    </div>

    <X className='hover:text-red-500 hover:cursor-pointer' onClick={() => deleteListItemHandler(itemId)}/>
  </div>
  )
}

export default ListItem