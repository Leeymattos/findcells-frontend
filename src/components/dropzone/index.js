import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import './style.css'

export default function Dropzone({ onFileUploaded, setSelectedFileUrl, selectedFileUrl }) {




  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file)

    setSelectedFileUrl(fileUrl)
    onFileUploaded(file)
  }, [onFileUploaded, setSelectedFileUrl])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  })


  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />

      {selectedFileUrl
        ? <img src={selectedFileUrl} alt="Cell thumbnail" />
        : <p>
          <FiUpload />
      Imagem da célula
      </p>
      }

    </div>
  )


}