const mongoose = require("mongoose");
const mongojs = require("mongojs");
const express = require("express");
// express middleware
const logger = require("morgan");
const path = require("path");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "workoutplan";
const collections = ["workouts"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
    console.log("Database Error:", error);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.post("/submit", (req, res) => {
    console.log(req.body);

    db.workouts.insert(req.body, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    });
});

app.get("/all", (req, res) => {
    db.workouts.find({}, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.json(data);
        }
    });
});

// app.get("/find/:id", (req, res) => {
//     db.notes.findOne(
//         {
//             _id: mongojs.ObjectId(req.params.id)
//         },
//         (error, data) => {
//             if (error) {
//                 res.send(error);
//             } else {
//                 res.send(data);
//             }
//         }
//     );
// });

// app.post("/update/:id", (req, res) => {
//     db.notes.update(
//         {
//             _id: mongojs.ObjectId(req.params.id)
//         },
//         {
//             $set: {
//                 title: req.body.title,
//                 note: req.body.note,
//                 modified: Date.now()
//             }
//         },
//         (error, data) => {
//             if (error) {
//                 res.send(error);
//             } else {
//                 res.send(data);
//             }
//         }
//     );
// });


app.listen(3000, () => {
    console.log("App running on port 3000!");
});