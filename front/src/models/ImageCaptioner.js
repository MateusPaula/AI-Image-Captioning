import { pipeline } from "@huggingface/transformers"

export default class ImageCaptioner {
  static captioner = null

  static async getCaptioner() {
    if (!this.captioner) {
      this.captioner = await pipeline("image-to-text", "Xenova/vit-gpt2-image-captioning", {
        dtype: "q8",
        do_sample: true
      })
    }
    return this.captioner;
  }

  static async generateCaption(imageSrc) {
    return this.getCaptioner().then((captioner) => captioner(imageSrc));
  }
}