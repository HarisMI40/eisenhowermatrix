import { Checkbox } from '@/components/ui/checkbox'
import { checkedListItem } from '@/lib/store/listSlice';
import { itemList } from '@/lib/types';
import React from 'react'
import { useDispatch } from 'react-redux';

const Lists = ({id, list} : { id:string,  list : itemList[]}) => {
  const dispatch = useDispatch();

  const checkedListItemHandler = (checklistId: string, itemId: string, checked: string | boolean) => {
    dispatch(
      checkedListItem({
        checklistId,
        itemId,
        checked
      })
    );
  }

  return (
    list.map((item) => (
      <div key={item.id} className="flex items-center space-x-2">
        <Checkbox
          checked={item.checked}
          onCheckedChange={(checked) => {
            checkedListItemHandler(id, item.id, checked)
          }}
        />
        <label className={`text-sm ${item.checked ? "line-through" : null}`}>{item.text}</label>
      </div>
    ))
  )
}

export default Lists;