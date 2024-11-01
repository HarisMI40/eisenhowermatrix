const MatrixHeaders = () => {
  return (
    <>
      {/* Column Headers */}
      <div className="grid grid-cols-2 text-center mb-4">
        <div className="font-semibold">Urgent</div>
        <div className="font-semibold">Not Urgent</div>
      </div>
      
      {/* Row Labels */}
      <div className="absolute -left-24 top-1/4 -rotate-90 font-semibold">
        Important
      </div>
      <div className="absolute -left-24 top-3/4 -rotate-90 font-semibold">
        Not Important
      </div>
    </>
  )
}

export default MatrixHeaders 