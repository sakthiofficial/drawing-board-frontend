import React, { useEffect, useState, useRef } from 'react';
import pdfjsLib from 'pdfjs-dist';
// import pdf from "../mern.pdf"


export const History = () => {
    const canvasRef = useRef(null);

    const [pdfUrl, setPdfUrl] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const fileUrl = URL.createObjectURL(file);
        setPdfUrl(fileUrl);
    };

    useEffect(() => {
        const loadPDF = async () => {
            if (pdfUrl) {
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');

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
    }, [pdfUrl]);

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {pdfUrl && <canvas ref={canvasRef} />}
        </div>
    );
};


// export function History() {
//     return (
//         <h1>I am History page</h1>
//     );
// }
