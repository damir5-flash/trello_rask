import React, { useState } from "react";
import {ChevronLeft, ChevronRight, Plus} from 'react-feather';

export default function Sidebar(){

    const [collapsed ,setCollapsed] = useState(false);

    return(
        <div className={`text-white bg-[#121417] h-[calc(100vh-3rem)] border-r border-r-[#9fadbc29] transition-all linear duration-300 ${collapsed ? 'w-[40px]' : 'w-[280px]'}`}>
            
            {collapsed && <div className="p-2">
                <button onClick={()=>setCollapsed(!collapsed)} className="hover:bg-slate-600 rounded-sm p-1">
                    <ChevronRight size={18}></ChevronRight>
                </button>
            </div>}
            {!collapsed && <div>
                <div className="workspace p-3 flex justify-between border-b border-b-[#9fadbc29]">
                    <h4>Damir Dev's workspace</h4>
                    <button onClick={()=>setCollapsed(!collapsed)} className="hover:bg-slate-600 rounded-sm p-1">
                        <ChevronLeft size={18}></ChevronLeft>
                    </button>
                </div>
                <div className="flex justify-between px-3 py-2">
                    <h6>Your Boards</h6>
                    <button className="hover:bg-slate-600 rounded-sm p-1">
                        <Plus size={16}></Plus>
                    </button>
                </div>
                <ul>
                    <li>
                        <button className="px-2 py-2 w-full text-sm flex justify-start align-baseline hover:bg-gray-500">
                            <span className="w-6 h-max rounded-sm mr-2 bg-red-600">&nbsp;</span>
                            <span className="w-full">My Trello Board</span>
                        </button>
                    </li>
                </ul>
                
            </div>}
        </div>
    )
}