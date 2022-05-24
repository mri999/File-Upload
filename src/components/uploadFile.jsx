import React, { useState } from 'react'
import './uploadFileStyles.css'

import UploadModal from './uploadModal'

function UploadFile() {
  const [modalVisible, setModalVisible] = useState()
  const [uploadedFileName, setUploadedFileName] = useState()

  return (
    <div className="m2">
      <h4>Find your uploaded image here</h4>
      <div className="main">
        <div className="placeHolder">
          {uploadedFileName ?? 'Please select file to upload...'}
        </div>
        <div>
          <button onClick={() => setModalVisible(true)} className="btn">
            Upload
          </button>
          <UploadModal
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            setUploadedFileName={setUploadedFileName}
          />
        </div>
      </div>
    </div>
  )
}

export default UploadFile
