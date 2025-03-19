import React from "react";
import blogData from "../../data/blogs.json";

const Blogs = () => {
  // console.log(blogData);
  return (
    <section className="section__container blog__container dark:bg-zinc-800">
      <h2 className="section__header dark:text-zinc-50">Latest From Blog</h2>
      <p className="section__subheader dark:text-zinc-400">
        Elevate your wardrobe with our freshest style tips, trends, and
        inspiration on our blog.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-12 gap-8">
        {blogData.map((blog, index) => (
          <div className="blog__card dark:bg-zinc-900 cursor-pointer hover:scale-105 transition-all duration-300" key={index}>
            <img src={blog.imageUrl} alt="blog image" className="w-full h-48 object-cover"/>
            <div className="blog__card__content">
                <h6>{blog.subtitle}</h6>
                <h4 className="dark:text-zinc-50">{blog.title}</h4>
                <p className="dark:text-zinc-400">{blog.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
