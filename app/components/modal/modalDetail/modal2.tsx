import { useSelector, useDispatch } from 'react-redux'
import { setSelectedTask, addList } from '@/lib/store/tasksSlice'
import { RootState } from '@/lib/store/store'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useState } from 'react'

import { ListTodo, Tag } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import InputText from './components/InputText'
import Description from './components/Description'
import Cheklists from './components/Checklist/Cheklists'
import Dates from './components/Dates'
import DueDateDisplay from './components/DateDisplay'

const Modal = () => {

  const dispatch = useDispatch()
  const selectedTask = useSelector((state: RootState) => state.tasks.selectedTask)


  const handleClose = () => {
    dispatch(setSelectedTask(null))
  }


  const addListHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(addList(titleList));
    setTitleList("");
  }


  const [titleList, setTitleList] = useState("");




  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
                {/* Due Date */}
                <DueDateDisplay />

                {/* Description */}
                <Description />

                {/* Detail */}
                <Cheklists />


              </div>
            </div>

            {/* Sidebar */}
            <div className="w-64 border-l p-4 space-y-4 overflow-y-auto">
              <Button variant="secondary" className="w-full justify-start gap-2">
                <Tag className="h-4 w-4" />
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

              <Dates />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Modal