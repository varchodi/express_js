import express from "express"

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`running on podt ${port}`)
})