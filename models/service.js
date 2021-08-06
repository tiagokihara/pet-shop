const conn = require('../infra/connect')

class Service {
    getAll(res) {
        const sql = 'select * from services'

        conn.query(sql, (error, results) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(results.rows)
            }
        })
    }

    getById(id, res) {
        const sql = 'select * from services where id = $1'

        conn.query(sql, [id], (error, results) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(results.rows[0])
            }
        })
    }
    
    add(service, res) {

        const validations = [
            {
                name: "name",
                valid: service.name.length >= 5,
                message: "Name must have at least 5 characters"
            }
        ]

        const errors = validations.filter(v => !v.valid)

        if (errors.length) {
            res.status(400).json(errors)
        } else {
            const birthdate = new Date()

            const sql = 'INSERT INTO services (name, pet, birthdate) values ($1, $2, $3) returning id'

            conn.query(sql, [service.name, service.pet, birthdate], (error, results) => {
                if (error) {
                    res.status(400).json(error)
                } else {
                    res.status(201).json({...service, id: results.rows[0].id})
                }
            })
        }
    }

    update(id, values, res) {
        const sql = 'update services set name = $1, pet = $2 where id = $3'

        conn.query(sql, [values.name, values.pet, id], (error, results) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(results)
            }
        })
    }

    delete(id, res) {

        const sql = "delete from services where id = $1"

        conn.query(sql, [id], (error, results) => {
            if (error) {
                console.log(error)
                res.status(400).json(error)
            } else {
                res.status(200).json(results)
            }
        })
    }
}

module.exports = new Service