const express = require('express');
const router = express.Router();
//const path = require('path');

const homePage = router.get('/',(req, res) => {
    res.render('index');
})

const loginPage = router.get('/login',(req, res) => {
    res.render('login');
})

const dashboardPage = router.get('/dashboard',(req, res) => {
    res.render('dashboard');
})

const report = router.get('/report',(req, res) => {
    res.render('report');
})

const insertData = router.get('/insertData',(req, res) => {
    res.render('insertData');
})

  module.exports = {
                    homePage, 
                    loginPage,
                    dashboardPage,
                    insertData,
                    report
                    };