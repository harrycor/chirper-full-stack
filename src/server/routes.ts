import * as express from "express";
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
router.get('/api/authors', async (req, res) =>{
  try{
    let authors = await db.Blog.allAuthors()
    res.json(authors)
  }catch(e){
    console.log(e)
    res.sendStatus(500)
  }
})
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

//                      POST
//  posts to blog
router.post("/api/postblog", async (req, res) => {
  try {
    let title = req.body.title;
    let content = req.body.content;
    let authorid = req.body.authorid;
    await db.Blog.postBlog(title, content, authorid);
    console.log("added a new blog post");
    res.sendStatus(200);
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

export default router;






// router.get("/api/hello", (req, res, next) => {
//   res.json("World");
// });