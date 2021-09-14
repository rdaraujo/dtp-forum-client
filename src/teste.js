const fs = require('fs')

function lerArquivo(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, function(err, data) {
      resolve(data.toString())
    })
  })
}

lerArquivo('/home/rda/git/dtp-forum-client/src/teste.js')
  .then(console.log)

var promise = new Promise(function(resolve, reject) {
  const x = 0
  if (x > 0) {
    resolve("Stuff worked!");
  } else {
    reject(Error("It broke"));
  }
});

promise.then(function(result) {
  console.log(result); // "Stuff worked!"
}, function(err) {
  console.log('treta');
  console.log(err); // Error: "It broke"
});