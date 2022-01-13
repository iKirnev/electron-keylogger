const { Client } = require('pg')
const conf = require('./config.json')

const registerKeypressEvent = async () => {
    const client = new Client(conf.pg);
    await client.connect();
    const res = await client.query('INSERT into "keystrokes" (timestamp) VALUES (current_timestamp);');
    await client.end();
}

const getCountOfKeyspresses = async (minutes) => {
    const client = new Client(conf.pg);
    await client.connect();
    const res = await client.query("SELECT count(*) FROM public.keystrokes WHERE timestamp > current_timestamp - interval '" + minutes + " minutes';");
    await client.end();
    return res.rows[0].count;
}
module.exports = {
    registerKeypressEvent,
    getCountOfKeyspresses
};
