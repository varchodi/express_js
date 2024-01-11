### app initialisation

here is how to initialize a simpe expresss app

```ts
import express from "express" //import the module

//create the app
const app = express();
const port = process.env.PORT || 3000;

//run the server on x port
app.listen(port, () => {
    console.log(`running on podt ${port}`)
}

```

#### routes

to make routes
use app.get (route ,handler)  
route:str ,  
handler:(req,res):any9don't know ;  
a main or / route

```ts
app.get("/", (req, response) => {
  response.status(201).send({ msg: "hello world " });
});
```

a /api/ruser routes

```ts
app.get("/api/users", (req, response) => {
  response.send([
    { id: 1, username: "anson", displayName: "Anson" },
    { id: 1, username: "green", displayName: "Green" },
    { id: 1, username: "Him", displayName: "Hey" },
  ]);
});
```
