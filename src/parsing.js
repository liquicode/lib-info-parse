'use strict';

//=====================================================================
//=====================================================================
//
//		GENERAL PARSING
//
//=====================================================================
//=====================================================================

exports.GetFirstWord = GetFirstWord;
exports.GetAfterFirstWord = GetAfterFirstWord;
exports.GetLastWord = GetLastWord;
exports.GetBeforeLastWord = GetBeforeLastWord;


//---------------------------------------------------------------------
function GetFirstWord( Phrase, Delimiters )
{
	Delimiters = Delimiters || ' ';
	for ( let index = 0; index < Phrase.length; index++ )
	{
		let ch = Phrase.substr( index, 1 );
		if ( Delimiters.indexOf( ch ) >= 0 )
		{
			return Phrase.substr( 0, index );
		}
	}
	return Phrase;
}


//---------------------------------------------------------------------
function GetAfterFirstWord( Phrase, Delimiters )
{
	Delimiters = Delimiters || ' ';
	for ( let index = 0; index < Phrase.length; index++ )
	{
		let ch = Phrase.substr( index, 1 );
		if ( Delimiters.indexOf( ch ) >= 0 )
		{
			while ( Delimiters.indexOf( ch ) >= 0 )
			{
				index++;
				if ( index >= Phrase.length ) { break; }
				ch = Phrase.substr( index, 1 );
			}
			return Phrase.substr( index );
		}
	}
	return '';
}


//---------------------------------------------------------------------
function GetLastWord( Phrase, Delimiters )
{
	Delimiters = Delimiters || ' ';
	for ( let index = Phrase.length - 1; index >= 0; index-- )
	{
		let ch = Phrase.substr( index, 1 );
		if ( Delimiters.indexOf( ch ) >= 0 )
		{
			return Phrase.substr( index + 1 );
		}
	}
	return Phrase;
}


//---------------------------------------------------------------------
function GetBeforeLastWord( Phrase, Delimiters )
{
	Delimiters = Delimiters || ' ';
	for ( let index = Phrase.length - 1; index >= 0; index-- )
	{
		let ch = Phrase.substr( index, 1 );
		if ( Delimiters.indexOf( ch ) >= 0 )
		{
			return Phrase.substr( 0, index );
		}
	}
	return '';
}


