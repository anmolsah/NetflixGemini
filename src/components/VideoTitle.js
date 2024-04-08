

const VideoTitle = ({title,overview}) => {
  return (
<div className="videotitle absolute z-10 bg-gradient-to-tr from-black w-screen aspect-video"> 
<div className="video-top absolute bottom-32 left-10 p-6">
  <div className="text-white"> 
    <h2 className="text-4xl text-white font-bold">{title}</h2>
    <p className="max-w-md text-gray text-md ">{overview.slice(0, 200) + "...."}</p>
    <div className="flex gap-4 mt-4">
     <button className="bg-white border border-black text-xl text-black px-6 py-3 rounded flex items-center hover:bg-opacity-70"> 
       <i className="fas fa-play mr-2"></i> Play
     </button>
     <button className="bg-gray-400 text-white text-xl px-6 py-3 rounded flex items-center bg-opacity-70">
       <i className="fas fa-info-circle mr-2 bg-white-400"></i> More Info 
     </button>
   </div>
  </div>
  </div>
</div>
  )
}

export default VideoTitle