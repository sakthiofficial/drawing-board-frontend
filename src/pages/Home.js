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
    let [save, setsave] = useState(false)
    let [Canvadelete, setCanvadelete] = useState(false)


    return (
        <div className="home" >
            <div className="home_menus">
                <ul>
                    <li onClick={() => setmenu("comment")} style={menu == "comment" ? { backgroundColor: "whitesmoke" } : null}><CommentIcon /></li>
                    <li onClick={() => setmenu("pencil")} style={menu == "pencil" ? { backgroundColor: "whitesmoke" } : null}><BorderColorIcon /></li>
                    <li onClick={() => setmenu("pin")} style={menu == "pin" ? { backgroundColor: "whitesmoke" } : null}><FmdGoodIcon />
                    </li>
                    <li onClick={() => setmenu("more")} style={menu == "more" ? { backgroundColor: "whitesmoke", position: "relative" } : null}><MoreVertIcon />
                        {menu == "more" ? <div className="drop_down">
                            <ul>
                                <li onClick={() => setsave(true)}>save</li>
                                <li onClick={() => setCanvadelete(true)}>delete</li>
                            </ul>
                        </div> : null}
                    </li>

                </ul>
            </div>
            <DrawingApp menu={menu} papername={"Unsaved"} save={save} setsave={setsave} Canvadelete={Canvadelete} setCanvadelete={setCanvadelete} nav={nav} cmt2={[]} loc2={([])} />

        </div>

    );
}



