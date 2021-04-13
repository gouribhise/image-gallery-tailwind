import React, { useState, useEffect,useCallback } from 'react';
import ImageCard from './components/ImageCard'; 
import ImageSearch from './components/ImageSearch';

const API_KEY = process.env.REACT_APP_PIXABAY_API_KEY
const url = `https://pixabay.com/api/?key=${API_KEY}`

 
function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');
 
 
  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${url}&q=${term}&image_type=photo&pretty=true`);
      console.log(response)
      const data = await response.json();
      setImages(data.hits);
      setIsLoading(false);
  
    }
    catch (error) {
      console.log(error)
    }
  }, [term])
  
  useEffect(() => {
    fetchImages();
    setIsLoading(false)
    
  },[fetchImages,term])

   
  return (
           <div className="container mx-auto">
               <ImageSearch searchText={(text) => setTerm(text)} />

              {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1> }

              {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-3 gap-4">
                    {images.map(image => (
                        <ImageCard key={image.id} image={image} />
                     ))}
               </div>}
            </div>
         );
 }

export default App;
