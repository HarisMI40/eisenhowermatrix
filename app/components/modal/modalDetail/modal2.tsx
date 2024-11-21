import { useSelector, useDispatch } from 'react-redux'
import { setSelectedTask, updateTask, removeTask } from '@/lib/store/tasksSlice'
import { RootState } from '@/lib/store/store'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useState, useEffect, KeyboardEvent, FormEventHandler, useRef, useActionState } from 'react'
import { Textarea } from '@/components/ui/textarea'
// import { Label } from '@radix-ui/react-label'
import { ChecklistItem, Task } from '@/lib/types'
import { Calendar, Plus, ListTodo } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import InputText from './components/InputText'


type isEdit = {
  text: boolean,
  description: boolean,
}

type inputValue = {
  text: string,
  description: string
}

const Modal = () => {
  const initialTask: Task = {
    id: 0,
    createdAt: '',
    text: '',
    urgency: 'urgent',
    importance: 'important',
    description: '',
    startDate: '',
    dueDate: '',
    completed: false,
    category: '',
    checkList: []
  }


  const dispatch = useDispatch()
  const selectedTask = useSelector((state: RootState) => state.tasks.selectedTask)
  const [task, setTask] = useState(initialTask)

  useEffect(() => {
    if (selectedTask) {
      setTask({
        ...selectedTask
      })
    }
  }, [selectedTask])

  const handleClose = () => {
    dispatch(setSelectedTask(null))
    setTask(initialTask)
  }

  const handleUpdate = () => {
    console.log(task)
    if (selectedTask && task.text.trim()) {
      dispatch(updateTask({
        id: selectedTask.id,
        createdAt: selectedTask.createdAt,
        text: task.text.trim(),
        urgency: task.urgency,
        importance: task.importance,
        description: task.description,
        startDate: task.startDate,
        dueDate: task.dueDate,
        completed: task.completed,
        category: task.category,
        checkList: []
      }))
      handleClose()
    }
  }

  const [checklist, setChecklist] = useState<ChecklistItem[]>([])

  const [isAddingItem, setIsAddingItem] = useState("")
  const [newItemText, setNewItemText] = useState('')

  const handleAddItem = (id: string) => {
    if (newItemText.trim()) {
      const newItem = {
        id: Date.now().toString(),
        text: newItemText.trim(),
        checked: false
      }

      const newCheckList = checklist.map((check) => {
        if (check.id == id) {
          return {
            ...check,
            "item": [...check.item, newItem]
          }
        }

        return { ...check }
      });

      setChecklist(newCheckList)
      setNewItemText('')
      setIsAddingItem("")
    }
  }


  const handleCheckedItem = (checklistId: string, itemId: string, checked: string | boolean) => {
    const updateChecklist = checklist.map((listCheck) => {
      if (listCheck.id == checklistId) {

        return {
          ...listCheck,
          item: listCheck.item.map(item => item.id === itemId ? { ...item, checked: !!checked } : item)
        }

      } else {
        return listCheck;
      }


    }
    );

    setChecklist(updateChecklist);
  }


  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter') {
      handleAddItem(id);
      console.log(id);
    }
  }

  const deleteListHandler = (id: string) => {
    const checklistUpdate = checklist.filter(checklist => checklist.id !== id);
    setChecklist(checklistUpdate);
  }

  const generateRandomId = (length: number) => {
    return Math.random().toString(36).slice(2, 2 + length);
  }

  const addListHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCheckList: ChecklistItem[] = [
      ...checklist,
      {
        "id": generateRandomId(8),
        "title": titleList,
        "item": []
      }
    ];

    setChecklist(newCheckList);
    setTitleList("");

  }


  // const [inputList, setInputList] = useState("");
  const [titleList, setTitleList] = useState("");


  const inputListRef = useRef<HTMLInputElement>(null);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // const [isEditDescriptionModal, setIsEditDescriptionModal] = useState(false);
  const [isEdit, setIsEdit] = useState<isEdit>({
    text: false,
    description: false
  });

  const [input, setInput] = useState<inputValue>({
    text: "",
    description: ""
  })

  const saveDescriptionHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log(selectedTask)
    // save to LocalStorage
    // dispatch(updateTask(({ ...selectedTask, description: inputDescription }))) 

    if (!selectedTask) {
      // Handle the case where selectedTask is null
      console.error("Selected task is null");
      return; // or throw new Error("Selected task is null");
    }

    const newUpdateTask: Task = {
      ...selectedTask,
      description: input.description
    }

    dispatch(updateTask((newUpdateTask)))

    setTask(newUpdateTask);
    setInput({ text: "", description: "" })

    setIsEdit({ ...isEdit, description: false });
  }



  if (!selectedTask) return null

  return (
    <Dialog open={!!selectedTask} onOpenChange={() => handleClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden" aria-describedby="dialog-description">
        <DialogDescription className='hidden'>
          Description of what this dialog does
        </DialogDescription>
        {/* <DialogHeader> */}
        <DialogTitle className="my-4 hidden">
        </DialogTitle>
        {/* </DialogHeader>  */}
        <div className="flex flex-col h-[90vh]">

          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <InputText />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Main Content */}
            <div className="flex-1 p-4">
              <div className="space-y-6">

                {/* Description */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Description</h3>
                    {isEdit.description ?
                      <Button variant="outline" size="sm" onClick={() => {
                        setInput({ ...input, description: "" })
                        setIsEdit({ ...isEdit, description: false })
                      }}>Cancel</Button>
                      :
                      <Button variant="outline" size="sm" onClick={() => {
                        setInput({ ...input, description: task.description })
                        setIsEdit({ ...isEdit, description: true })
                      }}>Edit</Button>
                    }
                  </div>

                  {isEdit.description
                    ?
                    <form onSubmit={saveDescriptionHandler}>

                      <Textarea
                        value={input.description}
                        // onChange={(e) => dispatch(updateTask(({ ...selectedTask, description: e.target.value })))   }
                        onChange={(e) => setInput({ ...input, description: e.target.value })}
                        className="min-h-[100px] border-black"
                      />

                      <Button variant={'default'} type="submit" className="my-3">Save</Button>
                    </form>
                    :
                    <div className='bg-gray-100 p-3'>
                      {task.description}
                    </div>
                  }
                </div>

                {/* Detail */}
                {checklist.map(checklist => (
                  <div className="space-y-2" key={checklist.id}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">{checklist.title}</h3>
                      <Button variant="outline" size="sm" onClick={() => deleteListHandler(checklist.id)}>Delete</Button>
                    </div>
                    <div className="space-y-2">
                      {checklist.item.map((item) => (
                        <div key={item.id} className="flex items-center space-x-2">
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={(checked) => {
                              handleCheckedItem(checklist.id, item.id, checked)
                            }}
                          />
                          <label className={`text-sm ${item.checked ? "line-through" : null}`}>{item.text}</label>
                        </div>
                      ))}
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
                          <Button size="sm" onClick={(e) => handleAddItem(checklist.id)}>Add</Button>
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
                ))}


              </div>
            </div>

            {/* Sidebar */}
            <div className="w-64 border-l p-4 space-y-4 overflow-y-auto">
              <Button variant="secondary" className="w-full justify-start gap-2">
                {/* <Tag className="h-4 w-4" /> */}
                Labels
              </Button>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="secondary" className="w-full justify-start gap-2" onClick={() => setIsPopoverOpen(true)}>
                    <ListTodo className="h-4 w-4" />
                    Checklist
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    addListHandler(e);
                    setIsPopoverOpen(false);
                  }}>
                    <h1 className="text-lg my-2">Add List</h1>
                    <Input
                      value={titleList}
                      onChange={(e) => setTitleList(e.target.value)}
                      placeholder="Enter new List"
                      className="flex-grow"
                    />
                    <Button variant={'default'} className="my-3" type='submit'>Add</Button>
                  </form>
                </PopoverContent>
              </Popover>

              <Button variant="secondary" className="w-full justify-start gap-2">
                <Calendar className="h-4 w-4" />
                Dates
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Modal