"use client"

import Profile from '@components/Profile'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const OtherProfile = ({params}) => {
    const [userPost, setAllUserPost] = useState([]);
    const searchParams = useSearchParams();
    const userName = searchParams.get('name');

    const fetchPosts = async () =>{
        const res = await fetch(`/api/users/${params?.id}/posts`);
        const data = await res.json();
        setAllUserPost(data);
      }
    
      useEffect(()=>{
        if(params?.id) fetchPosts();
      },[params.id]);

  return (
    <Profile
     name={userName}
     desc={`Welcome to ${userName} profile page. Explore ${userName}'s exclusive prompts and be inspired by their ideas`}
     data={userPost}
    />  
  )
}

export default OtherProfile