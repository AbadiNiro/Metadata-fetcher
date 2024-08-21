import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'
import MetadataBox from './components/MetadataBox';
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners';

function App() {
  const [urls, setUrls] = useState(['', '', '']);
  const [metadata, setMetadata] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchCsrfToken = async () => {
    axios.defaults.withCredentials = true
    axios.defaults.headers['X-Csrf-token'] = (await axios.get(process.env.REACT_APP_API_HOST + '/api/csrf-token',)).data.csrfToken;
  };
  useEffect(() => { fetchCsrfToken() }, [])

  const handleChange = (index, event) => {
    const newUrls = [...urls];
    newUrls[index] = event.target.value;
    setUrls(newUrls);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors([]);
    setMetadata([]);

    try {
      const response = await axios.post(process.env.REACT_APP_API_HOST + '/fetch-metadata', { urls });
      setMetadata(response.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error.message);
      setErrors(['Error fetching metadata']);
    }
  };
  const handleAddField = () => {
    if (urls.length >= 10) return;
    setUrls([...urls, '']);
  };
  const removeField = () => {
    if (urls.length > 3) {
      setUrls(urls.slice(0, -1))
    }
  }
  return (

    <div className="App">
      <h1>URL Metadata Preview</h1>
      <h2>Please enter full correct url in order to fetch its metadata "https://example.com"</h2>
      <form onSubmit={handleSubmit}>
        {urls.map((url, index) => (
          <div key={index} className="form-group">
            <input
              type="text"
              value={url}
              onChange={(e) => handleChange(index, e)}
              placeholder={`Enter URL ${index + 1}`}
              required={index === 0}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddField} className="add-field">
          + Add Field
        </button>

        <button type="submit">Fetch Metadata</button>

        {urls.length > 3 && <button className='remove-field' type="button" onClick={removeField}>Remove Field</button>}

      </form>
      {loading && (
        <div className="spinner-container">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      )}
      {errors.length > 0 && <p className="error">{errors.join(', ')}</p>}

      <div className='metadata-container'>
        {metadata.length > 0 && (metadata.map((meta, ind) =>

          <MetadataBox meta={meta} index={ind} key={ind} />)
        )}
      </div>
    </div>
  );
}

export default App;
