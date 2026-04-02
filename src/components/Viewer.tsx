import { useState } from 'react'

const Viewer = ({ code, onClose, rows, columns }: { code: string, onClose: () => void, rows: number, columns: number }) => {
  const [showGrid, setShowGrid] = useState(true)

  return (
    <div className='flex flex-col md:flex-row h-full'>
      <div className='flex flex-col justify-between bg-amber-300 p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] w-[300px] h-full'>
        <div>
          <div>Number of Coloumns: {columns}</div>
          <div>Number of Rows: {rows}</div>
          <div>
            Show grid lines: <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} />
          </div>
        </div>
        <div><button onClick={onClose} className='bg-gray-500 w-full p-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] cursor-pointer'>Close</button></div>
      </div>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='flex flex-row flex-wrap ' style={{ minWidth: `${(columns * 5) + 3}mm`, maxWidth: `${(columns * 5) + 3}mm` }}>
          {code && JSON.parse(code).map((item: { id: string, color: string }) => {
            return <div key={item.id} className={`w-[5mm] h-[5mm]  ${showGrid ? 'border' : ''}`} style={{ backgroundColor: item.color }} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Viewer