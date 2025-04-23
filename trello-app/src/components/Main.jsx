import React from "react";
import { MoreHorizontal , UserPlus } from "react-feather";


export default function Main(){
    return(
        <div className="text-white flex flex-col bg-slate-900 w-full">
           <div className="p-3 bg-black flex justify-between w-full bg-opacity-30">
                <h className="text-lg">My Trello Board</h>
                <div className="flex justify-center items-center">
                    <button className="bg-gray-200 text-gray-500 px-2 py-1 mr-2 rounded flex justify-center items-center">
                    <UserPlus size={16} className='mr-2'></UserPlus>
                    Share</button>
                    <button className="hover:bg-gray-500 px-2 py-1 h-8 rounded"><MoreHorizontal size={16}></MoreHorizontal></button>
                </div>
           </div>
           <div className="flex flex-col w-full flex-grow relative ">
                <div className="absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden">
                   <div className="mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0"> 
                        <div className="list-body">
                            <div className="flex justify-between p-1">
                                <span>
                                    To Do
                                </span>
                                <button className="hover:bg-gray-500 p-1 rounded-sm"><MoreHorizontal size={16}></MoreHorizontal></button>
                            </div>
                        </div>
                    </div>

                    <div className="mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0"> 
                        <div className="list-body">
                            <div className="flex justify-between p-1">
                                <span>
                                    To Do
                                </span>
                                <button className="hover:bg-gray-500 p-1 rounded-sm"><MoreHorizontal size={16}></MoreHorizontal></button>
                            </div>
                        </div>
                    </div>

                    <div className="mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0"> 
                        <div className="list-body">
                            <div className="flex justify-between p-1">
                                <span>
                                    To Do
                                </span>
                                <button className="hover:bg-gray-500 p-1 rounded-sm"><MoreHorizontal size={16}></MoreHorizontal></button>
                            </div>
                        </div>
                    </div>

                    <div className="mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0"> 
                        <div className="list-body">
                            <div className="flex justify-between p-1">
                                <span>
                                    To Do
                                </span>
                                <button className="hover:bg-gray-500 p-1 rounded-sm"><MoreHorizontal size={16}></MoreHorizontal></button>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    )
}