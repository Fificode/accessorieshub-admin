import Image from 'next/image'
import React from 'react'
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='fixed top-0 left-0 h-[80px] p-3 bg-white w-full shadow-md flex justify-between items-center'>
        <div className="flex items-center">
            <Image src='/assets/images/Logo.png' alt='Accessories Hub Logo' width={30} height={50}/>
            <h1 className='mx-[10px] uppercase text-[16px] md:text-[18px] leading-[21px] font-[700] text-[#303030]'>Accessories Hub Admin</h1>
        </div>
        <div className="flex items-center">
            <RegisterLink>
              <button className='mx-[10px] w-[100px] outline-none border-[2px] border-[#64330D] p-2 cursor-pointer text-[14px] md:text-[16px] leading-[21px] font-[500] text-[#303030] bg-[#f2e9dd] hover:bg-white'>
                Sign up
            </button>
            </RegisterLink>
            <LoginLink>
            <button className='mx-[5px] w-[100px] outline-none border-none p-2 cursor-pointer text-[14px] md:text-[16px] leading-[21px] font-[500] text-white bg-[#64330D] rounded-[5px] hover:bg-[#f2e9dd] hover:text-[#303030]'>
              Sign in
            </button>
            </LoginLink>
        </div>
    </div>
  )
}

export default Navbar