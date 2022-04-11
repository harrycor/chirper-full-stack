import * as mysql from "mysql";
import config from "../config";

import Blog from "./blog";

export const Connection = mysql.createConnection(config.mysql);

Connection.connect((err) => {
  if (err) console.log(err);
});

export const Query = async (query: string, values?: Array<string | number>) => {
  return new Promise((resolve, reject) => {
    Connection.query(query, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

export default {
  Blog,
};
