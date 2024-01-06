const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(`insert into registration(firstName, lastName, gender, email, password, number) values(?,?,?,?,?,?)`, 
        [
            data.firstName,
            data.lastName,
            data.gender,
            data.email,
            data.password,
            data.number
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        })
    },

    getUsers: callBack => {
        pool.query(
            `SELECT * FROM registration`, 
            [],
            (err, results, field) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, results);
            }
        )
    },

    getUsersByUserId: (id, callBack) => {
        pool.query(
            `SELECT * FROM registration where id = ?`, 
            [id],
            (err, results, field) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, results[0]);
            }
        )
    },

    updateUser: (data, callBack) => {
        pool.query(
            `UPDATE registration 
            SET firstName=?, lastName=?, gender=?, email=?, password=?, number=? 
            WHERE id = ?`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password, // Password should be already hashed if it's provided
                data.number,
                data.id,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
    
                if (results.affectedRows === 0) {
                    return callBack(null, null); // Returning null indicates no user found for the provided ID
                }
    
                return callBack(null, results);
            }
        );
    },
        

    deleteUser: (data, callBack) => {
        pool.query(
            `delete from registrations where id = ?`, 
            [data.id],
            (err, results, field) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, results[0]);
            }
        )
    },

    getUsersByUserEmail: (email, callBack) => {
        pool.query(
            `select * from registration where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    }
};