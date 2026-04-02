import { useEffect, useState } from 'react'

const Editor = () => {
  const [artValue, setArtValue] = useState<{id: string, color: string}[]>([])
  const [rows, setRows] = useState(25)
  const [columns, setColumns] = useState(17)
  const [color, setColor] = useState('#000000')

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
  
  return (
    <div>
      <div className='flex flex-row gap-2'>
        <div>Rows</div>
        <input type="number" value={rows} onChange={(e) => setRows(Number(e.target.value))} />
        <div>Columns</div>
        <input type="number" value={columns} onChange={(e) => setColumns(Number(e.target.value))} />
        <div>Color</div>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <div className='flex flex-row flex-wrap  ' style={{width: `${(columns*5)+3}mm`}}>
        {artValue?.map((item) => {
          return <div key={item.id} onClick={()=>{
            // change the color of item into red
            setArtValue(artValue.map((art) => art.id === item.id ? { ...art, color: color } : art))
          }} className='w-[5mm] h-[5mm] border' style={{ backgroundColor: item.color }} />
        })}
      </div>
      <div>
        <button onClick={() => setArtValue(artValue.map((art) => ({ ...art, color: '#ffffff' }))) }>reset</button>
        <button onClick={() => {navigator.clipboard.writeText(JSON.stringify(artValue)); alert('code copied')}}>copy code</button>
      </div>
    </div>
  )
}

export default Editor