import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useFormik  } from "formik";
import * as yup from "yup";

function Posts({user}) {
    const [posts, setPosts] = useState();

    useEffect(() => {
        fetch("/posts")
        .then((res) => {
            if (res.ok) {
                res.json().then((res) => setPosts(res))
            }
        })
    }, [])

    const formSchema = yup.object().shape({
        content: yup.string().required("Please enter some text"),
        plant: yup.string().required("Please enter a plant name related to this post"),
        img: yup.string().required("Please enter a IMG URL")
    })

    const formik = useFormik({
        initialValues: {
            content: "",
            genre: "General",
            img: "",
            user: user.username,
            plant: ""
        },
        validationSchema: formSchema,
        onSubmit: (values, {resetForm}) => {
            fetch("/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
            .then((res) => res.json())
            .then((res) => {
                if (Boolean(posts) === true) {
                    const updatedPosts = [...posts, res]
                    setPosts(updatedPosts)
                } else {
                    setPosts([res])
                }
            })
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="post_form" autoComplete="off">
                <h2 className="form_header">New Post Form:</h2>
                <input type="text" placeholder="Post Text" id="content" value={formik.values.content} onChange={formik.handleChange}/>
                <p className="homeForm_errors">{formik.errors.content}</p>

                <select id="genre" onChange={formik.handleChange} className="post_input">
                    <option value={formik.values.genre}>General</option>
                    <option value={formik.values.genre}>Question</option>
                    <option value={formik.values.genre}>Answer</option>
                </select>

                <input id="img" type="text" placeholder="Image URL" value={formik.values.img} onChange={formik.handleChange} className="post_input"/>
                <p className="homeForm_errors">{formik.errors.img}</p>

                <input id="plant" type="text" placeholder="Plant's Name" value={formik.values.plant} onChange={formik.handleChange} className="post_input"/>
                <p className="homeForm_errors">{formik.errors.plant}</p>

                <button type="submit" className="form_btn">Post</button>
            </form>
            <h1 className="page_header">Welcome to the Posts page!</h1>
            {posts ? posts.map((post) => <PostCard key={post.id} post={post} />) : <h1>error!</h1>}
        </div>
    )
}

export default Posts;