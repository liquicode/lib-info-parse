'use strict';

const LIB_STRING = require( 'string' );
const LIB_STRING_SIMILARITY = require( 'string-similarity' );

//=====================================================================
//=====================================================================
//
//		PERSON NAME PARSER
//
//=====================================================================
//=====================================================================

exports.Parse = GetPersonNameParts;
exports.Unparse = GetPersonName;
exports.NewParts = NewPersonNamePartsObject;
exports.MatchParts = MatchPersonNameParts;


//---------------------------------------------------------------------
function GetPersonNameParts( PersonName )
{
	let person_name_parts = NewPersonNamePartsObject();
	if ( !PersonName ) { return person_name_parts; }

	// Remove punctuation and whitespace.
	let s_person_name = LIB_STRING( PersonName )
		.toLowerCase()
		.replaceAll( '.', '' )
		.replaceAll( ',', '' )
		.collapseWhitespace()
		;

	// Parse the honorific.
	try
	{
		let honorific = s_person_name.splitLeft( ' ', 1, 1 )[ 0 ];
		if (
			[
				'mr', 'ms', 'mrs', 'miss', 'dr',
				'sir', 'lady', 'lord',
			].includes( honorific.toLowerCase() ) )
		{
			person_name_parts.honorific = honorific;
			s_person_name = s_person_name.chompLeft( honorific ).trim();
		}
	}
	catch ( error ) 
	{
		console.error( error.message, error );
	}

	// Parse the suffix.
	try
	{
		let suffix = s_person_name.splitRight( ' ', 1, 1 )[ 0 ];
		if (
			[
				'jr', 'sr', 'iii',
			].includes( suffix.toLowerCase() ) )
		{
			person_name_parts.suffix = suffix;
			s_person_name = s_person_name.chompRight( suffix ).trim();
		}
	}
	catch ( error ) 
	{
		console.error( error.message, error );
	}

	// Parse the name.
	try
	{
		let names = s_person_name.s.split( ' ' );
		if ( names.length > 3 )
		{
			person_name_parts.first_name = names[ 0 ];
			person_name_parts.middle_name = names[ 1 ];
			names[ 0 ] = '';
			names[ 1 ] = '';
			person_name_parts.last_name = names.join( ' ' ).trim();
		}
		else if ( names.length === 3 )
		{
			person_name_parts.first_name = names[ 0 ];
			person_name_parts.middle_name = names[ 1 ];
			person_name_parts.last_name = names[ 2 ];
		}
		else if ( names.length === 2 )
		{
			person_name_parts.first_name = names[ 0 ];
			person_name_parts.last_name = names[ 1 ];
		}
		else if ( names.length === 1 )
		{
			person_name_parts.last_name = names[ 0 ];
		}
	}
	catch ( error ) 
	{
		console.error( error.message, error );
	}


	return person_name_parts;
}


//---------------------------------------------------------------------
function GetPersonName( PersonNameParts )
{
	let person_name = '';
	if ( PersonNameParts.honorific ) { person_name += ' ' + PersonNameParts.honorific; }
	if ( PersonNameParts.first_name ) { person_name += ' ' + PersonNameParts.first_name; }
	if ( PersonNameParts.middle_name ) { person_name += ' ' + PersonNameParts.middle_name; }
	if ( PersonNameParts.last_name ) { person_name += ' ' + PersonNameParts.last_name; }
	if ( PersonNameParts.suffix ) { person_name += ' ' + PersonNameParts.suffix; }
	person_name = LIB_STRING( person_name ).titleCase().trim().s;
	return person_name;
}


//---------------------------------------------------------------------
function NewPersonNamePartsObject()
{
	return {
		honorific: '',
		first_name: '',
		middle_name: '',
		last_name: '',
		suffix: '',
	};
}


//---------------------------------------------------------------------
function MatchPersonNameParts( PersonNameParts, MatchesParts )
{
	let result = 0;
	result += LIB_STRING_SIMILARITY.compareTwoStrings( PersonNameParts.honorific, MatchesParts.honorific );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( PersonNameParts.first_name, MatchesParts.first_name );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( PersonNameParts.middle_name, MatchesParts.middle_name );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( PersonNameParts.last_name, MatchesParts.last_name );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( PersonNameParts.suffix, MatchesParts.suffix );
	return ( result / 5 );
}


