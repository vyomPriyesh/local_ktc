import React, { useEffect, useState } from 'react'
import Labelinput from '../Utilis/Labelinput'
import API from '../Apis/Apis';
import * as Yup from "yup";
import { showToast } from '../Utilis/showToast';
import { UserState } from '../Context/Usercontext';
import { apiFunction } from '../Apis/Apifunction';


const Login = () => {

    const { AUTH } = API;
    const { setUser } = UserState();
    const { apiPost } = apiFunction();
    

    const [mobile, setMobile] = useState(null);
    const [errors, setErrors] = useState({});
    const [edit, setEdit] = useState(false);
    const [otpData, setOtpdata] = useState(null)
    const [otpStart, setOtpstart] = useState(false)
    const [count, setCount] = useState(30);

    const step1Schema = Yup.object().shape({
        mobile: Yup.string()
            .required("Phone No is required")
            .matches(/^[0-9]{10}$/, "Phone No must be exactly 10 digits"),
    });

    const handleSubmit = async () => {

        const payload = {
            mobile: mobile
        }

        try {

            await step1Schema.validate({ mobile }, { abortEarly: false });
            const response = await apiPost(AUTH?.sendOtp, payload);

            if (response.success) {
                setOtpstart(true);
                setCount(30);
                setEdit(true)
                showToast({ success: response.success, msg: response.otp })
            } else {
                showToast({ success: false, msg: response.message })
            }

        } catch (err) {
            if (err.status == 404) {
                showToast({ success: false, msg: err.response.data.message })
            }
            const newErrors = {};
            if (err.inner) {
                err.inner.forEach((error) => {
                    newErrors[error.path] = error.message;
                });
            }
            setErrors(newErrors);
        }
    }

    useEffect(() => {
        if (edit) {
            setEdit(false)
        }
    }, [mobile])

    useEffect(() => {
        let timer;
        if (otpStart && count > 0) {
            timer = setTimeout(() => setCount(count - 1), 1000);
        } else if (count === 0) {
            setOtpstart(false); // Enable resend
        }
        return () => clearTimeout(timer);
    }, [otpStart, count]);


    const verifyOtp = async () => {

        const payload = {
            mobile: mobile,
            otp: otpData.map(list => list).join("")
        }

        const response = await apiPost(AUTH?.login, payload);

        if (response.success) {
            setEdit(false)
            setUser({
                ...response.data.user,
                token: response.data.token

            })
        }

    }

    return (
        <>
            <div className="h-dvh bg-slate-200 flex justify-center place-items-center px-10 md:px-0">
                <div className="shadow-2xl p-5 bg-white rounded-lg xl:w-1/5 lg:w-1/3 md:w-1/2 w-full">
                    <h1 className='text-[#e74c3c] font-semibold text-2xl'>Login</h1>
                    <div className="mt-5 w-full">
                        <Labelinput error={errors?.mobile} label='Mobile No.' type='mobile' value={mobile} setMobile={setMobile} />
                        {edit &&
                            <Labelinput error={errors?.mobile} type='otp' setOtpdata={setOtpdata} />
                        }
                    </div>
                    {edit && (
                        <div className="text-sm text-gray-600 mt-2">
                            {otpStart
                                ? `Resend OTP in 00:${count < 10 ? `0${count}` : count}`
                                : <button onClick={handleSubmit} className="text-blue-600 underline">Resend OTP</button>
                            }
                        </div>
                    )}
                    <div className="mt-5">
                        {edit ?
                            <button disabled={otpData?.length !== 6} onClick={verifyOtp} className={`w-full ${otpData?.length == 6 ? 'bg-[#e74c3c]' : 'bg-[#eb7366]'}  text-white font-medium py-2 rounded-lg`}>Verify OTP</button>
                            :
                            <button onClick={handleSubmit} className='w-full bg-[#e74c3c] text-white font-medium py-2 rounded-lg'>Send OTP via WhatsApp</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
