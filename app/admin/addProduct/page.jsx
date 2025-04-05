'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Alex Bennett",
        authorImg: "/author_img.png"
    })


    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=> ({...data, [name]:value}))
        console.log(data);
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('category', data.category)
        formData.append('author', data.author)
        formData.append('authorImg', data.authorImg)
        formData.append('image', image)

        const response = await axios.post('/api/blog', formData)
        if(response.data.success){
            toast.success(response.data.msg)
            setImage(false)
            setData({
                title: "",
                description: "",
                category: "Startup",
                author: "Alex Bennett",
                authorImg: "/author_img.png"
            })
        }else{
            toast.error("Error")
        }
    }

  return (
    <>
    <div>
        <form onSubmit={onSubmitHandler} className='pt-5 px-2 sm:pt-12 sm:pl-16' action="">
            <p className='text-xl'>Update thumbnail</p>
            <label htmlFor="image">
                <Image className='mt-4' src={!image?assets.upload_area:URL.createObjectURL(image)} width={140} height={70} alt='' />
            </label>
            <input onChange={(e)=> setImage(e.target.files[0])} type="file" name="image" id='image' hidden required />

            <p className='text-xl mt-4'>Blog title</p>
            <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-4 border border-gray-500 rounded-xl' type="text" placeholder='type here' required />
       
            <p className='text-xl mt-4'>Blog Description </p>
            <textarea onChange={onChangeHandler} name='description' value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-4 border border-gray-500 rounded-xl' type="text" placeholder='write content here' rows={6} required >
 
                </textarea>
       
            <p className='text-xl mt-4'>Blog Category </p>
            <select name="category" onChange={onChangeHandler} value={data.category} id="" className='w-40 mt-4 px-4 py-3 rounded-xl border border-gray-500'>
                <option value="Startup">Startup</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
            </select>

            <br />
            <button className='mt-8 w-40 rounded-xl h-12 bg-black text-white '>Post</button>
        </form>
    </div>

    </>
  )
}

export default page