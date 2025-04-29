"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const Navbar = () => {
    const [locale,setLocale] = useState<string>("");
    const router = useRouter();

    useEffect(()=>{
    const cookieLocale = document.cookie.split("; ")
     .find((row) =>row.startsWith("MYNEXTAPP_LOCALE="))
     ?.split("=")[1];
     if(cookieLocale){
        setLocale(cookieLocale);
     }else{
        const broswerLocale = navigator.language.slice(0,2);
        setLocale(broswerLocale);
        document.cookie =`MYNEXTAPP_LOCALE = ${broswerLocale}`;
        router.refresh();
     }
    },[router]);

    const changeLocale = (newLocale:string) =>{
        setLocale(newLocale);
        document.cookie =`MYNEXTAPP_LOCALE=${newLocale}`;
        router.refresh();
    }
  return (
    <div className='py-3 flex items-center justify-between border-b'>
        <h1 className='text-lg font-bold'>LOGO</h1>
        <div className='flex item-center gap-3'>
         <Button onClick={()=> changeLocale("en")}
          className={`border p-2 font-bold rounded-md text-sm ${locale === "en" && "bg-white text-black"}`}>
            EN
         </Button>
         <Button onClick={()=> changeLocale("fr")}
          className={`border p-2 font-bold rounded-md text-sm ${locale === "en" && "bg-white text-black"}`}>
            FR
         </Button>
         <Button onClick={()=> changeLocale("ta")}
          className={`border p-2 font-bold rounded-md text-sm ${locale === "en" && "bg-white text-black"}`}>
            TA
         </Button>
        </div>
      
    </div>
  )
}

export default Navbar
