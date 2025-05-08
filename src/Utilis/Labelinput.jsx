import React, { useEffect, useRef, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import "react-phone-input-2/lib/style.css";

const Labelinput = ({ label, type, setMobile, value, error, disable, setOtpdata }) => {

    const [country, setCountry] = useState('91');
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputs = useRef([]);

    const handlePhoneChange = (phone, country) => {
        if (!country || !country.dialCode) return;
        setCountry(country.dialCode)
        setMobile(phone.replace(country?.dialCode, ''))
    };

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/, ''); // allow only digits
        if (!value) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (newOtp.every(val => val && val.length === 1)) {
            setOtpdata(newOtp);
        } else {
            setOtpdata(null);
        }
        // Move to next input
        if (index < 5) inputs.current[index + 1].focus();
    };

    const handleBackspace = (e, index) => {
        if (e.key === 'Backspace') {
            const newOtp = [...otp];

            if (otp[index]) {
                // Clear current digit
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                // Move focus to previous if current is empty
                inputs.current[index - 1].focus();
                const updatedOtp = [...otp];
                updatedOtp[index - 1] = '';
                setOtp(updatedOtp);
            }

            if (newOtp.every(val => val && val.length === 1)) {
                setOtpdata(newOtp);
            } else {
                setOtpdata(null);
            }

        }
    };

   


    return (
        <>
            <div className="flex flex-col gap-1">
                <span className='text-sm  text-neutral-500'>{label}</span>
                {type == 'mobile' ?
                    <div
                        className="flex items-center border rounded-md focus-within:border-black ps-2"
                    >
                        <PhoneInput
                            country={"in"}
                            value={country + value}
                            onChange={(phone, country) => handlePhoneChange(phone, country)}
                            inputClass="!bg-transparent !text-[#222] !outline-none !border-none !text-base !px-10 !important "
                            buttonClass="!bg-transparent !border-none "
                            dropdownClass="hidden"
                            onlyCountries={["in"]}
                            disableDropdown={true}
                            countryCodeEditable={false}
                            // enableSearch={true}
                            disabled={disable}
                        />
                    </div>
                    : type == 'otp' &&
                    <div className="flex gap-2 w-full mt-2">
                        {otp.map((digit, idx) => (
                            <input
                                key={idx}
                                ref={el => inputs.current[idx] = el}
                                type="text"
                                maxLength="1"
                                className="border text-center rounded-md text-lg w-full aspect-square"
                                value={digit}
                                onChange={e => handleChange(e, idx)}
                                onKeyDown={e => handleBackspace(e, idx)}
                            />
                        ))}
                    </div>
                }
                {error &&
                    <span className='text-sm text-red-500'>{error}</span>
                }
            </div>
        </>
    )
}

export default Labelinput
