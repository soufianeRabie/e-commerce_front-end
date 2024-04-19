import React, { useEffect, useState } from 'react'
import { ApiServices } from '../../../../services/axiosServices.js'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from '../EditProduct.jsx'
import { ToastContainer } from 'react-toastify'
import { GlobalColorTailwand, Library } from '../../../../Library/Library.jsx'
import { useAuth } from '../../../../Context/GlobalState.jsx'
import { useNavigate } from 'react-router-dom'
import { Loader } from 'lucide-react'
import { topNav } from '../../../../pages/Dahsboard/index.jsx'
import ThemeSwitch from "../../../theme-switch.jsx";
import {UserNav} from "../../../user-nav.jsx";
import {TopNav} from "../../../top-nav.jsx";
import { Search } from '@/components/search'
import {LayoutHeader} from "../../../custom/layout.jsx";

export const FormDataStatic = (data, isSold, formData) => {
  formData.append('title', data?.title)
  formData.append('price', data?.price)
  formData.append('description', data?.description)
  formData.append('rating', data?.rating)
  formData.append('isSold', isSold)
  formData.append('quantity', data?.quantity || 0)
  isSold && formData.append('oldPrice', data?.oldPrice)

  let images = []
  const imageFiles = data?.image?.files
  console.log(data)
  if (imageFiles && imageFiles.length > 0) {
    for (let i = 0; i < imageFiles.length; i++) {
      const imageFile = imageFiles[i]
      console.log(imageFile)
      if (
        imageFile &&
        imageFile.type.startsWith('image/') &&
        /\.(jpe?g|png|gif)$/i.test(imageFile.name)
      ) {
        images.push(imageFile)
      }
    }
    // Append each image individually to the FormData object
    images.forEach((imageFile, index) => {
      formData.append(`image[${index}]`, imageFile)
    })
  }
  formData.append('imagesLength', images.length)

  return formData
}

function AddProduct() {
  const [isSold, setIsSold] = useState(false)
  const [previewImages, setPreviewImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuth(false)
  const navigate = useNavigate()

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
    const files = fileInput.files

    if (files && files.length > 0) {
      const imagePreviews = []
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader()
        reader.onloadend = () => {
          imagePreviews.push(reader.result)
          if (imagePreviews.length === files.length) {
            setPreviewImages(imagePreviews)
          }
        }
        reader.readAsDataURL(files[i])
      }
      setValue('image.files', files) // Or use setValue('image.files', files) if necessary
    } else {
      setValue('image', null) // Or use setValue('image.files', null) if necessary
    }
  }

  const handleAddProduct = async (data) => {
    setIsLoading(true)
    let formData = new FormData()
    formData = FormDataStatic(data, isSold, formData)
    for (const [key, value] of formData.entries()) {
      console.log(key, value)
    }
    console.log(formData.get('image[]'))
    const imageFiles = formData.getAll('image[]') // Get all files with the key 'image[]'
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i]
      console.log(file) // Log each file object
    }
    try {
      const response = await ApiServices.AddProduct(formData)

      const newProduct = response.data
      dispatch({
        type: 'ADD_PRODUCT',
        payload: {
          product: newProduct[0],
        },
      })
      Library.showToast(
        'The product added successfully',
        'success',
        'top-right',
        3000,
        undefined,
        'productAction',
      )
      setIsLoading(false)
      navigate('/admin')
    } catch ({ response }) {
      setIsLoading(false)
      response.data.errors.map((error) =>
        setError(error.name, {
          message: error.message,
        }),
      )
    }
  }

  useEffect(() => {
    console.log(errors)
  }, [errors])

  useEffect(() => {}, [setValue])
  return (
    <>
      <LayoutHeader>
        <TopNav links={topNav} />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>
        <div className=" w-full flex flex-col items-center justify-center  mt-40">
          <h1 className={'text-3xl text-center my-4'}> Add New Product </h1>

          <form
            onSubmit={handleSubmit(handleAddProduct)}
            className="w-full max-w-lg p-4 bg-white  dark:shadow-xl shadow-md rounded-md"
          >
            {/*{JSON.stringify(errors)}*/}
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
                placeholder={'new product '}
                {...register('title')}
                className="w-full p-2 border border-gray-300 rounded text-black"
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
                className="w-full p-2 border border-gray-300 text-black rounded"
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
                className="block text-gray-700 text-sm font-semibold mb-2 text-black"
                htmlFor="price"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                placeholder={9999}
                {...register('price', { valueAsNumber: true })}
                className="w-full p-2 border border-gray-300 rounded text-black"
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
                {previewImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover mb-2 rounded-md"
                  />
                ))}
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
                multiple // Enable multiple file selection
              />

              {errors.image && (
                <div className="text-red-500">{errors.image.message}</div>
              )}

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
                className={`mr-2 border-gray-300  text-black rounded-xl  focus:ring${GlobalColorTailwand} h-6 w-6 text${GlobalColorTailwand} cursor-pointer`}
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
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="oldPrice"
                >
                  Old Price
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  placeholder="9999"
                  {...register('oldPrice', { valueAsNumber: true })}
                  defaultValue={0}
                />
                {errors.oldPrice && (
                  <div className="text-red-500">{errors.oldPrice.message}</div>
                )}
              </div>
            )}

            <div className={'mb-4'}>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="Quantity"
              >
                Quantity
              </label>
              <input
                id="quantity"
                placeholder={199}
                type="number"
                {...register('quantity', { valueAsNumber: true })}
                className="w-full p-2 border border-gray-300 rounded text-black"
                step={'any'}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="rating"
              >
                Rating
              </label>
              <select
                className="w-full p-2 text-black border border-gray-300 rounded"
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
              <button
                className={`w-full cursor-pointer flex justify-center gap-1 items-center border border-gray-600 rounded-xl p-3 bg${GlobalColorTailwand} text-gray-700 `}
                type="submit"
                value={'edit product'}
                disabled={isLoading}
              >
                {isLoading && <Loader className={'animate-spin'} />}
                add product
              </button>
            </div>
          </form>
        </div>

    </>
  )
}

export default AddProduct
