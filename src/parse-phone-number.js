'use strict';

const LIB_STRING = require( 'string' );

//=====================================================================
//=====================================================================
//
//		PARSE PHONE NUMBER
//
//=====================================================================
//=====================================================================

exports.GetPhoneNumberParts = GetPhoneNumberParts;
exports.GetPhoneNumber = GetPhoneNumber;


//---------------------------------------------------------------------
function GetPhoneNumberParts( PhoneNumber )
{
	let phone_number_parts = this.NewPhoneNumberPartsObject();
	if ( !PhoneNumber ) { return phone_number_parts; }

	// Massage phone number into workable state.
	let phone_number = LIB_STRING( PhoneNumber )
		.toLowerCase()
		.collapseWhitespace()
		.trim()
		.s;

	// Get extension
	let ich = null;
	ich = phone_number.indexOf( 'ext' );
	if ( ich >= 0 )
	{
		// Phone numbers with 'ext'
		phone_number_parts.extension = phone_number.substr( ich + 3 ).trim();
		phone_number = phone_number.substr( 0, ich );
	}
	else
	{
		// Phone numbers with 'x'
		ich = phone_number.indexOf( 'x' );
		if ( ich >= 0 )
		{
			phone_number_parts.extension = phone_number.substr( ich + 1 ).trim();
			phone_number = phone_number.substr( 0, ich );
		}
	}

	// Collapse the rest of the number.
	phone_number = LIB_STRING( phone_number )
		.replaceAll( ' ', '' )
		.replaceAll( '-', '' )
		.replaceAll( '+', '' )
		.replaceAll( ',', '' )
		.replaceAll( '.', '' )
		.replaceAll( '/', '' )
		.replaceAll( '\\', '' )
		.replaceAll( '(', '' )
		.replaceAll( ')', '' )
		.trim()
		.s;

	// Parse the phone number
	if ( phone_number.length === 13 )
	{
		phone_number_parts.country_code = phone_number.substr( 0, 3 );
		phone_number_parts.area_code = phone_number.substr( 3, 3 );
		phone_number_parts.prefix = phone_number.substr( 6, 3 );
		phone_number_parts.number = phone_number.substr( 9, 4 );
	}
	else if ( phone_number.length === 10 )
	{
		phone_number_parts.country_code = '';
		phone_number_parts.area_code = phone_number.substr( 0, 3 );
		phone_number_parts.prefix = phone_number.substr( 3, 3 );
		phone_number_parts.number = phone_number.substr( 6, 4 );
	}
	else if ( phone_number.length === 7 )
	{
		phone_number_parts.country_code = '';
		phone_number_parts.area_code = '';
		phone_number_parts.prefix = phone_number.substr( 0, 3 );
		phone_number_parts.number = phone_number.substr( 3, 4 );
	}
	else
	{
		phone_number_parts.country_code = '';
		phone_number_parts.area_code = '';
		phone_number_parts.prefix = '';
		phone_number_parts.number = phone_number;
	}

	// Return, OK.
	return phone_number_parts;
}


//---------------------------------------------------------------------
function GetPhoneNumber( PhoneNumberParts )
{
	let phone_number = '';
	if ( PhoneNumberParts.country_code ) { phone_number += ' +' + PhoneNumberParts.country_code; }
	if ( PhoneNumberParts.area_code ) { phone_number += ' (' + PhoneNumberParts.area_code + ')'; }
	if ( PhoneNumberParts.prefix ) { phone_number += ' ' + PhoneNumberParts.prefix; }
	if ( PhoneNumberParts.prefix && PhoneNumberParts.number ) { phone_number += '-'; }
	if ( PhoneNumberParts.number ) { phone_number += PhoneNumberParts.number; }
	if ( PhoneNumberParts.extension ) { phone_number += ' ext ' + PhoneNumberParts.extension; }
	phone_number = phone_number.trim();
	return phone_number;
}
