import React from 'react'
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'

function ImagePreview({ images, setSelectedFileFromList }) {
  const onPick = (image) => {
    setSelectedFileFromList(images[image.value].name)
  }

  return (
    <div className="imagePreviewSection">
      <h4 className="imagePreviewTitle">Your Images</h4>
      <div style={{ display: 'flex' }}>
        <ImagePicker
          images={images.map((image, i) => ({
            src: image.url,
            name: image.name,
            value: i,
          }))}
          onPick={onPick}
        />
      </div>
    </div>
  )
}

export default ImagePreview
