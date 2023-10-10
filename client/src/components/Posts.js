import React, { useEffect, useState } from "react";
import { useFormik  } from "formik";
import * as yup from "yup";

function Posts() {
    const [posts, setPosts] = useState();
    const [plants, setPlants] = useState();

    useEffect(() => {
        fetch("/posts")
        .then((res) => {
            if (res.ok) {
                res.json().then((res) => setPosts(res))
            }
        })
    }, [])

    useEffect(() => {
        fetch("plants")
        .then((res) => {
            if (res.ok) {
                res.json().then((res) => {
                    setPlants(res)
                })
            }
        })
    }, [])

    const formSchema = yup.object().shape({
        content: yup.string().required("Please enter some text"),
        img: yup.string().required("Please enter a IMG URL")
    })

    const formik = useFormik({
        initialValues: {
            content: "",
            genre: "General",
            img: "",
            plant: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
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
                    setPosts(res)
                }
                console.log(values)
            })
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="post_form" autoComplete="off">
                <h2 className="form_header">New Post Form:</h2>
                <input type="text" placeholder="Post Text" id="content" value={formik.values.content} onChange={formik.handleChange}/>
                <p className="homeForm_errors">{formik.errors.content}</p>

                <select id="genre" onChange={formik.handleChange} className="post_input" value={formik.values.genre}>
                    <option value="General">General</option>
                    <option value="Question">Question</option>
                    <option value="Answer">Answer</option>
                </select>

                <input id="img" type="text" placeholder="Image URL" value={formik.values.img} onChange={formik.handleChange} className="post_input"/>
                <p className="homeForm_errors">{formik.errors.img}</p>

                <select id="plant" onChange={formik.handleChange} className="post_input" values={formik.values.plant}>
                    {plants ? plants.map((plant) => <option value={plant.common_name}>{plant.common_name}</option>) : null}
                </select>
                <p>{formik.errors.plant}</p>

                <button type="submit" className="form_btn">Post</button>
            </form>
            <h1 className="page_header">Welcome to the Posts page!</h1>
            {/* <div>{posts ? posts.map((post) => <PostCard key={post.id} post={post} />) : <h1>error!</h1>}</div> */}

            {posts ? posts.map((post) => {
                return (
                    <div className="post_card" key={post.id}>
                        <p className="post_txt">Genre: {post.genre}</p>
                        <p className="post_txt">Plant: {post.plant.common_name}</p>
                        <h1 className="content_text">{post.content}</h1>
                        <h4 className="content_text">By: {post.user.username}</h4>
                        <img src={post.img} alt="Plant" className="post_img"/>
                    </div>
                )
            }) : <h1>Error</h1>}
        </div>
    )
}

export default Posts;