'use strict';

const LIB_PARSING = require( './parsing.js' );
const LIB_REFERENCE_DATA = require( './reference-data.js' );


exports.NewInfoParse =
	function NewInfoParse()
	{
		let infoparse =
		{
			Ref: LIB_REFERENCE_DATA.Ref,
			GetFirstWord: LIB_PARSING.GetFirstWord,
			GetAfterFirstWord: LIB_PARSING.GetAfterFirstWord,
			GetLastWord: LIB_PARSING.GetLastWord,
			GetBeforeLastWord: LIB_PARSING.GetBeforeLastWord,
		};

		let parser_source = null;
		let parser = null;

		// Person Name Parser
		parser_source = require( './parsers/person-name.js' );
		parser =
		{
			infoparse: infoparse,
			parser_name: 'PersonName',
			Parse: parser_source.Parse,
			Unparse: parser_source.Unparse,
			NewParts: parser_source.NewParts,
			MatchParts: parser_source.MatchParts,
		};
		infoparse.PersonName = parser;

		// Phone Number Parser
		parser_source = require( './parsers/phone-number.js' );
		parser =
		{
			infoparse: infoparse,
			parser_name: 'PhoneNumber',
			Parse: parser_source.Parse,
			Unparse: parser_source.Unparse,
			NewParts: parser_source.NewParts,
			MatchParts: parser_source.MatchParts,
		};
		infoparse.PhoneNumber = parser;

		// Mail Address Parser
		parser_source = require( './parsers/mail-address.js' );
		parser =
		{
			infoparse: infoparse,
			parser_name: 'MailAddress',
			Parse: parser_source.Parse,
			Unparse: parser_source.Unparse,
			NewParts: parser_source.NewParts,
			MatchParts: parser_source.MatchParts,
		};
		infoparse.MailAddress = parser;

		// Street Address Parser
		parser_source = require( './parsers/street-address.js' );
		parser =
		{
			infoparse: infoparse,
			parser_name: 'StreetAddress',
			Parse: parser_source.Parse,
			Unparse: parser_source.Unparse,
			NewParts: parser_source.NewParts,
			MatchParts: parser_source.MatchParts,
		};
		infoparse.StreetAddress = parser;

		// Phone Number Parser
		parser_source = require( './parsers/date-time.js' );
		parser =
		{
			infoparse: infoparse,
			parser_name: 'DateTime',
			Parse: parser_source.Parse,
			Unparse: parser_source.Unparse,
			NewParts: parser_source.NewParts,
			MatchParts: parser_source.MatchParts,
		};
		infoparse.DateTime = parser;

		// Return the library object.
		return infoparse;
	};
