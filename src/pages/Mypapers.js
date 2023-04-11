import { useEffect, useState } from "react";
import { API } from "../api_endpoint";
import { useNavigate } from "react-router-dom";

export function Mypapers() {
    let [canvas, setcanvas] = useState([])

    useEffect(() => {
        fetch(`${API}/drawboard`).then((dt) => dt.json()).then(res => {
            setcanvas(res)

        })

    }, [])
    // 
    return (
        <div className="mypapers" >
            {canvas.map(val => <Box img={val.image} id={val._id} date={val.date.date} day={val.date.day} month={val.date.month} name={val.name} />)}





        </div>
    );
}

function Box({ img, name, date, month, day, id }) {

    let navigate = useNavigate()
    return (
        <div className="commentbox" onClick={() => navigate(`/paper/${id}`)}>
            <div className="commentbox_paper">
                <img src={img} alt="" />
            </div>
            <div className="commentbox_title">
                <h4>{name}</h4>
            </div>
            <div className="commentbox_date">
                <p>{`${date}/${month + 1}/2023`}</p>

            </div>
        </div>
    )
}