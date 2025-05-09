import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Hrdashboard from '../Panels/Hr/Pages/Hrdashboard';
import { LuLayoutDashboard } from 'react-icons/lu';
import Listing from '../Panels/Hr/Pages/Listing';
import { CiBoxList } from 'react-icons/ci';
import { TfiLayoutListThumb } from 'react-icons/tfi';

const Hr = () => {

    const [isExpanded, setIsExpanded] = useState(true);

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    };


    const links = [
        { name: "Dashboards", to: "dashboard", icon: LuLayoutDashboard, role: '/hr' },
        {
            name: "Listing", to: "listing", icon: TfiLayoutListThumb, role: '/hr', submenu: [
                {
                    name: 'Interview Evaluation',
                    to: 'listing/interview-evaluation',
                },
                {
                    name: 'Offer Letter',
                    to: 'listing/offer-letter',
                },
                {
                    name: 'Employee Joining',
                    to: 'listing/employee-joining',
                },
                {
                    name: 'Employee Master Record',
                    to: 'listing/employee-master-record',
                },
                {
                    name: 'Leave Request',
                    to: 'listing/leave-request',
                },
                {
                    name: 'Late Coming Request',
                    to: 'listing/late-coming-request',
                },
                {
                    name: 'Resignation',
                    to: 'listing/resignation',
                },
                {
                    name: 'Employee Engagement Activity',
                    to: 'listing/employee-engagement-activity',
                },
                {
                    name: 'Complaint / Grievance',
                    to: 'listing/complaint-grievance',
                },
                {
                    name: 'Performance Appraisal',
                    to: 'listing/performance-appraisal',
                },
            ],

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
                        <div className="bg-white p-5 rounded-lg shadow-[0px_2px_14px_rgba(0,0,0,0.1)]">
                            <Routes>
                                <Route path="/" element={<Hrdashboard />} />
                                <Route path="/dashboard" element={<Hrdashboard />} />
                                <Route path="/listing" element={<Listing />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hr
