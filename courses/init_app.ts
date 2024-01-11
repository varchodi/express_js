// here how to init express app

import express from "express"

//create app
const app = express();
const port = process.env.PORT || 3000;

//run server ...
app.listen(port, () => {
    console.log(`running on podt ${port}`)
})