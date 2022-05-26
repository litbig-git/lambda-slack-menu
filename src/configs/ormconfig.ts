import { ConnectionOptions } from 'typeorm'
import { Menu } from '@entity/menu'

const ormconfig: ConnectionOptions = {
    type: "mysql",
    host: "database-mysql.chypan0rbkuk.ap-northeast-2.rds.amazonaws.com",
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: "menu",
    synchronize: true,
    logging: false,
    entities: [
        Menu
    ],
    migrations: [
        "src/migration/**/*.ts"
    ],
    subscribers: [
        "src/subscriber/**/*.ts"
    ],
};

export default ormconfig;