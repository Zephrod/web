const fs = require('fs');
const path = require('path');
const specs = require('../config/swagger');

const outputPath = path.join(__dirname, '../swagger-output.json');
fs.writeFileSync(outputPath, JSON.stringify(specs, null, 2));
console.log(`Spec generated to: ${outputPath}`);