import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import avatarIcon from "../../../public/assests/avatar.jpeg";
import { styles } from '@/app/styles/style';
import { useEditProfileMutation, useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import toast from 'react-hot-toast';
import { AiOutlineCamera } from 'react-icons/ai';

type Props = {
    avatar: string | null;
    user: {
        avatar?: string | null;
        name?: string;
        email?: string;
    }    
};
       
const ProfileInfo: FC<Props> = ({ avatar, user }) => {
    const [name, setName] = useState(user && user.name);
    const [updateAvatar,{isSuccess,error}] = useUpdateAvatarMutation();
    const [editProfile,{isSuccess:success,error:updateError}] = useEditProfileMutation();
    const [loadUser, setLoadUser] = useState(false);
    const {} = useLoadUserQuery(undefined,{skip: loadUser ? false : true});

    const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        
        if (files && files.length > 0) {
            const fileReader = new FileReader();
    
            fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                    const avatar = fileReader.result;
                    updateAvatar(avatar as string); // Type assertion to string, since FileReader result is `string | ArrayBuffer`
                }
            };
    
            fileReader.readAsDataURL(files[0]);
        } else {
            console.error("No file selected");
        }
    };

    useEffect(() => {
       if(isSuccess || success) {
           setLoadUser(true);
       }
       if(error || updateError) {
        console.log(error);
       }
       if(isSuccess) {
           toast.success("Profile updated successfully");
           setLoadUser(true);
       }
    }, [isSuccess,error,success,updateError]);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(name !== "") {
           await editProfile({
                name,
            })
        }       
    }

    return (
        <>
            <div className='w-full flex justify-center items-center flex-col'>
                <div className='relative'>
                    <Image
                        //user.avatar || avatar ? user.avatar?.url || avatar : avatarIcon.src
                        // {user.avatar.url || avatar || avatarIcon.src}
                        src={user?.avatar || avatar || avatarIcon.src}
                        alt=''
                        width={120}
                        height={120}
                        className='w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full'
                    />
                    <input
                        type='file'
                        name=''
                        id='avatar'
                        className='hidden'
                        onChange={imageHandler}
                        accept='image/png,image/jpg,image/jpeg,image/webp'
                    />
                    <label htmlFor='avatar'>
                        <div className='w-[30px] h-[30px] top-[5rem] bg-slate-900 rounded-full absolute right-2 flex items-center justify-center cursor-pointer'>
                            <AiOutlineCamera size={20} className='z-1'/>
                        </div>
                    </label>
                </div>
                <div className='w-full pl-6 800px:pl-10'>
                <form onSubmit={handleSubmit}>
                    <div className='800px:w-[50%] m-auto block pb-4'>
                        <div className='w-[100%]'>
                            <label className='block pb-2'>Full Name</label>
                            <input
                                type='text'
                                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='w-[100%] pt-2'>
                            <label className='block pb-2'> Email Address </label>
                            <input
                                type='text'
                                readOnly
                                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                                required
                                value={user?.email}
                            />
                        </div>
                        <input
                            type='submit'
                            className={`w-full 800px:w-[250px] border border-[#37a39a] mb-1 h-[40px] text-center dark:text-[#fff]
                             text-black rounded-[3px] mt-8 cursor-pointer `}
                            required
                            value="Update"
                        />
                    </div>
                </form>
                </div>
            </div>
            <br/>
            <br/>
            {/* <div className='w-full pl-6 800px:pl-10'> */}
                {/* <form onSubmit={handleSubmit}>
                    <div className='800px:w-[50%] m-auto block pb-4'>
                        <div className='w-[100%]'>
                            <label className='block pb-2'>Full Name</label>
                            <input
                                type='text'
                                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='w-[100%] pt-2'>
                            <label className='block pb-2'> Email Address </label>
                            <input
                                type='text'
                                readOnly
                                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                                required
                                value={user?.email}
                            />
                        </div>
                        <input
                            type='submit'
                            className={`w-full 800px:w-[250px] border border-[#37a39a] mb-1 h-[40px] text-center dark:text-[#fff]
                             text-black rounded-[3px] mt-8 cursor-pointer `}
                            required
                            value="Update"
                        />
                    </div>
                </form> */}
                {/* <br/>
            </div> */}
        </>
    )
}

export default ProfileInfo;