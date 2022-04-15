import { Connection, Query } from "./index";

//          get
export const all = async () => {
  return await Query("SELECT * from Blogs");
};

export const allAuthors = async () => {
  return await Query("SELECT * from Authors");
};

export const allBlogsAuthorsWithTags = async () => {
  return await Query(
    "select a.id as userID, a.name as name, b.id as blogID, b.title as blogTitle, b.content as content, t.name as tag, t.id as tagID from Blogs b join Authors a on a.id = b.authorid left join BlogTags bt on b.id = bt.blogid left join Tags t on t.id = bt.tagid"
  );
};

export const allBlogsWithAuthors = async () => {
  return await Query(
    "select a.id as userID, a.name as name, b.id as blogID, b.title as blogTitle, b.content as content from Blogs b join Authors a on a.id = b.authorid"
  );
};

export const checkAuthor = async (name: string) => {
  return await Query("SELECT * from Authors WHERE name = ?", [name]);
};

export const oneBlogWithAuthor = async (id: any) => {
  return await Query(
    "select a.id as userID, a.name as name, b.id as blogID, b.title as blogTitle, b.content as content, t.name as tag, t.id as tagID from Blogs b join Authors a on a.id = b.authorid left join BlogTags bt on b.id = bt.blogid left join Tags t on t.id = bt.tagid where b.id = ?",
    [id]
  );
};

export const allTags = async () => {
  return await Query("SELECT * from Tags");
};

export const oneTag = async (tagName: string) => {
  return await Query("select * from Tags where name = ?", [tagName]);
};

export const allBlogTags = async () => {
  return await Query("SELECT * from BlogTags");
};

//          PUT
export const updateBlog = async (title: string, content: string, id: any) => {
  return await Query("UPDATE Blogs SET title = ?, content = ? WHERE id = ?", [
    title,
    content,
    id,
  ]);
};

//        DELETE
export const deleteBlog = async (id: any) => {
  return await Query("delete from Blogs where id = ?", [id]);
};

export const deleteBlogTag = async (blogid: number, tagid: number) => {
  return await Query("delete from BlogTags where blogid = ? and tagid = ?", [
    blogid,
    tagid,
  ]);
};

//      POST
export const postBlog = async (
  title: string,
  content: string,
  authorid: any
) => {
  return await Query(
    "INSERT INTO Blogs(title, content, authorid) values(?, ?, ?)",
    [title, content, authorid]
  );
};

export const postAuthor = async (name: string, email: string) => {
  return await Query("insert into Authors (name, email) values (?, ?)", [
    name,
    email,
  ]);
};

export const postTag = async (name: string) => {
  return await Query("insert into Tags (name) values (?)", [name]);
};

export const postBlogTag = async (blogID: string, tagID: string) => {
  return await Query("insert into BlogTags(blogid, tagid) values(?, ?)", [
    blogID,
    tagID,
  ]);
};

export default {
  //get
  all,
  allAuthors,
  allBlogsAuthorsWithTags,
  allBlogsWithAuthors,
  checkAuthor,
  oneBlogWithAuthor,
  allTags,
  oneTag,
  allBlogTags,
  //put
  updateBlog,
  //delete
  deleteBlog,
  deleteBlogTag,
  //post
  postBlog,
  postAuthor,
  postTag,
  postBlogTag,
};
