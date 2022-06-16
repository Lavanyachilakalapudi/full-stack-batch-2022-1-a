var express = require('express');
var app = express();
var Cors = require('cors');
app.use(Cors());
var bodyparser = require('body-parser')
app.use(bodyparser.json())
require('dotenv').config()
app.use(bodyparser.urlencoded({ extended: false }))
const { User, Friend, Expense, Participant, Group, Member, Activity } = require('./models');
const client = require('twilio')(process.env.accountSid, process.env.authToken);
const db = require('./models/index');
var jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

app.get("/", function (req, res) {
    res.send("Hellooo");
})

app.post("/register",body('email').isEmail(),async function (req, res) {
try{
    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({success:false,errors:errors.array()})
    }
    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    User.create({ username: req.body.username, email: req.body.email, password: passwordHash, phoneno: req.body.phoneno })
        .then((data) => 
            res.status(200).json(data))
        .catch((err) => 
            res.status(400).json(console.log(err)))
}
catch{
    res.status(400).json("Bad request")
}
})

app.get("/users", function (req, res) {
    User.findAll()
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
})

app.get("/getfriends/:id", async function (req, res) {
    const params_id = req.params.id
    const friends = await db.sequelize.query(`select * from users where id IN(select fid from friends where uid=${params_id})`)
        .then((data) => {
            res.json({
                success: true,
                friendList: data[0]
            })
        })
        .catch((err) => res.send(err))
})

app.post("/authenticate",(req, res) => {

    const { email, password } = req.body;
    User.findOne({
        where: {
            email,
        },
    })
        .then((user) => {
            if (!user) {
                res.json({
                    success: false,
                    message: 'user not found'
                })
            }
            else {
                const isValid = bcrypt.compareSync(password, user.password);
                if (isValid) {
                    var token = jsonwebtoken.sign(
                        {
                            email: user.email,
                        },
                        'secret',
                        { expiresIn: '1h' }
                    );
                    res.json({
                        success: true,
                        message: 'Authentication successful!',
                        token: token,
                        loggeduser: user
                    });
                }
                else {
                    res.json({
                        success: false,
                        message: 'Password is incorrect',
                    });
                }
            }
        })
})

app.post("/newFriend/:email/:id",function (req, res) {
    const email = req.params.email;
    const id = req.params.id;
    User.findOne({
        where: {
            email,
        },
    })
        .then((data) => {
            const user = data.dataValues;
            if (!user) {
                res.json({
                    success: false,
                    message: "Email does not exsist"
                })
            }
            else {
                const update = {
                    uid: id,
                    fid: user.id,
                    created_at: new Date()
                }
                Friend.create(update)
                    .then((data) => {
                        let activity = {
                            name: "New friend is added",
                            created_at: new Date(),
                            user_id: id
                        }
                        Activity.create(activity)
                        res.json({
                            success: true,
                            message: 'New friend added successfully',
                            friend: data.dataValues
                        })
                    })
            }
        })
        .catch((err) => {
            res.json({
                success: false,
                message: 'error occurred in database'
            })
        })
})

app.post("/newExpense/:userid",body('exp_name').isString(),function (req, res) {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({success:false,errors:errors.array()})
    }
    const userid = req.params.userid
    if (req.body.gid == null) {
        let expense = {
            created_by: req.body.created_by,
            amount: req.body.amount,
            exp_name: req.body.exp_name
        }
        let amount = req.body.amount
        let participants = req.body.participants
        let settle = req.body.settle
        Expense.create(expense)
            .then((data) => {
                let activity = {
                    name: "Expense added to friends",
                    created_at: new Date(),
                    user_id: userid
                }
                Activity.create(activity)
                const expdata = data.dataValues;
                const divamount = (amount / (participants.length + 1)).toFixed(2)
                participants.map((p, i) => {
                    let member = {
                        expense_id: expdata.id,
                        user_id: p,
                        divamount: divamount,
                        settle: settle
                    }
                    Participant.create(member)
                })
                res.json({
                    success: true,
                    message: 'Expense and members added successfully'
                })
            })
            .catch((err) => {
                console.log("err", err)
                res.json({
                    success: false,
                    message: "Can't add expense"
                })
            })
    }
    else {
        let expense = {
            created_by: req.body.created_by,
            amount: req.body.amount,
            exp_name: req.body.exp_name,
            gid: req.body.gid,

        }
        let amount = req.body.amount
        let participants = req.body.participants
        let settle = req.body.settle
        Expense.create(expense)
            .then((data) => {
                let activity = {
                    name: "Expense added to group",
                    created_at: new Date(),
                    user_id: userid
                }
                Activity.create(activity)
                const expdata = data.dataValues;
                const divamount = (amount / (participants.length + 1)).toFixed(2)
                participants.map((p, i) => {
                    let member = {
                        expense_id: expdata.id,
                        user_id: p,
                        divamount: divamount,
                        gid: req.body.gid,
                        settle: settle
                    }
                    Participant.create(member)
                })
                res.json({
                    success: true,
                    message: 'Expense and members added successfully'
                })
            })
            .catch((err) => {
                console.log("err", err)
                res.json({
                    success: false,
                    message: "Can't add expense"
                })
            })
    }

})

app.get("/getexpenses/:id", async function (req, res) {
    const params_id = req.params.id
    const expenses = await db.sequelize.query(`select * from expenses where created_by=${params_id}`)
        .then((data) => {
            res.json({
                success: true,
                expensesList: data[0]
            })
        })
        .catch((err) => {
            res.json({
                success: false,
                message: "Failed to fetch expenses"
            })
        })
})


