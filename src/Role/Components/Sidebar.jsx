import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { UserState } from '../../Context/Usercontext';
import { MdKeyboardArrowDown, MdKeyboardArrowRight, MdLogout } from 'react-icons/md';

const Sidebar = ({ isExpanded, toggleMenu, links }) => {

    const { logout } = UserState();
    const path = useLocation()

    const getActive = (i) => {
        console.log(i)
        return path?.pathname?.includes(i)
    }

    const [openDropdown, setOpenDropdown] = useState(null); // Track which submenu is open

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const change = () => {
        setOpenDropdown(null);
        if (window.innerWidth <= 999) toggleMenu()
    }

    return (
        <>
            <div className="mt-5 pb-28 md:pb-10 px-3 space-y-2">
                {links.map((list, index) => (
                    list.submenu ? (
                        <div key={index} className="space-y-1">
                            <div
                                onClick={() => toggleDropdown(index)}
                                className={`${getActive(list.to) ? 'bg-primary text-white font-semibold' : ''} flex items-center cursor-pointer mb-1 overflow-hidden rounded-lg hover:scale-105 hover:shadow-2xl transition-all duration-100 ease-out py-2`}
                            >
                                <div className={`flex justify-center ${isExpanded ? 'px-2' : 'w-full'}`}>
                                    <list.icon className="text-xl" />
                                </div>
                                {isExpanded && (
                                    <span className={` flex items-center justify-between w-full text-sm capitalize pr-2`}>
                                        {list.name}
                                        <h1>
                                            {openDropdown === index ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                                        </h1>
                                    </span>
                                )}
                            </div>
                            <ul
                                className={`ml-4 space-y-1 list-disc list-inside transition-height  flex flex-col ${openDropdown === index && isExpanded ? 'max-h-screen' : 'max-h-0'
                                    }`}
                            >
                                {list.submenu.map((sublink, subIndex) => (
                                    <li>
                                        <NavLink
                                            to={list.role + '/' + sublink.to}
                                            key={subIndex}
                                            className={({ isActive }) =>
                                                `${isActive ? 'text-primary font-medium' : 'text-gray-600'} text-sm hover:text-primary transition-all`
                                            }
                                        >
                                            {sublink.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <NavLink
                            to={list.too ? list.link : list.role + '/' + list.to}
                            target={list.too ? '_blank' : '_self'}
                            key={index}
                            className={({ isActive }) =>
                                `${isActive || getActive(list.to) ? 'bg-primary text-white font-semibold ' : ''} flex items-center mb-3 overflow-hidden rounded-lg hover:scale-105 hover:shadow-2xl transition-all duration-100 ease-out py-2`
                            }
                            onClick={change}
                        >
                            <div className={`flex justify-center ${isExpanded ? 'px-2' : 'w-full'}`}>
                                <list.icon className="text-xl" />
                            </div>
                            {isExpanded && <span className="text-sm capitalize">{list.name}</span>}
                        </NavLink>
                    )
                ))}

                <h1
                    onClick={logout}
                    className="flex items-center mb-3 cursor-pointer overflow-hidden rounded-lg hover:scale-105 hover:shadow-2xl transition-all duration-100 ease-out py-2"
                >
                    <div className={`flex justify-center ${isExpanded ? 'px-2' : 'w-full'}`}>
                        <MdLogout />
                    </div>
                    {isExpanded && <span className="text-sm capitalize">Log Out</span>}
                </h1>
            </div>
        </>
    )
}

export default Sidebar
