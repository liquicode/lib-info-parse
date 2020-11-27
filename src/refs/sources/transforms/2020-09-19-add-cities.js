
const LIB_FS = require( 'fs' );

let json_filename = './refs/ref.simplemaps.city.json';
console.log( `Reading [${json_filename}].` );
let content = LIB_FS.readFileSync( json_filename, 'utf-8' );
let cities = JSON.parse( content );

console.log( `Adding [north redington beach, fl` );
cities.push( { "state": "fl", "city": "north redington beach", "alts": [] } );

content = JSON.stringify( cities );
console.log( `Writing [${json_filename}].` );
LIB_FS.writeFileSync( json_filename, content );
