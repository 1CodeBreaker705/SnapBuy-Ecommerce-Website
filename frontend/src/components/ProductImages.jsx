import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { IoMdImages } from "react-icons/io";
import { MdOutlineCloudUpload } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { useWatch } from 'react-hook-form';

const ProductImages = ({ setValue, control, setError }) => {

  const images = useWatch({
    control,
    name: "images",
  })

  const onDrop = useCallback((acceptedFiles) => {

    if (!acceptedFiles || acceptedFiles.length === 0)
      return

    const updated = [...(images || []), ...acceptedFiles]

    setValue("images", updated, {
      shouldValidate: true,
    })

  }, [images, setValue])

  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({

    onDrop,

    onDropRejected: () => {

      setError("images", {
        type: "manual",
        message: "Maximum 5 images allowed",
      })

    },

    multiple: true,

    maxFiles: 5,

    accept: {
      'image/*': ['.jpg', '.jpeg', '.png'],
    }

  })

  const deleteHandler = (idx) => {

    const non_deleted_images =
      images.filter((curr, i) => i !== idx)

    setValue(
      "images",
      non_deleted_images,
      { shouldValidate: true }
    )

  }

  return (

    <>

         <div className='space-y-5'>

  {/* Uploaded Images */}

  {
     images?.length > 0 && (

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>

        {
          images.map((curr, i) => {

            return (

              <div
                key={i}
                className='group relative rounded-3xl overflow-hidden border border-zinc-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300'
              >

                <img
                       src={
                          curr.image_url
                            ? curr.image_url
                            : URL.createObjectURL(curr)
                        }
                  alt={i + 1}
                  className='w-full h-[230px] object-cover group-hover:scale-105 transition duration-300'
                />

                {/* Delete */}

                <button
                  type='button'
                  onClick={() => deleteHandler(i)}
                  className='absolute top-3 right-3 text-2xl rounded-full p-1 bg-white/90 backdrop-blur-md text-black shadow-md hover:bg-red-500 hover:text-white transition cursor-pointer'
                >

                  <IoIosClose />

                </button>

              </div>

            )

          })
        }

      </div>

    )
  }

  {/* Upload Box */}

  {
    (images?.length || 0) < 5 && (

      <div
        {...getRootProps()}
        className='w-full min-h-[260px] rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-50 hover:bg-zinc-100 transition cursor-pointer flex items-center justify-center p-8'
      >

        <input {...getInputProps()} />

        {
          isDragActive ? (

            <div className='flex flex-col items-center justify-center text-center'>

              <MdOutlineCloudUpload className='text-7xl text-black' />

              <p className='mt-4 text-xl font-semibold text-zinc-800'>
                Drop your images here
              </p>

            </div>

          ) : (

            <div className='flex flex-col items-center justify-center text-center'>

              <div className='p-5 rounded-full bg-blue-600 text-white mb-5'>

                <IoMdImages className='text-5xl' />

              </div>

              <h2 className='text-2xl font-bold text-zinc-800'>
                Upload Product Images
              </h2>

              <p className='text-zinc-500 mt-3 max-w-md leading-relaxed'>
                Drag & drop product images here or click to browse files.
              </p>

              <p className='text-sm text-zinc-400 mt-2'>
                PNG, JPG, JPEG • Maximum 5 images
              </p>

              <p className='text-sm text-blue-500 mt-2'>
                {images.length}/5 uploaded
              </p>

            </div>

          )
        }

      </div>

    )
  }

</div>

    </>

  )
}

export default ProductImages
