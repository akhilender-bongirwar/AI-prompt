"use client";

import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {signIn, signOut, getProviders} from "next-auth"

const Nav = () => {
    const [isUserLoggedIn, setIsUserLoggedin] = useState(true);
    const [providers, setProviders] = useState(null);
    const [toggle, setToggle] = useState(false);

    useEffect(()=>{
        const setProvider = async ()=>{
            const response = await getProviders();
            setProviders(response);
        }
        setProvider();
    },[])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href="/" className='flex gap-2 flex-center'>
            <Image 
                src="/assets/images/logo.svg"
                alt='promptify'
                width={30}
                height={30}
                className='object-contain'
            />
            <div>
            <p className='logo_text'>Promptify</p>
            </div>
        </Link>
        {/* For larger device */}
            <div className='sm:flex hidden'>    
                {isUserLoggedIn ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/create-prompt" className='black_btn'>
                            Create Post
                        </Link>
                        <button type='button' onClick={signOut} className='outline_btn'>
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image src="/assets/images/logo.svg"
                            alt='profile'
                            width={35}
                            height={35}
                            className="rounded-full"
                            />
                        </Link>
                    </div>
                ):(
                    <>
                    {providers && 
                        Object.values(providers).map((provider)=>(
                            <button type='button' key={provider.name} onClick={()=>{
                                signIn(provider.id)}} className='black_btn' >
                                Sign In
                            </button>
                        )       
                    )}
                    </>
                )}
            </div>

            {/* Mobile Nav */}
            <div className='sm:hidden flex relative'>
              {isUserLoggedIn ? (
                <div className='flex'>
                <Image 
                src="/assets/images/logo.svg"
                alt='profile'
                width={30}
                height={30}
                className='rounded-full'
                //onClick={()=>{setToggle(!toggle)}} wrong cant change the toggle like that
                onClick={()=> setToggle((prev)=> !prev)}
              />
                {toggle && (
                    <div className='dropdown'>
                        <Link href="/profile" 
                        className='dropdown_link'
                        onClick={()=>{setToggle(false)}}
                        >
                        My Profile
                        </Link>
                        <Link href="/create-prompt" 
                        className='dropdown_link'
                        onClick={()=>{setToggle(false)}}
                        >
                        Create prompt
                        </Link>
                        <button type='button' onClick={()=>{
                            setToggle(false);
                            signOut();
                        }} className='mt-5 w-full black_btn'>
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
              ):(
                <>
                    {providers && 
                        Object.values(providers).map((provider)=>(
                            <button type='button' key={provider.name} onClick={()=>{
                                signIn(provider.id)}} className='black_btn' >
                                Sign In
                            </button>
                        )       
                    )}
                </>
              )
              }
            </div>
    </nav>
  )
}

export default Nav