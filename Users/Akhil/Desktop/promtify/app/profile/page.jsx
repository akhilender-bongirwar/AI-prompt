"use client"

import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyProfile = () => {
    const router = useRouter();
    const {data:session} = useSession();
    const [post, setAllPost] = useState([]);

    const fetchPosts = async () =>{
        const res = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await res.json();
        setAllPost(data);
      }
    
      useEffect(()=>{
        if(session?.user.id) fetchPosts();
      },[]);
    
    const handleEdit = (post) =>{
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post)=>{
        const hasConfirmed  = confirm("Are you sure you want to delete this prompt?");

        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method: 'DELETE'
                });
                
                const filteredPost = post.filter((pt)=>{
                    pt._id !== post._id;
                });
                setAllPost(filteredPost);
            } catch (error) {
                console.log(error);
            }
        }
    }

  return (
    <Profile
     name="My"
     desc="Welcome to My profile page"
     data={post}
     handleEdit={handleEdit}
     handleDelete={handleDelete}
    />  
  )
}

export default MyProfile