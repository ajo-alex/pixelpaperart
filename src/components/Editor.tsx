import { useEffect, useState } from 'react'
import { octokit } from '../lib/github'
import toast from 'react-hot-toast'
import { generatePixelArt } from '../utils/pixartGenerator'

interface Props {
  closeEditor: () => void
}

const Editor = ({ closeEditor }: Props) => {
  const [artValue, setArtValue] = useState<{ id: string, color: string }[]>([])
  const [rows, setRows] = useState(20)
  const [columns, setColumns] = useState(20)
  const [color, setColor] = useState('#000000')
  const [showGrid, setShowGrid] = useState(true)
  const [artTitle, setArtTitle] = useState('')
  const [instaUsername, setInstaUsername] = useState('')

  const getAlphabetLabel = (index: number) => {
    let label = '';
    while (index >= 0) {
      label = String.fromCharCode((index % 26) + 97) + label;
      index = Math.floor(index / 26) - 1;
    }
    return label;
  };

  useEffect(() => {
    const artValue = [];

    for (let i = 0; i < rows; i++) {
      const rowLabel = getAlphabetLabel(i);

      for (let j = 0; j < columns; j++) {
        artValue.push({
          id: `${rowLabel}${j + 1}`, // j+1 for human-friendly numbering
          color: '#ffffff',
        });
      }
    }

    setArtValue(artValue);
  }, [rows, columns]);

  useEffect(() => {
    toast.custom((t) => (
      <div className='flex flex-col gap-2 bg-amber-300 shadow-[4px_4px_0px_rgba(0,0,0,1)] p-2 w-[300px]'>
        - If you experience any issues viewing the editor, please zoom out your browser using Ctrl + - <br />
        - Always use a low-detail image for better results in image generation. <br />
        <button onClick={() => toast.dismiss(t.id)} className='bg-red-500 w-full p-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] cursor-pointer'>Dismiss</button>
      </div>
    ));

  }, [])


  async function addNewArt(body: string) {
    if (!artTitle || !instaUsername) {
      toast.error('Please fill in all the fields')
      return
    }
    try {
      await octokit.rest.issues.create({
        owner: 'ajo-alex',
        repo: 'pixelpaperart',
        title: "🎨 New Art Submission",
        body: `
          ## 🎨 New Pixel Art Submission

          ### 📐 Dimensions
          - **Rows:** ${rows}
          - **Columns:** ${columns}
          - **Insta username:** ${instaUsername}
          - **Art Title:** ${artTitle}

          ### 🧩 Art Data
          \`\`\`json
          ${body}
          \`\`\`

          ---

          ### 📌 Notes
          - Submitted via website
          - Awaiting review

          `,
      });
      toast.success('Art submitted for review')
    } catch (error) {
      toast.error('Failed to publish art')
    }
  }

  return (
    <div className='flex flex-col md:flex-row h-full'>
      <div className='w-[300px] bg-amber-300 flex flex-col justify-between p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)]'>
        <div className=' gap-2'>
          <div>Number of Rows</div>
          <input type="number" value={rows} max={100} min={1} onChange={(e) => { if (Number(e.target.value) <= 100) setRows(Number(e.target.value)) }} className='border w-full border-black p-2' />
          <div>Number of Columns</div>
          <input type="number" value={columns} max={100} min={1} onChange={(e) => { if (Number(e.target.value) <= 100) setColumns(Number(e.target.value)) }} className='border w-full border-black p-2' />
          <div>Selection Color</div>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className='border w-full border-black' />
          <div className='mt-2'>
            Show grid lines: <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} />
          </div>
          <div>
            <input type="file" accept="image/*" className='w-full border border-black mt-2' onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setColumns(50)
                setRows(50)
                generatePixelArt(file, 50).then((pixels) => {
                  setArtValue(pixels)
                })
              }
            }} />
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <div className='border p-2 flex flex-col gap-2' >
            <input type="text" placeholder='Art Title' className='border w-full border-black p-2' value={artTitle} onChange={(e) => setArtTitle(e.target.value)} />
            <input type="text" placeholder='Insta username' className='border w-full border-black p-2' value={instaUsername} onChange={(e) => setInstaUsername(e.target.value)} />
            <button onClick={() => {
              addNewArt(JSON.stringify(artValue))
            }} className='bg-green-500 w-full p-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] cursor-pointer'>Publish</button>
          </div>
          <button onClick={() => {
            setArtValue(artValue.map((art) => ({ ...art, color: '#ffffff' })))
            setColumns(20); setRows(20); toast.success('Editor reset')
          }} className='bg-red-500 w-full p-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] cursor-pointer'>reset</button>

          <button onClick={() => { closeEditor() }} className='bg-gray-500 w-full p-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] cursor-pointer'>Close Editor</button>
        </div>
      </div>
      <div className=' w-full h-full flex justify-center items-center'>
        <div className='flex flex-row flex-wrap  ' style={{ minWidth: `${(columns * 5) + 3}mm`, maxWidth: `${(columns * 5) + 3}mm` }}>
          {artValue?.map((item) => {
            return <div key={item.id} onClick={() => {
              setArtValue(artValue.map((art) => art.id === item.id ? { ...art, color: color } : art))
            }} className={`w-[5mm] h-[5mm] ${showGrid ? 'border' : ''}`} style={{ backgroundColor: item.color }} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Editor