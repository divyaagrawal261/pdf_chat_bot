import React from "react";

export const Question = ({question}) =>{
    return (
        <div className="mx-2 my-2 flex flex-row gap-2">
            <div className="w-full bg-gray-100 p-5 rounded-md">{question}</div>
            <div className="rounded-full w-12 h-12 border">
                <img src="https://cdn-icons-png.flaticon.com/512/9815/9815472.png" alt="Profile_Icon" />
            </div>
        </div>
    )
}