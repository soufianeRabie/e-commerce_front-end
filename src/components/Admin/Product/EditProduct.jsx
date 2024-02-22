import React, { useEffect, useState } from 'react'
import { ApiServices } from '../../../services/axiosServices.js'
import { useNavigate, useParams } from 'react-router-dom'
import { Library } from '../../../Library/Library.jsx'
import { round } from 'lodash/math.js'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormDataStatic } from './AddProduct.jsx'
import { useAuth } from '../../../Context/GlobalState.jsx'
import { Loader } from 'lucide-react'

export const schema = z.object({
  price: z.number().min(10),
  title: z.string().min(8).max(20),
  isSold: z.boolean(),

  oldPrice: z
    .number()
    .refine(
      (data) => {
        if (data?.isSold) {
          return data.oldPrice !== null
        }
        return true
      },
      {
        message: 'Old price is required when the product is sold',
      },
    )
    .nullable(),
  description: z.string().min(20).max(200),
  image: z
    .object({
      file: z.any().refine(
        (data) => {
          return data !== undefined // Ensure data and data.file are defined
        },
        {
          message: 'Image is required',
        },
      ),
    })
    .refine(
      (data) => {
        const allowedFormats = /\.(jpe?g|png|gif)$/i
        return (
          data.file &&
          data.file.type.startsWith('image/') &&
          allowedFormats.test(data.file.name)
        )
      },
      {
        message: 'Invalid image format',
      },
    )
    .nullable(),
  rating: z.number().gte(1).lte(5),
})

export const setValuesInDefault = (setValue, currentProduct) => {
  setValue('price', currentProduct.price)
  setValue('title', currentProduct.title)
  setValue('description', currentProduct.description)
  setValue('isSold', currentProduct.isSold)
  setValue('rating', round(parseInt(currentProduct.rating)))
  setValue('image', null)
  currentProduct.isSold && setValue('oldPrice', currentProduct.oldPrice)
}

function EditProduct() {
  const [isSold, setIsSold] = useState(false)
  const [currentProduct, setCurrentProduct] = useState()
  const { id } = useParams()
  const navigate = useNavigate()
  const [previewImage, setPreviewImage] = useState(currentProduct?.image)
  const { products, dispatch } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })
  const handleFileChange = (e) => {
    const fileInput = e.target
    const file = fileInput.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)

      // Set the file object or its properties using setValue
      setValue('image.file', file) // Or use setValue('image.file', file) if necessary
    } else {
      // If no new file is selected, use the existing product image as preview
      setPreviewImage(currentProduct?.image || null)

      // Clear the value if needed
      setValue('image', null) // Or use setValue('image.file', null) if necessary
    }
  }

  useEffect(() => {
    if (products.length > 0) {
      const product = products.find((product) => product.id === parseInt(id))

      if (product) {
        setValuesInDefault(setValue, product)
        setCurrentProduct(product)
        setIsSold(product.isSold)
        if (!product.isSold) {
          setValue('oldPrice', 0)
        }
        setPreviewImage(product?.image)
      }
    } else {
      const fetchProduct = async () => {
        const response = await ApiServices.GetProducts()
        if (response.data.products) {
          dispatch({
            type: 'SET_PRODUCTS',
            products: response.data.products,
          })
          const product = response.data.products.find(
            (product) => product.id === parseInt(id),
          )
          if (product) {
            setValuesInDefault(setValue, product)
            setCurrentProduct(product)
            setIsSold(product.isSold)
            if (!product.isSold) {
              setValue('oldPrice', 0)
            }
            setPreviewImage(product?.image)
          } else {
            navigate('/admin')
          }
        } else {
          navigate('/admin')
        }
      }
      fetchProduct()
    }
  }, [])
  const handleEditProduct = async (data) => {
    // event.preventDefault();
    setIsLoading(true)
    let formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('id', parseInt(id))
    formData = FormDataStatic(data, isSold, formData)
    const product = {
      title: formData.get('title'),
      description: formData.get('description'),
      rating: formData.get('rating'),
      price: parseInt(formData.get('price')),
      oldPrice: formData.get('oldPrice'),
      isSold: formData.get('isSold') === 'true',
      image: previewImage,
    }
    try {
      await ApiServices.EditProduct(formData).then(() => {
        dispatch({
          type: 'EDIT_PRODUCT',
          payload: {
            id: parseInt(id),
            product: product,
          },
        })
        navigate('/admin')
        Library.showToast(
          'The product updated successfully',
          'success',
          'top-right',
          3000,
          undefined,
          'productAction',
        )
      })
    } catch (err) {
      Library.showToast(err.response.data.message, 'error')
    }
    setIsLoading(false)
  }

  return (
    <div className=" w-full flex flex-col items-center justify-center absolute mt-52">
      <form
        onSubmit={handleSubmit(handleEditProduct)}
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
            type=""
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
            checked={isSold}
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
        <div className="mb-4">
          <button
            className={
              'w-full cursor-pointer flex justify-center gap-1 items-center border border-gray-600 rounded-xl p-3 bg-amber-500 text-gray-700 '
            }
            type="submit"
            value={'edit product'}
            disabled={isLoading}
          >
            {isLoading && <Loader className={'animate-spin'} />}
            edit product
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct
