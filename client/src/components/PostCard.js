import React from "react";

function PostCard({post}) {
    return (
        <div>
            <h1>{post.content}</h1>
            {Boolean(post.img) === true ? <img src={post.img} alt="plant"/> : null}
        </div>
    )
}

export default PostCard;