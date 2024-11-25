import { differenceInDays } from 'date-fns';
import React from 'react'

const RemainingDay = ({startDate} : {startDate : string}) => {


  const showRemainingDay = (startDate: string) => {
    const remainingDay = differenceInDays(startDate, new Date());
    let bgColor = "";

    if (remainingDay > 4) {
      bgColor = "bg-green-500";
    }
    else if (remainingDay > 0 && remainingDay < 4 ) {
      bgColor = "bg-orange-500";
    }
    else {
      bgColor = "bg-red-500";
    }

    return (
      <span className={`text-xs px-1 ml-2 font-semibold ${bgColor} rounded`}>
        {`${remainingDay} days remaining`}
      </span>
    );
  };

  return (
    showRemainingDay(startDate)
  )
}

export default RemainingDay