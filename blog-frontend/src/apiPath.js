// Implementation all apis endpoint to enahance the effciency

import { getBaseUrl } from "./libs/AllGlobalFunctions";

const baseUrl = getBaseUrl();

const apiPath = {

   // decalring authentication url
   login: baseUrl + 'api/auth/login',
   signUp: baseUrl + 'api/auth/signup',

   // decalring blog apis here
   getSingleBlog: baseUrl + 'api/blog/GetSingleBlog',
   getAllBlog: baseUrl + 'api/blog/GetAllBlogs',
   blog: baseUrl + 'api/blog'

}

export default apiPath;