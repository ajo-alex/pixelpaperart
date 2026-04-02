import { artValue } from './data'

const Viewer = () => {
  
  return (
    <div>
        <div className='flex flex-row w-[88mm] flex-wrap '>
            {artValue.map((item) => {
            return <div key={item.id} className='w-[5mm] h-[5mm] border border-px' style={{ backgroundColor: item.color }} />
        })}
        </div>
    </div>
  )
}

export default Viewer