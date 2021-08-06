import * as mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();


async function getConnection() {
   try {
      let pool = mysql.createPool({
         host: process.env.NODE_ENV === "development" ? process.env.DB_HOST : process.env.DB_HOST_PROD,
         user: process.env.NODE_ENV === "development" ? process.env.DB_USER : process.env.DB_USER_PROD,
         password: process.env.DB_PWD,
         database: process.env.DB_DATABASE2,
         waitForConnections: true,
      });
      return await pool.getConnection();
   } catch (error) {
      console.error(error);
   }
}

export default getConnection;
