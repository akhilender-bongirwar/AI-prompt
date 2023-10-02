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
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResult, setSearchedResult] = useState([]);  


  const fetchPosts = async () =>{
    const res = await fetch('/api/prompt');
    const data = await res.json();
    setAllPost(data);
  }

  useEffect(()=>{
    fetchPosts(); 
  },[]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPost.filter(
      (item) =>
        regex.test(item.tag) ||
        regex.test(item.prompt) ||
        regex.test(item.creator.username)
    );
  };


  const handleChange= (e)=>{
    clearTimeout(searchTimeout);
    setSearchTxt(e.target.value);
    
    setSearchTimeout(
      setTimeout(()=>{
        const searchResult = filterPrompts(e.target.value);
        setSearchedResult(searchResult);
      },300)
      )
  }

  const handleTagClick = (tag)=>{
    setSearchTxt(tag);
    const searchResult = filterPrompts(tag);
    setSearchedResult(searchResult);
  }



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
      
  { searchTxt ? (
        <PromptCardList
        data={searchedResult}
        handleTagClick={handleTagClick}
        />
      ) :
      (<PromptCardList
        data={allPost}
        handleTagClick={handleTagClick}
      />)
    }
      
    </section>
  )
}

export default Feed