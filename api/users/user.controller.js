const { create, getUsers, getUsersByUserId, updateUser, deleteUser, getUsersByUserEmail } = require("./user.service");
const { genSaltSync, hashSync, compareSync} = require("bcrypt");
const {sign} = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ 
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getUsersByUserId: (req, res) => {
        const id = req.params.id;
        getUsersByUserId(id, (err, results) => {
            if (err) {
                console.log(err);
            }

            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            })
        });
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
            }

            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            })
        });
    },

    updateUser: (req, res) => {
        const { id, ...userData } = req.body;
    
        // Checking if the password is sent and then hash it
        if (userData.password) {
            const salt = genSaltSync(10);
            userData.password = hashSync(userData.password, salt);
        }
    
        updateUser({ id, ...userData }, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Failed to update user!',
                });
            }
    
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: 'No user found for the provided ID',
                });
            }
    
            return res.status(200).json({
                success: 1,
                data: 'Updated Successfully',
            });
        });
    },    

    deleteUser: (req, res) => {
        const id = req.params.id;
        deleteUser(id, (err, results) => {
            if (err) {
                console.log(err);
            }

            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: "User deleted Successfully"
            })
        });
    },

    login: (req, res) => {
        const body = req.body;
        getUsersByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }

            if (!results || results.length === 0) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }

            const passwordMatch = compareSync(body.password, results.password);
            if (passwordMatch) {
                const userDetails = { ...results };
                delete userDetails.password;

                const jsonToken = sign({ result: userDetails }, "qwe1234", { expiresIn: '1h' }); // expires in 1 hour

                return res.json({
                    success: 1,
                    message: "Login successful",
                    token: jsonToken
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
        });
    }
}