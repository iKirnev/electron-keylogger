const { registerKeypressEvent, getCountOfKeyspresses } = require('./db')

async function test() {
    const count = await getCountOfKeyspresses(5);
    process.exit();
}

test();