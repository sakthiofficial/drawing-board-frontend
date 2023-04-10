import React, { useState } from 'react';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

export function Comment({ x, y, menu, text, ind, arr, setcmtsave, setcomment }) {
    let [cmt, setcmt] = useState("click");
    let [input, setinput] = useState(text);

    function cmtdelete() {
        arr.splice(ind, 1);
        setcomment([...arr]);
        setcmtsave(false);

    }

    return (
        <div className="home_board_command" style={{ top: y, left: x }} onMouseLeave={() => setcmt(null)}>

            <div className="home_board_command-icon" onClick={() => setcmt("click")} onMouseOver={() => cmt == "click" ? null : setcmt("hover")} onMouseLeave={() => cmt == "click" ? null : setcmt(null)}>
                <FeedbackIcon />
            </div>


            {cmt && menu == "comment" ? <div className="home_board_command-input">
                {cmt == "hover" ? <div className="home_board_command-input_text">
                    <p style={text ? null : { color: "#F7685B", textAlign: "center" }}>{text ? text : "Click to enter the message"}                        </p>
                </div> : null}
                {cmt == "click" ? <div className="home_board_command-input_type">
                    <input type="text" value={input} onChange={(e) => {
                        setinput(e.target.value);
                        arr[ind].text = e.target.value;
                    }} />
                    <div className="btns">
                        <CheckCircleOutlineRoundedIcon className='save' onClick={() => {
                            setcmt(false);
                            setcmtsave(false);
                        }} />
                        <DeleteOutlineRoundedIcon className='delete' onClick={() => cmtdelete()} />
                    </div>
                </div> : null}
            </div> : null}


        </div>
    );
}
