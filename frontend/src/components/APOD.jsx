import React, { useState, useEffect } from "react";
import VITE_NASA_API_KEY from "../config/apiConfig"

const APODViewer = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [apodData, setApodData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAPODForDate();
  }, []);

  const fetchAPODForDate = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${VITE_NASA_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch APOD data");
      }
      const data = await response.json();
      setApodData([data]);
      setError("");
      setLoading(false);
    } catch (error) {
      setError("Error fetching APOD data. Please try again later.");
      console.error(error);
      setLoading(false);
    }
  };

  const fetchAPODsBetweenDates = async () => {
    try {
      setLoading(true);
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${VITE_NASA_API_KEY}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch APOD data");
      }
      const data = await response.json();
      setApodData(data);
      setError("");
      setLoading(false);
    } catch (error) {
      setError("Error fetching APOD data. Please try again later.");
      console.error(error);
      setLoading(false);
    }
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSearch = () => {
    fetchAPODsBetweenDates();
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = (d.getMonth() + 1).toString().padStart(2, '0');
    let day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4">
      <h1 className="text-3xl lg:text-5xl text-center mb-4 font-bold">
        Astronomy Picture of the Day
      </h1>
      <p className="text-gray-800 text-lg lg:text-xl leading-relaxed mb-6">
        The Astronomy Picture of the Day (APOD) is a popular website and service provided by NASA that showcases a different astronomical image or photograph each day, along with a brief explanation written by a professional astronomer. Since its inception in 1995, APOD has become a widely appreciated resource for astronomy enthusiasts, educators, and the general public alike. The images featured on APOD cover a wide range of topics within astronomy and astrophysics, including celestial phenomena, space exploration missions, cosmic events, and breathtaking views of the universe captured by telescopes, satellites, and spacecraft. APOD serves as both an educational tool and a source of inspiration, offering captivating glimpses into the wonders of the cosmos on a daily basis.
      </p>
  
      <div className="mb-6 text-center">
        <p className="text-lg lg:text-xl mb-2 font-bold">
          Search for APOD images by start date and end date to view images from those days
        </p>
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="p-2 mb-2 lg:mr-2 lg:mb-0 border rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="p-2 mb-2 lg:mr-2 lg:mb-0 border rounded"
          />
          <button
            onClick={handleSearch}
            className="text-white bg-orange-400 hover:bg-orange-300 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5"
          >
            Search
          </button>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {apodData.length > 0 && (
        <div>
          {apodData.map((apod) => (
            <div key={apod.date} className="mb-6 lg:flex">
              <div className="max-w-screen-md mx-auto bg-white border border-gray-400 shadow-xl rounded-lg overflow-hidden lg:w-1/2 lg:mr-4 mb-4 lg:mb-0">
                <img
                  src={apod.url}
                  alt={apod.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="p-4 lg:w-1/2">
                <h1 className="text-xl lg:text-2xl font-semibold mb-2">{apod.title}</h1>
                <p className="text-gray-600">{apod.date}</p>
                <p className="text-gray-700 mt-2">{apod.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );  
};

export default APODViewer;
