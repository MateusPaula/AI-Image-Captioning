import ImageCaptioner from "./ImageCaptioner";

async function generateCaption(imgSrc) {
  return ImageCaptioner.generateCaption(imgSrc);
}

async function translate(captionENG) {
  return fetch("http://localhost:3000/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"text": captionENG[0].generated_text})
  }).then(
    resp => resp.json()
  );
}

async function convertToAudio(captionPTBR) {
  return fetch("http://localhost:5001/text_to_audio", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"text": captionPTBR[0].translation_text})
  }).then(
    resp => resp.json()
  );
}

export { generateCaption, translate, convertToAudio }