import React from "react";
import blogData from "../../data/blogs.json";

const Blogs = () => {
  // console.log(blogData);
  return (
    <section className="section__container blog__container">
      <h2 className="section__header">Latest From Blog</h2>
      <p className="section__subheader">
        Elevate your wardrobe with our freshest style tips, trends, and
        inspiration on our blog.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-12 gap-8">
        {blogData.map((blog, index) => (
          <div className="blog__card cursor-pointer hover:scale-105 transition-all duration-300" key={index}>
            <img src={blog.imageUrl} alt="blog image" className="w-full h-48 object-cover"/>
            <div className="blog__card__content">
                <h6>{blog.subtitle}</h6>
                <h4>{blog.title}</h4>
                <p>{blog.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
