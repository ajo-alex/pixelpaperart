import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Spotlight from './components/Spotlight'
import Viewer from './components/Viewer'
import { db } from './lib/firebase'

const App = () => {
  const [arts, setArts] = useState<{ id: string, name: string, cover: string, code: string }[]>([])
  const [viewData, setViewData] = useState<{ id: string, name: string, cover: string, code: string, rows: number, cols: number } | null>(null)
  useEffect(() => {
    const fetchArts = async () => {
      try {
        const artsRef = collection(db, "art");
        const snapshot = await getDocs(artsRef);

        const artsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setArts(artsData as { id: string, name: string, cover: string, code: string }[]);
      } catch (error) {
        console.error("Error fetching arts:", error);
      }
    };

    fetchArts();
  }, []);

  console.log(viewData)

  console.log(import.meta.env.TEST);
  return (
    <div>


      <Modal isOpen={Boolean(viewData)} onRequestClose={() => {
        setViewData(null)
      }}>
        <Viewer code={viewData?.code || ''} onClose={() => setViewData(null)} rows={viewData?.rows || 0} columns={viewData?.cols || 0} />
      </Modal>
      <Navbar />
      <Spotlight />
      <div className="container mx-auto w-[calc(100%-2rem)] md:w-full overflow-hidden sm:overflow-visible">
        <input type="text" placeholder='Search art.....' className='p-4 border w-full mt-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] outline-0' />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 mb-8'>
          {arts.map((item) => {
            return <div key={item.id} onClick={() => {
              setViewData(item as any)
            }} className='w-full  cursor-pointer bg-amber-300 shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col'>
              <img src={item.cover} alt="" className="w-full object-cover h-[300px]" />
              <div className='p-4 text-2xl font-semibold'>{item.name}</div>
            </div>
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
