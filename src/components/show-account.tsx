"use client"

import ReactJson from "react-json-view"

export default function  ShowAccount(user: any) {
    return (
        <ReactJson theme={"summerfruit:inverted"} src={user}></ReactJson>
    )
}