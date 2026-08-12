import React, { useState } from 'react'
import { useRef } from 'react';
const ResetPasword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false)
    const inputRefs = useRef([]);
    const [isOtpVerified, setIsOtpVerified] = useState(false)

    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    }
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }
    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text');
        const pasteArray = paste.split('');
        pasteArray.forEach((char, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = char;
            }
        });

    }
    const onSubmitEmail = (e) => {
        e.preventDefault();
    }
    const onSubmitNewPassword = (e) => {
        e.preventDefault();

    }
    const onSumbitOtp = (e) => {
        e.preventDefault();
    }
    return (
        <div className='flex items-center justify-center min-h-screen  bg-gray-100' >
            {/* Enter Email to change the password */}
            {!isEmailSent && <form onSubmit={onSubmitEmail} className='sm:w-[350px] w-full text-center border border-gray-300/60  rounded-2xl px-8 bg-white py-10'>
                <h1 className="text-gray-900  text-2xl mb-2 font-medium">Reset Password</h1>
                <p className='text-center mb-6 text-sm text-gray-600 '>Enter your registered email address.</p>
                <div className='mb-4   py-2.5 rounded-full bg-white '>

                    <input type="email" placeholder='Email id' className='bg-transparent  px-4  outline-none text-black w-full p-1.5 rounded-full '
                        value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <button className='w-full py-2.5 bg-gradient-to-r from-green-500 to-green-500 font-bold text-white rounded-full'>Submit</button>
            </form>
            }

            {/* Enter Otp */}
            {isEmailSent && !isOtpVerified &&
            <form onSubmit={onSumbitOtp} className='sm:w-[350px] w-full text-center border border-gray-300/60  rounded-2xl px-3  bg-white py-10'>
                <h1 className='text-black text-2xl  text-center mb-2'>Reset Password OTP</h1>
                <p className='text-center mb-6 text-gray-500 text-sm'>Enter the 6-digit code sent to your email.</p>
                <div className='flex justify-between  mb-8 ' onPaste={handlePaste}
                >
                    {Array(6).fill(0).map((_, index) => (
                        <input type="text" maxLength='1' key={index} required
                            className='w-11 h-11  bg-gray-50 text-black  text-center text-xl rounded-lg  shadow-md '
                            ref={e => inputRefs.current[index] = e}
                            onInput={(e) => handleInput(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </div>
                <button className='w-full py-2.5 bg-green-500 font-bold textto-r from-green-500 to-green-900 text-white rounded-full'>
                    Verify OTP</button>
            </form>
            }
            {/* Enter new Password */}
            {isOtpVerified && 
            <form onSubmit={onSubmitNewPassword} className='sm:w-[350px] w-full text-center border border-gray-300/60  rounded-2xl px-8 bg-white py-10'>
                <h1 className="text-gray-900  text-2xl mb-2 font-medium">New Password</h1>
                <p className='text-center mb-6 text-sm text-gray-600 '>Enter your new password below.</p>
                <div className='mb-4 w-full  py-2.5 rounded-full bg-white'>
                    <input type="password" placeholder='Password' className='bg-transparent px-6  outline-none text-black w-full p-1.5 rounded-full '
                        value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button className='w-full py-2.5 bg-gradient-to-r from-green-500 to-green-500 font-bold text-white rounded-full'>Submit</button>
            </form>
            }
        </div>
    )
}

export default ResetPasword
