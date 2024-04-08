import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
   
     <div className="w-full flex flex-col items-center py-6 bg-black">
    <p className=' md:text-2xl font-serif font-semibold bg-gradient-to-r from-indigo-800 via-pink-400 via-purple-500 to-red-500 bg-clip-text text-transparent'>Made with ❤️ by Anmol</p>
    <div className="mt-2 bg-black">
      <Link to="https://www.linkedin.com/in/anmol-sah-551083238/" className="text-gray-400 hover:text-blue-400 mr-4 cursor-pointer">LinkedIn</Link>
      <Link to="https://github.com/anmolsah" className="text-gray-400 hover:text-gray-600 mr-4">GitHub</Link>
    </div>
  </div>
 
  )
}

export default Footer;