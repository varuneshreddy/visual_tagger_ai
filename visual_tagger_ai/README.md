# Visual Tagger AI

This is a simple app that lets you upload an image and get back a list of tags and a caption, thanks to an AI vision model. It’s meant to show how you can quickly build something useful with modern AI tools.

---

## How to Run It

### Backend (the AI part)
1. Open a terminal and go to the backend folder:
   
   cd visual_tagger_ai/backend
   
2. Install the Python packages:
   
   pip install -r requirements.txt
  
3. Start the server:
   
   uvicorn main:app --reload --port 8000
   
   The first time you run it, it’ll download the AI model (it’s big, so give it a minute).

### Frontend (the website)
1. Open another terminal and go to the frontend folder:
   
   cd visual_tagger_ai/frontend
   
2. Install the Node packages:
   
   npm install
  
3. Start the website:
  
   npm run dev
  
   Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## What You Can Do

- Upload a picture.
- See the top 5 tags the AI thinks are in the image.
- Read a short caption the AI writes about your image.

---

## How It Works

- The backend uses FastAPI and a BLIP model from Hugging Face.
- The frontend is a simple React app.
- They talk over HTTP—when you upload an image, the frontend sends it to the backend, which runs the AI and sends back the results. 