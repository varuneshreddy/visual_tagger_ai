# Backend - Visual Tagger

## Setup

1. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

## API

### POST /analyze
- Accepts: Multipart form image file (field: `file`)
- Returns: JSON with top 5 tags and a generated caption

#### Example response
```json
{
  "tags": ["dog", "grass", "playing", "outside", "happy"],
  "caption": "A happy dog playing outside on the grass."
}
``` 