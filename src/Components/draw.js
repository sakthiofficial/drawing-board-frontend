
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useState, useRef, useEffect } from 'react';
import { Button, Input } from '@mui/material';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import UndoIcon from '@mui/icons-material/Undo';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useNavigate } from 'react-router-dom';
import { API } from '../api_endpoint';
import { Comment } from './Comment';
import { Commentbox } from './Commentbox';
import { Location } from './Location';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DrawingApp({ menu, nav, setsave, imgurl, cmt2, loc2, papername, id, canvasWidth, save, Canvadelete, canvasHeight, canvaspdf }) {
    // console.log(canvaspdf);
    let [clr, setclr] = useState("black");
    let [width, setwidth] = useState(1)
    const [isDrawing, setIsDrawing] = useState(false);
    let [canvaArr, setcanvaArr] = useState([]);
    let [nameclik, setnameclik] = useState(false)
    let [cmt, setcmt] = useState([...cmt2]);
    let [cmtsave, setcmtsave] = useState(false);
    let [location, setlocation] = useState([...loc2]);
    let [name, setname] = useState(papername)
    let [imgurl2, setimgurl2] = useState(imgurl)
    const [pdfUrl, setPdfUrl] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const fileUrl = URL.createObjectURL(file);
        setPdfUrl(fileUrl);
    };

    let navigate = useNavigate()
    const canvasRef = useRef(null);


    let canvas;
    let context;




    useEffect(() => {
        canvas = canvasRef.current;
        context = canvas.getContext('2d');
        function sendData() {
            setimgurl2(canvas.toDataURL())



            if (save) {

                let date = new Date()

                // return
                let data
                try {
                    data = {
                        image: imgurl2,
                        comments: cmt,
                        locations: location,
                        name,
                        width: canvas.width,
                        height: canvas.height,
                        pdf: pdfUrl,
                        date: {
                            date: date.getDate(),
                            day: date.getDay(),
                            month: date.getMonth()
                        }
                    }

                    if (id) {
                        fetch(`${API}/drawboard/${id}`, {
                            method: "PUT",
                            body: JSON.stringify(data),
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((dt) => {

                            if (dt.status == 200) {
                                toast.success('Successfully Saved', {
                                    position: "top-center",
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });
                                navigate("/mypapers")


                            } else {

                                toast.error('Something wrong', {
                                    position: "top-center",
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });
                            }
                        })

                    } else {


                        fetch(`${API}/drawboard`, {
                            method: "POST",
                            body: JSON.stringify(data),
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((dt) => {
                            if (dt.status == 200) {
                                setsave(false)


                                toast.success('Successfully Saved', {
                                    position: "top-center",
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });
                                navigate("/mypapers")
                            } else {
                                setsave(false)

                                toast.error('This name as already used', {
                                    position: "top-center",
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });
                            }
                        })
                    }
                } catch (err) {
                    alert("SOmething wrong")
                }

            }
        }
        sendData()



        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
        };

        function startDrawing(event) {
            setIsDrawing(true);
            draw(event);
        }

        function draw(event) {
            if (isDrawing && menu == "pencil") {


                context.strokeStyle = clr
                context.lineWidth = width

                const { offsetX, offsetY } = event;
                context.lineTo(offsetX, offsetY);

                context.stroke();
                // context.save()

            }





        }



        function stopDrawing() {
            setIsDrawing(false);

            context.beginPath();
            setcanvaArr([...canvaArr, context.getImageData(0, 0, 1000, 400)]);

            setimgurl2(canvas.toDataURL())

            // canvaArr.push(context.getImageData(0, 0, 1000, 400));
            // console.log(imgurl);
            // img saver
        }

    }, [isDrawing, width, canvas, context, pdfUrl, clr, menu, save, imgurl]);
    useEffect(() => {
        if (canvasHeight && canvasWidth) {
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
        }
    }, [])
    useEffect(() => {
        if (save) {
            // sendData()
        }
        if (Canvadelete) {
            if (id) {
                deleteData()
            } else {
                navigate("/mypapers")
            }

        }
    }, [save, Canvadelete])
    function deleteData() {
        fetch(`${API}/drawboard/${id}`, {
            method: "DELETE"
        }).then((val) => {
            if (val.status == 200) {
                toast.success('Successfully Deleted', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate("/mypapers")

            }
        })
    }
    useEffect(() => {
        const loadPDF = async () => {
            if (pdfUrl) {


                // Load the PDFJS library asynchronously
                const pdfjsLib = await import('pdfjs-dist/webpack');

                // Load the PDF file
                pdfjsLib.getDocument(pdfUrl).promise.then((pdf) => {
                    // Get the first page of the PDF
                    pdf.getPage(1).then((page) => {
                        const viewport = page.getViewport({ scale: 1 });

                        // Set the canvas size to the PDF page size
                        canvas.width = viewport.width;
                        canvas.height = viewport.height;

                        // Render the PDF page on the canvas
                        page.render({
                            canvasContext: context,
                            viewport: viewport,
                        });
                    });
                });
            }
        };
        loadPDF();
        var imageObj1 = new Image();
        imageObj1.src = imgurl
        imageObj1.onload = function () {
            context.drawImage(imageObj1, 0, 0);
        }
    }, [pdfUrl])
    function undo() {

        if (canvaArr.length <= 1) {
            context.clearRect(0, 0, 1000, 400)
            return
        }
        canvaArr.pop();
        context.putImageData(canvaArr[canvaArr.length - 1], 0, 0)

    }
    function comment(e) {


        if (!cmtsave) {
            setcmt([...cmt, { x: nav ? e.clientX - 212 : e.clientX - 83, y: nav ? e.clientY - 57 : e.clientY - 57, text: "" }])
            setcmtsave(true)
        }
    }
    function loc(e) {
        for (let i = 0; i < location.length; i++) {
            if (location[i].x == nav ? e.clientX - 222 : e.clientX - 93 && location[i].y == e.clientY - 64) {
                location.splice(i, 1);
                setlocation([...location])
                console.log(location);
                return
            }
        }


        setlocation([...location, { x: nav ? e.clientX - 222 : e.clientX - 93, y: e.clientY - 64 }])
    }



    return (
        <>
            <div className="name" style={{ position: "absolute", top: 2, left: nav ? 500 + 40 : 500, cursor: "pointer" }}>
                {nameclik ? <input type="text" value={name} onChange={(e) => setname(e.target.value)} onKeyUp={(e) => {
                    if (e.key == "Enter") {
                        setnameclik(false)
                    }
                }} /> : <p onClick={() => setnameclik(true)} type="text" >{name}</p>}

            </div>
            <div className="home_board" onClick={(e) => menu == "comment" ? cmtsave ? null : comment(e) : menu == "pencil" ? null : loc(e)} style={menu == "pencil" ? { cursor: "crosshair", position: "relative" } : { cursor: "pointer", position: "relative" }} >
                <canvas
                    ref={canvasRef}
                    style={{ border: `1px solid black`, color: "red" }}
                    width={1000}
                    height={400}
                    color='red'


                />


                {cmt.map((val, ind) =>
                    <Comment ind={ind} setcmtsave={setcmtsave} setcomment={setcmt} arr={cmt} x={val.x} y={val.y} menu={menu} text={val.text} />
                )}
                {location.map((val, ind) => <Location y={val.y} arr={location} ind={ind} x={val.x} />)}

            </div>
            {/* <img src={imgurl} alt="" /> */}
            <div className="pdf_uploder">
                <input type="file" onChange={handleFileChange} />

            </div>

            <div className={menu == "pin" ? "home_tools pin" : "home_tools"} >
                {
                    menu == "pencil" ?
                        <div className="home_tools_pencil">

                            <div className="home_tools_pencil_eraser">
                                <IconButton aria-label="Example" className='icon' onClick={() => undo()}>
                                    <UndoIcon />

                                </IconButton>
                                <IconButton className='icon' aria-label="Example" onClick={() => context.clearRect(0, 0, 1000, 400)}  >
                                    <BackspaceIcon />

                                </IconButton>
                            </div>
                            <div className="home_tools_pencil_color">
                                <input type="color" onChange={(e) => setclr(e.target.value)} />
                                <Slider
                                    size="small"
                                    defaultValue={1}
                                    aria-label="Small"
                                    valueLabelDisplay="auto"
                                    className='range_slider'
                                    onChange={(e) => setwidth(e.target.value)}
                                />
                            </div>
                            <div className="home_tools_pencil_btns">


                                <Button className='save_btn' onClick={() => setsave(!save)} variant='contained'>save</Button>
                                <Button className='cancel_btn' variant='contained' onClick={() => navigate("/mypapers")}>cancel</Button>

                            </div>
                        </div>
                        :
                        <div className="home_tools_comment">
                            <IconButton aria-label="Example" className='icon'>
                                <ArrowBackIosNewIcon />

                            </IconButton>
                            <Commentbox />
                            <Commentbox />
                            <Commentbox />
                            <Commentbox />
                            <Commentbox />








                            <IconButton className='icon' aria-label="Example">
                                <ArrowForwardIosIcon />

                            </IconButton>
                        </div>
                }


                {/* Same as */}
            </div>

        </>

    );
}

export default DrawingApp;