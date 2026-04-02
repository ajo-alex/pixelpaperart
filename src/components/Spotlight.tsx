import { useState } from "react"
import Editor from "./Editor"
import Modal from "react-modal"

const Spotlight = () => {
  const [showEditor, setShowEditor] = useState(false)
  return (
    <>
      <Modal isOpen={showEditor} onRequestClose={() => setShowEditor(false)}>
        <Editor closeEditor={() => {
          setShowEditor(false)
        }} />
      </Modal>
      <div className='container mx-auto w-[calc(100%-2rem)] md:w-full mt-8 min-h-[500px] bg-gray-300 shadow-[8px_8px_0px_rgba(0,0,0,1)] p-8 flex flex-col-reverse md:flex-row justify-between items-center gap-8 md:gap-0'>
        <div className="w-full md:w-1/2 text-center md:text-left" >
          <div className='text-3xl lg:text-4xl font-semibold'>Create your own pixel art</div>
          <div className='mt-4'>This is a curated collection of pixel paper art created by artists from around the world. Explore a wide variety of designs and use them as inspiration to create your own pixel art with ease.
          </div>
          <button className='mt-4 bg-amber-400 p-4 shadow-[8px_8px_0px_rgba(0,0,0,1)] cursor-pointer' onClick={() => setShowEditor(true)}>Create your own pixel art</button>
        </div>
        <div className='w-full md:w-1/2 flex justify-center md:justify-end'>
          <img src="https://i.ibb.co/RG8Dfsgp/Gemini-Generated-Image-fk6s60fk6s60fk6s.png" className="shadow-[8px_8px_0px_rgba(0,0,0,1)] max-h-[300px] md:max-h-none object-contain" alt="Pixel Art" />
        </div>
      </div></>
  )
}

export default Spotlight