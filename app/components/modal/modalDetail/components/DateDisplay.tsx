import { RootState } from '@/lib/store/store';
import { format } from 'date-fns';
import React from 'react'
import { useSelector } from 'react-redux';

const DateDisplay = () => {
  const selectedTask = useSelector((state: RootState) => state.tasks.selectedTask)

  return (
    <div className='space-y-2'>
      <h3 className="text-sm font-medium">Date</h3>

      <div>
        {selectedTask?.startDate && (
          <div className='bg-gray-200 max-w-max p-2 text-sm rounded'>
            { format(selectedTask.startDate, "dd MMM yyy") } 
            {
              selectedTask?.startTime && (
                ` : ${selectedTask?.startTime}`)
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default DateDisplay