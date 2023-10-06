import React from "react";

function PostCard({post}) {
    return (
        <div className="post_card">
            <p className="post_txt">Genre: {post.genre}</p>
            <p className="post_txt">Plant: {post.plant}</p>
            <h1 className="content_text">{post.content}</h1>
            <h4 className="content_text">By: {post.user}</h4>
            <img src={post.img} alt="Plant" className="post_img"/>
        </div>
    )
}

export default PostCard;