import Modal from 'react-bootstrap/Modal';
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
// import { getImageSize } from 'next/dist/server/image-optimizer';



export default function InterestPhoto({ getImages, imageList }) {
    // console.log(imageList, 'getImagesgetImagesgetImages')
    const [isPhotoPopup, setIsPhotoPopup] = useState(false);

    const handlePhotoClose = () => setIsPhotoPopup(false);
    const handlePhotoShow = () => setIsPhotoPopup(true);
    const [images_uploaded, setUploadedImages] = useState([]);

    const [reloadKey, setReloadKey] = useState(1);
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.map((item, index) => {
            item.url = URL.createObjectURL(item);
            // item.name = 
            images_uploaded.push(item);
        })
        getImages(images_uploaded)
        // images_uploaded.push(acceptedFiles);
        setIsPhotoPopup(false);
    }, [images_uploaded, getImages])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {
        'image/*': [],
      'video/*': [],
    //   'video/pm4': []
      } })
    function delete_Image(imgId) {
        images_uploaded.splice(imgId, 1)
        getImages(images_uploaded)
        setReloadKey(Math.random());
    }
    const delete_Image_form_imageList = (val) => {
        // console.log(val)

        imageList.splice(val, 1);
        setReloadKey(Math.random());

        // console.log(imageList)
    }
    function delete_Image(imgId) {
        images_uploaded.splice(imgId, 1)
        getImages(images_uploaded)
        setReloadKey(Math.random());
    }
    getImages(images_uploaded);
    // console.log(images_uploaded, '=====.')
    return (
        <>

            <Modal show={isPhotoPopup} onHide={handlePhotoClose} size="lg" className='custom-model'>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi file</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div {...getRootProps()} className="file-drop-area">
                        <div className="drop-container">
                            <div className="icon upload-icon"><svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5945 3.21005C17.3348 2.9475 16.9826 2.8 16.6154 2.8H13.8462L11.7692 0H6.23077L4.15385 2.8H1.38462C1.01739 2.8 0.66521 2.9475 0.405544 3.21005C0.145879 3.4726 0 3.8287 0 4.2V12.6C0 12.9713 0.145879 13.3274 0.405544 13.5899C0.66521 13.8525 1.01739 14 1.38462 14H16.6154C16.9826 14 17.3348 13.8525 17.5945 13.5899C17.8541 13.3274 18 12.9713 18 12.6V4.2C18 3.8287 17.8541 3.4726 17.5945 3.21005Z" fill="#256068" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.99991 10.85C7.27933 10.85 5.88452 9.43969 5.88452 7.69999C5.88452 5.96029 7.27933 4.54999 8.99991 4.54999C10.7205 4.54999 12.1153 5.96029 12.1153 7.69999C12.1153 9.43969 10.7205 10.85 8.99991 10.85Z" fill="#48B0BF" />
                            </svg>
                            </div>
                            <div className="drop-info-txt">Aggiungi foto e/o video <br /> (max 7)</div>
                            <div className="drop-label">Trascina e rilascia o</div>
                            <label htmlFor="" className='drop-choose-btn'>
                            Scegli il file <input {...getInputProps()} />
                            </label>
                        </div>


                    </div>
                </Modal.Body>

            </Modal>
            <div className='divider big'></div>
            <div className='image_video_wrap'>
                <div className="action">
                    <div className="form-label">Foto o video (max 7)
                        <input type="button" className="btn btn-add-file" onClick={handlePhotoShow} value="Add file" />
                    </div>

                </div>
                <div className="preview-items row">
                    <div className="preview-items row">
                        {images_uploaded && images_uploaded.length > 0 ?
                            images_uploaded.map((item, index) => (
                                <>{item.type.split('/')[0] != 'video' ? <div className="item col-lg-4" key={`img-InterestPhoto${index}`} style={{ backgroundImage: `url(${item.url})` }}>
                                    <div className="indicator"  key={`img-indicator-indicator${index}`} >
                                        <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2H10L8.5 0H4.5L3 2H1C0.734784 2 0.48043 2.10536 0.292893 2.29289C0.105357 2.48043 0 2.73478 0 3V9C0 9.26522 0.105357 9.51957 0.292893 9.70711C0.48043 9.89464 0.734784 10 1 10H12C12.2652 10 12.5196 9.89464 12.7071 9.70711C12.8946 9.51957 13 9.26522 13 9V3C13 2.73478 12.8946 2.48043 12.7071 2.29289Z" fill="#256068" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.5 7.75C5.25736 7.75 4.25 6.74264 4.25 5.5C4.25 4.25736 5.25736 3.25 6.5 3.25C7.74264 3.25 8.75 4.25736 8.75 5.5C8.75 6.74264 7.74264 7.75 6.5 7.75Z" fill="#48B0BF" />
                                        </svg>

                                    </div>
                                    <div className="info-w">
                                        <div className="info">
                                            <h3 className="title">{item.name}</h3>
                                            <div className="author">Voi</div>
                                        </div>
                                        <div className="actions">
                                            <span onClick={() => { delete_Image(index) }} className="btn btn-delete">Eliminare</span>
                                        </div>
                                    </div>
                                </div>
                                    :
                                    <div className="item col-lg-4"key={`Vid-InterestPhoto${index}`} >
                                        <video controls src={`${item.url}`} />
                                        <div className="indicator">
                                            <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2H10L8.5 0H4.5L3 2H1C0.734784 2 0.48043 2.10536 0.292893 2.29289C0.105357 2.48043 0 2.73478 0 3V9C0 9.26522 0.105357 9.51957 0.292893 9.70711C0.48043 9.89464 0.734784 10 1 10H12C12.2652 10 12.5196 9.89464 12.7071 9.70711C12.8946 9.51957 13 9.26522 13 9V3C13 2.73478 12.8946 2.48043 12.7071 2.29289Z" fill="#256068" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M6.5 7.75C5.25736 7.75 4.25 6.74264 4.25 5.5C4.25 4.25736 5.25736 3.25 6.5 3.25C7.74264 3.25 8.75 4.25736 8.75 5.5C8.75 6.74264 7.74264 7.75 6.5 7.75Z" fill="#48B0BF" />
                                            </svg>

                                        </div>
                                        <div className="info-w">
                                            <div className="info">
                                                <h3 className="title">{item.name}</h3>
                                                <div className="author">Voi</div>
                                            </div>
                                            <div className="actions">
                                                <span onClick={() => { delete_Image(index) }} className="btn btn-delete">Eliminare</span>
                                            </div>
                                        </div>
                                    </div>}</>
                            )) : null}
                        {imageList && imageList.length > 0 ?
                            imageList.map((item, index) => (
                                <>
                                    {item.attributes.mime.split('/')[0] != 'video' ? <div className="item col-lg-4" key={`img-up-${index}`} style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${item.attributes.url})` }}>
                                        <div className="indicator">
                                            <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2H10L8.5 0H4.5L3 2H1C0.734784 2 0.48043 2.10536 0.292893 2.29289C0.105357 2.48043 0 2.73478 0 3V9C0 9.26522 0.105357 9.51957 0.292893 9.70711C0.48043 9.89464 0.734784 10 1 10H12C12.2652 10 12.5196 9.89464 12.7071 9.70711C12.8946 9.51957 13 9.26522 13 9V3C13 2.73478 12.8946 2.48043 12.7071 2.29289Z" fill="#256068" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M6.5 7.75C5.25736 7.75 4.25 6.74264 4.25 5.5C4.25 4.25736 5.25736 3.25 6.5 3.25C7.74264 3.25 8.75 4.25736 8.75 5.5C8.75 6.74264 7.74264 7.75 6.5 7.75Z" fill="#48B0BF" />
                                            </svg>

                                        </div>
                                        <div className="info-w">
                                            <div className="info">
                                                <h3 className="title">{item?.attributes?.name}</h3>
                                                <div className="author">Voi</div>
                                            </div>
                                            <div className="actions">
                                                <span onClick={() => { delete_Image_form_imageList(index) }} className="btn btn-delete">Eliminare</span>
                                            </div>
                                        </div>
                                    </div>
                                     : 
                                     <><div className="item col-lg-4" key={`vid-up-${index}`}> <video controls src={`${process.env.NEXT_PUBLIC_API_URL}${item.attributes.url}`} />
                                        <div className="indicator">
                                            <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2H10L8.5 0H4.5L3 2H1C0.734784 2 0.48043 2.10536 0.292893 2.29289C0.105357 2.48043 0 2.73478 0 3V9C0 9.26522 0.105357 9.51957 0.292893 9.70711C0.48043 9.89464 0.734784 10 1 10H12C12.2652 10 12.5196 9.89464 12.7071 9.70711C12.8946 9.51957 13 9.26522 13 9V3C13 2.73478 12.8946 2.48043 12.7071 2.29289Z" fill="#256068" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M6.5 7.75C5.25736 7.75 4.25 6.74264 4.25 5.5C4.25 4.25736 5.25736 3.25 6.5 3.25C7.74264 3.25 8.75 4.25736 8.75 5.5C8.75 6.74264 7.74264 7.75 6.5 7.75Z" fill="#48B0BF" />
                                            </svg>

                                        </div>
                                        <div className="info-w">
                                            <div className="info">
                                                <h3 className="title">{item?.attributes?.name}</h3>
                                                <div className="author">Voi</div>
                                            </div>
                                            <div className="actions">
                                                <span onClick={() => { delete_Image_form_imageList(index) }} className="btn btn-delete">Eliminare</span>
                                            </div>
                                        </div></div></>}
                                </>
                            )) : null}
                    </div>

                </div>
            </div>
        </>
    )
}
