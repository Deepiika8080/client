"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";

interface Props {}

const Page: FC<Props> = () => {  
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [activeItem, setActiveItem] = useState(0);
 
  return (
    <>
      <Heading 
        title="ELearning"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Waste,MERN,Redux,Machine Learning"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      /> 
       <Hero />
       <div>Ahain</div>
    </>
  );
};

export default Page;

