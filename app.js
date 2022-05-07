var createError = require('http-errors');
var express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ejsLint = require('ejs-lint');

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var homepageRouter = require('./routes/homepage');
var contactRouter = require('./routes/contact');
var checkoutRouter = require('./routes/checkout');
var adminRouter = require('./routes/admin');
var mapRouter = require('./routes/map');
var map_2Router = require('./routes/map_2');
var map3Router = require('./routes/map3');
var bookingDisplayRouter = require('./routes/bookingDisplay');
var usersRouter = require('./routes/users');
var hotelpageRouter = require('./routes/hotelpage');
var adminpageRouter = require('./routes/adminpage');
var loggedInRouter = require('./routes/loggedIn');
var specialRouter = require('./routes/special');
var formRouter = require('./routes/form');
var form2Router = require('./routes/form2');

const alert = require("alert");
const mysql = require("mysql");
const db = require("./database");
const {application} = require("express");
const _sqlPackage = require("express");
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname + '/public')));


app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/homepage', homepageRouter);
app.use('/contact', contactRouter);
app.use('/checkout', checkoutRouter);
app.use('/admin', adminRouter);
app.use('/map', mapRouter);
app.use('/map_2', map_2Router);
app.use('/map3', map3Router);
app.use('/bookingDisplay', bookingDisplayRouter);
app.use('/users', usersRouter);
app.use('/hotelpage', hotelpageRouter);
app.use('/adminpage', adminpageRouter);
app.use('/loggedIn', loggedInRouter);
app.use('/special', specialRouter);
app.use('/form', formRouter);
app.use('/form2', form2Router);

app.post('/register', function (req, res) {

    var fname = req.body.fname;
    var lname = req.body.lname;
    var phone = req.body.phone;
    var password = req.body.password;
    var username = req.body.username;
    var email = req.body.email;

    var errormessage = "";

    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPass = bcrypt.hashSync(password, salt);

    password = hashPass;

    console.log("User name = " + username);
    console.log("Password = " + password);
    console.log("Email = " + email);

    if (errormessage.length > 0) {
        res.send(errormessage);
    } else {

        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'test'
        });
        // This is the actual SQL query part
        connection.query("INSERT INTO `test`.`users` (`username`, `password`, `email`,`fname`,`lname`,`phone` ) VALUES ('" + username + "', '" + password + "', '" + email + "', '" + fname + "', '" + lname + "', '" + phone + "');", function (error, results, fields) {
            if (error) throw error;
        });
        connection.end();
        console.log("Success")
        alert("You have successfully registered")
        return res.redirect('/');
    }
});

app.post('/login', function (req, res) {

    var username = req.body.username;
    var password = req.body.password;

    console.log(username);
    console.log(password);
    const bcrypt = require('bcrypt');
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'test'
    });

    connection.connect((error) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Successful")
        }
    });

    connection.query('select * from users where username = ?', [username], function (error, result) {
        if (error) throw error;
        console.log(result);

        if (result.length == 0) {
            // return res.redirect('/');
            let alert = require('alert');
            alert("Username doesnt exist")
        } else {
            const hashedPass = result[0].password
            var compareResult = bcrypt.compare(password, hashedPass);
            if (compareResult == false) {
                console.log("password wrong");
                res.send("password or username wrong");
            } else {
                console.log("login success");
                alert("Welcome to the Hotel Booking App")
                return res.redirect('/homepage');
            }
        }
    });
    connection.end();
});

