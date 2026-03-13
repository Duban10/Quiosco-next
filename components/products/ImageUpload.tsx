"use client"
import React, {useState} from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { TbPhotoPlus } from 'react-icons/tb'
import Image from 'next/image'

const ImageUpload = () => {
    const [imageUrl, setImageUrl] = useState("")
  return (
    <CldUploadWidget
        onSuccess={(result, { widget }) => {
            if (result.event === "success") {
                widget.close()
                // @ts-ignore
                setImageUrl(result.info.secure_url)
            }
            
        }}
        uploadPreset='j3uaidjc'
        options={{
            maxFiles: 1
        }}
    >
      {({open}) => (
        <>
            <div className='space-y-2'>
                <label htmlFor="" className='text-slate-800'>Imagen Producto</label>
                <div className='relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100'
                    onClick={() => open()}
                >
                    <TbPhotoPlus
                        size={50}
                    />
                    <p className='text-lg font-semibold'>Agregar imagen</p>
                    {
                        imageUrl && (
                            <div className='absolute inset-0 w-full h-full'>
                                <Image 
                                    fill
                                    style={{objectFit: "contain"}}
                                    src={imageUrl}
                                    alt='Imagen de producto'
                                />
                            </div>
                        )
                    }
                </div>
            </div>
            <input type="hidden" value={imageUrl} name='image' />
        </>
      )}
    </CldUploadWidget>
  )
}

export default ImageUpload
