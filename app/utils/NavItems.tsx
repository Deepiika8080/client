import Link from 'next/link'
import React from 'react'

export const navItemsData = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Courses",
        url: "/courses",
    },
    {
        name: "About",
        url: "/about",
    },
    {
        name: "Policy",
        url: "/policy",
    },
    {
        name: "FAQ",
        url: "/faq",
    },
]

type Props = {
    activeItem: number,
    isMobile: boolean
}

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
    return (
        <>
            <div>
                {
                    !isMobile && 
                    navItemsData && navItemsData.map((i, index) => (
                        <Link href={`${i.url}`} key={index} passHref>
                            <span
                                className={`${activeItem === index
                                    ? "dark:text-[#37a39a] text-[crimson]"
                                    : "dark:text-white text-black"} 
                                     text-[18px] px-6 font-Poppins font-[400]`}>
                                {i.name}
                            </span>
                        </Link>
                    ))
                }
            </div>
            {
                isMobile && (
                    <div>                           
                        {navItemsData && navItemsData.map((i,index) => (
                                <Link href={`${i.url}`} key={index}>
                                <span
                                    className={`${activeItem === index
                                        ? "dark:text-[#37a39a] text-[crimson]"
                                        : "dark:text-white text-black"
                                        } block py-5 text-[18px] px-6 font-Poppins font-[400]`}>
                                   {i.name}
                                </span>
                            </Link>
                            ))}                     
                    </div>
                )
            }
        </>
    )
}

export default NavItems;