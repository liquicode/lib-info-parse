'use strict';

const LIB_STRING = require( 'string' );
const LIB_STRING_SIMILARITY = require( 'string-similarity' );

//=====================================================================
//=====================================================================
//
//		DATE TIME PARSER
//
//=====================================================================
//=====================================================================

exports.Parse = GetDateTimeParts;
exports.Unparse = GetDateTime;
exports.NewParts = NewDateTimePartsObject;
exports.MatchParts = MatchDateTimeParts;


//---------------------------------------------------------------------
function MonthYearToDate( MonthYear )
{
	let month = this.GetFirstWord( MonthYear );
	let year = this.GetLastWord( MonthYear );
	let month_item = this.LookupMonthName( month );
	if ( !month_item ) return '';
	let date = `${year}-${month_item.month_number_2d}-01`;
	return date;
}

//---------------------------------------------------------------------
function GetDateTimeParts( DateTime )
{
	throw new Error( `Not implemented!` );
}


//---------------------------------------------------------------------
function GetDateTime( DateTimeParts )
{
	throw new Error( `Not implemented!` );
}


//---------------------------------------------------------------------
function NewDateTimePartsObject()
{
	throw new Error( `Not implemented!` );
}


//---------------------------------------------------------------------
function MatchDateTimeParts( DateTimeParts, MatchesParts )
{
	throw new Error( `Not implemented!` );
}
