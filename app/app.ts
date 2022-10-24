import express from "express";
import { Task } from "./modules/Task";

const app = express();
const port = process.env.PORT || 3000;
const task = new Task();

app.listen(port, ()=> {
    console.log(`[SERVER]: Server is running on port ${port}`);
})

app.get("/tasks", (req, res) => {
    task.getAll().then((response) => {
        res.send(response);
    }).catch((err) => console.error(err));
})

