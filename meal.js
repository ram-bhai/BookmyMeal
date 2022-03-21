const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;
const adminRouter = require('./routes/admin.routes');
const userRouter = require('./routes/user.routes');

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Ram:ram0Ram@cluster0.hydgd.mongodb.net/BookmyMeal?retryWrites=true&w=majority")

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (request, response) => {
    response.send("Welcome in the world of hungers");
});

app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
    console.log('Server is running on port no.' + port);
});