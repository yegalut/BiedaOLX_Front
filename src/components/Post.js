import React from 'react'
import { Link } from 'react-router-dom';

const Post = (props) => {
    var date = props.post.dateOfCreation;
    date = date.replace("T"," ");
    date = date.substring(0,19);


    return (
        <div className="linksToPosts">
        <Link to={`/post/${props.post.id}`}>
        <div className="post" >
            <h2 id="title">{props.post.title}</h2> <h3 id="price">${props.post.price}</h3>
            <p>Added by: {props.post.creatorUsername} | Date: {date} | Category: {props.post.postCategory}</p>
        </div>
        
        </Link>
        </div>
    )
}

export default Post
