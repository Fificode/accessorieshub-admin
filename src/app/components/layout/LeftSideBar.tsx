'use client'
import Image from 'next/image'
import React from 'react'
import { navLinks } from '../../lib/constant'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


type Props = {}

const LeftSideBar = (props: Props) => {

  const pathName = usePathname();

  return (
    <div className='min-h-screen left-0 top-0 sticky p-10 flex flex-col w-[300px] gap-16 shadow-xl bg-[#f2e9dd] max-lg:hidden'>
      <div className="flex items-center h-[30px] py-5 gap-4">
        <Image src='/assets/images/Logo.png' alt='Accessories Hub Logo' width={35} height={20}/>
        <h1 className='uppercase text-[16px] leading-[21px] font-[700] text-[#303030]'>Accessories Hub</h1>
      </div>
      <div className="flex flex-col gap-12">
        {
          navLinks.map((navlink) =>
          <Link href={navlink.link} key={navlink.id} className={`flex gap-4 text-[16px] leading-[21px] font-[500] ${pathName === navlink.link ? "text-[#64330D]" : 'text-[#303030] ' } `}>{navlink.icon} <p>{navlink.label}</p></Link>
          )
        }
       
      </div>
    </div>
  )
}

export default LeftSideBar