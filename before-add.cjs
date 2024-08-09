const fs = require('fs/promises');
const path = require('path');

module.exports = async function (git) {
    await fs.writeFile(path.resolve(git.cwd, '.nojekyll'), '');
    await git.add('.nojekyll');
};
