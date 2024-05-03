import React, { useState, useEffect } from 'react';
import VITE_NASA_API_KEY from "../config/apiConfig"

const Mars = () => {
  const [photoData, setPhotoData] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedCamera, setSelectedCamera] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPhoto = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=${VITE_NASA_API_KEY}`
      );
      const data = await res.json();
      setPhotoData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Mars photos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhoto();
  }, [VITE_NASA_API_KEY, page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const handleSearch = () => {
    // Fetch photos based on the selected camera
    fetchPhotosByCamera(selectedCamera);
  };

  const fetchPhotosByCamera = async (camera) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=${camera}&page=${page}&api_key=${VITE_NASA_API_KEY}`
      );
      const data = await res.json();
      setPhotoData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Mars photos by camera:', error);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setSelectedCamera(event.target.value);
  };

  const clearSearch = () => {
    setSelectedCamera('');
    fetchPhoto();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!photoData || !photoData.photos || photoData.photos.length === 0) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-5xl text-center mb-4 font-bold">Mars Imagery</h1>
        <p>No photos found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
    <div className="container mx-auto p-8">
      <h1 className="text-5xl text-center mb-4 font-bold">Mars Imagery</h1>
      <br />
      <p className="text-gray-800 text-lg leading-relaxed mb-6">
        Mars imagery captures the captivating landscapes and scientific wonders of the Red Planet, offering a window into its unique geological features, atmospheric conditions, and potential for past or present signs of life. From vast deserts to towering mountains, from ancient riverbeds to frozen polar caps, the imagery provides invaluable insights for planetary scientists, engineers, and enthusiasts alike. These images, often captured by rovers like Curiosity and Perseverance, showcase the intricacies of Mars' surface, revealing clues about its history and evolution. Beyond scientific exploration, Mars imagery inspires curiosity and imagination, inviting us to ponder the mysteries of our neighboring planet and contemplate humanity's future endeavors in space exploration and colonization
      </p>
      <div className="mb-4">
  <select
    value={selectedCamera}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
  >
    <option value="">Select your Preferred Camera</option>
    <option value="FHAZ">Front Hazard Avoidance Camera</option>
    <option value="RHAZ">Rear Hazard Avoidance Camera</option>
    <option value="MAST">Mast Camera</option>
    <option value="CHEMCAM">Chemistry and Camera Complex</option>
    <option value="NAVCAM">Navigation Camera</option>
  </select>
</div>
<div className="flex flex-col sm:flex-row justify-center mb-4">
  <button
    onClick={handleSearch}
    className="bg-orange-400 hover:bg-orange-300 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2 focus:outline-none focus:ring focus:border-blue-300"
  >
    Search
  </button>
  <button
    onClick={clearSearch}
    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-gray-300"
  >
    Clear Search
  </button>
</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photoData.photos.map((photo, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <img src={photo.img_src} alt={photo.camera.full_name} className="w-full h-64 object-cover" />
            <div className="p-4 flex justify-between items-center">
              <p className="text-gray-600">Date: {photo.earth_date} | Camera: {photo.camera.full_name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="bg-gray-200 hover:bg-gray-300 py-2 px-4 mr-2 rounded"
        >
          Previous
        </button>
        <div>
          <p className="text-xl font-bold">--Page {page}-- </p>
        </div>
        <p></p>
        <button
          onClick={nextPage}
          disabled={page === 4}
          className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default Mars;
