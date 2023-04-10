import { useParams } from "react-router-dom";
import { API } from "../api_endpoint";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CommentIcon from '@mui/icons-material/Comment';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

import React, { useState, useRef, useEffect } from 'react';

import DrawingApp from '../Components/draw';

export function Paper({ nav }) {
    let { id } = useParams()
    let [data, setdata] = useState(null)
    useEffect(() => {
        fetch(`${API}/drawboard/${id}`).then(val => val.json()).then(dt => {
            setdata(dt)
        })
    }, [])

    let [menu, setmenu] = useState("comment")


    return (
        <div className="home" >
            <div className="home_menus">
                <ul>
                    <li onClick={() => setmenu("comment")} style={menu == "comment" ? { backgroundColor: "whitesmoke" } : null}><CommentIcon /></li>
                    <li onClick={() => setmenu("pencil")} style={menu == "pencil" ? { backgroundColor: "whitesmoke" } : null}><BorderColorIcon /></li>
                    <li onClick={() => setmenu("pin")} style={menu == "pin" ? { backgroundColor: "whitesmoke" } : null}><FmdGoodIcon /></li>
                    <li onClick={() => setmenu("more")} style={menu == "more" ? { backgroundColor: "whitesmoke" } : null}><MoreVertIcon /></li>

                </ul>
            </div>

            {data ? <DrawingApp menu={menu} imgurl={data.image} nav={nav} papername={data.name} cmt2={data.comments} loc2={data.locations} /> : null}
        </div>

    );
}