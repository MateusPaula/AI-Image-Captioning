from transformers import AutoProcessor, BarkModel

# Montando nossa propria pipeline

def pipeline(model_name):
    processor = AutoProcessor.from_pretrained(model_name) # Criando um processor
    model = BarkModel.from_pretrained(model_name) # Instanciando o modelo
    model = model.to_bettertransformer()  # Otimiza o modelo
    sample_rate = model.generation_config.sample_rate

    def pipe(text): # Junção do input -> processor -> model -> output
        model_input = processor(text, voice_preset="v2/pt_speaker_8")
        audio = model.generate(**model_input) # O ** é para desestruturação
        return audio, sample_rate

    return pipe
class TextToAudio:
    def __init__(self):
        model_name = "suno/bark-small"
        self.pipe = pipeline(model_name)

    def convert(self, text):
        return self.pipe(text)