const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
 // Check if the user is authorized
 if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    
    // Verify the token using your preferred method (e.g., jsonwebtoken.verify())
    // If the token is valid, proceed to the next middleware
    // Otherwise, return a 401 Unauthorized status code
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
});

 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
