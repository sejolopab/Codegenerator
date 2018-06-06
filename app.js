var readline = require('readline');
var fs = require('fs');
var path = require('path');

var errorHandler = require('./Config/errorHandler');

var config = require('./Config/config').inject( fs, path, errorHandler );
var masterGenerator = require('./Generator/masterGenerator').inject( fs, path, config, errorHandler );
var parserValidator = require('./Parser/parserValidator').inject( errorHandler );
var parser = require('./Parser/parser').inject( fs, path, masterGenerator, parserValidator, errorHandler );
var commands = require('./CLI/commands').inject( parser, config, errorHandler );

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'codeGenerator> '
});

rl.prompt();
rl.on('line', (line) => {
  var command = line.trim().split(' ');
  try{
    commands.read( command );
  } catch (err) {
    console.log( "" );
    console.log( err );
    console.log( "" );
  }
  rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});