app.post('/booking', function (req, res) {


    var hotel = req.body.hotel;
    var room = req.body.room;
    var bars = req.body.bars;
    var restaurant = req.body.restaurant;
    var start = req.body.start;
    var end = req.body.end;

    var restPrice = 0;
    var roomPrice = 0;
    var hotelPrice = 0;
    var barPrice = 0;
    var totalPrice = 0;
    var price = 0;


    if (hotel.includes("Travel Lodge")) {
        hotelPrice = 40;
        if (room.includes("Single")) {
            roomPrice = 0;
            if (bars.length !== ("")) {
                barPrice = barPrice + 25;
                if (restaurant.length !== "") {
                    restPrice = restPrice + 25;
                }
            }
        }

        else if (room.includes("Double")) {
            roomPrice = 50;
            if (bars.length !== ("")) {
                barPrice = barPrice + 25;
                if (restaurant.length !== "") {
                    restPrice = restPrice + 25;
                }

            }
        }
        else if (room.includes("Triple")) {
            roomPrice = 150;
            if (bars.length !== ("")) {
                barPrice = barPrice + 25;
                if (restaurant.length !== "") {
                    restPrice = restPrice + 25;
                }

            }
        }
        else if (room.includes("Suite")) {
            roomPrice = 200;
            if (bars.length !== ("")) {
                barPrice = barPrice + 25;
                if (restaurant.length !== "") {
                    restPrice = restPrice + 25;
                }

            }
        }

    }

    if (hotel.includes('The Generator')) {
        hotelPrice = 80;
        if (room.includes("Single")) {
            roomPrice = 0;
            if (bars.length !== ("")) {
                barPrice = barPrice + 20;
                if (restaurant.length !== "") {
                    restPrice = restPrice + 20;
                }
            }
        }
        else if (room.includes("Double")) {
            roomPrice = 50;
            if (bars.length !== ("")) {
                barPrice = barPrice + 20;
                if (restaurant.length !== "") {
                    restPrice = restPrice + 20;
                }

            }
        } else if (room.includes("Triple")) {
            roomPrice = 150;
            if (bars.length !== ("")) {
                barPrice = barPrice + 20;
                if (restaurant.length !== "") {
                    restPrice = restPrice + 20;
                }

            }
        } else if (room.includes("Suite")) {
            roomPrice = 200;
            if (bars.length !== ("")) {
                barPrice = barPrice + 20;
                if (restaurant.length !== "") {
                    restPrice = restPrice + 20;
                }

            }
        }

    }


    if (hotel.includes('Jurys Inn')) {
        hotelPrice = 120;
        if (room.includes("Single")) {
            roomPrice = 0;
            if (bars.length !== ("")) {
                barPrice = barPrice + 15;
                if (restaurant.length !== "") {
                    restPrice = restPrice + 15;
                }
            }
        }
        else if (room.includes("Double")) {
            roomPrice = 50;
            if (bars.length !== ("")) {
                barPrice = barPrice + 15;
                if (restaurant.length !== "") {
                    restPrice = restPrice + 15;
                }

            }
        }
        else if (room.includes("Triple")) {
            roomPrice = 150;
            if (bars.length !== ("")) {
                barPrice = barPrice + 15;
                if (restaurant.length !== "") {
                    restPrice = restPrice + 15;
                }

            }
        }
       else if (room.includes("Suite")) {
            roomPrice = 200;
            if (bars.length !== ("")) {
                barPrice = barPrice + 15;
                if (restaurant.length !== "") {
                    restPrice = restPrice + 15;
                }

            }
        }
    }



    if (hotel.includes('The Marlin')) {
        hotelPrice = 160;
        if (room.includes("Single")) {
            roomPrice = 0;
            if (bars.length !== ("")) {
                barPrice = 10;
                if (restaurant.length !== "") {
                    restPrice = 10;
                }
            }
        }

        else  if (room.includes("Double")) {
            roomPrice = 50;
            if (bars.length !== ("")) {
                barPrice = 10;
                if (restaurant.length !== "") {
                    restPrice = 10;
                }

            }
        }
        else  if (room.includes("Triple")) {
            roomPrice = 150;
            if (bars.length !== ("")) {
                barPrice = 10;
                if (restaurant.length !== "") {
                    restPrice = 10;
                }

            }
        }
        else if (room.includes("Suite")) {
            roomPrice = 200;
            if (bars.length !== ("")) {
                barPrice = 10;
                if (restaurant.length !== "") {
                    restPrice = 10;
                }

            }
        }
    }

    if (hotel.includes('The Marker')) {
            hotelPrice = 200;
            if (room.includes("Single")) {
                roomPrice = 0;
                if (bars.length !== ("")) {
                    barPrice = 0;
                    if (restaurant.length !== "") {
                        restPrice = 0;
                    }
                }
            }

           else  if (room.includes("Double")) {
                roomPrice = 50;
                if (bars.length !== ("")) {
                    barPrice = 0;
                    if (restaurant.length !== "") {
                        restPrice = 0;
                    }

                }
            }
           else  if (room.includes("Triple")) {
                roomPrice = 150;
                if (bars.length !== ("")) {
                    barPrice = 0;
                    if (restaurant.length !== "") {
                        restPrice = 0;
                    }

                }
            }
            else if (room.includes("Suite")) {
                roomPrice = 200;
                if (bars.length !== ("")) {
                    barPrice = 0;
                    if (restaurant.length !== "") {
                        restPrice = 0;
                    }

                }
            }
    }

    totalPrice=restPrice+roomPrice+hotelPrice+barPrice;

    price=totalPrice;

    var errormessage = "";

    console.log("");

    console.log("Hotel = " + hotel);
    console.log("Room = " + room);
    console.log("Bar/Nightclub = " + bars);
    console.log("Restaurant = " + restaurant);
    console.log("Check in: = " + start);
    console.log("Check out: = " + end);
    console.log("Price: = " + price);

    console.log("");


    if (errormessage.length > 0) {
        res.send(errormessage);
    } else {

        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'test'
        });

        // This is the actual SQL query part
        connection.query("INSERT INTO `test`.`booking` (`hotel`, `room`, `bars`,`restaurant`,`start_date`,`end_date`,`price`) VALUES ('" + hotel + "', '" + room + "', '" + bars + "', '" + restaurant + "', '" + start + "', '" + end + "', '" + price + "');", function (error, results, fields) {
            if (error) throw error;
        });
        connection.end();
        let alert = require('alert');
        alert("Booking Confirmed!! Your total cost is : " + price + " Euro")
        console.log("Success")
        return res.redirect('/checkout');
    }
});

