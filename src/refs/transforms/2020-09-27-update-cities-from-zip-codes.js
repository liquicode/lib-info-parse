
const LIB_FS = require( 'fs' );

// Read cities.
let city_filename = './refs/ref.simplemaps.city.json';
console.log( `Reading [${city_filename}].` );
let content = LIB_FS.readFileSync( city_filename, 'utf-8' );
let cities = JSON.parse( content );
content = '';
console.log( `Loaded ${cities.length} cities.` );

// Read zip codes.
let zipcode_filename = './refs/ref.simplemaps.zip-code.json';
console.log( `Reading [${zipcode_filename}].` );
content = LIB_FS.readFileSync( zipcode_filename, 'utf-8' );
let zipcodes = JSON.parse( content );
content = '';
console.log( `Loaded ${zipcodes.length} zip codes.` );

// Transform.
let new_city_count = 0;
for ( let index = 0; index < zipcodes.length; index++ )
{
	let zip = zipcodes[ index ];
	let found_city = cities.find(
		city =>
			( city.state === zip.state )
			&& (
				( city.city === zip.city )
				|| city.alts.includes( zip.city )
			)
	);
	if ( found_city ) { continue; }
	new_city_count++;
	console.log( `Found new city [${zip.city}, ${zip.state}].` );
	cities.push( { city: zip.city, alts: [], state: zip.state, } );
}
console.log( `Found ${new_city_count} new cities.` );

// Write cities.
content = JSON.stringify( cities, null, '\t' );
console.log( `Writing [${city_filename}].` );
LIB_FS.writeFileSync( city_filename, content );

process.exit( 0 );
