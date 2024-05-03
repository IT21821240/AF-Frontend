import React, { useState, useEffect } from 'react';

function Epic() {
  const [images, setImages] = useState([]);
  const EPIC_API_URL = 'https://epic.gsfc.nasa.gov/api/natural';
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(EPIC_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <h1 className="text-5xl font-bold mb-4 text-center">NASA EPIC Images</h1>
      <br/>
      <p className="text-black text-xl leading-relaxed mb-6">The NASA EPIC (Earth Polychromatic Imaging Camera) API provides access to breathtaking natural color images of Earth captured by 
        the EPIC instrument aboard the NOAA's DSCOVR (Deep Space Climate Observatory) satellite. These images offer a unique perspective of 
        our planet, showcasing its dynamic and ever-changing features, including clouds, weather patterns, and natural phenomena like sunrise 
        and sunset. The EPIC API allows developers to retrieve and integrate these high-resolution images into their applications, enabling 
        users to explore Earth from space in near-real-time. This resource serves not only as a source of scientific data but also as a source 
        of inspiration, fostering a deeper understanding and appreciation of our home planet's beauty and complexity.</p>
        <br/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {images.map((image) => (
          <div key={image.identifier} className="bg-white p-4 rounded-lg shadow-md transform hover:rotate-6 transition duration-300">
            <img
              src={`https://epic.gsfc.nasa.gov/archive/natural/${image.date.slice(0, 4)}/${image.date.slice(5, 7)}/${image.date.slice(8, 10)}/png/${image.image}.png`}
              alt={`EPIC Image on ${image.date}`}
              className="w-full h-auto"
            />
            <div className="mt-2 text-gray-700 text-lg">
              <p>Date: {image.date}</p>
              <p>Center Latitude: {image.centroid_coordinates.lat.toFixed(2)}</p>
              <p>Center Longitude: {image.centroid_coordinates.lon.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Epic;
