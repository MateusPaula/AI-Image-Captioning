import { useEffect, useRef, useState } from "react";
import { convertToAudio, generateCaption, translate } from "../models/api";
import { History } from "./history";

export function CaptionerCard() {
  const [imgSrc, setImgSrc] = useState(null);
  const [caption, setCaption] = useState("<Caption>");
  const [captionPTBR, setCaptionPTBR] = useState("<Legenda>");
  const [audioSrc, setAudioSrc] = useState(null);

  const captionAudio = useRef();

  async function addCaption() {
    setCaption("Gerando legenda...");
    const caption = await generateCaption(imgSrc);
    setCaption(caption[0].generated_text);

    setCaptionPTBR("Traduzindo legenda...");
    const captionPTBR = await translate(caption);
    setCaptionPTBR(captionPTBR[0].translation_text);

    const audioEnpoint = await convertToAudio(captionPTBR);
    const audioSrc = "http://localhost:5001/" + audioEnpoint[0].url;
    setAudioSrc(audioSrc);
  }

  useEffect(() => {
    if (captionAudio.current && audioSrc) {
      captionAudio.current.pause();
      captionAudio.current.load();
      captionAudio.current.play();
    }
  }, [audioSrc]);

  return (
    <div className="flex flex-col items-center bg-white w-[900px] h-[700px] p-6 border border-gray-200 rounded-2xl gap-2 shadow-xl">
      <h1 className="text-4xl font-bold mb-12 mt-6">
        AI Translator & Narrator
      </h1>
      <div className="flex flex-row gap-6">
        <div className="flex flex-col justify-start items-center border border-gray-200 rounded-xl p-6 max-h-[500px]">
          <div>
            <div className="flex flex-row gap-4">
              <input className="p-2 border border-gray-300 rounded-lg" onChange={(e) => setImgSrc(e.target.value)} placeholder="Enter text or paste a URL"></input>
              <button
                className="bg-blue-400 hover:bg-blue-800 p-2 rounded-xl w-full text-white"
                onClick={addCaption}
              >
                Generate
              </button>
            </div>
            <div className="pt-4">
              <span className="text-lg font-bold">Result:</span>
            </div>
            <div className="flex flex-col w-full justify-center gap-2">
              <img src={imgSrc} className="h-[100px]"></img>
              <div className="flex flex-col">
                <span>Original(EN):</span>
                <span className="text-gray-600">{caption}</span>
              </div>
              <div className="flex flex-col">
                <span>Translation (PT):</span>
                <span className="text-gray-600">{captionPTBR}</span>
              </div>
              <audio controls ref={captionAudio}>
                <source src={audioSrc}></source>
              </audio>
            </div>
          </div>
        </div>
        <History />
      </div>
    </div>
  );
}
