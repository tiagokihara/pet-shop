class Tables {
    init(conn) {
        this.conn = conn
        this.createService()
    }

    createService() {
        const sql = 'create table if not exists services(id serial, name character varying(150), pet character varying(150), CONSTRAINT pk_services PRIMARY KEY (id))'

        this.conn.query(sql, (erro) => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Services tables created')
            }
        })
    }
}

module.exports = new Tables