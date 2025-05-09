import React from 'react'
import Title from '../../../Role/Components/Title'
import img from '../../../assets/listing.svg'
import { Link } from 'react-router-dom';

const Listing = () => {

    const formList = [
        {
            name: 'Interview Evaluation',
            to: 'interview-evaluation',
        },
        {
            name: 'Offer Letter',
            to: 'offer-letter',
        },
        {
            name: 'Employee Joining',
            to: 'employee-joining',
        },
        {
            name: 'Employee Master Record',
            to: 'employee-master-record',
        },
        {
            name: 'Leave Request',
            to: 'leave-request',
        },
        {
            name: 'Late Coming Request',
            to: 'late-coming-request',
        },
        {
            name: 'Resignation',
            to: 'resignation',
        },
        {
            name: 'Employee Engagement Activity',
            to: 'employee-engagement-activity',
        },
        {
            name: 'Complaint / Grievance',
            to: 'complaint-grievance',
        },
        {
            name: 'Performance Appraisal',
            to: 'performance-appraisal',
        },
    ];


    return (
        <>
            <div className="">
                <Title title='Listing' />
                {/* <div className="flex justify-center place-items-center flex-col">
                    <img src={img} alt="" className='aspect-video h-80'/>
                </div> */}
                <div className="mt-6 flex flex-row flex-wrap gap-6">
                    {formList.map((list, i) => (
                        <Link to={list.to} key={i} className={`border border-neutral-300 px-3 py-2 rounded-lg text-neutral-500 font-medium hover:border-primary hover:shadow-primary hover:text-primary`}>{list.name}</Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Listing
