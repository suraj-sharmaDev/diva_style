const fs = require("fs");
const files = fs.readdirSync("./").filter(x => x.includes("png"));
files.map(x => {
    fs.rename(x, x.split(".png")[0].replace(/[^A-Z0-9]+/ig, "_").toLowerCase()+'.png', (err) => {
      if (err) throw err;
      console.log('Rename complete!');
    });
})