app.post('/admin', function (req, res) {

    var username = req.body.username;
    var password = req.body.password;

    console.log(username);
    console.log(password)
    const bcrypt = require('bcrypt');
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'test'
    });

    connection.connect((error) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Successful")
        }
    });

    connection.query('select * from admin where username = ?', [username], function (error, result) {
        if (error) throw error;
        console.log(result);

        if (result.length == 0) {
            // return res.redirect('/');
            let alert = require('alert');
            alert("Username doesnt exist")
        } else {
            const hashedPass = result[0].password
            var compareResult = bcrypt.compare(password, hashedPass);
            if (compareResult == false) {
                console.log("password wrong");
                res.send("password or username wrong");
            } else {
                console.log("login success");
                alert("You are logged in as Admin")
                return res.redirect('/adminpage');
            }
        }
    });
    connection.end();
});

app.get('/select', function(req,res,next) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'test'
    });
    connection.query('SELECT * FROM users',req.body,function(err, data) {
        res.render('select', {users: data});
    })
})

app.get('/form', function(req,res,next) {
    res.render('/form')
})

app.post('/form', function(req,res,next) {

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'test'
    });
    connection.query('INSERT INTO users SET ?', req.body,function(err, data) {
        res.send('success');
    })
})

app.get('/delete', function(req,res,next) {

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'test'
    });
    connection.query('DELETE FROM users WHERE id = ?',req.query.id, function (err, data) {
        res.redirect('users');
    })
})

app.get('/edit', function(req,res,next) {

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'test'
    });
    connection.query('SELECT * FROM users WHERE id = ?',req.query.id, function (err, data) {
        res.render('form', {users: data});
    })
})

app.post('/edit', function(req,res,next) {

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'test'
    });
    var param =[
        req.body,
        req.query.id
    ]
    connection.query('UPDATE users SET ? WHERE id = ?',param, function(err, data){
        res.redirect('/users');
    })
})

app.get('/select2', function(req,res,next) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'test'
    });
    connection.query('SELECT * FROM booking',req.body,function(err, data) {
        res.render('select2', {booking: data});
    })
})

app.get('/form2', function(req,res,next) {
    res.render('/form2')
})

app.post('/form2', function(req,res,next) {

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'test'
    });
    connection.query('INSERT INTO booking SET ?', req.body,function(err, data) {
        res.send('success');
    })
})

app.get('/delete2', function(req,res,next) {

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'test'
    });
    connection.query('DELETE FROM booking WHERE id = ?',req.query.id, function (err, data) {
        res.redirect('bookingDisplay');
    })
})

app.get('/edit2', function(req,res,next) {

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'test'
    });
    connection.query('SELECT * FROM booking WHERE id = ?',req.query.id, function (err, data) {
        res.render('form2', {booking: data});
    })
})

app.post('/edit2', function(req,res,next) {

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'test'
    });
    var param =[
        req.body,
        req.query.id
    ]
    connection.query('UPDATE booking SET ? WHERE id = ?',param, function(err, data){
        res.redirect('/bookingDisplay');
    })
})

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;