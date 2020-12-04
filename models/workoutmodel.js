const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutsSchema = new Schema({

    exerciseType: {
        type: String,
    },

    exerciseName: {
        type: String,
        trim: true,
        required: "Enter a name for your workout"
    },

    distance: {
        type: Number,
    },

    duration: {
        type: Number,
    },

    weight: {
        type: Number,
    },

    sets: {
        type: Number,
    },

    reps: {
        type: Number,
    }

});

const Example = mongoose.model("Workout", WorkoutsSchema);

module.exports = Example;