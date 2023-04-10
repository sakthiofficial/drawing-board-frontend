import MoreVertIcon from '@mui/icons-material/MoreVert';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CommentIcon from '@mui/icons-material/Comment';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

import React, { useState, useRef, useEffect } from 'react';

import DrawingApp from '../Components/draw';

import { API } from '../api_endpoint';
export function Home({ nav }) {
    let [menu, setmenu] = useState("comment")

    let [canvas, setcanvas] = useState([])
    // let [cmt, setcmt] = useState([])
    // let [loc2,setloc2] = useState([])

    // useEffect(() => {
    //     fetch(`${API}/drawboard`).then((dt) => dt.json()).then(res => {
    //         setcanvas(res)
    //         setcmt(res[res.length - 1].comments)

    //     })

    // }, [])

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
            <DrawingApp menu={menu} papername={"Unsaved"} nav={nav} cmt2={[]} loc2={([])} />

        </div>

    );
}



