import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import toast from 'react-hot-toast'
import { axiosClient } from '../../../utils/axiosClient'
import ProductImages from '../../../components/ProductImages'
import SubmitButton from '../../../components/SubmitButton'
import { useEffect, useState } from 'react'
import { CATEGORY_MAP } from '../../../constant/categoryMap'
import { useParams } from 'react-router-dom'
import LoaderComponent from '../../../components/LoaderComponent'

const UpdateProductPage = () => {

  const { id } = useParams()

  const [loading, setLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)

  // ZOD SCHEMA
  const registerSchema = z.object({
    title: z.string().trim().min(1, "Name is required").max(500, "Title cannot exceed 500 characters"),

    main_category: z.string().min(1, "Select category"),

    sub_category: z.string().min(1, "Select subcategory"),

    description: z.string().trim().min(1, "Description is required").max(3000, "Description cannot exceed 3000 characters"),

    price: z.string().min(1, "Price is required"),

    images: z.array(z.instanceof(File)).min(1, "At least 1 image is required")
  })

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    setError,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      title: '',
      main_category: '',
      sub_category: '',
      description: '',
      price: '',
      images: []
    }
  })

  const selectedMainCategory = watch("main_category")

  const fetchProduct = async () => {
    try {
      const response = await axiosClient.get(
        `/product/get-single-product/${id}`
      )

      const product = response.data

      reset({
        title: product.title,
        main_category: product.main_category,
        sub_category: product.sub_category,
        description: product.description,
        price: String(product.price),
        images: []
      })

    } catch (error) {

      toast.error(
        error?.response?.data?.detail || error.message
      )

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  // RESET SUBCATEGORY ONLY WHEN USER CHANGES CATEGORY
  useEffect(() => {

    if (initialLoad) {
      setInitialLoad(false)
      return
    }

    setValue("sub_category", "")

  }, [selectedMainCategory])


  
  const onSubmit = async (data) => {
    try {
      
      const formData = new FormData()

      formData.append("title", data.title)
      formData.append("main_category", data.main_category)
      formData.append("sub_category", data.sub_category)
      formData.append("description", data.description)
      formData.append("price", data.price)

      // OPTIONAL IMAGE UPDATE
      if (data.images?.length > 0) {

        data.images.forEach((file) => {
          formData.append("images", file)
        })

      }

      const response = await axiosClient.patch(
        `/product/update-product/${id}`,
        formData
      )

      toast.success(response.data.msg)

    } catch (err) {

      const detail = err?.response?.data?.detail

      if (Array.isArray(detail)) {

        toast.error(
          detail[0]?.msg || "Validation Error"
        )

      } else {

        toast.error(detail || err.message)

      }
    }
  }


  if (loading) {
    return (
      <div className='min-h-44 flex items-center justify-center'>
        <LoaderComponent />
      </div>
    )
  }

  return (
    <>
      <div className="py-10 rounded px-4 bg-gray-50 border border-gray-200">

        <h3 className='text-3xl font-semibold'>
          Update Product
        </h3>

        <form
          className='py-10'
          onSubmit={handleSubmit(onSubmit)}
        >

          {/* PRODUCT TITLE */}
          <div className='mb-3'>

            <label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </label>

            <input
              disabled={isSubmitting}
              {...register("title")}
              id='title'
              type="text"
              className="w-full py-2 px-3 rounded-lg outline-none bg-white border border-gray-200"
              placeholder='Enter product title'
            />

            {errors.title && (
              <p className="text-red-500 text-sm">
                {errors.title.message}
              </p>
            )}

          </div>

          {/* MAIN CATEGORY */}
          <div className='mb-3'>

            <label htmlFor="main_category">
              Main Category
              <span className="text-red-500">*</span>
            </label>

            <select
              disabled={isSubmitting}
              {...register("main_category")}
              id='main_category'
              className="w-full py-2 px-2 rounded-lg outline-none bg-white border border-gray-200 hover:cursor-pointer"
            >

              <option value="">
                Select Category
              </option>

              {
                Object.keys(CATEGORY_MAP).map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))
              }

            </select>

            {errors.main_category && (
              <p className="text-red-500 text-sm">
                {errors.main_category.message}
              </p>
            )}

          </div>

          {/* SUB CATEGORY */}
          <div className='mb-3'>

            <label htmlFor="sub_category">
              Subcategory
              <span className="text-red-500">*</span>
            </label>

            <select
              disabled={isSubmitting || !selectedMainCategory}
              {...register("sub_category")}
              id='sub_category'
              className="w-full py-2 px-2 rounded-lg outline-none bg-white border border-gray-200 disabled:cursor-not-allowed hover:cursor-pointer"
            >

              <option value="">
                Select Subcategory
              </option>

              {
                selectedMainCategory &&
                CATEGORY_MAP[selectedMainCategory].map((curr) => (
                  <option key={curr} value={curr}>
                    {curr.replaceAll("_", " ")}
                  </option>
                ))
              }

            </select>

            {errors.sub_category && (
              <p className="text-red-500 text-sm">
                {errors.sub_category.message}
              </p>
            )}

          </div>

          {/* DESCRIPTION */}
          <div className='mb-3'>

            <label htmlFor="description">
              Product Description
              <span className="text-red-500">*</span>
            </label>

            <textarea
              disabled={isSubmitting}
              {...register("description")}
              id='description'
              onInput={(e) => {
                e.target.style.height = "auto"
                e.target.style.height = `${e.target.scrollHeight}px`
              }}
              rows={5}
              className="w-full py-2 px-3 rounded-lg outline-none bg-white border border-gray-200 resize-none overflow-hidden"
              placeholder='Enter product description'
            />

            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}

          </div>

          {/* PRODUCT IMAGES */}
          <div className='mb-3'>

            <label htmlFor="images">
              Product Images
            </label>

            <ProductImages
              setValue={setValue}
              control={control}
              setError={setError}
            />

            {errors.images && (
              <p className="text-red-500 text-sm">
                {errors.images.message}
              </p>
            )}

          </div>

          {/* PRICE */}
          <div className='mb-4'>

            <label htmlFor="price">
              Price (in ₹)
              <span className="text-red-500">*</span>
            </label>

            <input
              disabled={isSubmitting}
              {...register("price")}
              id='price'
              type="text"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "")
              }}
              className="w-full py-2 px-3 rounded-lg outline-none bg-white border border-gray-200"
              placeholder='Enter product price'
            />

            {errors.price && (
              <p className="text-red-500 text-sm">
                {errors.price.message}
              </p>
            )}

          </div>

          {/* SUBMIT BUTTON */}
          <div className='mb-3'>

            <SubmitButton
              isLoading={isSubmitting}
              text={'Update Product'}
            />

          </div>

        </form>

      </div>
    </>
  )
}

export default UpdateProductPage
