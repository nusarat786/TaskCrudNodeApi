var express = require("express");
var app = express();
var dbConnect = require("./Connection/connect")
const cookieParser = require('cookie-parser');
const cors = require('cors');
var Task = require("./Schema/TaskSchema");


// connection establishment for databse
dbConnect();

// parses json req/res
app.use(express.json());

// using cookie parser
app.use(cookieParser());

// using cors allowing frontend restrictions 
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000/'
}));


app.get("/", (req, res) => {
    res.send("This Node Crud Apis For Task");
})


// POST /tasks - Create a new task.
app.post("/tasks", async (req, res) => {

    try {
        const body = req.body;
        var {
            title,
            description
        } = body;


        const titleExist = await Task.exists({
            title: title?.trim()
        });

        //console.log(titleExist);

        if (titleExist) {

            return res.status(400).json({
                error: true,
                mesaage: "task with the same name alredy present",
            });
        }


        var tsk = new Task({
            title,
            description,
        });

        const addedTask = await tsk.save();



        res.status(200).json({
            error: false,
            mesaage: "task created",
            addedTask
        });

    } catch (err) {

        console.log(err)
        return res.status(400).json({
            error: true,
            mesaage: "server error",
            err
        });


    }
})

// GET /tasks - Retrieve all tasks.

app.get("/tasks", async (req, res) => {

    try {

        const allTasks = await Task.find();
        
        //console.log(allTasks);
        res.status(200).json({
            error: false,
            mesaage: "all tasks are fetched",
            totalTasks:allTasks?.length || 0,
            allTasks,
            
        });

    } catch (err) {

        console.log(err)
        return res.status(400).json({
            error: true,
            mesaage: "server error",
            err
        });
    }
})


// GET /tasks/:id - Retrieve a single task by ID.

app.get("/tasks/:id", async (req, res) => {

    try {

        var id = req.params.id;

        if(!id){
            return res.status(400).json({
                error: true,
                mesaage: "task id passed is blank or null" 
            });
        }
    
        id = id.trim();
        console.log(id.length);

        if(id.length != 24){
            return res.status(400).json({
                error: true,
                id,
                mesaage: "id should be of size 24" 
            });
        }

        const taskExist =  await Task.exists({_id:id});
        
        console.log("tas",taskExist);

        if(!taskExist){
            return res.status(400).json({
                error: true,
                id:id,
                mesaage: "task with id can not be found",
            });

        }
        const taskById= await Task.findById({_id:id});
        
        console.log(taskById);

        res.status(200).json({
            error: false,
            mesaage: `tasks wit id is fetched`,
            id,
            taskById,
            
        });

    } catch (err) {

        console.log(err)
        return res.status(400).json({
            error: true,
            mesaage: "server error",
            err
        });
    }
})



// PUT /tasks/:id - Update a task by ID.

app.put("/tasks/:id", async (req, res) => {

    try {
        const body = req.body;
        var {
            title,
            description,
            status,
        } = body;
        
        var id = req.params.id;

        if(!id){
            return res.status(400).json({
                error: true,
                mesaage: "task id passed is blank or null" 
            });
        }

        id = id.trim();
        console.log(id.length);

        if(id.length != 24){
            return res.status(400).json({
                error: true,
                id,
                mesaage: "id should be of size 24" 
            });
        }

        
        const taskExist =  await Task.exists({_id:id});
        
        console.log("task",taskExist);

        if(!taskExist){
            return res.status(400).json({
                error: true,
                id:id,
                mesaage: "task with id can not be found",
            });

        }

        const taskUpdateById = await Task.updateOne(
            {
                _id:id
            }
            ,
            {
            $set:{
                title,
                description,
                status,
                updatedAt:Date.now()
            }
            
        });

        res.status(200).json({
            error: false,
            mesaage: "task updated",
            taskBefore:taskExist,
            taskUpdateById
        });

    } catch (err) {

        console.log(err)
        return res.status(400).json({
            error: true,
            mesaage: "server error",
            err
        });
    }
})



// DELETE /tasks/:id - Delete a task by ID.
app.delete("/tasks/:id", async (req, res) => {

    try {

        var id = req.params.id;

        if(!id){
            return res.status(400).json({
                error: true,
                mesaage: "task id passed is blank or null" 
            });
        }

        id = id.trim();
        //console.log(id.length);

        if(id.length != 24){
            return res.status(400).json({
                error: true,
                id,
                mesaage: "id should be of size 24" 
            });
        }

        
        const taskExist =  await Task.exists({_id:id});
        
        //console.log("task",taskExist);

        if(!taskExist){
            return res.status(400).json({
                error: true,
                id:id,
                mesaage: "task with id can not be found",
            });
        }

        const taskDeletedById = await Task.findByIdAndDelete(id);

        res.status(200).json({
            error: false,
            mesaage: "task deleted",
            taskDeletedById
        });

    } catch (err) {

        //console.log(err)
        return res.status(400).json({
            error: true,
            mesaage: "server error",
            err
        });
    }
})


var port = 3300;
app.listen(port, () => {
    console.log("http://localhost:"+port);
})
