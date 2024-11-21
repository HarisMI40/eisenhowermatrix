import { Input } from '@/components/ui/input';
import { RootState } from '@/lib/store/store';
import { updateTask } from '@/lib/store/tasksSlice';
import { ListTodo } from 'lucide-react';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const InputText = () => {
  const selectedTask = useSelector((state: RootState) => state.tasks.selectedTask)
  const [inputValue, setInputValue] = useState<string>(selectedTask?.text || "");

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const dispatch = useDispatch();


  const saveInputHandler = () => {
    if (!selectedTask) {
      // Handle the case where selectedTask is null
      console.error("Selected task is null");

      // or throw new Error("Selected task is null");
      return;
    }

    if (inputValue == "") {
      alert('judul tidak boleh kosong');
      return;
    }

    dispatch(updateTask(({ ...selectedTask, text: inputValue })))

    setIsEdit(false);
  }

  const renderInputOrText = () => {
    if (isEdit == false) {
      return (
        <h1 className="text-xl font-semibold w-[700px]"
          onClick={() => {
            setIsEdit(true);
          }}>
          {selectedTask?.text}
        </h1>
      )
    } else {
      return (
        <Input
          autoFocus={true}
          className="w-[700px] text-xl font-semibold"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => saveInputHandler()}
        />
      )
    }
  }


  return (
    <>
      <ListTodo className="h-5 w-5" />
      {renderInputOrText()}
    </>
  )



}



export default InputText