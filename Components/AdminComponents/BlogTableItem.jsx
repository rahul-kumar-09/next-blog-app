import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const BlogTableItem = ({authorImg, title, author, date, deleteBlogs, mongoId}) => {
    const blogDate = new Date(date)
  return (
    <tr className='bg-white border-b'>
        <th className='items-center gap3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap' scope='row'>
            <Image src={authorImg?authorImg:assets.profile_icon} width={40} height={40} alt='' />
            <p className='mx-3'>{author?author:"no author"}</p>
        </th>
        <td className='px-6 py-4'>
            {title?title:"no title"}
        </td>

        <td className='px-6 py-4'>
            {blogDate.toDateString()}
        </td>

        <td onClick={()=> deleteBlogs(mongoId)} className='px-6 py-4 cursor-pointer'>
            <span className='"bg-red-500 bg-black px-3 py-2 font-semibold rounded hover:bg-red-600 transition-colors"'>
                Delete
            </span>
           
        </td>
    </tr>
  )
}

export default BlogTableItem