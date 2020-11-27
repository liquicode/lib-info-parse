"use strict";


const LIB_INFO_PARSE = require( '../src/lib-info-parse.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `03) PhoneNumber Tests`,
	function ()
	{


		//---------------------------------------------------------------------
		let Parse = null;

		//---------------------------------------------------------------------
		beforeEach(
			function ()
			{
				Parse = LIB_INFO_PARSE.NewInfoParse();
				LIB_ASSERT.ok( Parse, `Parser failed to create.` );
				return;
			} );

		//---------------------------------------------------------------------
		afterEach(
			function ()
			{
				Parse = null;
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPhoneNumberParts( '567890' )                             --> 567890`,
			async function ()
			{
				let parts = Parse.GetPhoneNumberParts( '567890' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country_code, '' );
				LIB_ASSERT.strictEqual( parts.area_code, '' );
				LIB_ASSERT.strictEqual( parts.prefix, '' );
				LIB_ASSERT.strictEqual( parts.number, '567890' );
				LIB_ASSERT.strictEqual( parts.extension, '' );
				parts = Parse.GetPhoneNumber( parts );
				LIB_ASSERT.strictEqual( parts, '567890' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPhoneNumberParts( '4567890' )                            --> 456-7890`,
			async function ()
			{
				let parts = Parse.GetPhoneNumberParts( '4567890' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country_code, '' );
				LIB_ASSERT.strictEqual( parts.area_code, '' );
				LIB_ASSERT.strictEqual( parts.prefix, '456' );
				LIB_ASSERT.strictEqual( parts.number, '7890' );
				LIB_ASSERT.strictEqual( parts.extension, '' );
				parts = Parse.GetPhoneNumber( parts );
				LIB_ASSERT.strictEqual( parts, '456-7890' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPhoneNumberParts( '456-7890' )                           --> 456-7890`,
			async function ()
			{
				let parts = Parse.GetPhoneNumberParts( '456-7890' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country_code, '' );
				LIB_ASSERT.strictEqual( parts.area_code, '' );
				LIB_ASSERT.strictEqual( parts.prefix, '456' );
				LIB_ASSERT.strictEqual( parts.number, '7890' );
				LIB_ASSERT.strictEqual( parts.extension, '' );
				parts = Parse.GetPhoneNumber( parts );
				LIB_ASSERT.strictEqual( parts, '456-7890' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPhoneNumberParts( '1234567890' )                         --> (123) 456-7890`,
			async function ()
			{
				let parts = Parse.GetPhoneNumberParts( '1234567890' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country_code, '' );
				LIB_ASSERT.strictEqual( parts.area_code, '123' );
				LIB_ASSERT.strictEqual( parts.prefix, '456' );
				LIB_ASSERT.strictEqual( parts.number, '7890' );
				LIB_ASSERT.strictEqual( parts.extension, '' );
				parts = Parse.GetPhoneNumber( parts );
				LIB_ASSERT.strictEqual( parts, '(123) 456-7890' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPhoneNumberParts( '1234567890x42' )                      --> (123) 456-7890 ext 42`,
			async function ()
			{
				let parts = Parse.GetPhoneNumberParts( '1234567890x42' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country_code, '' );
				LIB_ASSERT.strictEqual( parts.area_code, '123' );
				LIB_ASSERT.strictEqual( parts.prefix, '456' );
				LIB_ASSERT.strictEqual( parts.number, '7890' );
				LIB_ASSERT.strictEqual( parts.extension, '42' );
				parts = Parse.GetPhoneNumber( parts );
				LIB_ASSERT.strictEqual( parts, '(123) 456-7890 ext 42' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPhoneNumberParts( '123-456-7890' )                       --> (123) 456-7890`,
			async function ()
			{
				let parts = Parse.GetPhoneNumberParts( '123-456-7890' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country_code, '' );
				LIB_ASSERT.strictEqual( parts.area_code, '123' );
				LIB_ASSERT.strictEqual( parts.prefix, '456' );
				LIB_ASSERT.strictEqual( parts.number, '7890' );
				LIB_ASSERT.strictEqual( parts.extension, '' );
				parts = Parse.GetPhoneNumber( parts );
				LIB_ASSERT.strictEqual( parts, '(123) 456-7890' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPhoneNumberParts( '(123) 456-7890' )                     --> (123) 456-7890`,
			async function ()
			{
				let parts = Parse.GetPhoneNumberParts( '(123) 456-7890' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country_code, '' );
				LIB_ASSERT.strictEqual( parts.area_code, '123' );
				LIB_ASSERT.strictEqual( parts.prefix, '456' );
				LIB_ASSERT.strictEqual( parts.number, '7890' );
				LIB_ASSERT.strictEqual( parts.extension, '' );
				parts = Parse.GetPhoneNumber( parts );
				LIB_ASSERT.strictEqual( parts, '(123) 456-7890' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPhoneNumberParts( '011 (123) 456-7890' )                 --> +011 (123) 456-7890`,
			async function ()
			{
				let parts = Parse.GetPhoneNumberParts( '011 (123) 456-7890' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country_code, '011' );
				LIB_ASSERT.strictEqual( parts.area_code, '123' );
				LIB_ASSERT.strictEqual( parts.prefix, '456' );
				LIB_ASSERT.strictEqual( parts.number, '7890' );
				LIB_ASSERT.strictEqual( parts.extension, '' );
				parts = Parse.GetPhoneNumber( parts );
				LIB_ASSERT.strictEqual( parts, '+011 (123) 456-7890' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPhoneNumberParts( '+011 (123) 456-7890' )                --> +011 (123) 456-7890`,
			async function ()
			{
				let parts = Parse.GetPhoneNumberParts( '+011 (123) 456-7890' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country_code, '011' );
				LIB_ASSERT.strictEqual( parts.area_code, '123' );
				LIB_ASSERT.strictEqual( parts.prefix, '456' );
				LIB_ASSERT.strictEqual( parts.number, '7890' );
				LIB_ASSERT.strictEqual( parts.extension, '' );
				parts = Parse.GetPhoneNumber( parts );
				LIB_ASSERT.strictEqual( parts, '+011 (123) 456-7890' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPhoneNumberParts( '+011 (123) 456-7890 ext 42' )         --> +011 (123) 456-7890 ext 42`,
			async function ()
			{
				let parts = Parse.GetPhoneNumberParts( '+011 (123) 456-7890 ext 42' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country_code, '011' );
				LIB_ASSERT.strictEqual( parts.area_code, '123' );
				LIB_ASSERT.strictEqual( parts.prefix, '456' );
				LIB_ASSERT.strictEqual( parts.number, '7890' );
				LIB_ASSERT.strictEqual( parts.extension, '42' );
				parts = Parse.GetPhoneNumber( parts );
				LIB_ASSERT.strictEqual( parts, '+011 (123) 456-7890 ext 42' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPhoneNumberParts( '+011 (123) 456-7890 x42' )            --> +011 (123) 456-7890 ext 42`,
			async function ()
			{
				let parts = Parse.GetPhoneNumberParts( '+011 (123) 456-7890 x42' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country_code, '011' );
				LIB_ASSERT.strictEqual( parts.area_code, '123' );
				LIB_ASSERT.strictEqual( parts.prefix, '456' );
				LIB_ASSERT.strictEqual( parts.number, '7890' );
				LIB_ASSERT.strictEqual( parts.extension, '42' );
				parts = Parse.GetPhoneNumber( parts );
				LIB_ASSERT.strictEqual( parts, '+011 (123) 456-7890 ext 42' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPhoneNumberParts( '+011 123-456-7890 x42' )              --> +011 (123) 456-7890 ext 42`,
			async function ()
			{
				let parts = Parse.GetPhoneNumberParts( '+011 123-456-7890 x42' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country_code, '011' );
				LIB_ASSERT.strictEqual( parts.area_code, '123' );
				LIB_ASSERT.strictEqual( parts.prefix, '456' );
				LIB_ASSERT.strictEqual( parts.number, '7890' );
				LIB_ASSERT.strictEqual( parts.extension, '42' );
				parts = Parse.GetPhoneNumber( parts );
				LIB_ASSERT.strictEqual( parts, '+011 (123) 456-7890 ext 42' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPhoneNumberParts( '+011 123.456.7890 x42' )              --> +011 (123) 456-7890 ext 42`,
			async function ()
			{
				let parts = Parse.GetPhoneNumberParts( '+011 123.456.7890 x42' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country_code, '011' );
				LIB_ASSERT.strictEqual( parts.area_code, '123' );
				LIB_ASSERT.strictEqual( parts.prefix, '456' );
				LIB_ASSERT.strictEqual( parts.number, '7890' );
				LIB_ASSERT.strictEqual( parts.extension, '42' );
				parts = Parse.GetPhoneNumber( parts );
				LIB_ASSERT.strictEqual( parts, '+011 (123) 456-7890 ext 42' );
				return;
			} );


	} ); // PhoneNumber Tests
