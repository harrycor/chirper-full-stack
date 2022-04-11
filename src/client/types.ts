export interface IBlogs {
  id: number;
  title: string;
  content: string;
  authorid: number;
  _created: number;
}

export interface IBlogsWithAuthors {
  userID: number;
  name: string;
  blogID: number;
  blogTitle: string;
  content: string;
}

export interface IAuthors {
  id: number,
  name: string,
  email: string,
  _created: number
}
