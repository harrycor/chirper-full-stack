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
    "select a.id as userID, a.name as name, b.id as blogID, b.title as blogTitle, b.content as content, t.name as tag from Blogs b join Authors a on a.id = b.authorid left join BlogTags bt on b.id = bt.blogid left join Tags t on t.id = bt.tagid"
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
    "select a.id as userID, a.name as name, b.id as blogID, b.title as blogTitle, b.content as content from Blogs b join Authors a on a.id = b.authorid where b.id = ?",
    [id]
  );
};

export const allTags = async () => {
  return await Query("SELECT * from Tags");
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

export default {
  //get
  all,
  allAuthors,
  allBlogsAuthorsWithTags,
  allBlogsWithAuthors,
  checkAuthor,
  oneBlogWithAuthor,
  allTags,
  allBlogTags,
  //put
  updateBlog,
  //delete
  deleteBlog,
  //post
  postBlog,
  postAuthor,
};
