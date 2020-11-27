
const LIB_FS = require( 'fs' );
const LIB_STRING = require( 'string' );
const LIB_CSV_PARSE_SYNC = require( 'csv-parse/lib/sync' );

let csv_filename = './refs/sources/simplemaps_uscities_comprehensive-v1.71.csv';
let json_filename = './refs/ref.simplemaps.city.json';

console.log( `Reading [${csv_filename}].` );
let content = LIB_FS.readFileSync( csv_filename, 'utf-8' );
let records = LIB_CSV_PARSE_SYNC( content, {
	columns: true,
	skip_empty_lines: true,
} );

console.log( `Processing ...` );
let cities = [];
let max_words = 0;
records.forEach(
	record =>
	{
		record.city_ascii = LIB_STRING( record.city_ascii )
			.replaceAll( '.', '' )
			.collapseWhitespace()
			.toLowerCase()
			.s;
		record.state_id = LIB_STRING( record.state_id )
			.replaceAll( '.', '' )
			.collapseWhitespace()
			.toLowerCase()
			.s;
		record.city_alt = LIB_STRING( record.city_alt )
			.replaceAll( '.', '' )
			.collapseWhitespace()
			.toLowerCase()
			.s;
		let city =
		{
			city: record.city_ascii,
			alts: [],
			state: record.state_id,
		};
		if ( record.city_alt )
		{
			city.alts.push( city.city );
			city.city = record.city_alt;
		}
		cities.push( city );
		{
			let word_count = city.city.split( ' ' ).length;
			if ( word_count > max_words )
			{
				max_words = word_count;
			}
		}
	}
);
console.log( `Max word count = ${max_words}.` );


LIB_FS.writeFileSync( json_filename, JSON.stringify( cities ) );
console.log( `Wrote [${json_filename}].` );

process.exit( 0 );
