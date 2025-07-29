"use client"

import type { video } from "@/generated/prisma"

export default function  Success({video}: {video: video}) {

    console.log(video);
    

    return (
        <div className="flex flex-col items-center justify-center text-center px-4 w-full">
			<div className="text-6xl mb-4">🎉</div>
			<h1 className="text-3xl font-bold mb-2">Congratulations!</h1>
			<p className="text-lg mb-6">
				Thank you for purchasing: <strong> "{video.title}"</strong>.
			</p>
			<img src={video.thumbnailLocalPath}  className="object-contain rounded mb-6 shadow-md"/>

			<div className="flex gap-4">
				<a href={''} className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700">
					Download Your Item
				</a>

				<button className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700">
					Watch now
				</button>
			</div>
		</div>
    )
}