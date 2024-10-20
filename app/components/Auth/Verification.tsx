import React, { FC, useEffect, useRef, useState } from 'react'
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { styles } from "../../styles/style";
import { useSelector } from 'react-redux';
import { useActivationMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';


type Props = {
  setRoute?: (route: string) => void;
};

type VerifyNumber = {
  0: string;
  1: string;
  2: string;
  3: string;
};

type RootState = {
  auth: {
    token: string;
  };
}

type ApiError = {
    data: {
      message: string;
    }
}
const Verification: FC<Props> = ({ setRoute }: Props) => {
  const {token} = useSelector((state:RootState) => state.auth);
  const [activation,{isSuccess,error}] = useActivationMutation();
  const [invalidError, setInvalidError] = useState<boolean>(false);

  useEffect(() => {
    if(isSuccess) {
      toast.success("Account activated successfully");
      setRoute && setRoute("Login");
    };
    if(error) {
      if("data" in error) {
        const errorData = error as ApiError;
        console.log(errorData);
        toast.error(errorData.data.message);
        setInvalidError(true);
      }else {
        console.log("An error occured",error);
      }
    }
  },[isSuccess,error,setRoute]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: ""
  });

  const verificationHandler = async () => {
    const verifictaionNumber = Object.values(verifyNumber).join("");

    if(verifictaionNumber.length !== 4) {
      console.log("err");
      setInvalidError(true);
      return;
    }
    console.log("Token: ", token, "Verification Number: ", verifictaionNumber);

    await activation({
      activation_token: token,
      activation_Code: verifictaionNumber
    });
  }

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  }
  return (
    <div>
      <h1 className={`${styles.title}`}>
        Verify Your Account
      </h1>
      <br />
      <div className='w-full flex items-center justify-center mt-2'>
        <div className='w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center'>
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>
      <br />
      <br />
      <div className='1100px:w-[100%] m-auto flex items-center justify-evenly'>
        {    

          Object.keys(verifyNumber).map((key, index) => {
            const numKey = parseInt(key) as keyof VerifyNumber;  // Convert key to number first
            return (
              <input
                type="text"
                key={key}
                ref={inputRefs[index]}
                className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center
                ${invalidError ? "shake border-red-500" : "dark:border-white border-[#0000004a]"}`}
                placeholder=""
                maxLength={1}
                value={verifyNumber[numKey]}  
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            );
          })
        }
      </div>
      <br />
      <br />
      <div className='w-full flex justify-center'>
        <button
          className={`${styles.button}`}
          onClick={verificationHandler}
        >
          Verify OTP
        </button>
      </div>
      <br />
      <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
        Go back to sign in?
        <span className='text-[#2190ff] pl-1 cursor-pointer' onClick={() => setRoute && setRoute("Login")}> Sign in </span>
      </h5>
    </div>
  )
}

export default Verification;