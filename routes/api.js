const router = require("express").Router();
const db = require("../models");

router.post("/api/workouts", ({ body }, res) => {
    console.log(body);
    db.Workout.create(body)
        .then(workouts => {
            res.json(workouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", ({ body }, res) => {
    console.log(body);
    db.Workout.updateOne(body)
        .then(workouts => {
            res.json(workouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(workouts => {
            // console.log(workouts);
            res.json(workouts);
        })
        .catch(err => {
            // console.log(err)
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .sort({ date: -1 })
        .then(workouts => {
            res.json(workouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;