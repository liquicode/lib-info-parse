
const LIB_FS = require( 'fs' );
const LIB_STRING = require( 'string' );
const LIB_CSV_PARSE_SYNC = require( 'csv-parse/lib/sync' );

let csv_filename = './refs/sources/simplemaps_uszips_pro-v1.72.csv';
let json_filename = './refs/ref.simplemaps.zip-code.json';

console.log( `Reading [${csv_filename}].` );
let content = LIB_FS.readFileSync( csv_filename, 'utf-8' );
let records = LIB_CSV_PARSE_SYNC( content, {
	columns: true,
	skip_empty_lines: true,
} );

console.log( `Processing ...` );
let zip_codes = [];
records.forEach(
	record =>
	{
		zip_codes.push( {
			zip: record.zip,
			city: LIB_STRING( record.city )
				.replaceAll( '.', '' )
				.collapseWhitespace()
				.toLowerCase()
				.s,
			state: LIB_STRING( record.state_id )
				.replaceAll( '.', '' )
				.collapseWhitespace()
				.toLowerCase()
				.s,
		} );
	}
);

LIB_FS.writeFileSync( json_filename, JSON.stringify( zip_codes ) );
console.log( `Wrote [${json_filename}].` );

process.exit( 0 );
