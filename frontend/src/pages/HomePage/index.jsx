import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../utils/axiosClient'
import toast from 'react-hot-toast'
import EmptyImage from '../../assets/noProducts.png'
import { Link } from 'react-router-dom'
import LoaderComponent from '../../components/LoaderComponent'
import { CATEGORY_MAP } from '../../constant/categoryMap'
import { RiSearch2Line } from "react-icons/ri";

const HomePage = () => {
  const [intialLoading,setInitialLoading] = useState(true)
  const [products,setProducts] = useState([])
  const [search,setSearch] = useState("")
  const [main_category,setMainCategory] = useState("")
  const [sub_category,setSubCategory] = useState("")

  const fetchAllProducts =async()=>{
    try {
        const response =await axiosClient.get("/products",{params:{search,main_category,sub_category}})
        const data = response.data 
        setProducts(data)
    } catch (error) {
      toast.error(error?.response?.data?.detail || error.message)
    }finally{
      setInitialLoading(false)
    }
  }


  useEffect(()=>{
    fetchAllProducts()
  },[search, main_category, sub_category])

  if(intialLoading){
    return <div className='min-h-56 flex items-center justify-center'>
      <LoaderComponent/>
       </div>
  }

  return (
    <>
 <section className="text-gray-600 body-font mx-auto">
  <div className="container px-5 py-10 mx-auto">
                        <div className="mb-8 flex flex-col md:flex-row gap-4 bg-white p-3 rounded-2xl border border-zinc-200 shadow-sm">

                              {/* Search */}
                            <div className="relative w-full md:flex-1">
                                  <RiSearch2Line
                                    className="
                                    absolute
                                    right-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-zinc-400
                                    text-lg
                                    "
                                  />
                              <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e)=>setSearch(e.target.value)}
                                className="
                                w-full
                                md:flex-1
                                px-4
                                py-2
                                rounded-xl
                                border
                                border-zinc-300
                                focus:outline-none
                                focus:ring-1
                                focus:ring-black
                                "
                              />
                             </div>
                              {/* Main Category */}

                              <select
                                value={main_category}
                                onChange={(e)=>{
                                  setMainCategory(e.target.value)
                                  setSubCategory("")
                                }}
                                className="
                                w-full
                                md:w-60
                                px-4
                                py-2
                                rounded-xl
                                border
                                border-zinc-300
                                focus:outline-none
                                focus:ring-1
                                focus:ring-black
                                bg-white
                                hover:cursor-pointer
                                text-sm
                                "
                              >

                                <option value="">
                                  All Categories
                                </option>

                                {
                                  Object.keys(CATEGORY_MAP).map((cur)=>(
                                    <option
                                      key={cur}
                                      value={cur}
                                    >
                                      {cur.replaceAll("_"," ")}
                                    </option>
                                  ))
                                }

                              </select>

                              {/* Sub Category */}

                              <select
                                value={sub_category}
                                onChange={(e)=>setSubCategory(e.target.value)}
                                className="
                                w-full
                                md:w-72
                                px-4
                                py-2
                                rounded-xl
                                border
                                border-zinc-300
                                focus:outline-none
                                focus:ring-1
                                focus:ring-black
                                bg-white
                                hover:cursor-pointer
                                text-sm
                                "
                              >

                                <option value="">
                                  All Subcategories
                                </option>

                                {
                                  main_category &&
                                  CATEGORY_MAP[main_category]?.map((cur)=>(
                                    <option
                                      key={cur}
                                      value={cur}
                                    >
                                      {cur.replaceAll("_"," ")}
                                    </option>
                                  ))
                                }

                              </select>

                            </div>
    <div className="grid gap-3  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
          products.length>0 ?  products.map((cur,i)=>{
              return <Card key={i} data={cur} />
            }):<>
            <img src={EmptyImage} alt="Empty Image" className='mx-auto block col-span-4 w-1/4' />
            <h4 className=" text-2xl md:text-4xl text-center col-span-4 font-bold">No Products Found</h4>
            </>
          }
       
    </div>
  </div>
</section>
    </>
  )
}

export default HomePage


const Card = ({ data }) => {

  return (

    <Link
      to={'/product/' + data.slug}
      className="
      group
      block
      w-full
      bg-white
      border
      border-gray-200
      rounded-2xl
      overflow-hidden
      hover:shadow-lg
      hover:-translate-y-1
      transition-all
      duration-300
      "
    >

      {/* Image */}

      <div className="relative h-56 bg-gray-50 overflow-hidden">

        <img
          alt={data.title}
          className="
          object-contain
          w-full
          h-full
          p-4
          transition-transform
          duration-300
          group-hover:scale-105
          "
          src={data.image}
        />

      </div>

      {/* Content */}

      <div className="p-5">

        <h3 className="uppercase text-xs tracking-wide md:tracking-widest text-gray-400 mb-2">
          {data.main_category?.replaceAll("_"," ")}
          {" > "}
          {data.sub_category?.replaceAll("_"," ")}
        </h3>

        <h2 className="text-xl font-semibold text-gray-900 leading-tight break-words">
          {data.title}
        </h2>

        <div className="flex items-center justify-between mt-4">

          <p className="text-xl font-bold text-black">
            &#8377; {data.price}
          </p>

          <span className="
          text-sm
          font-medium
          text-black
          opacity-0
          translate-x-2
          group-hover:opacity-100
          group-hover:translate-x-0
          transition-all
          duration-300
          ">
            View →
          </span>

        </div>

      </div>

    </Link>

  )

}