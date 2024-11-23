import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RootState } from '@/lib/store/store';
import { Plus } from 'lucide-react';
import React, { KeyboardEvent, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Lists from './Lists';
import { addListItem, removeCheckList } from '@/lib/store/tasksSlice';

const Cheklists = () => {
  const selectedTask = useSelector((state:RootState) => state.tasks.selectedTask);
  const [isAddingItem, setIsAddingItem] = useState("");
  const inputListRef = useRef<HTMLInputElement>(null);
  const [newItemText, setNewItemText] = useState('')
  const dispatch = useDispatch();


  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter') {
      handleAddItem(id);
    }
  }

  const handleAddItem = (id: string) => {
    if(!selectedTask){
      console.error("selectedTask is null");
      return;
    }


    if (newItemText.trim()) {

      dispatch(
        addListItem(
          {
            taskId : selectedTask?.id,
            checkListId : id,
            newItem : newItemText
          }
        )
      );

      setNewItemText('')
      setIsAddingItem("")
    }
  }

    const removeCheckListHandler = (checklistId : string) => {
      if(!selectedTask?.id){
        return;
      }
      dispatch(removeCheckList({taskId :selectedTask?.id, checklistId}));
    }


  return (
    selectedTask?.checkList.map(checklist => (
      <div className="space-y-2" key={checklist.id}>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">{checklist.title}</h3>
          <Button variant="outline" size="sm" onClick={() => removeCheckListHandler(checklist.id)}>Delete</Button>
        </div>
        <div className="space-y-2">
          <Lists taskId={selectedTask?.id}  id={checklist.id} list={checklist.item}/>

          
          {isAddingItem == checklist.id ? (
            <form className="flex items-center space-x-2">
              <Input
                ref={inputListRef}
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, checklist.id)}
                placeholder="Enter new item"
                className="flex-grow"
              />
              <Button size="sm" onClick={() => handleAddItem(checklist.id)}>Add</Button>
              <Button size="sm" variant="ghost" onClick={() => {
                setIsAddingItem("");
              }
              }>Cancel</Button>
            </form>
          ) : (
            <Button variant="ghost" size="sm" className="gap-2" onClick={() => {
              setIsAddingItem(checklist.id);
              inputListRef.current?.focus();
            }}>
              <Plus className="h-4 w-4" />
              Add an item
            </Button>
          )}
        </div>
      </div>
    ))
  )
}

export default Cheklists