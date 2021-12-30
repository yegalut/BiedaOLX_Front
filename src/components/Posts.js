
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Post from './Post';

const Posts = ({posts, loadMorePosts, moreAvailable, page}) => {
    

    //return posts.map((post, index)=>(<Post key={index} post={post} length={posts.length}/>));

    const onClick = () =>{
        loadMorePosts();
    }
  
    return (
        <div>
            {posts.map((post, index)=>(<Post key={index} post={post} length={posts.length}/>))}
            <br></br>

            {moreAvailable && <button className="loadMoreButton" onClick={()=> onClick()}>Load more posts</button>}
        </div>
    )
}

export default Posts

