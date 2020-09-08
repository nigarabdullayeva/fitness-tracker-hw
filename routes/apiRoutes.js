const db = require("../models");

module.exports = function (app) {

app.post("/api/workouts",({body}, res) => {
   db.Workout.create({body})
    .then(function (dbWorkout) {
       res.json(dbWorkout);
    })
    .catch(function (err) {
       res.status(400).json(err)
    });

});

app.put("/api/workouts/:id",(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    db.Workout.findByIdAndUpdate( {_id}, { $push: { exercises:body } })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });

});

app.get("/api/workouts", (req, res) => {
    db.Workout.find({}, (error, workouts) => {
        console.log(error)
        if (error) {
            res.send(error)
        } else {
            res.json(workouts)
        }
    });
});    

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then(dbWorkouts => {
        res.json(dbWorkouts);
    })
    .catch(err => {
        res.status(400).json(err);
    })
});

}
