import express from "express"

const app = express();
const port = process.env.PORT || 3000;

//middleware int example
//a function involved when a x api ...
// example
app.use(express.json());

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
    //request queries req.query ={a:value,b:val2  ...}
    const { filter, value }= req.query;
    //when both are unavalaible
    if (!filter && !value) return response.send(mockUsers);
    if (filter && value) return response.send(
        mockUsers.filter((usr)=>usr[`${filter as keyof typeof mockUsers[0] }`]!.toString().includes(value as string))
    )
    //if not filter or one of em only
    return response.send(mockUsers);

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

//a port request
app.post('/api/users', (req, res) => {
    //req.body contain contens , it also an obj
    console.log(req.body);
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...req.body };
    mockUsers.push(newUser);
    return res.status(201).send(newUser);
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