app.post("/forgetpswd", function (req, res) {
    const { email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    db.sequelize.query(`UPDATE users SET password = '${passwordHash}' WHERE email = '${email}'`)
        .then((data) => {
            res.json({
                success: true,
                message: 'password changed successfully'
            })
        })
        .catch((err) => {
            res.json({
                success: false,
                message: "Failed to update"
            })
        })
})


app.get("/getAllEmails", async function (req, res) {
    const friends = await db.sequelize.query(`select email from users`)
        .then((data) => {
            res.json({
                success: true,
                emailList: data[0]
            })
        })
        .catch((err) => {
            res.json({
                success: false,
                message: "can't get emails"
            })
        })
})

app.post("/newGroup/:userid",function (req, res) {

        const userid = req.params.userid
        console.log("userid", userid)
        let group = {
            groupname: req.body.groupname,
            owner_id: req.body.created_by
        }
        let participants = req.body.members
        Group.create(group)
        .then((data) => {
                let activity = {
                    name: "New group is created",
                    created_at: new Date(),
                    user_id: userid
                }
                Activity.create(activity)
                const grpdata = data.dataValues;
                participants.map((p, i) => {
                    let member = {
                        gid: grpdata.id,
                        member_id: p
                    }
                    Member.create(member)
                })
               res.json({
                success:true,
               })
        })
        .catch((err) => {
                console.log("error", err)
                res.json({
                    success: false,
                    message: "Can't add group"
                })
            })
})

app.get("/getYouowed/:id", async function (req, res) {

    const amount = await db.sequelize.query(` select u.username,e.exp_name,em.settle,em.divamount,e.id as id from users u 
    inner join expenses e on u.id=e.created_by inner join participants em 
    on e.id=em.expense_id and em.user_id=${req.params.id}
    `)
        .then((data) => {
            res.json({
                success: true,
                youowedlist: data[0]
            })
        })
        .catch((err) => {
            res.json({
                success: false,
                message: "can't get owed amount"
            })
        })
})

app.get("/getOwedyou/:id", async function (req, res) {
    const owed = db.sequelize.query(`select u.id,u.username,p.divamount from users u inner join (select user_id,divamount from participants where expense_id=${req.params.id})p on u.id=p.user_id`)
        .then((data) => {
            res.json({
                success: true,
                owedlist: data[0]
            })
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get("/getgroups/:id", async function (req, res) {
    const params_id = req.params.id
    const expenses = await db.sequelize.query(`select * from groups where owner_id=${params_id}`)
        .then((data) => {
            res.json({
                success: true,
                groupsList: data[0]
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get("/getGroupMembers/:id", async function (req, res) {
    const params_id = req.params.id
    const gmembers = await db.sequelize.query(`select username , id from users where id IN (select member_id from members where gid=${params_id} )`)
        .then((data) => {
            res.json({
                success: true,
                membersList: data[0]
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get("/getAllgroups", async function (req, res) {
    const params_id = req.params.id
    const expenses = await db.sequelize.query(`select * from groups`)
        .then((data) => {
            res.json({
                success: true,
                groupsList: data[0]
            })
        })
        .catch((err) => {
            res.json({
                success: false,
                message: "Failed to fetch all groups"
            })
        })
})


app.get("/getAllactivities/:id", async function (req, res) {
    console.log("app", req.params.id)
    const friends = await db.sequelize.query(`select * from activities where user_id=${req.params.id}`)
        .then((data) => {
            res.json({
                success: true,
                activitiesList: data[0]
            })
        })
        .catch((err) => {
            res.json({
                success: false,
                message: "can't get activities"
            })
        })
})

app.post("/settleUp/:id", async function (req, res) {
    const userid = req.params.id
    const settle = db.sequelize.query(`update participants set settle=true where expense_id=${req.body.exp_id} and user_id=${req.body.user_id}`)
        .then((data) => {
            let activity = {
                name: "You made the payment",
                created_at: new Date(),
                user_id: userid
            }
            Activity.create(activity)
            res.json({
                success: true,
                message: "updated successfully"
            })
        })
        .catch((err) => {
            console.log(err)
        })

})

app.post("/sendVerificationCode", (req, res) => {
    console.log("phoneno", req.body.phoneno)
    const phoneno = req.body.phoneno
    User.findOne({
        where: {
            phoneno,
        },
    })
        .then((user) => {
            if(!user){
                res.json({
                    success:false,
                    message:"user not found"
                })
            }
            else{

                client.verify.services(process.env.serviceId)
                .verifications
                .create({ to: '+91' + phoneno, channel: 'sms' })
                .then(verification => {
                    res.json({
                        success:true
                    })
                })
                .catch((err) => {
                    console.log(err)
                    return res.status(400).json({ err,success:false })
                })
            }
        })
        .catch((err) => {
            console.log(err)
            return res.status(400).json("No such registered mobile number")
        })

})

app.post("/verifyOTP", function (req, res) {
    
    const phoneno=req.body.phoneno;
    const otp=req.body.otp
    User.findOne({
        where: {
            phoneno,
        },
    })
        .then((user) => {
            client.verify.services(process.env.serviceId)
                .verificationChecks
                .create({ to: '+91' + phoneno, code: otp })
                .then(verification_check => {
                   if(verification_check.valid){
                        res.json({
                            success:true,
                            user:user
                        })
                   }
                   else{
                    res.json({
                        success:false,
                        message:"Invalid Otp"
                    })
                   }
                })
        })
        .catch((error)=>{
            console.log(error)
        })

})

app.listen(8080, function (req, res) {
    console.log("server running on the port 8080")
})
