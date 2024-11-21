import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RootState } from '@/lib/store/store';
import { updateTask } from '@/lib/store/tasksSlice';
import { Task } from '@/lib/types';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Description = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const selectedTask = useSelector((state: RootState) => state.tasks.selectedTask)
  const [inputValue, setInputValue] = useState<string>(selectedTask?.description || "");
  const dispatch = useDispatch();


  const saveInputHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedTask) {
      // Handle the case where selectedTask is null
      console.error("Selected task is null");
      return; // or throw new Error("Selected task is null");
    }

    if (inputValue == "") {
      alert('judul tidak boleh kosong');
      return;
    }

    dispatch(updateTask(({ ...selectedTask, description: inputValue })))

    setIsEdit(false);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Description</h3>
        <ButtonEditOrCancel isEdit={isEdit} setIsEdit={setIsEdit}/>
      </div>

      {
        isEdit === false ?
          <DisplayDescription text={selectedTask?.description}/>
          :
          <FormDescription inputValue={inputValue} setInputValue={setInputValue} eventHandler={saveInputHandler}/>
      }
    </div>
  )
}


const ButtonEditOrCancel = ({isEdit, setIsEdit} : {isEdit : boolean, setIsEdit : (value: React.SetStateAction<boolean>) => void}) => {
  return (
    isEdit ?
      <Button variant="outline" size="sm" onClick={() => {
        setIsEdit(false)
      }}>Cancel</Button>
      :
      <Button variant="outline" size="sm" onClick={() => {
        setIsEdit(true)
      }}>Edit</Button>
  );
}


const DisplayDescription = ({text} : {text: string | undefined}) => {
  return (
    <div className='bg-gray-100 p-3'>
      {text}
    </div>
  );
}


const FormDescription = ({inputValue, setInputValue, eventHandler} : {inputValue : string, setInputValue : React.Dispatch<React.SetStateAction<string>>,  eventHandler : (e: React.FormEvent<HTMLFormElement>) => void})  => {
  return (
    <form onSubmit={eventHandler}>
      <Textarea
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
        className="min-h-[100px] border-black"
      />

      <Button variant={'default'} type="submit" className="my-3">Save</Button>
    </form>
  )
}

export default Description