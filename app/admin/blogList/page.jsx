'use client'
import { assets } from '@/Assets/assets';
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/blog');
      if (res.data.success) {
        setBlogs(res.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
    }
  }


  const deleteBlogs = async(mongoId) => {
    try {
      const res = await axios.delete(`/api/blog?id=${mongoId}`);
      
      if (res.data.success) {
        toast.success(res.data.msg);
        // Only fetch blogs if deletion was successful
        await fetchBlogs();
      } else {
        toast.error(res.data.msg || 'Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error(error.response?.data?.msg || 'Failed to delete blog');
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, [])
  
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All blogs</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm bg-gray-700 text-left uppercase'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3'> Author name </th>
              <th scope='col' className=' px-6 py-3'> Blog title </th>
              <th scope='col' className=' px-6 py-3'> Blog Date </th>
              <th scope='col' className=' px-6 py-3'> Action </th>
            </tr>
          </thead>
          <tbody>
            {blogs && blogs.map((item, index) => (
              <BlogTableItem
                key={index}
                authorImg={item.authorImg}
                title={item.title}
                author={item.author}
                date={item.date}
                deleteBlogs={deleteBlogs}
                mongoId={item._id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page;