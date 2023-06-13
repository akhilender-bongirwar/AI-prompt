"use client"

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react"

const CreatePrompt = () => {
    const router = useRouter();
    const {data:session} = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [posts, setPosts] = useState({
        prompt:"",
        tag:"",
    })
    const createPrompt = async (e) =>{
        e.preventDefault();
        setSubmitting(true);
        try {
            const response  = await fetch('/api/prompt/new',{
                method:'POST',
                body: JSON.stringify({
                    prompt: posts.prompt,
                    userId: session?.user.id,
                    tag:posts.tag,
                })
            })
            if(response.ok){
                router.push('/');
            }

        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Form 
        type="Create"
        post={posts}
        setPost={setPosts}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt