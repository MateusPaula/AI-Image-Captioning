import { useState } from 'react';
import './App.css'
import { generateCaption, translate } from './models/api';

function App() {
  const [imgSrc, setImgSrc] = useState(null);
  const [caption, setCaption] = useState("<Caption>")
  const [captionPTBR, setCaptionPTBR] = useState("<Legenda>")

  async function addCaption() {
    setCaption("Gerando legenda...")
    const caption = await generateCaption(imgSrc)
    
    setCaption(caption[0].generated_text)
    
    setCaptionPTBR("Traduzindo legenda...")
    const captionPTBR = await translate(caption);

    setCaptionPTBR(captionPTBR[0].translation_text)
  }
  
  return (
    <>
      <h1>Caption Generator</h1>
      <div className='url-form'>
        <input onChange={(e) => setImgSrc(e.target.value)}></input>
        <button onClick={addCaption}>Generate</button>
      </div>
      <div className='captioned-image'>
        <img src={imgSrc} height={200} ></img>
        <span>{caption}</span>
        <span>{captionPTBR}</span>
      </div>
    </>
  )
}

export default App
