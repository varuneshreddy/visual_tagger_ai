from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import torch
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load BLIP model and processor
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model= BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

def get_tags(image: Image.Image, top_k=5):
    inputs = processor(image, return_tensors="pt")
    out = model.generate(**inputs, max_length=30)
    caption = processor.decode(out[0], skip_special_tokens=True)
    
    # Extract tags from caption
    stopwords = {"a", "the", "of", "in", "on", "with", "and", "to", "for", "at", "by", "an", "s", "it"}
    tags = [w.lower() for w in caption.replace(",", "").replace(".", "").split() if w.lower() not in stopwords]
    tags = list(dict.fromkeys(tags))  # Remove duplicates, preserve order
    return tags[:top_k], caption

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        tags, caption = get_tags(image)
        return {"tags": tags, "caption": caption}
    except Exception as e:
        return JSONResponse(status_code=400, content={"error": str(e)})

@app.get("/")
async def root():
    return {"message": "Visual Tagger API is running!"} 