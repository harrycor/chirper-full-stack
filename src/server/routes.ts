import * as express from "express";
import { resolveModuleName } from "typescript";
import db from "./db";

const router = express.Router();
router.use(express.json());

//              GET
//      raw blogs db
router.get("/api/allblogs", async (req, res) => {
  try {
    let blogs = await db.Blog.all();
    res.json(blogs);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
//      all Authors
router.get("/api/authors", async (req, res) => {
  try {
    let authors = await db.Blog.allAuthors();
    res.json(authors);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
//      all authors blogs with tags
router.get("/api/blogs/authors/tags", async (req, res) => {
  try {
    let authors = await db.Blog.allBlogsAuthorsWithTags();
    res.json(authors);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
//      joined blogs with author
router.get("/api/allblogsandauthors", async (req, res) => {
  try {
    let blogsAndAuthors = await db.Blog.allBlogsWithAuthors();
    res.json(blogsAndAuthors);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
//       check authors
router.get("/api/check/authors/:name", async (req, res) => {
  try {
    let name = req.params.name;
    let authorCheck = await db.Blog.checkAuthor(name);
    res.json(authorCheck);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
//      joined blogs with author SINGLE
router.get("/api/singleblogandauthor/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let singleBlogAndAuthor = await db.Blog.oneBlogWithAuthor(id);
    res.json(singleBlogAndAuthor);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
//      all Tags
router.get("/api/alltags", async (req, res) => {
  try {
    let allTags = await db.Blog.allTags();
    res.json(allTags);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
//      one Tag
router.get("/api/gettag/:tagname", async (req, res) => {
  try {
    let tagName: string = req.params.tagname;
    let oneTag = await db.Blog.oneTag(tagName);
    res.json(oneTag);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
//      all BlogTags
router.get("/api/allblogtags", async (req, res) => {
  try {
    let allBlogTags = await db.Blog.allBlogTags();
    res.json(allBlogTags);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//                          PUT
//  update Blog Post
router.put("/api/update/blog", async (req, res) => {
  try {
    let title = req.body.title;
    let content = req.body.content;
    let id = req.body.id;
    await db.Blog.updateBlog(title, content, id);
    console.log(`updated blog post ${id}`);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//                      DELETE
//  deletes post
router.delete("/api/delete/blog/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await db.Blog.deleteBlog(id);
    console.log(`deleted post ${id}`);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
//    delete BlogTag
router.delete("/api/delete/blogtag/:blogid/:tagid", async (req, res) => {
  try {
    let blogIg: any = req.params.blogid;
    let tagId: any = req.params.tagid;
    let deletedBlogTag = await db.Blog.deleteBlogTag(blogIg, tagId);
    console.log("deleted blogtag")
    res.sendStatus(200)
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//                      POST
//  posts to blog
router.post("/api/postblog", async (req, res) => {
  try {
    let title = req.body.title;
    let content = req.body.content;
    let authorid = req.body.authorid;
    let newPost: any = await db.Blog.postBlog(title, content, authorid);
    // console.log(newPost.insertId);
    res.json(newPost.insertId);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
//  post author
router.post("/api/post/author", async (req, res) => {
  try {
    let name: string = req.body.name;
    let email: string = req.body.email;
    await db.Blog.postAuthor(name, email);
    console.log(`Author, ${name}, added to db`);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
//    Post Tag
router.post("/api/post/newtag/:name", async (req, res) => {
  try {
    let name = req.params.name;
    let newTagPost: any = await db.Blog.postTag(name);
    console.log("posted new tag", newTagPost.insertId);
    res.json(newTagPost.insertId);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
//    post BlogTag
router.post("/api/postblogtag/:blogid/:tagid", async (req, res) => {
  try {
    let blogID = req.params.blogid;
    let tagID = req.params.tagid;
    let blogTagPost = await db.Blog.postBlogTag(blogID, tagID);
    console.log("BlogTag posted", blogTagPost);
    res.sendStatus(200);
    // res.json(blogTagPost);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;

// router.get("/api/hello", (req, res, next) => {
//   res.json("World");
// });
