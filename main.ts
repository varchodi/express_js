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

//a put requesr , used to update interely a record
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    //update, or change are in req.body;
    const { body }: { body:Partial< typeof mockUsers[0] >} = req;
    if (isNaN(parseInt(id))) return res.sendStatus(400);
    //find user
    const findUsrIndex = mockUsers.findIndex(usr => usr.id === parseInt(id))
    if (findUsrIndex === -1) return res.sendStatus(404); //not found 
    //update user info by it index, and it index
    mockUsers[findUsrIndex] = { id:parseInt(id),...body } as typeof mockUsers[0];
    res.status(200).send(mockUsers[findUsrIndex]);
})

app.get('/api/products', (req, res) => {
    res.send([
        { id: 123, name: 'chicken breast', price: 12.99 },
        { id: 134, name: 'chicken breast', price: 12.99 },
        {id:177,name:'chicken breast',price:12.99},
    ])
})

// patch req
//update entity record and resourse (update partially it, like only username in user ,...)
//not overwritting 
app.patch('/api/users/:id', (req, res) => {
    const { id } = req.params;
    //update, or change are in req.body;
    const { body }: { body:Partial< typeof mockUsers[0] >} = req;
    if (isNaN(parseInt(id))) return res.sendStatus(400);
    //find user
    const findUsrIndex = mockUsers.findIndex(usr => usr.id === parseInt(id));
    if (findUsrIndex === -1) return res.sendStatus(404); //not found

    //update the user record(any field ,only field that change on body)
    mockUsers[findUsrIndex] = { ...mockUsers[findUsrIndex], ...body };
    res.sendStatus(200);
})




app.listen(port, () => {
    console.log(`running on podt ${port}`)
})
