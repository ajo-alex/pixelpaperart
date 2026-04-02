import Navbar from './components/Navbar'
import Spotlight from './components/Spotlight'

const App = () => {
  return (
    <div>
      {/* <Viewer /> */}
      {/* <Editor /> */}
      <Navbar />
      <Spotlight />
      <div className="container mx-auto">
        <input type="text" placeholder='Search art.....' className='p-4 border w-full mt-4' />
        <div className='grid grid-cols-4  gap-4 mt-4'>
        {[1,2,3,4,5,6,7,8,9,10].map((item) => {
          return <div key={item} className='w-full aspect-square bg-amber-300'>
            <img src="https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg" alt="" />
            <div>Iron Man</div>
          </div>
        })}
      </div>
      </div>
      
    </div>
  )
}

export default App