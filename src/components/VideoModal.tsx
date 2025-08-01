"use client"


export default function  VideoModal({videoId, setIsModalOpen}: {videoId: string, setIsModalOpen: (isOpen: boolean)=>void}) {
    return (
        (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={()=>{setIsModalOpen(false)}}>
            <video   onClick={(e)=>e.stopPropagation()} controls>
                <source src={'/api/download-stream-proxy/'+ videoId} width="70%"></source>
            </video>
        </div>)
    )
}