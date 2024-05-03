import React from 'react'

const Footer = () => {
  return (
    <div>
     <footer className="bg-gray-800 text-white py-8 lg:px-24 md:px-16 sm:px-14 px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-orange-500 mb-2">Explore the Universe</h2>
            <p className="text-sm text-gray-400">Discover the wonders of space with NASA</p>
          </div>
          <div className="text-center md:text-right">
            <h2 className="text-2xl font-semibold text-orange-500 mb-2">Contact Us</h2>
            <p className="text-sm text-gray-400">
            Email: <a href="mailto:contactUs@gmail.com" className="text-white">contactUs@gmail.com</a>
          </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm">&copy; NASA API WEBSITE - 2024</p>
          <p className="text-xs mt-2">Built with ❤️ by S.Shobithaa</p>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer
