import * as React from 'react';
import { Link } from 'react-router-dom';
import blog from '../../server/db/blog';
import { IBlogs, IBlogsWithAuthors } from '../types';

const BlogCard = (blogInfo: IBlogsWithAuthors) => {
    return(
        <div className="bg-purple text-light mb-5 m-2 card col-xl-2 col-lg-2 col-md-5 col-9">
            <h1 className="card-tite">{blogInfo.blogTitle}</h1>
            <p className="card-text">{blogInfo.content}</p>
            <p className="card-text">~{blogInfo.name}</p>
            <div>
                <Link to={`/edit/blog/${blogInfo.blogID}`} className="btn btn-lightblue">Edit</Link>
            </div>
        </div>
    )
}

export default BlogCard;