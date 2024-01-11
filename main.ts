import express from "express"

const app = express();
const port = process.env.PORT || 3000;

//routes and rquests
//app.get(route,handleler)
app.get("/", (req, response) => {
    response.status(201).send({ msg: "hello world " });
})

app.get('/api/users', (req, response) => {
    response.send([
        { id: 1, username: "anson", displayName: "Anson" },
        { id: 1, username: "green", displayName: "Green" },
        { id: 1, username: "Him", displayName:"Hey"},
    ])
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
