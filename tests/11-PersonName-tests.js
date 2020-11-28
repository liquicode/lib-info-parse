"use strict";


const LIB_INFO_PARSE = require( '../src/lib-info-parse.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `11) Person Name Tests`,
	function ()
	{


		//---------------------------------------------------------------------
		let InfoParse = null;

		//---------------------------------------------------------------------
		beforeEach(
			function ()
			{
				InfoParse = LIB_INFO_PARSE.NewInfoParse();
				LIB_ASSERT.ok( InfoParse, `Parser failed to create.` );
				return;
			} );

		//---------------------------------------------------------------------
		afterEach(
			function ()
			{
				InfoParse = null;
				return;
			} );


		//---------------------------------------------------------------------
		it( `PersonName.Parse() - returns: an empty PersonName object.`,
			async function ()
			{
				let parts = InfoParse.PersonName.Parse();
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.first_name, '' );
				let text = InfoParse.PersonName.Unparse( parts );
				LIB_ASSERT.strictEqual( text, '' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `PersonName.Parse( null ) - returns: an empty PersonName object.`,
			async function ()
			{
				let parts = InfoParse.PersonName.Parse( null );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.first_name, '' );
				let text = InfoParse.PersonName.Unparse( parts );
				LIB_ASSERT.strictEqual( text, '' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `PersonName.Parse( '' ) - returns: an empty PersonName object.`,
			async function ()
			{
				let parts = InfoParse.PersonName.Parse( '' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.first_name, '' );
				let text = InfoParse.PersonName.Unparse( parts );
				LIB_ASSERT.strictEqual( text, '' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `PersonName.Parse( 'Smith' ) - returns: last_name.`,
			async function ()
			{
				let parts = InfoParse.PersonName.Parse( 'Smith' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.last_name, 'smith' );
				let text = InfoParse.PersonName.Unparse( parts );
				LIB_ASSERT.strictEqual( text, 'Smith' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `PersonName.Parse( 'Mr. Smith' ) - returns: honorific, last_name.`,
			async function ()
			{
				let parts = InfoParse.PersonName.Parse( 'Mr. Smith' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.honorific, 'mr' );
				LIB_ASSERT.strictEqual( parts.last_name, 'smith' );
				let text = InfoParse.PersonName.Unparse( parts );
				LIB_ASSERT.strictEqual( text, 'Mr Smith' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `PersonName.Parse( 'John Smith' ) - returns: first_name, last_name.`,
			async function ()
			{
				let parts = InfoParse.PersonName.Parse( 'John Smith' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.first_name, 'john' );
				LIB_ASSERT.strictEqual( parts.last_name, 'smith' );
				let text = InfoParse.PersonName.Unparse( parts );
				LIB_ASSERT.strictEqual( text, 'John Smith' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `PersonName.Parse( 'John J. Smith' ) - returns: first_name, middle_name, last_name.`,
			async function ()
			{
				let parts = InfoParse.PersonName.Parse( 'John J. Smith' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.first_name, 'john' );
				LIB_ASSERT.strictEqual( parts.middle_name, 'j' );
				LIB_ASSERT.strictEqual( parts.last_name, 'smith' );
				let text = InfoParse.PersonName.Unparse( parts );
				LIB_ASSERT.strictEqual( text, 'John J Smith' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `PersonName.Parse( 'Mr. John Smith' ) - returns: honorific, first_name, last_name.`,
			async function ()
			{
				let parts = InfoParse.PersonName.Parse( 'Mr. John Smith' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.honorific, 'mr' );
				LIB_ASSERT.strictEqual( parts.first_name, 'john' );
				LIB_ASSERT.strictEqual( parts.last_name, 'smith' );
				let text = InfoParse.PersonName.Unparse( parts );
				LIB_ASSERT.strictEqual( text, 'Mr John Smith' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `PersonName.Parse( 'Mr. John J. Smith' ) - returns: honorific, first_name, middle_name, last_name.`,
			async function ()
			{
				let parts = InfoParse.PersonName.Parse( 'Mr. John J. Smith' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.honorific, 'mr' );
				LIB_ASSERT.strictEqual( parts.first_name, 'john' );
				LIB_ASSERT.strictEqual( parts.middle_name, 'j' );
				LIB_ASSERT.strictEqual( parts.last_name, 'smith' );
				let text = InfoParse.PersonName.Unparse( parts );
				LIB_ASSERT.strictEqual( text, 'Mr John J Smith' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `PersonName.Parse( 'Mr. John J. Smith, Jr.' ) - returns: honorific, first_name, middle_name, last_name, suffix.`,
			async function ()
			{
				let parts = InfoParse.PersonName.Parse( 'Mr. John J. Smith, Jr.' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.honorific, 'mr' );
				LIB_ASSERT.strictEqual( parts.first_name, 'john' );
				LIB_ASSERT.strictEqual( parts.middle_name, 'j' );
				LIB_ASSERT.strictEqual( parts.last_name, 'smith' );
				LIB_ASSERT.strictEqual( parts.suffix, 'jr' );
				let text = InfoParse.PersonName.Unparse( parts );
				LIB_ASSERT.strictEqual( text, 'Mr John J Smith Jr' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `PersonName.Parse( 'Mr John J Smith Jr' ) - returns: honorific, first_name, middle_name, last_name, suffix.`,
			async function ()
			{
				let parts = InfoParse.PersonName.Parse( 'Mr John J Smith Jr' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.honorific, 'mr' );
				LIB_ASSERT.strictEqual( parts.first_name, 'john' );
				LIB_ASSERT.strictEqual( parts.middle_name, 'j' );
				LIB_ASSERT.strictEqual( parts.last_name, 'smith' );
				LIB_ASSERT.strictEqual( parts.suffix, 'jr' );
				let text = InfoParse.PersonName.Unparse( parts );
				LIB_ASSERT.strictEqual( text, 'Mr John J Smith Jr' );
				return;
			} );


	} ); // PersonName Tests
