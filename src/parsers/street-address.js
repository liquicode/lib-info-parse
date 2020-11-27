'use strict';

const LIB_STRING = require( 'string' );
const LIB_STRING_SIMILARITY = require( 'string-similarity' );

//=====================================================================
//=====================================================================
//
//		STREET ADDRESS PARSER
//
//=====================================================================
//=====================================================================

exports.Parse = GetStreetParts;
exports.Unparse = GetStreet;
exports.NewParts = NewStreetPartsObject;
exports.MatchParts = MatchStreetParts;


//---------------------------------------------------------------------
function GetStreetParts( StreetAddress )
{
	let street_parts = NewStreetPartsObject();
	if ( !StreetAddress ) { return street_parts; }

	let s_street_address = LIB_STRING( StreetAddress )
		.toLowerCase()
		.collapseWhitespace()
		.trim()
		.replaceAll( '.', '' )
		;

	let word = null;

	// Get the building number.
	word = this.infoparse.GetFirstWord( s_street_address.s, ' ' );
	if ( word && !Number.isNaN( Number( word ) ) )
	{
		street_parts.building_number = word;
		s_street_address = s_street_address.chompLeft( word ).trimLeft();
	}

	// Get the street name.
	street_parts.street_name = '';
	while ( true )
	{
		word = this.infoparse.GetFirstWord( s_street_address.s, ' .,' );
		if ( !word ) { break; }
		if ( this.infoparse.Ref.StreetType.includes( word ) ) 
		{
			street_parts.street_type = word;
			s_street_address = s_street_address.chompLeft( word ).trimLeft();
			if ( s_street_address.startsWith( '.' ) ) { s_street_address = s_street_address.chompLeft( '.' ).trimLeft(); }
			if ( s_street_address.startsWith( ',' ) ) { s_street_address = s_street_address.chompLeft( ',' ).trimLeft(); }
			break;
		}
		street_parts.street_name = street_parts.street_name + ' ' + word;
		s_street_address = s_street_address.chompLeft( word ).trimLeft();
		if ( s_street_address.startsWith( '.' ) ) { s_street_address = s_street_address.chompLeft( '.' ).trimLeft(); }
		if ( s_street_address.startsWith( ',' ) ) { s_street_address = s_street_address.chompLeft( ',' ).trimLeft(); }
	}
	street_parts.street_name = street_parts.street_name.trim();
	if ( s_street_address.endsWith( ',' ) ) { s_street_address = s_street_address.chompLeft( ',' ).trimLeft(); }

	// Get the compass direction.
	word = this.infoparse.GetFirstWord( s_street_address.s, ' .,-#' );
	if ( [ 'n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw' ].includes( word ) )
	{
		street_parts.compass_direction = word;
		s_street_address = LIB_STRING( this.infoparse.GetAfterFirstWord( s_street_address.s, ' .,-#' ) );
	}

	// Get the room number.
	street_parts.room_type = '';
	street_parts.room_number = '';
	word = this.infoparse.GetFirstWord( s_street_address.s, ' .,-#' );
	if ( this.infoparse.Ref.RoomType.includes( word ) ) 
	{
		street_parts.room_type = word;
		s_street_address = s_street_address.chompLeft( word ).trimLeft();
		if ( s_street_address.startsWith( '.' ) ) { s_street_address = s_street_address.chompLeft( '.' ).trimLeft(); }
		if ( s_street_address.startsWith( ',' ) ) { s_street_address = s_street_address.chompLeft( ',' ).trimLeft(); }
		if ( s_street_address.startsWith( '-' ) ) { s_street_address = s_street_address.chompLeft( '-' ).trimLeft(); }
		if ( s_street_address.startsWith( '#' ) ) { s_street_address = s_street_address.chompLeft( '#' ).trimLeft(); }
	}
	street_parts.room_number = s_street_address.s;

	// Return, OK.
	return street_parts;
}


//---------------------------------------------------------------------
function GetStreet( StreetParts )
{
	let street = '';
	if ( StreetParts.building_number ) { street += ' ' + StreetParts.building_number; }
	if ( StreetParts.street_name ) { street += ' ' + StreetParts.street_name; }
	if ( StreetParts.street_type ) { street += ' ' + StreetParts.street_type; }
	if ( StreetParts.compass_direction ) { street += ' ' + StreetParts.compass_direction; }
	if ( StreetParts.room_type ) { street += ' ' + StreetParts.room_type; }
	if ( StreetParts.room_number ) { street += ' ' + StreetParts.room_number; }
	street = LIB_STRING( street ).titleCase().trim().s;
	return street;
}


//---------------------------------------------------------------------
function NewStreetPartsObject()
{
	return {
		building_number: '',
		street_name: '',
		street_type: '',
		compass_direction: '',
		room_type: '',
		room_number: '',
	};
}


//---------------------------------------------------------------------
function MatchStreetParts( StreetParts )
{
	throw new Error( `Not implemented!` );
}


