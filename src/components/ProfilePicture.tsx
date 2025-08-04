"use client"

export default function  ProfilePicture({profilePicturePath}: {profilePicturePath: string}) {
    return (
        <img src={profilePicturePath} alt="Profile" className="w-9 h-9 rounded-full object-cover"/>
    )
}