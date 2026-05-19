import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import LoaderComponent from '../../../components/LoaderComponent'
import { axiosClient } from '../../../utils/axiosClient'
import moment from 'moment'
import { IoMdTrash } from 'react-icons/io'
import { Link } from 'react-router-dom'

const AllProductsPage = () => {

  const [loading,setLoading]=useState(true)
  const [products,setProducts]=useState([])

  const fetchAllProducts=async()=>{
      try {
        const response=await axiosClient('/product/all-products')
        setProducts(response.data)
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
    return  <>
       <div className='min-h-[90vh] flex items-center justify-center'>
         <LoaderComponent/>
       </div>
      </> 
  }
  
  return (
    <>
   <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
               {
                        products.length>0 ? <>
                                    {
                                        products.map((cur)=>{
                                            return <Card fetchAllProducts={fetchAllProducts} key={cur.product_id} data={cur} />
                                        })
                                    }

                        </> :<>
                        <h3 className="text-4xl w-full font-bold text-center">
                            No Products Added
                        </h3>
                        </>
                    }
    </div>
  </div>
</section>

    </>
  )
}

export default AllProductsPage


 const Card = ({ data, fetchAllProducts }) => {

  const [loading, setLoading] = useState(false)

  const deleteHandler = async () => {

    try {

      setLoading(true)

      const response = await axiosClient.delete(
        "/product/delete/" + data.product_id
      )

      const resdata = response.data

      await fetchAllProducts()

      toast.success(resdata.msg)

    } catch (error) {

      toast.error(
        error?.response?.data?.detail || error.message
      )

    } finally {

      setLoading(false)

    }

  }

  return (

    <Link to={`/product/${data.slug}`} className="p-4 w-full sm:w-1/2 xl:w-1/3">

      <div className="
      h-full
      bg-white
      border
      border-gray-200
      rounded-2xl
      overflow-hidden
      hover:shadow-lg
      transition-all
      duration-300
      ">

        {/* Image */}

        <div className="h-56 bg-gray-50 overflow-hidden">

          <img
            className="
            w-full
            h-full
            object-contain
            p-2
            md:p-4
            "
            src={data.image}
            alt={data.title}
          />

        </div>

        {/* Content */}

        <div className="p-5">

          <p className="
          uppercase
          text-xs
          tracking-widest
          text-gray-400
          mb-2
          ">
            {data.main_category.replaceAll("_"," ")}
            {" > "}
            {data.sub_category.replaceAll("_"," ")}
          </p>

          <h2 className="
          text-base
          md:text-xl
          font-semibold
          text-gray-900
          line-clamp-4
          min-h-[3.5rem]
          ">
            {data.title}
          </h2>

            <div className="
                          flex
                          items-center
                          justify-between
                          mt-6
                          ">
                          
                            <p className="text-sm text-zinc-500">
                              {moment(data.created_at).format("LLL")}
                            </p>
                          
                            <div className='flex flex-col sm:flex-row items-end sm:items-center gap-2'>
                          
                              <Link
                                to={`/update-product/${data.product_id}/${data.slug}`}
                                onClick={(e) => e.stopPropagation()}
                                className="
                                flex
                                items-center
                                justify-center
                                px-3
                                md:px-4
                                h-8
                                md:h-11
                                rounded-xl
                                bg-blue-600
                                text-white
                                hover:bg-blue-700
                                transition-all
                                duration-300
                                text-sm
                                md:text-base
                                whitespace-nowrap
                                "
                              >
                                Update
                              </Link>
                          
                              <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  deleteHandler()
                                }}
                                disabled={loading}
                                className="
                                flex
                                items-center
                                justify-center
                                w-8
                                h-8
                                md:w-11
                                md:h-11
                                rounded-xl
                                bg-black
                                text-white
                                hover:bg-red-500
                                transition-all
                                duration-300
                                disabled:bg-gray-400
                                cursor-pointer
                                "
                              >
                          
                                <IoMdTrash className="text-base md:text-xl" />
                          
                              </button>
                          
                            </div>
                          
                  </div>

        </div>

      </div>

    </Link>

  )

}
