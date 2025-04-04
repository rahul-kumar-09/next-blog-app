import React from "react";
import Image from "next/image";
import {assets} from "@/Assets/assets"

const Header = () => {
  return <div className="py-5 px-5 md:px-10 lg:px-20 xl:px-40">
    <div className="flex items-center justify-between">
        <Image src={assets.logo} alt="logo" width={100} height={100} className="w-[130px] sm:w-auto" />
        <button className="flex item-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-gray-300 rounded-full">
            get started <Image src={assets.arrow} alt="arrow" width={20} height={20} />
        </button>
    </div>

    <div className="text-center my-10">
      <h1 className="text-3xl font-bold sm:text-4xl "> Latest Blog </h1>
      <p className="mt-10 max-w-[740px] mx-auto text-sm sm:text-base text-gray-500 mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, rem optio ex, ipsum laudantium iste eaque laboriosam placeat expedita, voluptate praesentium ratione!</p>
      <form className="mt-10 flex items-center justify-center gap-2 max-w-[700px] mx-auto scale-75 sm:scale-100 m-auto">
        <input type="email" placeholder="Enter your email" className="w-full py-2 px-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-full">Search</button>
      </form>

    <nav className="flex items-center justify-center gap-8 mt-10">
      <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
      <a href="/blog" className="text-gray-600 hover:text-gray-900">Blog</a>
      <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
      <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
    </nav>
    
    </div>

  </div>;
};

export default Header;
