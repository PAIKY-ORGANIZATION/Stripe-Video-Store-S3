"use client"

import Link from "next/link";

export default function Success({ relevantSessionData }: { relevantSessionData: RelevantSessionData }) {
	return (
		<div className="flex flex-col items-center w-full p-20">
			<h1 className="mb-6 text-3xl font-bold text-green-500">Thank you for your purchase!</h1>

			<div className="grid grid-cols-1 gap-6 ">
				{relevantSessionData.videos.map((video) => (
					<div key={video.videoId} className="flex flex-col items-center text-center">
						<img
							src={video.image}
							alt={video.title}
							className="object-cover h-auto mb-2 rounded shadow-md w-75"
						/>
						<p className="text-lg font-semibold">{video.title}</p>
					</div>
				))}
			</div>
			<Link href={'/library'} className="p-2 mt-4 text-white bg-blue-500 rounded hover:underline"> Go to your library</Link>
		</div>
	);
}
