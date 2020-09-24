var db = require('../db')
var _ = require('lodash')
const collection = db.defaults({users: []}).get('users')

const controller = {

    getList(req,res) {
        res.render('users/index', {
            users: collection.value()
        })
    },

    getFormCreate(req,res) {
        res.render('users/create')
    },

    search(req,res) {
        const users = collection.value()
        var result = _.filter(users, (user) => {
            return _.includes(user.name.toLowerCase(), req.query.q.toLowerCase())
        })
        res.render('users/index', {
            users: result,
            valueQuery: req.query.q
        })
    },

    getViewDetail(req,res) {
        const id = req.params.id
        const user = collection.getById(id).value()
        res.render('users/detail', {
            user: user
        })
    },

    create(req,res) {
        var data = {
            name: req.body.valueName,
            password: req.body.valuePassword
        }
        var errors = [];
            if (!req.body.valueName) {
            errors.push('Name is required')
        }
        if (!req.body.valuePassword) {
            errors.push('Password is required')
        }
        console.log(errors)

        if (errors.length) {
            res.render('users/create', {
                errors: errors,
                valueBody: data
            })

            return
        }
        collection.insert(data).write()
        res.redirect('/users')
    },

    delete(req,res) {
        console.log(req.params.id, 'id')
        var id = req.params.id
        db.get('users').remove({id: id}).write()
        res.redirect('/users')
    }
}

module.exports = controller