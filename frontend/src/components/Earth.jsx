import React, { useState, useEffect } from 'react';
import VITE_NASA_API_KEY from "../config/apiConfig"

const Earth = () => {
  const [photoData, setPhotoData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [lon, setLon] = useState('100.75');
  const [lat, setLat] = useState('1.5');
  const [date, setDate] = useState('2014-02-01');
  const [dim, setDim] = useState('0.15');

  useEffect(() => {
    fetchPhoto();
  }, []);

  async function fetchPhoto() {
    try {
      setLoading(true); // Set loading state to true before fetching
      const res = await fetch(
        `https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&date=${date}&dim=${dim}&api_key=${VITE_NASA_API_KEY}`
      );
      const data = await res.json();
      setPhotoData(data);
      setLoading(false); // Set loading state to false after fetching
    } catch (error) {
      console.error('Error fetching Earth imagery:', error);
      setLoading(false); // Set loading state to false in case of error
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPhoto();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!photoData) return null;

  return (
    <div className='bg-gray-50'>
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-bold mb-4 text-center">Earth Imagery</h1>
      <br/>
      <p className="text-black text-lg leading-relaxed mb-6">NASA Earth imagery provides a captivating glimpse into the intricate beauty and dynamic nature of our planet. Through a vast array of satellite observations, 
        NASA captures stunning images that showcase the Earth's diverse landscapes, atmospheric phenomena, and environmental changes over time. From the majestic swirls of 
        hurricanes to the intricate patterns of city lights at night, these images offer valuable insights into Earth's complex systems and the interactions between land, 
        water, air, and life. NASA's Earth imagery not only serves as a valuable resource for scientific research and environmental monitoring but also inspires awe and 
        appreciation for the remarkable planet we call home. Whether it's monitoring changes in sea ice extent, tracking urban sprawl, or studying natural disasters, 
        NASA's Earth imagery plays a crucial role in advancing our understanding of Earth's dynamic processes and fostering stewardship of our precious planet.</p>
        <br/>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="lon" className="block mb-3">Longitude:</label>
            <input
              type="number"
              id="lon"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="lat" className="block mb-3">Latitude:</label>
            <input
              type="number"
              id="lat"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="date" className="block mb-3">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="dim" className="block mb-3">Dimension:</label>
            <input
              type="number"
              id="dim"
              step="0.01"
              value={dim}
              onChange={(e) => setDim(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md">Fetch Image</button>
      </form>
      <div>
        <img src={photoData.url} alt="No Earth Imagery available" className="w-full rounded-md shadow-lg" />
        <p className="mt-2 text-gray-600">Date: {photoData.date}</p>
      </div>
    </div>
    </div>
  );
};

export default Earth;
