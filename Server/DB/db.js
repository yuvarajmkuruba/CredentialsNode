const moogoose = require('mongoose');


const DB = process.env.DATABASE;
moogoose.connect(DB).then(()=>{
    console.log(`connection Successfully`)
}).catch((err)=>{
    console.error(`Error`,err)
});