import { format } from 'date-fns'
import { Clock } from 'lucide-react'
import React from 'react'

const StartDate = ({ startDate }: { startDate: string }) => {
  return (
    startDate && (
    <div className="text-xs text-black px-1 rounded bg-gray-200 w-max flex gap-1 items-center">
      <Clock size={12} /> {format(startDate, "dd MMM yyyy")}
    </div>
    )
  )
}

export default StartDate