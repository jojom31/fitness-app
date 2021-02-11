'use strict';

const db = require('./conn');

class Workout {
    constructor (id, name) {
        this.id = id;
        this.name = name;
    }

    static async getAllTypes() {
        const query = `SELECT * FROM types ORDER BY name;`;
        try {
            const response = await db.any(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async getAllWorkoutsByType(type_id) {
        const query = `
            SELECT * 
            FROM workouts 
            WHERE type_id = '${type_id}'
            ORDER BY name;`;
        try {
            const response = await db.any(query);
            return response;
        } catch {
            return err.message;
        }
    }

    static async getAllWorkoutsByPartAndType(part_id, type_id) {
        const query = `
            SELECT * 
            FROM workouts 
            INNER JOIN parts_workouts
            ON part_id = '${part_id}'
            WHERE workouts.type_id = '${type_id}' AND parts_workouts.part_id = '${part_id}'
            ORDER BY name;`;
        try {
            const response = await db.any(query);
            return response;
        } catch {
            return err.message;
        }
    }

    static async getWorkoutById(workout_id) {
        const query = `SELECT * FROM workouts
            WHERE workouts.id = '${workout_id}';`;
        try {
            const response = await db.one(query);
            return response;
        } catch (err) {
            return message.err;
        }
    }

    static async getPartsByWorkoutId(workout_id) {
        const query = `SELECT parts_of_body.name FROM parts_of_body
            INNER JOIN parts_workouts
            ON parts_workouts.part_id = parts_of_body.id
            INNER JOIN workouts
            ON workouts.id = parts_workouts.workout_id
            WHERE workouts.id = '${workout_id}';`;
        try {
            const response = await db.any(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async logWorkout(workout_id, weight, duration_min, duration_sec, reps, user_id) {
        const query = `INSERT INTO logged_workouts (workout_id, weight, duration_min, duration_sec, reps, user_id) VALUES (${workout_id}, ${weight}, ${duration_min}, ${duration_sec}, ${reps}, ${user_id});`;
        try {
            const response = await db.result(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }


}

module.exports = Workout;