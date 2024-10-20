import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'
import { BiSearch } from 'react-icons/bi';



const Hero: FC = () => {
  return (
 
    <div className='w-[100vw] flex '>
      <div className="component-1 w-1/2 flex justify-center items-center">
        <Image
          src={require("../../../public/assests/banner-img-1.webp")}
          alt='Banner-image-1'
          className='object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] p-16 mb-8 pr-12 rounded-full z-[10] '
        />
      </div>
      <div className="component-2  w-1/2 flex flex-col justify-center ">
        <h1 className='dark:text-white text-[#000000c7]  px-3 w-full 1000px:text-[70px] font-[400] text-[1rem] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[]'>
          Improve Your Online Learning Experience Better Instantly
        </h1>
        <br />
        <p className='dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] pl-8 w-[90%]'>
          We have 40k+ Online courses & 500k+ Online registered student. Find your desired Courses from them.
        </p>
        <br />
          <br />
          <div className='1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative left-8'>
            <input
              type='search'
              placeholder='Search Courses...'
              className='bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin'
            />
            <div className='absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]'>
                 <BiSearch className='text-white' size={30} />
            </div>
          </div>
          <br />
          <br />
          <div className='flex 1500px:w-[55%] 1100px:w-[78%] w-[90%]  items-center pl-9'>
               <Image 
                 src={require("../../../public/assests/avatar-1.png")}
                 alt=""
                 className='rounded-full w-14'
                 />
                 <Image 
                 src={require("../../../public/assests/avatar-2.jpeg")}
                 alt=""
                className='rounded-full w-14'
                 />
                 <Image 
                 src={require("../../../public/assests/avatar-3.png")}
                 alt=""
                 className='rounded-full w-14'
                 />
                 <p>500k+ People already trusted us.{""}
                  <Link
                     href="/courses"
                     className='dark:text-[#46e256] text-[crimson] '/>
                 </p>
          </div>
      </div>
    </div>
  )
}

export default Hero;