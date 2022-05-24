import React, { useState, useRef, useEffect, useCallback } from 'react'
import Modal from 'react-modal'
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import './uploadModalStyles.css'
import ImagePreview from './imagePreview'

function UploadModal({ visible, onCancel, setUploadedFileName }) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      height: '65%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '8px',
    },
  }

  const [selectedFileFromDevice, setSelectedFileFromDevice] = useState()
  const [selectedFileFromList, setSelectedFileFromList] = useState()

  const [imageList, setImageList] = useState([])
  const inputRef = useRef()
  const imageListRef = ref(storage, 'images/')

  const handleClose = (val) => {
    setUploadedFileName(val)
    setSelectedFileFromDevice()
    fetchImages()
    onCancel()
  }

  const handleUpload = () => {
    if (selectedFileFromDevice === null) return

    const uploadedImageRef = ref(
      storage,
      `images/${selectedFileFromDevice.name + v4()}`,
    )
    uploadBytes(uploadedImageRef, selectedFileFromDevice).then(() => {
      alert('Image uploaded')
      handleClose(selectedFileFromDevice.name)
    })
  }

  const fetchImages = () => {
    let images = []
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) =>
          images.push({ name: item.name, url }),
        )
      })
    })
    setImageList(images)
  }

  useEffect(() => {
    if (imageList.length === 0) {
      fetchImages()
    }
  }, [])

  return (
    <div>
      <Modal isOpen={visible} style={customStyles}>
        <div className="modalTitle">
          <h3>Select Image</h3>
          <button onClick={onCancel} className="closeBtn">
            x
          </button>
        </div>
        <div className="uploadSection">
          {selectedFileFromDevice && (
            <span className="fileName">{selectedFileFromDevice.name}</span>
          )}
          <div>
            {selectedFileFromDevice && (
              <button onClick={handleUpload} className="uploadImageBtn">
                Upload & use Image
              </button>
            )}
            <input
              hidden
              ref={inputRef}
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
              onChange={(e) => setSelectedFileFromDevice(e.target.files[0])}
            />
            <button
              onClick={() => inputRef.current.click()}
              className="selectImageBtn"
            >
              Choose Image
            </button>
          </div>
          <span className="infoText">
            Recommended dimensions for Omni theme category image: 300x300px PNG,
            JPG, GIF upto 5 MB
          </span>
          {imageList.length > 0 && (
            <div className="imageList">
              <ImagePreview
                images={imageList}
                setSelectedFileFromList={setSelectedFileFromList}
              />
            </div>
          )}
        </div>
        <div className="footer">
          <button onClick={onCancel} className="selectImageBtn">
            Cancel
          </button>
          <button
            onClick={() => handleClose(selectedFileFromList)}
            className="uploadImageBtn"
          >
            Use selected image
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default UploadModal
