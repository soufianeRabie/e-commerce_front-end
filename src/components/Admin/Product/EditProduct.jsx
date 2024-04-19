import React, { useEffect, useState } from 'react'
import { ApiServices } from '../../../services/axiosServices.js'
import { useNavigate, useParams } from 'react-router-dom'
import { GlobalColorTailwand, Library } from '../../../Library/Library.jsx'
import { round } from 'lodash/math.js'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormDataStatic } from './AddProduct/AddProduct.jsx'
import { useAuth } from '../../../Context/GlobalState.jsx'
import { Loader } from 'lucide-react'
import ThemeSwitch from "../../theme-switch.jsx";
import {UserNav} from "../../user-nav.jsx";
import {TopNav} from "../../top-nav.jsx";
import {LayoutHeader} from "../../custom/layout.jsx";
import { Search } from '@/components/search'
import {topNav} from "../../../pages/Dahsboard/index.jsx";

export const schema = z.object({
  price: z.number().min(10),
  title: z.string().min(8).max(20),
  isSold: z.boolean(),
  quantity: z.number(),
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
  image: z.any(),
  rating: z.number().gte(1).lte(5),
})

export const setValuesInDefault = (setValue, currentProduct, values = []) => {
  setValue('price', currentProduct.price || values.price)
  setValue('title', currentProduct.title || values.title)
  setValue('description', currentProduct.description || values.description)
  setValue('isSold', currentProduct.isSold || values.isSold)
  setValue('rating', round(parseInt(currentProduct.rating || values.rating)))
  setValue('image', null)
  setValue('quantity', currentProduct?.quantity || values?.quantity || 0)
  currentProduct.isSold &&
    setValue('oldPrice', currentProduct.oldPrice || values?.oldPrice)
}

function EditProduct({ values }) {
  console.log('values', values)
  const [isSold, setIsSold] = useState(false)
  const [currentProduct, setCurrentProduct] = useState()
  const [imagesChange, setImagesChange] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const [previewImages, setPreviewImages] = useState([])
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
    setImagesChange(true)
    setPreviewImages([])
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
  useEffect(() => {
    if (products.length > 0) {
      const product =
        products.find((product) => product.id === parseInt(id)) || values?.id

      if (product) {
        setValuesInDefault(setValue, product, values)
        setCurrentProduct(product)
        setIsSold(product.isSold)
        if (!product.isSold) {
          setValue('oldPrice', 0)
        }
        setPreviewImages(product?.images)
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
            setPreviewImages(product?.images)
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
    formData.append('id', parseInt(id) || values?.id)
    formData = FormDataStatic(data, isSold, formData)

    try {
      const response = await ApiServices.EditProduct(formData)
      const editedProduct = response.data?.product[0]

      console.log(editedProduct)
      Library.showToast(
        'The product updated successfully',
        'success',
        'top-right',
        3000,
        undefined,
        'productAction',
      )
      dispatch({
        type: 'EDIT_PRODUCT',
        payload: {
          id: parseInt(id) || values?.id,
          product: editedProduct,
        },
      })
    } catch (err) {
      Library.showToast(err.response.data.message, 'error')
    }
    setIsLoading(false)
    if (!values) {
      navigate('/admin')
    }
  }

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
              {/*<h1 className={'text-3xl text-center my-4'}> Edit Product </h1>*/}

              <form
                  onSubmit={handleSubmit(handleEditProduct)}
                  className="w-full max-w-lg p-4 bg-white dark:bg-slate-800 shadow-md rounded-md"
              >
                  <div className="mb-4">
                      <label
                          className="block  text-sm font-semibold mb-2"
                          htmlFor="title"
                      >
                          Title
                      </label>
                      <input
                          id="title"
                          type="text"
                          {...register('title')}
                          className="w-full p-2 border border-gray-300 roundedc text-black"
                      />
                      {errors.title && (
                          <div className="text-red-500 mt-1">{errors.title.message}</div>
                      )}
                  </div>

                  <div className="mb-4">
                      <label
                          className="block  text-sm font-semibold mb-2"
                          htmlFor="description"
                      >
                          Description
                      </label>
                      <textarea
                          id="description"
                          className="w-full p-2 border border-gray-300 rounded text-black"
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
                          className="block  text-sm font-semibold mb-2"
                          htmlFor="price"
                      >
                          Price
                      </label>
                      <input
                          id="price"
                          type=""
                          {...register('price', {valueAsNumber: true})}
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
                          {previewImages?.map((image, index) => (
                              <img
                                  key={index}
                                  src={
                                      !imagesChange
                                          ? import.meta.env.VITE_APP_BACKEND_IMAGES_URL + image.image
                                          : image
                                  }
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-24 object-cover mb-2 rounded-md "
                              />
                          ))}
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-10 w-10 fill-white dark:fill-gray-200 stroke-indigo-500"
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
                          <span className=" font-medium">Upload file</span>
                      </label>
                      <input
                          id="upload"
                          type="file"
                          {...register('image')}
                          className={'hidden'}
                          onChange={handleFileChange}
                          multiple
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
                          className={`mr-2  border-gray-300 rounded focus:ring${GlobalColorTailwand} h-4 w-4 text${GlobalColorTailwand} cursor-pointer`}
                      />
                      <label
                          htmlFor="isSold"
                          className=" text-sm font-semibold"
                      >
                          Is Sold
                      </label>
                  </div>
                  {isSold && (
                      <div className="mb-4">
                          <label
                              className="block  text-sm font-semibold mb-2"
                              htmlFor="oldPrice"
                          >
                              Old Price
                          </label>
                          <input
                              className="w-full p-2 border text-black border-gray-300 rounded"
                              placeholder="old price "
                              {...register('oldPrice', {valueAsNumber: true})}
                          />
                          {errors.oldPrice && (
                              <div className="text-red-500">{errors.oldPrice.message}</div>
                          )}
                      </div>
                  )}

                  <div className={'mb-4'}>
                      <label
                          className="block  text-sm font-semibold mb-2"
                          htmlFor="Quantity"
                      >
                          Quantity
                      </label>
                      <input
                          id="quantity"
                          type="number"
                          {...register('quantity', {valueAsNumber: true})}
                          className="w-full text-black p-2 border border-gray-300 rounded"
                          step={'any'}
                      />
                  </div>
                  <div className="mb-4">
                      <label
                          className="block  text-sm font-semibold mb-2"
                          htmlFor="rating"
                      >
                          Rating
                      </label>
                      <select
                          className="w-full p-2  border border-gray-300 rounded text-black"
                          {...register('rating', {valueAsNumber: true})}
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
                          className={`w-full cursor-pointer flex justify-center gap-1 items-center border border-gray-600 rounded-xl p-3 bg${GlobalColorTailwand}  `}
                          type="submit"
                          value={'edit product'}
                          disabled={isLoading}
                      >
                          {isLoading && <Loader className={'animate-spin'}/>}
                          edit product
                      </button>
                  </div>
              </form>
          </div>
      </>
  )
}

export default EditProduct
