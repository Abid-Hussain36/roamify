import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

//Gets all users from db
router.get("/", async(req, res) => {
    const collection = await db.collection("users");
    let result = await collection.find({}).toArray();
    res.send(result).status(200);
});

//Gets user by id
router.get("/:id", async(req, res) => {
    const collection = await db.collection("users");
    const query = {_id: new ObjectId(req.params.id)}
    let result = await collection.findOne(query);
    if(!result){
        res.send("User Not Found").status(404);
    } else{
        res.send(result).status(200);
    }
});

//Adds a new user
router.post("/", async(req, res) => {
    try{
        let newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            budget: req.body.budget,
            travelAvailability: req.body.travelAvailability,
            interests: req.body.interests
        }
        const collection = await db.collection("users");
        let result = await collection.insertOne(newUser);
        res.send(result).status(200);
    } catch(err){
        console.log(err);
        res.send("Error Adding User").status(500);
    }
});

//Updates a user by id
router.patch("/:id", async(req, res) => {
    try{
        const collection = await db.collection("users");
        const query = {_id: new ObjectId(req.params.id)}
        //Sets the values of the changed fields
        let updates = {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                age: req.body.age,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                budget: req.body.budget,
                travelAvailability: req.body.travelAvailability,
                interests: req.body.interests
            }
        }
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch(err){
        console.log(err);
        res.send("Error Updating User").status(500);
    }
});

//Gets user by id
router.get("/:id", async(req, res) => {
    try{
        const collection = await db.collection("users");
        const query = {_id: new ObjectId(req.params.id)}
        let result = await collection.deleteOne(query);
        res.send(result).status(200);
    } catch(err){
        console.log(err);
        res.send("Error Deleting User").status(500);
    }
});

export default router;