import React, { useState } from 'react';

function App() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [caption, setCaption] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setTags([]);
      setCaption('');
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', image);
    try {
      const res = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to analyze image');
      const data = await res.json();
      setTags(data.tags || []);
      setCaption(data.caption || '');
    } catch (err: any) {
      setError(err.message || 'Error analyzing image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Visual Tagger</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={!image || loading} style={{ marginLeft: 8 }}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>
      {preview && (
        <div style={{ margin: '1rem 0' }}>
          <img src={preview} alt="preview" style={{ maxWidth: '100%' }} />
        </div>
      )}
      {tags.length > 0 && (
        <div>
          <h4>Tags:</h4>
          <ul>
            {tags.map((tag, i) => (
              <li key={i}>{tag}</li>
            ))}
          </ul>
          {caption && <div><strong>Caption:</strong> {caption}</div>}
        </div>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default App; 