import { useEffect, useRef, useState } from "react"

type VideoProp = {
    id:string,
    title:string,
    channel:{
        id:string,
        name:string,
        profileUrl:string
    },
    views:number,
    postedAt:Date,
    duration:number,
    thumbnailUrl:string,
    videoUrl:string
}

function VideoGrid({ id,
    title,
    channel,
    views,
    postedAt,
    duration,
    thumbnailUrl,
    videoUrl,}:VideoProp){
        
        const [isVideoPlaying, setIsVideoPlaying] = useState(false)
         const videoRef = useRef<HTMLVideoElement>(null)
        useEffect(()=>{
            if(videoRef.current == null)return
            if(isVideoPlaying){
                videoRef.current.currentTime = 0
                videoRef.current.play()
            }else{
                videoRef.current.pause()
            }

        },[isVideoPlaying])

    return <>
    
    <div  className="  flex flex-col" onMouseEnter={()=>{setIsVideoPlaying(true)}} onMouseLeave={()=>{setIsVideoPlaying(false)}}>
        <a href="/" className="relative aspect-video ">
            <img src={thumbnailUrl} alt="" className={` transition-[border-radius] duration-200 ${isVideoPlaying ? "rounded-none": "rounded-xl"}`} />
            <div className=" absolute right-1 bottom-1 bg-secondary-dark text-secondary-Default rounded px-0.5">{duration}</div>
            <video 
              ref={videoRef} 
              className={`absolute inset-0 block object-cover h-full transition-opacity duration-200 ${isVideoPlaying ? "opacity-100" : "opacity-0"}`} 
              src={videoUrl}
              muted
              ></video>
        </a>
        <div className="flex gap-2">
            <div>
                <a href="" className="flex-shrink-0">
                    <img className="rounded-full w-12 h-12 " src={channel.profileUrl} alt="" />
                </a>
                
                
            </div>

            <div>
               <div className="font-bold">{title}</div>
               <div className="text-secondary-text">{channel.name}</div>
               <div className="text-secondary-text">{views}</div>
            </div>

        </div>

        
    </div>
    

    </>
}

export default VideoGrid