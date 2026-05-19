import { Outlet } from "react-router-dom"
import Sidebar from "../components/ReactProSidebar"

const SidebarLayout = () => {

  return (

    <div className='flex bg-white'>

      <Sidebar />

      <main className="flex-1 p-8 mt-5 overflow-x-hidden ">
        <Outlet />
      </main>

    </div>

  )

}

export default SidebarLayout