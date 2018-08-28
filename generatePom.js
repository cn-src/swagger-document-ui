const fs = require("fs");

const pg = JSON.parse(fs.readFileSync('package.json', {encoding: 'UTF-8'}));
let data = fs.readFileSync('pom.template.xml', {encoding: 'UTF-8'});

data = data.replace(/{{artifactId}}/g, pg.name);
data = data.replace(/{{version}}/g, pg.version);

const contributor = pg.contributors[0].split(' ');
data = data.replace(/{{developer-id}}/g, contributor[0]);
data = data.replace(/{{developer-name}}/g, contributor[0]);
data = data.replace(/{{developer-email}}/g, contributor[1].substring(1, contributor[1].length - 1));

data = data.replace(/{{license.name}}/g, pg.license);
data = data.replace(/{{repo-git.url}}/g, pg.repository);
data = data.replace(/{{repo.url}}/g, pg.repository.substring(0, pg.repository.length - 4));

console.log("generate: pom.xml");
fs.writeFileSync('pom.xml', data);

