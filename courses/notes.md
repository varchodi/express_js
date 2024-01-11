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

### routes params

to set a route params in express se use `route/:paramsidentifier` as path ,
for this route , the params will be paramsidentifier  
for example:

```ts
app.get("/api/users/:id", (req, res) => {
  //get params req.params
  const { id } = req.params;

  //optional, 9check if ID is int
  if (isNaN(parseInt(id))) {
    return res.status(400).send({
      msg: " bad request,ivalid ID",
    });
  }

  //parseInt(str); covert str to int
  const findUser = mockUsers.find((user) => user.id === parseInt(id));
  if (!findUser) return res.status(400).send({ msg: `no user with id:${id}` });
  res.send(findUser);
});
```

params are stored in `response.params` wich is an object `{paramsidentifier:paramvalue}` for this example ;
