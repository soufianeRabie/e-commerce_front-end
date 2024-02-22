import React, { useEffect, useState } from 'react'
import { ApiServices } from '../../../services/axiosServices.js'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './EditProduct.jsx'
import { ToastContainer } from 'react-toastify'

export const FormDataStatic = (data, isSold, formData) => {
  formData.append('title', data?.title)
  formData.append('price', data?.price)
  formData.append('description', data?.description)
  formData.append('rating', data?.rating)
  formData.append('isSold', isSold)
  isSold && formData.append('oldPrice', data?.oldPrice)

  const imageFile = data?.image?.file
  if (imageFile && imageFile.type) {
    if (
      imageFile.type.startsWith('image/') &&
      /\.(jpe?g|png|gif)$/i.test(imageFile.name)
    ) {
      formData.append('image', imageFile)
    }
  }

  return formData
}

function AddProduct() {
  const [isSold, setIsSold] = useState(false)
  const [previewImage, setPreviewImage] = useState()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    setValue('oldPrice', 0)
  }, [])

  const handleFileChange = (e) => {
    const fileInput = e.target
    const file = fileInput.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
      setValue('image.file', file) // Or use setValue('image.file', file) if necessary
    } else {
      setValue('image', null) // Or use setValue('image.file', null) if necessary
    }
  }
  const handleAddProduct = async (data) => {
    let formData = new FormData()
    formData = FormDataStatic(data, isSold, formData)
    try {
      await ApiServices.AddProduct(formData)
    } catch ({ response }) {
      response.data.errors.map((error) =>
        setError(error.name, {
          message: error.message,
        }),
      )
    }
  }

  useEffect(() => {}, [errors])

  useEffect(() => {}, [setValue])
  return (
    <div className=" w-full flex flex-col items-center justify-center absolute mt-52">
      <ToastContainer />

      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className="w-full max-w-lg p-4 bg-white shadow-md rounded-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register('title')}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.title && (
            <div className="text-red-500 mt-1">{errors.title.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Description"
            {...register('description')}
          />
          {errors.description && (
            <div className="text-red-500 mt-1">
              {errors.description.message}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            id="price"
            type="number"
            {...register('price', { valueAsNumber: true })}
            className="w-full p-2 border border-gray-300 rounded"
            step={'any'}
          />
          {errors.price && (
            <div className="text-red-500 mt-1">{errors.price.message}</div>
          )}
        </div>
        <div className="rounded-md mb-4  mx-auto border border-indigo-500 bg-gray-50 p-4 shadow-md w-1/2">
          <label
            htmlFor="upload"
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-24 object-cover mb-2 rounded-md"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 fill-white stroke-indigo-500"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-gray-600 font-medium">Upload file</span>
          </label>
          <input
            id="upload"
            type="file"
            {...register('image')}
            className={'hidden'}
            onChange={handleFileChange}
          />

          {errors.image && (
            <div className="text-red-500">{errors.image.message}</div>
          )}
        </div>
        <div className="mb-4 flex items-center">
          <input
            id="isSold"
            type="checkbox"
            {...register('isSold')}
            onChange={() => setIsSold((prevState) => !prevState)}
            className="mr-2 border-gray-300 rounded focus:ring-amber-500 h-4 w-4 text-amber-500 cursor-pointer"
          />
          <label
            htmlFor="isSold"
            className="text-gray-700 text-sm font-semibold"
          >
            Is Sold
          </label>
        </div>
        {isSold && (
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="old price "
              {...register('oldPrice', { valueAsNumber: true })}
              defaultValue={0}
            />
            {errors.oldPrice && (
              <div className="text-red-500">{errors.oldPrice.message}</div>
            )}
          </div>
        )}
        <div className="mb-4">
          <select
            className="w-full p-2  border border-gray-300 rounded"
            {...register('rating', { valueAsNumber: true })}
          >
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>
          {errors.rating && (
            <div className="text-red-500">{errors.rating.message}</div>
          )}
        </div>
        <div className="mb-4 w-full">
          <input
            type="submit"
            value={'add product'}
            className={
              'border border-gray-600 rounded-xl p-3 bg-amber-500 text-gray-700 cursor-pointer w-full'
            }
          />
        </div>
      </form>
    </div>
  )
}

export default AddProduct
