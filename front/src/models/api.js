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

export { generateCaption, translate }