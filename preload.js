// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const {ipcRenderer} = require( "electron" );
let spawn = require("child_process").spawn;
const { registerKeypressEvent, getCountOfKeyspresses } = require('./db')
const conf = require('./config.json')

const countPercents = async () => {
  const element = document.getElementById('keys-counter')
  if (element) {
    const count = await getCountOfKeyspresses(conf.x_period);
    const percents = Math.ceil(count / conf.max_keystrokes * 100);
    element.innerText = percents;
    ipcRenderer.send( "onPercentChange", percents );
  };
}

spawn("keylogger/keylogger", ["clear"]);

let bat = spawn("keylogger/keylogger", []);

bat.stdout.on("data", async (data) => {
  // console.log(data.toString());
  registerKeypressEvent();
});

bat.stderr.on("data", (err) => { console.log(data); });
bat.on("exit", (code) => { console.log(data); });

setInterval( () => { countPercents(); }, 10000);  

window.addEventListener('DOMContentLoaded', () => {
  countPercents();
})