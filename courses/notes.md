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

### get request

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

#### routes params

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

#### request queries

not specifed in route but included in address like `{site.com/users?filter=name&value=cool}`  
queiies params are `filter` and `value` ; they cam be accessed in express route `path/user`  
with `req.query` wic is an object like params `{filter:"name",value"cool"}` for this example  
example :

```ts
app.get("/api/users", (req, response) => {
  //get request queries req.query ={a:value,b:val2  ...}
  const { filter, value } = req.query;
  //when both are unavalaible
  if (!filter && !value) return response.send(mockUsers);
  if (filter && value)
    return response.send(
      mockUsers.filter((usr) =>
        usr[`${filter as keyof (typeof mockUsers)[0]}`]!.toString().includes(
          value as string
        )
      )
    );
  //if not filter or one of em only
  return response.send(mockUsers);
});
```

### post request

make a post ruquest same ways as get , but we use the `.post()` method to make it
`app.post(path,handler)` where path:string orthe route `/api/users`, and the handleler the same as get  
handler:(req,res):... ;
for example

```ts
app.post("/api/users", (req, res) => {
  //req.body contain contens , it also an obj
  console.log(req.body);
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...req.body };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});
```

to make that method work we used a middleware(a function that is involved when accessing a x routes,)  
we used here an `express.json()` to get the access to the `req.body` wich contain contains from the client side

```ts
app.use(express.json());
```

### put request

use to updateinterely a record , it kinda overwrite it  
same as post and get but we use the `.put()` method to make it
`app.post(path,handler)` where path:string orthe route `/api/users/:id` (params are kinda optional), and the handleler the same as get  
handler:(req,res):... ;
for example

```ts
//a put requesr , used to update interely a record
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  //update, or change are in req.body;
  const { body }: { body: Partial<(typeof mockUsers)[0]> } = req;
  if (isNaN(parseInt(id))) return res.sendStatus(400);
  //find user
  const findUsrIndex = mockUsers.findIndex((usr) => usr.id === parseInt(id));
  if (findUsrIndex === -1) return res.sendStatus(404); //not found
  //update user info by it index, and it index
  mockUsers[findUsrIndex] = {
    id: parseInt(id),
    ...body,
  } as (typeof mockUsers)[0];
  res.status(200).send(mockUsers[findUsrIndex]);
});
```

### patch request

samething like put , but this request update only a certain field of the record , it does not overwrite it like the put request; this request partially update a record (as it does not overwrite the other field like in put request);  
example :

```ts
app.patch("/api/users/:id", (req, res) => {
  const { id } = req.params;
  //update, or change are in req.body;
  const { body }: { body: Partial<(typeof mockUsers)[0]> } = req;
  if (isNaN(parseInt(id))) return res.sendStatus(400);
  //find user
  const findUsrIndex = mockUsers.findIndex((usr) => usr.id === parseInt(id));
  if (findUsrIndex === -1) return res.sendStatus(404); //not found

  //update the user record(any field ,only field that change on body)
  mockUsers[findUsrIndex] = { ...mockUsers[findUsrIndex], ...body };
  res.sendStatus(200);
});
```
