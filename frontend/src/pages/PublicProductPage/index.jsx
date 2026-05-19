import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { axiosClient } from '../../utils/axiosClient'
import toast from 'react-hot-toast'
import LoaderComponent from '../../components/LoaderComponent'
import { useAuthStore } from '../../zustand/authStore'
import clsx from 'clsx'
import { CgSpinner } from 'react-icons/cg'
import CartButton from './CartButton'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'


const PublicProductPage = () => {
  const {slug}=useParams()
  const [loading,setLoading] = useState(true)
  const [product,setProduct] = useState({})
  
  const fetchProductBySlug=async()=>{
        try {
            setLoading(true)
            const response = await axiosClient.get("/product/"+slug)
            const data = response.data
            setProduct(data)
        } catch (error) {
            toast.error(error?.response?.data?.detail || error.message)
        }finally{
            setLoading(false)
        }
    }
    
    useEffect(()=>{
        fetchProductBySlug()
    },[slug])
    
    if(loading){
        return <>
        <div className='min-h-56 flex items-center justify-center'>
      <LoaderComponent/>
       </div>
        </>
    }
    
  return (
    <>
<section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-10 mx-auto">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="w-full">

                      <Swiper
                        modules={[Pagination,Navigation]}
                        pagination={{ clickable: true }}
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation={true}
                        className="rounded-3xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm"
                      >

                        {
                          product.images?.map((img,i)=>(
                            <SwiperSlide key={i}>

                              <img
                                src={img.image_url}
                                alt={`product-${i}`}
                                className="w-full h-[350px] lg:h-[500px] object-contain p-4 lg:p-8"
                              />

                            </SwiperSlide>
                          ))
                        }

                      </Swiper>

                  </div>
      <div className="w-full flex flex-col justify-center">
        <h2 className="uppercase text-sm font-medium text-zinc-400 tracking-wide md:tracking-[0.2em] mb-4">{product.main_category?.replaceAll("_"," ")}{" > "}{product.sub_category?.replaceAll("_"," ")}</h2>
        <h1 className="text-gray-900 text-2xl lg:text-3xl break-words leading-tight font-semibold mb-1">{product.title}</h1>
        
        <p className="leading-7 md:leading-8 text-base md:text-lg text-zinc-600 mt-6 max-w-2xl whitespace-pre-wrap ">{product.description}</p>
       
        <div className="flex flex-wrap items-center gap-4 mt-10">
          <span className="title-font text-2xl sm:text-3xl font-bold text-gray-900">&#8377;{product.price}</span>
          <CartButton product_id={product._id} />
          <ToggleWishListButton product_id={product._id} />
        </div>  
      </div>
         <div>
           <p className="text-sm md:text-base text-zinc-500">
            Sold by{" "}
            <span className="font-medium text-black">
              {product?.merchant_detail?.name}
            </span>
          </p>
       </div>
    </div>
  </div>
</section>

    </>
  )
}

export default PublicProductPage


const ToggleWishListButton=({product_id})=>{

const user = useAuthStore((s)=>s.user)
const isAuthenticated=useAuthStore((s)=>s.isAuthenticated)

const [loading,setLoading] = useState(false)
const [isLiked,setIsLiked ]= useState(false)

const navigate = useNavigate()


const checkWishlistStatus=async()=>{
    if(!isAuthenticated) {
      return
    }  
    if(user?.role != 'customer') {
      return
    }  
    try {
    const response = await axiosClient.get("/wishlist/get/"+product_id)
    const data  = response.data 
    if(data.exist){
        setIsLiked(true)
    }else{
        setIsLiked(false)
    }
        
    } catch (error) {
        toast.error(error?.response?.data?.detail || error.message)
    }
}


useEffect(()=>{
    checkWishlistStatus()
},[isAuthenticated])



if (!isAuthenticated){

        return <>
        <button
          onClick={()=>{
            toast("Login Required",{icon:'ℹ️'})
            navigate("/login")
          }}
          className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 hover:cursor-pointer">
            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
        </>
}

  const toggleProductWishList = async()=>{
        if(user?.role != 'customer'){ 
              toast("Please Login With Customer Account",{icon:'ℹ️'})
              return
        }  
        try {
            setLoading(true)
            const response = await axiosClient.post("/wishlist/toggle",{product_id:product_id})
            const data = response.data 
            await checkWishlistStatus()
            toast.success(data.msg)
        } catch (error) {
            toast.error(error?.response?.data?.detail || error.message)
        }finally{
            setLoading(false)
        }
    }


return <>

   <button
   disabled={loading}
          onClick={toggleProductWishList}
          className={clsx("rounded-full w-11 h-11 bg-gray-100 hover:bg-gray-200 transition p-0 border-0 inline-flex items-center justify-center ml-4 hover:cursor-pointer",isLiked ?"text-red-500"  :"text-gray-500")}>
           {loading  ?<>
           <CgSpinner className='animate-spin text-xl' />
           
           </>: <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>}
          </button>
</>

}
