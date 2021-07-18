import React,{useState} from 'react'
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
 import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// // Import the styles
 import '@react-pdf-viewer/core/lib/styles/index.css';
 import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library


export const LibraryPdfViewer = (props) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    // onchange event
    const fileType=['application/pdf'];
    // const handlePdfFileChange=(e)=>{
    //     let selectedFile=e.target.files[0];
    //     if(selectedFile){
    //         if(selectedFile&&fileType.includes(selectedFile.type)){
    //             let reader = new FileReader();
    //             reader.readAsDataURL(selectedFile);
    //             reader.onloadend = (e) =>{
    //                 setPdfFile(e.target.result);
    //                 setPdfFileError('');
    //             }
    //         }
    //         else{
    //             setPdfFile(null);
    //             setPdfFileError('Please select valid pdf file');
    //         }
    //     }
    //     else{
    //         console.log('select your file');
    //     }
    // }

    return (
        <div className='container'>

            <h4>View PDF</h4>
            <div className='pdf-container'>
                {props.viewPdf&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                    <Viewer fileUrl={props.viewPdf}
                            plugins={[defaultLayoutPluginInstance]} />
                </Worker></>}

            </div>

        </div>
    )
}

export default LibraryPdfViewer
