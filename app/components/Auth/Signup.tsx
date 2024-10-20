"use client"
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from "react-icons/ai"
import { FcGoogle } from 'react-icons/fc';
import { styles } from "../../styles/style";
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';

type Props = {
    setRoute?: (route: string) => void;
};

type ApiError = {
    data: {
        message: string;
    }
}
const schema = Yup.object().shape({
    name: Yup.string().required("Please enter your name!"),
    email: Yup.string().email("Invalid email!").required("Please enter your email"),
    password: Yup.string().required("Please enter your password!").min(6)
});

const SignUp = ({ setRoute }: Props) => {
    const [show, setShow] = useState(false);
    const [register,{isError,data,isSuccess,error}] = useRegisterMutation();

    useEffect(() => {
      if(isSuccess) {
        const message = data?.message || "Registration successful";
        toast.success(message);
        setRoute && setRoute("Verification");
      }
    
      if(error) {
        if("data" in error) {
            const errorData = error as ApiError;
            toast.error(errorData.data.message);
        }
      }    
    }, [isSuccess,error]);
    
    const formik = useFormik({
        initialValues: { name: "", email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({name, email, password }) => {
         
          const data = {
            name, email, password
          }

          await register(data);
        },
    });

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className='w-full'>
            <h1 className={`${styles.title}`}>
                SignUp with ELearning
            </h1>
            <form onSubmit={handleSubmit}>
                <div className='w-full mt-5 relative mb-1'>
                    <label
                        className={`${styles.label}`}
                        htmlFor="name"
                    >
                        Enter your name
                    </label>
                    <input
                        type='text'
                        name=''
                        value={values.name}
                        onChange={handleChange}
                        id='name'
                        placeholder='johndoe'
                        className={`${errors.name && touched.name && "border-red-500"
                            } ${styles.input}`}
                    />
                </div>

                {errors.name && touched.name && (
                    <span className='text-red-500 pt-2 block'>{errors.name}</span>
                )}
                <div className='w-full mt-5 relative mb-1'>
                    <label
                        className={`${styles.label}`}
                        htmlFor="email"
                    >
                        Enter your Email
                    </label>
                    <input
                        type='email'
                        name=''
                        value={values.email}
                        onChange={handleChange}
                        id='email'
                        placeholder='example@gmail.com'
                        className={`${errors.email && touched.email && "border-red-500"
                            } ${styles.input}`}
                    />
                </div>

                {errors.email && touched.email && (
                    <span className='text-red-500 pt-2 block'>{errors.email}</span>
                )}
                <div className='w-full mt-5 relative mb-1'>
                    <label
                        className={`${styles.label}`}
                        htmlFor="password"
                    >
                        Enter your password
                    </label>
                    <input
                        type={!show ? "password" : "text"}
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        id='password'
                        placeholder=''
                        className={`${errors.password && touched.password && "border-red-500"
                            } ${styles.input}`}
                    />
                    {
                        !show ? (
                            <AiOutlineEyeInvisible
                                className='absolute bottom-3 right-2 z-1 cursor-pointer'
                                size={20}
                                onClick={() => setShow(true)}
                            />
                        ) : (
                            <AiOutlineEye
                                className='absolute bottom-3 right-2 z-1 cursor-pointer'
                                size={20}
                                onClick={() => setShow(false)}
                            />
                        )
                    }
                </div>
                {errors.password && touched.password && (
                    <span className='text-red-500 pt-2 block'>{errors.password}</span>
                )}
                <div className='w-full mt-5'>
                    <input type='submit' value="SignUp" className={`${styles.button}`}  
                    />
                </div>
                <br />
                <h5 className='text-center mb-[0.5rem] font-Poppins text-[14px] text-black dark:text-white'>
                    or join with
                </h5>
                <div className='flex'>
                    <FcGoogle
                        size={30}
                        className='cursor-pointer  w-[50%] bg-[#b4b3b145] rounded-md hover:bg-[#f6f3eeb3]'
                    />
                    <AiFillGithub
                        size={30}
                        className='cursor-pointer ml-1 w-[50%] bg-[#b4b3b145] rounded-md hover:bg-[#f6f3eeb3]'
                    />
                </div>
                <h5 className='text-center pt-4 font-Poppins text-[14px]'>
                    Already have an account?{""}
                    <span
                        className='text-[#2190ff] pl-1 cursor-pointer'
                        onClick={() => setRoute && setRoute("Login")}
                    >
                        Sign in
                    </span>
                </h5>
            </form>
        </div>
    )
}

export default SignUp;