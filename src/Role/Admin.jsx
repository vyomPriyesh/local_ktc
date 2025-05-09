import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import { LuLayoutDashboard } from 'react-icons/lu';
import { Route, Routes } from 'react-router-dom';
import Admindashboard from '../Panels/Admin/Pages/Admindashboard';

const Admin = () => {

    const [isExpanded, setIsExpanded] = useState(true);

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    };


    const links = [
        {
            name: "Dashboards", to: "dashboard",
            icon: LuLayoutDashboard
        },
    ]
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                setIsExpanded(false);
            } else {
                setIsExpanded(true);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <>
            <Navbar toggleMenu={toggleMenu} />
            <div className="flex h-[92vh] overflow-hidden scroll">
                <div
                    className={`text-black lg:block hidden flex-shrink-0 transition-all duration-300 ease-in-out h-full scroll ${isExpanded ? "w-1/6" : "w-20"
                        } overflow-y-auto`}
                >
                    <Sidebar
                        isExpanded={isExpanded}
                        toggleMenu={toggleMenu}
                        links={links}
                    />
                </div>
                {isExpanded && (
                    <>
                        <div
                            className={`fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden transition-all duration-300 ease-out ${isExpanded ? "translate-x-0" : "-translate-x-5"
                                }`}
                            onClick={toggleMenu}
                        ></div>
                        <div
                            className={` text-black bg-white lg:hidden block z-50 fixed flex-shrink-0 scroll transition-all duration-300 ease-in-out h-full ${isExpanded ? "w-64" : "w-20"
                                } overflow-y-auto`}
                        >
                            <Sidebar
                                isExpanded={isExpanded}
                                toggleMenu={toggleMenu}
                                links={links}
                            />
                        </div>
                    </>
                )}
                <div className="flex-grow bg-[#F8F9FF] overflow-y-auto overflow-hidden ">
                    <div className="md:p-6 p-3">
                        <Routes>
                            <Route path="/" element={<Admindashboard />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin
