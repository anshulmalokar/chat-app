import express from "express"
import { createProxyMiddleware } from "http-proxy-middleware"


const app = express()


const routes = {
   	"/api/auth/signup": "http://localhost:3005/auth/signup",
      "/api/auth/login": "http://localhost:3005/auth/login",
   	"/api/users": "http://localhost:3005/users",
   	"/api/msgs": "http://localhost:3002/msgs"
}


for(const route in routes) {
   const target = routes[route];
   app.use(route, createProxyMiddleware({target, changeOrigin: true}));
}


const PORT = 8083;


app.listen(PORT, () => {
   console.log(`api gateway started listening on port : ${PORT}`)
})
