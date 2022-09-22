# NodeJS + MongoDB starter template with authentication   

A personal starter template for Node applications. Authentication and authorization based on JWT build from the ground up. No external libraries except `jsonwebtoken`.   

1. Change `model/user.js` as you deem fit. Critical fields are `email`, `password` and `token`.  

# How to run  

1. Install dependencies
2. Create `.env` file at root with   
  a. API_PORT:    
  b. PORT: (optional)    
  c. MONGO_URI: (optional) (Make sure a local db is running if not supplied)    
  d. DEBUG: (optional) ignorable for now    
  e. TOKEN_KEY: for signing jwts. Use `openssl rand -hex 64` to generate a secure secret.   
