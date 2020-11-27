'use strict';

// const LIB_STRING = require( 'string' );
// const LIB_STRING_SIMILARITY = require( 'string-similarity' );

const LIB_OBJECT_FACTORIES = require( './object-factories.js' );
const LIB_OBJECT_PARSING = require( './object-parsing.js' );
const LIB_OBJECT_MATCHING = require( './object-matching.js' );

const LIB_REFERENCES = require( './references.js' );

const LIB_GENERAL_PARSING = require( './general-parsing.js' );
const LIB_PARSE_PERSON_NAME = require( './parse-person-name.js' );
const LIB_PARSE_ADDRESS = require( './parse-address.js' );
const LIB_PARSE_PHONE_NUMBER = require( './parse-phone-number.js' );
const LIB_PARSE_DATE = require( './parse-date.js' );


exports.NewInfoParse =
	function NewInfoParse()
	{


		return {


			//=====================================================================
			//=====================================================================
			//
			//		REFERENCES
			//
			//=====================================================================
			//=====================================================================


			Ref: LIB_REFERENCES.Ref,
			LookupMonthName: LIB_REFERENCES.LookupMonthName,


			//=====================================================================
			//=====================================================================
			//
			//		GENERAL PARSING
			//
			//=====================================================================
			//=====================================================================


			GetFirstWord: LIB_GENERAL_PARSING.GetFirstWord,
			GetAfterFirstWord: LIB_GENERAL_PARSING.GetAfterFirstWord,
			GetLastWord: LIB_GENERAL_PARSING.GetLastWord,
			GetBeforeLastWord: LIB_GENERAL_PARSING.GetBeforeLastWord,


			//=====================================================================
			//=====================================================================
			//
			//		OBJECT FACTORIES
			//
			//=====================================================================
			//=====================================================================


			NewPersonObject: LIB_OBJECT_FACTORIES.NewPersonObject,
			NewPersonNamePartsObject: LIB_OBJECT_FACTORIES.NewPersonNamePartsObject,
			NewAddressPartsObject: LIB_OBJECT_FACTORIES.NewAddressPartsObject,
			NewStreetPartsObject: LIB_OBJECT_FACTORIES.NewStreetPartsObject,
			NewPhoneNumberPartsObject: LIB_OBJECT_FACTORIES.NewPhoneNumberPartsObject,
			NewBirthDataObject: LIB_OBJECT_FACTORIES.NewBirthDataObject,


			//=====================================================================
			//=====================================================================
			//
			//		OBJECT PARSING
			//
			//=====================================================================
			//=====================================================================


			ExpandPerson: LIB_OBJECT_PARSING.ExpandPerson,
			CollapsePerson: LIB_OBJECT_PARSING.CollapsePerson,


			//=====================================================================
			//=====================================================================
			//
			//		OBJECT MATCHING
			//
			//=====================================================================
			//=====================================================================


			MatchPerson: LIB_OBJECT_MATCHING.MatchPerson,

			MatchPersonName: LIB_OBJECT_MATCHING.MatchPersonName,
			MatchPersonNameParts: LIB_OBJECT_MATCHING.MatchPersonNameParts,

			MatchAddress: LIB_OBJECT_MATCHING.MatchAddress,
			MatchAddressParts: LIB_OBJECT_MATCHING.MatchAddressParts,

			MatchPhoneNumber: LIB_OBJECT_MATCHING.MatchPhoneNumber,
			MatchPhoneNumberParts: LIB_OBJECT_MATCHING.MatchPhoneNumberParts,

			MatchDate: LIB_OBJECT_MATCHING.MatchDate,

			MatchBirthData: LIB_OBJECT_MATCHING.MatchBirthData,


			//=====================================================================
			//=====================================================================
			//
			//		PARSE PERSON NAME
			//
			//=====================================================================
			//=====================================================================


			GetPersonNameParts: LIB_PARSE_PERSON_NAME.GetPersonNameParts,
			GetPersonName: LIB_PARSE_PERSON_NAME.GetPersonName,


			//=====================================================================
			//=====================================================================
			//
			//		PARSE ADDRESS
			//
			//=====================================================================
			//=====================================================================


			UnabbreviateCityName: LIB_PARSE_ADDRESS.UnabbreviateCityName,

			GetAddressParts: LIB_PARSE_ADDRESS.GetAddressParts,
			GetAddress: LIB_PARSE_ADDRESS.GetAddress,

			GetStreetParts: LIB_PARSE_ADDRESS.GetStreetParts,
			GetStreet: LIB_PARSE_ADDRESS.GetStreet,


			//=====================================================================
			//=====================================================================
			//
			//		PARSE PHONE NUMBER
			//
			//=====================================================================
			//=====================================================================


			GetPhoneNumberParts: LIB_PARSE_PHONE_NUMBER.GetPhoneNumberParts,
			GetPhoneNumber: LIB_PARSE_PHONE_NUMBER.GetPhoneNumber,


			//=====================================================================
			//=====================================================================
			//
			//		PARSE DATE
			//
			//=====================================================================
			//=====================================================================


			MonthYearToDate: LIB_PARSE_DATE.MonthYearToDate,

		};
	};
