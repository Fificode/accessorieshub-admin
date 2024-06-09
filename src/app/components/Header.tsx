'use client'
import Image from 'next/image'
import React from 'react'


type Props = {}

const Header = (props: Props) => {
  return (
    <div className='md:flex md:flex-row w-full h-screen top-[80px] right-0 fixed z-[50]'>
<div className="flex flex-col items-start justify-center w-full md:w-[50%] h-[500px] bg-[#f2e9dd] px-[20px] md:px-[50px]" >
<h1 className='text-[35px] leading-[45px] md:text-[45px] md:leading-[60px] font-[700] text-[#303030] font-sans uppercase tracking-wide' >Welcome to Accessories Hub Admin</h1>

</div>
<div className="hidden md:block w-[50%] h-[500px] relative">
    <Image src='/assets/images/landingPageImage.jpeg' alt='Accessories Hub Landing page' 
      layout='fill' objectFit='cover' className='absolute inset-0 ' />
</div>
    </div>
  )
}

export default Header