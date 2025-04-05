import { assets } from '@/Assets/assets';
import Sidebar from '@/Components/AdminComponents/Sidebar'
import Image from 'next/image';
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';


const layout = ({children}) => {
  return (
    <div>
      <div className='flex '>
        <ToastContainer theme='dark' />
        <Sidebar />
        <div className='flex flex-col w-full'>
          <div className='flex items-center justify-between w-full py-3 max-h-[60px] px-12 border border-black'>
            <h3 className='font-medium '>Admin Panel</h3>
            <Image src={assets.profile_icon} alt='' width={40} />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default layout;
