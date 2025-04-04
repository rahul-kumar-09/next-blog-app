import { assets, blog_data } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const BlogItem = ({title, description, category, image}) => {
  return (
    <div className='max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow=[-7px_7px_0px_#000000]'>
      <Image src={image} alt='' width={400} height={400} className='border border-b border-black' /> 
      <p className='m-5 mt-5 inline-block px-1 bg-black text-white text-sm'>{category}</p>
      <div className='px-5'>
        <h5 className='text-gray-900 text-lg font-medium tracking-tight '>{title}</h5>
        <p className='text-sm tracking-tight text-gray-700'>{description}</p>
        <div className='inline-flex items-center py-2 font-semibold text-center'>
          Read more 
          <Image src={assets.arrow}  alt='' width={12} className='ml-2'/>
        </div>
      </div>

    </div>
  )
}

export default BlogItem