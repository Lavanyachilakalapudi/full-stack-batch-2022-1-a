var express=require('express');
var app=express();
var Cors=require('cors');
app.use(Cors());
var bodyparser=require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
const {User,Friend,Expense,Participant}=require('./models');
const db=require('./models/index');
var jsonwebtoken =require('jsonwebtoken');
const bcrypt=require('bcrypt');

app.get("/",function(req,res){
    res.send("Hellooo");
})

app.get("/users", function(req,res){
    User.findAll()
    .then((data)=>res.send(data))
    .catch((err)=>res.send(err))
})

app.get("/getfriends/:id", async function(req,res){
    const params_id=req.params.id
    const friends = await db.sequelize.query(`select * from users where id IN(select fid from friends where uid=${params_id})`)
        .then((data)=>{
            res.json({
                success:true,
                friendList:data[0]
            })
        })
        .catch((err)=>res.send(err))
})

app.post("/register",function(req,res){
    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    User.create({username:req.body.username,email:req.body.email, password:passwordHash})
    .then((data)=>res.send(data))
    .catch((err)=>res.send(err))
    
})

app.post("/newFriend/:email/:id",function(req,res){
    const email =req.params.email;
    const id=req.params.id;
    User.findOne({
        where:{
            email,
        },
    })
    .then((data)=>{
        const user=data.dataValues;
        console.log("user",user);
        if(!user){
            res.json({
                success:false,
                message: "Email does not exsist"
            })
        }
        else{
            console.log("elseeeee");
            const update={
                uid:id,
                fid:user.id
            }
            console.log("update",update);
            Friend.create(update)
            .then((data)=>{
                res.json({
                    success:true,
                    message:'New friend added successfully',
                    friend:data.dataValues
                })
            })
        }
    })
   .catch((err)=>{
       res.json({
           success:false,
           message:'error occurred in database'
       })
   })
})

app.post("/authenticate",(req, res) => {
    console.log("authenticate")
    const {email,password}=req.body;
    User.findOne({
        where: {
            email,
        },
    })
    .then((user)=>{
        if(!user){
            res.json({
                success:false,
                message:'user not found'
            })
        }
        else{
            const isValid=bcrypt.compareSync(password,user.password);
            if(isValid){
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
                                    loggeduser:user
                                });
            }
            else{
                res.json({
                            success: false,
                            message: 'Password is incorrect',
                        });
            }
        }
    })
})

app.post("/newExpense",function(req,res){
    let expense={
        created_by:req.body.created_by,
        amount:req.body.amount,
        exp_name:req.body.exp_name
    }
    let participants=req.body.participants
    Expense.create(expense)
    .then((data)=>{
        const expdata=data.dataValues;
        participants.map((p,i)=>{
            let member={
                expense_id:expdata.id,
                user_id:p
            }
            Participant.create(member)
        })
        res.json({
            success:true,
            message:'Expense and members added successfully'
        })
    })
    .catch((err)=>{
        res.json({
            success:false,
            message:"Can't add expense"
        })
    })
})

app.get("/getexpenses/:id", async function(req,res){
    const params_id=req.params.id
    const expenses = await db.sequelize.query(`select * from expenses where created_by=${params_id}`)
        .then((data)=>{
            res.json({
                success:true,
                expensesList:data[0]
            })
        })
        .catch((err)=>{
           res.json({
               success:false,
               message:"Failed to fetch expenses"
           })
        })
})

app.post("/forgetpswd",function(req,res){
    const {email,password}=req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    db.sequelize.query(`UPDATE users SET password = '${passwordHash}' WHERE email = '${email}'`)
    .then((data)=>{
        res.json({
            success:true,
            message:'password changed successfully'
        })
    })
    .catch((err)=>{
        res.json({
            success:false,
            message:"Failed to update"
        })
    })
})
app.listen(8080, function(req,res){
    console.log("server running on the port 8080")
})
