'use strict';

const LIB_STRING_SIMILARITY = require( 'string-similarity' );

//=====================================================================
//=====================================================================
//
//		OBJECT MATCHING
//
//=====================================================================
//=====================================================================

exports.MatchPerson = MatchPerson;

exports.MatchPersonName = MatchPersonName;
exports.MatchPersonNameParts = MatchPersonNameParts;

exports.MatchAddress = MatchAddress;
exports.MatchAddressParts = MatchAddressParts;

exports.MatchPhoneNumber = MatchPhoneNumber;
exports.MatchPhoneNumberParts = MatchPhoneNumberParts;

exports.MatchDate = MatchDate;

exports.MatchBirthData = MatchBirthData;


//---------------------------------------------------------------------
function MatchPerson( Person, Matches )
{
	let result = 0;
	let count = 0;
	if ( Person.person_name ) 
	{
		result += this.MatchPersonName( Person.person_name, Matches.person_name );
		count++;
	}
	if ( Person.address ) 
	{
		result += this.MatchAddress( Person.address, Matches.address );
		count++;
	}
	if ( Person.phone_number ) 
	{
		result += this.MatchPhoneNumber( Person.phone_number, Matches.phone_number );
		count++;
	}
	if ( Person.birthday ) 
	{
		result += this.MatchDate( Person.birthday, Matches.birthday );
		count++;
	}
	if ( !count ) { return 0; }
	return ( result / count );
}


//---------------------------------------------------------------------
function MatchPersonName( PersonName, Matches )
{
	return this.MatchPersonNameParts( this.GetPersonNameParts( PersonName ), this.GetPersonNameParts( Matches ) );
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


//---------------------------------------------------------------------
function MatchAddress( Address, Matches )
{
	return this.MatchAddressParts( this.GetAddressParts( Address ), this.GetAddressParts( Matches ) );
}


//---------------------------------------------------------------------
function MatchAddressParts( AddressParts, MatchesParts )
{
	let result = 0;
	result += LIB_STRING_SIMILARITY.compareTwoStrings( AddressParts.street, MatchesParts.street );
	result += LIB_STRING_SIMILARITY.compareTwoStrings(
		this.UnabbreviateCityName( AddressParts.city ),
		this.UnabbreviateCityName( MatchesParts.city ) );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( AddressParts.state, MatchesParts.state );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( AddressParts.zip, MatchesParts.zip );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( AddressParts.zip_plus_four, MatchesParts.zip_plus_four );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( AddressParts.country, MatchesParts.country );
	return ( result / 6 );
}


//---------------------------------------------------------------------
function MatchPhoneNumber( PhoneNumber, Matches )
{
	return this.MatchPhoneNumberParts( this.GetPhoneNumberParts( PhoneNumber ), this.GetPhoneNumberParts( Matches ) );
}


//---------------------------------------------------------------------
function MatchPhoneNumberParts( PhoneNumberParts, MatchesParts )
{
	let result = 0;
	result += LIB_STRING_SIMILARITY.compareTwoStrings( PhoneNumberParts.country_code, MatchesParts.country_code );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( PhoneNumberParts.area_code, MatchesParts.area_code );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( PhoneNumberParts.prefix, MatchesParts.prefix );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( PhoneNumberParts.number, MatchesParts.number );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( PhoneNumberParts.extension, MatchesParts.extension );
	return ( result / 5 );
}


//---------------------------------------------------------------------
function MatchDate( DateString, Matches )
{
	try
	{
		let d0 = ( new Date( DateString ) ).toISOString();
		let d1 = ( new Date( Matches ) ).toISOString();
		return LIB_STRING_SIMILARITY.compareTwoStrings( d0, d1 );
	}
	catch ( error )
	{
		return 0;
	}
}


//---------------------------------------------------------------------
function MatchBirthData( BirthData, Matches )
{
	let result = 0;
	result += LIB_STRING_SIMILARITY.compareTwoStrings( BirthData.birth_day, Matches.birth_day );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( BirthData.birth_month, Matches.birth_month );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( BirthData.birth_year, Matches.birth_year );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( BirthData.birth_city, Matches.birth_city );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( BirthData.birth_state, Matches.birth_state );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( BirthData.birth_country, Matches.birth_country );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( BirthData.birth_hospital, Matches.birth_hospital );
	return ( result / 7 );
}

