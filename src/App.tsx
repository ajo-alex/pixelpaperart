import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Spotlight from './components/Spotlight'

const App = () => {
  return (
    <div>
      {/* <Viewer /> */}
      {/* <Editor /> */}
      <Navbar />
      <Spotlight />
      <div className="container mx-auto w-[calc(100%-2rem)] md:w-full overflow-hidden sm:overflow-visible">
        <input type="text" placeholder='Search art.....' className='p-4 border w-full mt-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] outline-0' />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 mb-8'>
        {[1,2,3,4,5,6,7,8,9,10].map((item) => {
          return <div key={item} className='w-full cursor-pointer bg-amber-300 shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col'>
            <img src="https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg" alt="" className="w-full object-cover" />
            <div className='p-4 text-2xl font-semibold'>Iron Man</div>
          </div>
        })}
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default App