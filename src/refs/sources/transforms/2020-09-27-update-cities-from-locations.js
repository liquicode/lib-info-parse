
const LIB_FS = require( 'fs' );

// Read cities.
let city_filename = './refs/ref.simplemaps.city.json';
console.log( `Reading [${city_filename}].` );
let content = LIB_FS.readFileSync( city_filename, 'utf-8' );
let cities = JSON.parse( content );
content = '';
console.log( `Loaded ${cities.length} cities.` );

// Read locations.city.
let locations_city_filename = './refs/sources/locations.city.json';
console.log( `Reading [${locations_city_filename}].` );
content = LIB_FS.readFileSync( locations_city_filename, 'utf-8' );
let locations_cities = JSON.parse( content );
content = '';
console.log( `Loaded ${locations_cities.length} location cities.` );

// Transform.
let new_city_count = 0;
for ( let index = 0; index < locations_cities.length; index++ )
{
	let locations_city = locations_cities[ index ];
	locations_city.state_code = locations_city.state_code.toLowerCase();
	locations_city.city_name = locations_city.city_name.toLowerCase();
	let found_city = cities.find(
		city =>
			( city.state === locations_city.state_code )
			&& (
				( city.city === locations_city.city_name )
				|| city.alts.includes( locations_city.city_name )
			)
	);
	if ( found_city ) { continue; }
	new_city_count++;
	console.log( `Found new city [${locations_city.city_name}, ${locations_city.state_code}].` );
	cities.push( { city: locations_city.city_name, alts: [], state: locations_city.state_code, } );
}
console.log( `Found ${new_city_count} new cities.` );

// Write cities.
content = JSON.stringify( cities, null, '\t' );
console.log( `Writing [${city_filename}].` );
LIB_FS.writeFileSync( city_filename, content );

process.exit( 0 );
