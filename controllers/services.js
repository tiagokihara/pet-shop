const Service = require('../models/service')

module.exports = app => {
    app.get('/services', (req, res) => {
        Service.getAll(res)
    })

    app.get('/services/:id', (req, res) => {
        Service.getById(req.params.id, res)
    })

    app.post('/services', (req, res) => {
        const service = req.body
        Service.add(service, res)
    })

    app.patch('/services/:id', (req, res) => {
        Service.update(req.params.id, req.body, res)
    })

    app.delete('/services/:id', (req, res) => {
        Service.delete(req.params.id, res)
    })
}