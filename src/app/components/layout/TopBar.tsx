'use client'
import React, { useState } from 'react'
import { navLinks } from '../../lib/constant'
import Image from 'next/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'

type Props = {}

const TopBar = (props: Props) => {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const pathName = usePathname();
  return (
    <div className='sticky top-0 left h-[70px] z-20 w-full  px-7 py-4 shadow-md bg-[#f2e9dd] lg:hidden'>
      <div className="flex justify-between items-center ">
       <div className="flex items-center h-[30px] py-5 gap-4">
        <Image src='/assets/images/Logo.png' alt='Accessories Hub Logo' width={30} height={20}/>
        <h1 className='uppercase text-[16px] leading-[21px] font-[700] text-[#303030]'>Accessories Hub</h1>
      </div>
      <div className="flex gap-8 max-md:hidden">
        {
          navLinks.map((navlink) =>
          <Link href={navlink.link} key={navlink.id} className={`flex gap-4 text-[16px] leading-[21px] font-[500] ${pathName === navlink.link ? "text-[#64330D]" : 'text-[#303030] ' }`}> <p>{navlink.label}</p></Link>
          )
        }
       
    </div>
    <div className="relative">
      <Menu className='cursor-pointer md:hidden' onClick={() => setDropDownMenu(!dropDownMenu)}/>
        {
          dropDownMenu &&  
          <div className='absolute top-[50px] right-1 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg'>
          {navLinks.map((navlink) =>
            <Link href={navlink.link} key={navlink.id} className={`flex gap-4 text-[16px] leading-[21px] font-[500]  ${pathName === navlink.link ? "text-[#64330D]" : 'text-[#303030] '}`} >{navlink.icon} <p>{navlink.label}</p></Link>
            )}
            </div>
        }
    </div>
    </div>
    </div>
  )
}

export default TopBar