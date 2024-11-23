import React, { KeyboardEvent, useRef, useState } from 'react'
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { addListItem } from '@/lib/store/tasksSlice';

type propsType = {
  taskId : number;
  checklistId : string
}

const FormChecklist = ({taskId, checklistId} : propsType) => {
  const [isAddingItem, setIsAddingItem] = useState("");
  const [newItemText, setNewItemText] = useState('');
  const dispatch = useDispatch();

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter') {
      handleAddItem(id);
    }
  }

  const handleAddItem = (id: string) => {
    if(!taskId){
      console.error("task id is null");
      return;
    }


    if (newItemText.trim()) {

      dispatch(
        addListItem(
          {
            taskId : taskId,
            checkListId : id,
            newItem : newItemText
          }
        )
      );

      setNewItemText('')
      setIsAddingItem("")
    }
  }

  return (
    isAddingItem == checklistId ? (
      <form className="flex items-center space-x-2">
        <Input
        autoFocus={true}
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, checklistId)}
          placeholder="Enter new item"
          className="flex-grow"
        />
        <Button size="sm" onClick={() => handleAddItem(checklistId)}>Add</Button>
        <Button size="sm" variant="ghost" onClick={() => setIsAddingItem("")}>Cancel</Button>
      </form>
    ) : (
      <Button variant="ghost" size="sm" className="gap-2" onClick={() => setIsAddingItem(checklistId)}>
        <Plus className="h-4 w-4" />
        Add an item
      </Button>
    )
  )
}

export default FormChecklist