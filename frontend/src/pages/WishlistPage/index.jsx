import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { IoMdTrash } from 'react-icons/io'
import { Link } from 'react-router-dom'
import LoaderComponent from '../../components/LoaderComponent'
import { axiosClient } from '../../utils/axiosClient'
import toast from 'react-hot-toast'
import emptyWishlist from '../../assets/emptyWishlist.jpg'

const WishListPage = () => {

    const [loading,setLoading] = useState(true)
    const [products,setProducts] = useState([])
    
    const fetchAllProducts=async()=>{
        try {
            setProducts([])
            const response =await axiosClient.get("/wishlist/get")
            const data = response.data 
            setProducts(data)
            
        } catch (error) {
            toast.error(error?.response?.data?.detail || error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
      fetchAllProducts()
    },[])

    if(loading){
        return <div className='flex items-center justify-center min-h-56'>
            <LoaderComponent/>
        </div>
    }


  return (
    <>
    <div className="mb-10">

  <h1 className="text-3xl md:text-4xl font-bold text-black">
    My Wishlist
  </h1>

  <p className="text-zinc-500 mt-2">
    Save products you love for later.
  </p>

</div>
<section className="text-gray-600 body-font">
  <div className="w-full px-4 md:px-6 py-10">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {
                        products.length>0 ? <>
                                    {
                                        products.map((cur,i)=>{
                                            return <Card fetchAllProducts={fetchAllProducts} key={i} data={cur} />
                                        })
                                    }

                        </> :<>
                          <div className="w-full py-10 text-center col-span-4 flex flex-col md:flex-row justify-center items-center">
                            <img src={emptyWishlist} className='h-20 lg:h-50 w-32 sm:w-40 lg:w-72' alt="" />
                            <div className='flex flex-col'>
                                <h3 className="text-2xl sm:text-4xl font-bold text-black">
                                   Empty
                                </h3>
                                <p className="text-zinc-500 mt-3">
                                  Save products to view them later.
                                </p>
                              </div>
                          </div>
                        </>
                    }
     
    </div>
  </div>
</section>

    </>
  )
}

export default WishListPage


const Card=({data,fetchAllProducts})=>{
    
    const [loading,setLoading] = useState(false)

    const deleteHandler = async()=>{
        try {
            setLoading(true)
            const response =await axiosClient.delete("/wishlist/delete/"+data._id)
            const datas = response.data 
            await fetchAllProducts()
            toast.success(datas.msg)
            
        } catch (error) {
            toast.error(error?.response?.data?.detail || error.message)
            
        }finally{
            setLoading(false)
        }
    }

    
    return <>
            <Link
                  to={'/product/' + data.slug}
                  className="
                  group
                  bg-white
                  border
                  border-gray-200
                  rounded-3xl
                  overflow-hidden
                  hover:shadow-xl
                  transition-all
                  duration-300
                  "
                >

                  <div className="relative bg-gray-50 p-3 md:p-6">

                    <img
                      className="
                      w-full
                      h-43
                      md:h-56
                      object-contain
                      group-hover:scale-105
                      transition-all
                      duration-300
                      "
                      src={data.image}
                      alt={data.title}
                    />

                    <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          deleteHandler()
                        }}
                        disabled={loading}
                        className="
                        absolute
                        top-1
                        right-1
                        md:top-4
                        md:right-4
                        h-8
                        w-8
                        md:w-10
                        md:h-10
                        rounded-full
                        bg-gray-200
                        text-black
                        shadow-md
                        flex
                        items-center
                        justify-center
                        hover:bg-black
                        hover:text-white
                        transition-all
                        duration-300
                        cursor-pointer
                        "
                      >
                        <IoMdTrash className="text-base md:text-xl" />
                      </button>

                    </div>

                    <div className="p-5">

                      <p className="uppercase tracking-wide md:tracking-[0.2em] text-xs text-zinc-400 mb-2">
                             {data.main_category?.replaceAll("_"," ")}

                              {" > "}

                              {data.sub_category?.replaceAll("_"," ")}
                      </p>

                      <h2 className="text-lg font-semibold text-black line-clamp-2 ">
                        {data.title}
                      </h2>

                      <div className="mt-5 flex items-center justify-between">

                        <p className="text-sm text-zinc-500">
                          {moment(data.created_at).format("LL")}
                        </p>

                      </div>

                    </div>

                  </Link>
    </>
}