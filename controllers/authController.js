'use strict'
module.exports = {
    getSignUp: (req,res)=>{
        res.render('signup');
    },
    
    getLogIn: (req,res)=>{
        res.render('login');
    },
    
    postSignUp:async (req,res)=>{
        const {email,password} = req.body;
        console.log(email,password)
        res.send('Yeni Kullanıcı Oluşturuldu!')
    },
    postLogIn:async (req,res)=>{
        const {email,password} = req.body;
        console.log(email,password)
        res.send('Kullanıcı girişi başarılı!')
    },

}