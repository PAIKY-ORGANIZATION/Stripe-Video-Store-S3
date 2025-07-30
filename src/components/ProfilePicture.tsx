"use client"

export default function  ProfilePicture({profilePicturePath}: {profilePicturePath: string}) {
    return (
        <img src={profilePicturePath} alt="Profile" className="w-10 h-10 rounded-full object-cover"/>
    )
}