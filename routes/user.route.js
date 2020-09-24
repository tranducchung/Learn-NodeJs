var express = require('express')
var router = express.Router()
var db = require('../db')
var _ = require('lodash')
var controller = require('../controller/user.controller')

const collection = db.defaults({users: []}).get('users')

router.get('/', controller.getList)

router.get('/create', controller.getFormCreate)

router.get('/search', controller.search)

router.get('/:id', controller.getViewDetail)

router.post('/create', controller.create)

router.get('/delete/:id', controller.delete)


module.exports = router