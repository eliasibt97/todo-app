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
});

app.get("/tasks/:id", (req, res) => {
    task.getOne(Number.parseInt(req.params.id)).then((response) => {
        res.send(response);
    }).catch((err) => console.error(err));
});

app.post('/tasks/create', (req, res) => {
    task.create(req.body).then((response) => {
        res.send("Resource created successfully");
    }).catch((err) => console.error(err));
});

app.put('/tasks/update/:id', (req, res) => {
    task.update(Number.parseInt(req.params.id), req.body).then((response) => {
        res.send(response);
    });
});

