"use client"
import React, { FC, useState } from 'react'
import { useSelector , shallowEqual} from 'react-redux';
import Header from '../components/Header';
import Heading from '../utils/Heading';
import Profile from '../components/Profile/Profile';
import Protected from '../hooks/useProtected';

type RootState = {
  auth: {
    user: {
      avatar?: string | null;
      name?: string;
    }
  }
}
const Page: FC = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: RootState) => state.auth , shallowEqual);
 
  return (
    <div>     
      <Protected>
       
        <Heading
          title={`${user?.name}`}
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,Redux,Machine Learning"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
      
        <Profile user={user}/>
      </Protected>
    </div>
  )
}

export default Page;