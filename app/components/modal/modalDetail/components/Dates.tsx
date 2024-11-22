import { Button } from '@/components/ui/button'
import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"

import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { useDispatch } from 'react-redux'
import { addStartDate } from '@/lib/store/tasksSlice'
import { useState } from 'react'

const Dates = () => {

  const [date, setDate] = React.useState<Date>(new Date())
  const [time, setTime] = React.useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const dispatch = useDispatch();

  const saveDateHandler = () => {
    if (!date) {
      return;
    }
    const formatDate = format(date, "yyyy-MM-dd");

    // console.log(formatDate)
    
    dispatch(addStartDate({date:formatDate, time}));
    setIsPopoverOpen(false);
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="w-full justify-start gap-2" onClick={() => setIsPopoverOpen(true)}>
          <CalendarIcon className="h-4 w-4" />
          Dates
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(value) => value ? setDate(value) : null}
          initialFocus
        />


        <div className="px-2 mt-7">
          <div className="flex flex-col gap-3 mb-5">
            <Label>Due Date</Label>
            <div className="flex gap-3">
              <Input className="w-[120px] rounded-none bg-gray-300" value={ date ? format(date, "d MMM yyyy") : ""} disabled={true}/>
              <Input className="w-[100px]  rounded-none" value={time} type='time' onChange={(e) => setTime(e.target.value)}/>
            </div>
          </div>
          <Button variant={'default'} className='bg-blue-600 w-full' onClick={saveDateHandler}>Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}


// const DatesRange = () => {
//   // return (
//   //   <Button variant="secondary" className="w-full justify-start gap-2">
//   //     <Calendar className="h-4 w-4" />
//   //     Dates
//   //   </Button>
//   // )

//   const [date, setDate] = React.useState<DateRange>({
//     from: new Date(2022, 0, 20),
//     to: addDays(new Date(2022, 0, 20), 20),
//   })

//   // const [date, setDate] = React.useState<Date>(new Date())


//   return (
//     <div className={cn("grid gap-2")}>
//      <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             id="date"
//             variant={"outline"}
//             className={cn(
//               "w-[300px] justify-start text-left font-normal",
//               !date && "text-muted-foreground"
//             )}
//           >
//             <CalendarIcon />
//             {date?.from ? (
//               date.to ? (
//                 <>
//                   {format(date.from, "LLL dd, y")} -{" "}
//                   {format(date.to, "LLL dd, y")}
//                 </>
//               ) : (
//                 format(date.from, "LLL dd, y")
//               )
//             ) : (
//               <span>Pick a date</span>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0" align="start">
//           <Calendar
//             initialFocus
//             mode="range"
//             defaultMonth={date?.from}
//             selected={date}
//             onSelect={(range) => range ? setDate(range) : null}
//             // numberOfMonths={2}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   )
// }

export default Dates