"use client"
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard';


const PromptCardList = ({data, handleTagClick})=>{
  // console.log(data);
    return(
        <div className='mt-16 prompt_layout'>
        {data.map((post)=>(<PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>
        ))}
      </div>  
    )
}


const Feed = () => {
  const [searchTxt, setSearchTxt] = useState('');
  const [allPost, setAllPost] = useState([]);
  const handleChange= ()=>{
    
  }
  const fetchPosts = async () =>{
    const res = await fetch('/api/prompt');
    const data = await res.json();
    setAllPost(data);
  }

  useEffect(()=>{
    fetchPosts();
  },[]);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          placeholder='Search for a tag or a username'
          value={searchTxt}
          onChange={handleChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList
        data={allPost}
        handleTagClick={()=>{}}
      />
      
    </section>
  )
}

export default Feed