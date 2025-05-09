import React from 'react'
import { FiMenu } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { UserState } from '../../Context/Usercontext'
import logo from '../../assets/logo.png'

const Navbar = ({ toggleMenu }) => {

    const { user, custData } = UserState();

    const imgUrl = import.meta.env.VITE_APP_IMAGE;

    return (
        <>
            <div className="bg-white shadow-md sticky top-0 z-40 flex items-center justify-between px-4 gap-5 md:px-6 lg:px-10 h-[8vh]">
                <div className="flex place-items-center lg:gap-4 md:gap-5 gap-3">
                    <button onClick={toggleMenu} className="block text-2xl">
                        <FiMenu />
                    </button>
                    <Link >
                        <img src={logo} alt="" className='h-16 object-contain w-60' />
                    </Link>
                </div>
                <div className="flex items-center gap-10">

                    {/* <div className="flex flex-row gap-5">
                        <button className="" onClick={() => setNoti(true)}><BellDot size={20} /></button>
                    </div> */}
                    {user &&
                        <>
                            <Link to={user?.role === 'seller' ? '/artist/my-profile' : '/admin/my-profile'} className='text-black xl:hidden block font--medium text-base line-clamp-1 capitalize'>{custData?.name}</Link>
                            <div className="xl:flex hidden flex-row place-items-center gap-4  group relative " >
                                {/* {user?.role == 'seller' &&
                                    <>
                                        {custData?.customer_profile ?
                                            <img src={custData?.customer_profile} alt="" className='h-12 w-12 rounded-full object-cover aspect-square hidden md:block' />
                                            :
                                            <h1 className='bg-black text-white rounded-full aspect-square h-10 w-10 font--medium flex justify-center capitalize place-items-center'>{custData?.first}</h1>
                                        }
                                    </>
                                }
                                {user?.role == 'superadmin' &&
                                    <>
                                        {custData?.user_profile ?
                                            <img src={custData?.user_profile} alt="" className='h-12 w-12 rounded-full object-cover aspect-square hidden md:block' />
                                            :
                                            <h1 className='bg-black text-white rounded-full aspect-square h-10 w-10 font--medium flex justify-center capitalize place-items-center'>{custData?.first}</h1>
                                        }
                                    </>
                                } */}
                                {custData?.image ?
                                    <img loading="lazy" src={imgUrl + custData?.image} alt="" className='h-12 w-12 rounded-full object-cover aspect-square' />
                                    :
                                    <img loading="lazy" id="profile_5" src={`https://ui-avatars.com/api/?name=${custData?.name}&size=20`}
                                        className="h-12 w-12 aspact-square rounded-full object-cover" alt="" />
                                }
                                <div className="flex flex-col">
                                    <h1 className='text-black font--medium text-base line-clamp-1 capitalize'>{custData?.name}</h1>
                                    {/* <span>{user.role === 'seller' && 'Artist'}</span> */}
                                </div>
                                {/* <div className="group-hover:rotate-180 transition-all duration-300 ease-out">
                                    <ChevronUp />
                                </div>
                                <div ref={dropdownRef} onMouseLeave={() => { setTimeout(() => { setDrop(false); }, 1000); }} className={`absolute flex-col bg-white top-14 -left-10 w-fit text-nowrap rounded-lg overflow-hidden transition-all duration-300 ease-out ${drop ? 'flex' : 'hidden'}`}>
                                    <Link onClick={() => setDrop(false)} to={user?.role === 'seller' ? '/artist/my-profile' : '/admin/my-profile'} className='hover:bg-gray-200 transition-all duration-300 ease-out px-3 py-2 text-base flex flex-row gap-4'><User />My Profile</Link>
                                    <Link className='hover:bg-gray-200 transition-all duration-300 ease-out px-3 py-2 text-base flex flex-row gap-4' onClick={logout}><LogOut />Logout</Link>
                                </div> */}
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar
