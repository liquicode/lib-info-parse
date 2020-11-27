"use strict";


const LIB_INFO_PARSE = require( '../src/lib-info-parse.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `01) PersonName Tests`,
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
		it( `GetPersonNameParts() - returns: an empty PersonName object.`,
			async function ()
			{
				let parts = Parse.GetPersonNameParts();
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.first_name, '' );
				let text = Parse.GetPersonName( parts );
				LIB_ASSERT.strictEqual( text, '' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPersonNameParts( null ) - returns: an empty PersonName object.`,
			async function ()
			{
				let parts = Parse.GetPersonNameParts( null );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.first_name, '' );
				let text = Parse.GetPersonName( parts );
				LIB_ASSERT.strictEqual( text, '' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPersonNameParts( '' ) - returns: an empty PersonName object.`,
			async function ()
			{
				let parts = Parse.GetPersonNameParts( '' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.first_name, '' );
				let text = Parse.GetPersonName( parts );
				LIB_ASSERT.strictEqual( text, '' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPersonNameParts( 'Smith' ) - returns: last_name.`,
			async function ()
			{
				let parts = Parse.GetPersonNameParts( 'Smith' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.last_name, 'smith' );
				let text = Parse.GetPersonName( parts );
				LIB_ASSERT.strictEqual( text, 'Smith' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPersonNameParts( 'Mr. Smith' ) - returns: honorific, last_name.`,
			async function ()
			{
				let parts = Parse.GetPersonNameParts( 'Mr. Smith' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.honorific, 'mr' );
				LIB_ASSERT.strictEqual( parts.last_name, 'smith' );
				let text = Parse.GetPersonName( parts );
				LIB_ASSERT.strictEqual( text, 'Mr Smith' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPersonNameParts( 'John Smith' ) - returns: first_name, last_name.`,
			async function ()
			{
				let parts = Parse.GetPersonNameParts( 'John Smith' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.first_name, 'john' );
				LIB_ASSERT.strictEqual( parts.last_name, 'smith' );
				let text = Parse.GetPersonName( parts );
				LIB_ASSERT.strictEqual( text, 'John Smith' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPersonNameParts( 'John J. Smith' ) - returns: first_name, middle_name, last_name.`,
			async function ()
			{
				let parts = Parse.GetPersonNameParts( 'John J. Smith' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.first_name, 'john' );
				LIB_ASSERT.strictEqual( parts.middle_name, 'j' );
				LIB_ASSERT.strictEqual( parts.last_name, 'smith' );
				let text = Parse.GetPersonName( parts );
				LIB_ASSERT.strictEqual( text, 'John J Smith' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPersonNameParts( 'Mr. John Smith' ) - returns: honorific, first_name, last_name.`,
			async function ()
			{
				let parts = Parse.GetPersonNameParts( 'Mr. John Smith' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.honorific, 'mr' );
				LIB_ASSERT.strictEqual( parts.first_name, 'john' );
				LIB_ASSERT.strictEqual( parts.last_name, 'smith' );
				let text = Parse.GetPersonName( parts );
				LIB_ASSERT.strictEqual( text, 'Mr John Smith' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPersonNameParts( 'Mr. John J. Smith' ) - returns: honorific, first_name, middle_name, last_name.`,
			async function ()
			{
				let parts = Parse.GetPersonNameParts( 'Mr. John J. Smith' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.honorific, 'mr' );
				LIB_ASSERT.strictEqual( parts.first_name, 'john' );
				LIB_ASSERT.strictEqual( parts.middle_name, 'j' );
				LIB_ASSERT.strictEqual( parts.last_name, 'smith' );
				let text = Parse.GetPersonName( parts );
				LIB_ASSERT.strictEqual( text, 'Mr John J Smith' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetPersonNameParts( 'Mr. John J. Smith, Jr.' ) - returns: honorific, first_name, middle_name, last_name, suffix.`,
			async function ()
			{
				let parts = Parse.GetPersonNameParts( 'Mr. John J. Smith, Jr.' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.honorific, 'mr' );
				LIB_ASSERT.strictEqual( parts.first_name, 'john' );
				LIB_ASSERT.strictEqual( parts.middle_name, 'j' );
				LIB_ASSERT.strictEqual( parts.last_name, 'smith' );
				LIB_ASSERT.strictEqual( parts.suffix, 'jr' );
				let text = Parse.GetPersonName( parts );
				LIB_ASSERT.strictEqual( text, 'Mr John J Smith Jr' );
				return;
			} );


	} ); // PersonName Tests
