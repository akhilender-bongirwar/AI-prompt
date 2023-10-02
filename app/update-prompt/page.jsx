"use client"

import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [posts, setPosts] = useState({
        prompt:"",
        tag:"",
    })

    useEffect(()=>{
        const getPromptDetails = async ()=>{
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPosts({
                prompt:data.prompt,
                tag:data.tag, 
            })
        }
        if(promptId) getPromptDetails();
    },[promptId])

    const updatePrompt = async (e) =>{
        e.preventDefault();
        setSubmitting(true);
        if(!promptId) return alert("Prompt Id is not found");

        try {
            const response  = await fetch(`/api/prompt/${promptId}`,{
                method:'PATCH',
                body: JSON.stringify({  
                    prompt: posts.prompt,
                    tag:posts.tag,
                })
            })
            if(response.ok){
                router.push('/');
            }

        } catch (error) {
            console.log(error);
        } finally{
            setSubmitting(false);
        }
    }
  return (
    <Form 
        type="Edit"
        post={posts}
        setPost={setPosts}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt