"use client"
import Image from "next/image";
import Header from "@/Components/Header";
import BlogItem  from "@/Components/BlogItem";
import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";

export default function Home() {
  return (
  <div>
  <Header />
  
  <BlogList />
  <Footer />
  </div>
  );
}
