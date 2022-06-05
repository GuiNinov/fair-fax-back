import knexfile from '../config/postgres';

const knex:any = knexfile.connect()

export default knex