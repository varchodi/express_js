import express from "express"

const app = express();
const port = process.env.PORT || 3000;

const mockUsers = [
    { id: 1, username: "anson", displayName: "Anson" },
    { id: 2, username: "green", displayName: "Green" },
    { id: 3, username: "Him", displayName: "Hey" },
];

//routes and rquests
//app.get(route,handleler)
app.get("/", (req, response) => {
    response.status(201).send({ msg: "hello world " });
})


app.get('/api/users', (req, response) => {
    response.send(mockUsers);
})

//route parameter (path/:paramName)
app.get('/api/users/:id', (req, res) => {
    //get params req.params
    const { id } = req.params;

    //optional, 9check if ID is int 
    if (isNaN(parseInt(id))) {
        return res.status(400).send({
            msg:" bad request,ivalid ID"
        })
    }

    //parseInt(str); covert str to int
    const findUser = mockUsers.find((user) => user.id === parseInt(id))
    if(!findUser) return res.status(400).send({msg:`no user with id:${id}`})
    res.send(findUser);

})

app.get('/api/products', (req, res) => {
    res.send([
        { id: 123, name: 'chicken breast', price: 12.99 },
        { id: 134, name: 'chicken breast', price: 12.99 },
        {id:177,name:'chicken breast',price:12.99},
    ])
})

app.listen(port, () => {
    console.log(`running on podt ${port}`)
})
