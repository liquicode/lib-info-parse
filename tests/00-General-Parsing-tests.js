"use strict";


const LIB_INFO_PARSE = require( '../src/lib-info-parse.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `00) General Parsing Tests`,
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
		describe( `GetFirstWord and GetAfterFirstWord Tests`,
			function ()
			{


				//---------------------------------------------------------------------
				it( `Here                      -->  Here |`,
					async function ()
					{
						let text = 'Here';
						let word = Parse.GetFirstWord( text );
						text = Parse.GetAfterFirstWord( text );
						LIB_ASSERT.strictEqual( word, 'Here' );
						LIB_ASSERT.strictEqual( text, '' );
						return;
					} );


				//---------------------------------------------------------------------
				it( `Here are some words       -->  Here | are some words`,
					async function ()
					{
						let text = 'Here are some words';
						let word = Parse.GetFirstWord( text );
						text = Parse.GetAfterFirstWord( text );
						LIB_ASSERT.strictEqual( word, 'Here' );
						LIB_ASSERT.strictEqual( text, 'are some words' );
						return;
					} );


				//---------------------------------------------------------------------
				it( `Here are some words       -->  Here | are some words`,
					async function ()
					{
						let text = 'Here are some words';
						let word = Parse.GetFirstWord( text, ' ' );
						text = Parse.GetAfterFirstWord( text, ' ' );
						LIB_ASSERT.strictEqual( word, 'Here' );
						LIB_ASSERT.strictEqual( text, 'are some words' );
						return;
					} );


				//---------------------------------------------------------------------
				it( `Here.are.some.words       -->  Here | are.some.words`,
					async function ()
					{
						let text = 'Here.are.some.words';
						let word = Parse.GetFirstWord( text, ' .' );
						text = Parse.GetAfterFirstWord( text, ' .' );
						LIB_ASSERT.strictEqual( word, 'Here' );
						LIB_ASSERT.strictEqual( text, 'are.some.words' );
						return;
					} );


				//---------------------------------------------------------------------
				it( `Here. are. some. words.   -->  Here | are. some. words.`,
					async function ()
					{
						let text = 'Here. are. some. words.';
						let word = Parse.GetFirstWord( text, ' .' );
						text = Parse.GetAfterFirstWord( text, ' .' );
						LIB_ASSERT.strictEqual( word, 'Here' );
						LIB_ASSERT.strictEqual( text, 'are. some. words.' );
						return;
					} );


				//---------------------------------------------------------------------
				it( `Here are some words       -->  Here | are | some | words`,
					async function ()
					{
						let text = 'Here are some words';
						let word = Parse.GetFirstWord( text, ' ' );
						LIB_ASSERT.strictEqual( word, 'Here' );
						text = Parse.GetAfterFirstWord( text, ' ' );
						LIB_ASSERT.strictEqual( text, 'are some words' );
						word = Parse.GetFirstWord( text, ' ' );
						LIB_ASSERT.strictEqual( word, 'are' );
						text = Parse.GetAfterFirstWord( text, ' ' );
						LIB_ASSERT.strictEqual( text, 'some words' );
						word = Parse.GetFirstWord( text, ' ' );
						LIB_ASSERT.strictEqual( word, 'some' );
						text = Parse.GetAfterFirstWord( text, ' ' );
						LIB_ASSERT.strictEqual( text, 'words' );
						word = Parse.GetFirstWord( text, ' ' );
						LIB_ASSERT.strictEqual( word, 'words' );
						text = Parse.GetAfterFirstWord( text, ' ' );
						LIB_ASSERT.strictEqual( text, '' );
						return;
					} );


			} ); // GetFirstWord and GetAfterFirstWord Tests


		//---------------------------------------------------------------------
		describe( `GetLastWord and GetBeforeLastWord Tests`,
			function ()
			{


				//---------------------------------------------------------------------
				it( `Here                      -->  Here |`,
					async function ()
					{
						let text = 'Here';
						let word = Parse.GetLastWord( text );
						let remainder = Parse.GetBeforeLastWord( text );
						LIB_ASSERT.strictEqual( word, 'Here' );
						LIB_ASSERT.strictEqual( remainder, '' );
						return;
					} );


				//---------------------------------------------------------------------
				it( `Here are some words       -->  Here are some | words`,
					async function ()
					{
						let text = 'Here are some words';
						let word = Parse.GetLastWord( text );
						let remainder = Parse.GetBeforeLastWord( text );
						LIB_ASSERT.strictEqual( word, 'words' );
						LIB_ASSERT.strictEqual( remainder, 'Here are some' );
						return;
					} );


				//---------------------------------------------------------------------
				it( `Here are some words       -->  Here are some | words`,
					async function ()
					{
						let text = 'Here are some words';
						let word = Parse.GetLastWord( text, ' ' );
						let remainder = Parse.GetBeforeLastWord( text, ' ' );
						LIB_ASSERT.strictEqual( word, 'words' );
						LIB_ASSERT.strictEqual( remainder, 'Here are some' );
						return;
					} );


				//---------------------------------------------------------------------
				it( `Here.are.some.words       -->  Here.are.some | words`,
					async function ()
					{
						let text = 'Here.are.some.words';
						let word = Parse.GetLastWord( text, ' .' );
						let remainder = Parse.GetBeforeLastWord( text, ' .' );
						LIB_ASSERT.strictEqual( word, 'words' );
						LIB_ASSERT.strictEqual( remainder, 'Here.are.some' );
						return;
					} );


				//---------------------------------------------------------------------
				it( `Here. are. some. words    -->  Here. are. some. | words`,
					async function ()
					{
						let text = 'Here. are. some. words';
						let word = Parse.GetLastWord( text, ' .' );
						let remainder = Parse.GetBeforeLastWord( text, ' .' );
						LIB_ASSERT.strictEqual( word, 'words' );
						LIB_ASSERT.strictEqual( remainder, 'Here. are. some.' );
						return;
					} );


				//---------------------------------------------------------------------
				it( `Here. are. some. words.   -->  Here. are. some. words. |`,
					async function ()
					{
						let text = 'Here. are. some. words.';
						let word = Parse.GetLastWord( text, ' .' );
						let remainder = Parse.GetBeforeLastWord( text, ' .' );
						LIB_ASSERT.strictEqual( word, '' );
						LIB_ASSERT.strictEqual( remainder, 'Here. are. some. words' );
						return;
					} );


				//---------------------------------------------------------------------
				it( `Here are some words       -->  Here | are | some | words`,
					async function ()
					{
						let text = 'Here are some words';
						let word = Parse.GetLastWord( text, ' ' );
						LIB_ASSERT.strictEqual( word, 'words' );
						text = Parse.GetBeforeLastWord( text, ' ' );
						LIB_ASSERT.strictEqual( text, 'Here are some' );
						word = Parse.GetLastWord( text, ' ' );
						LIB_ASSERT.strictEqual( word, 'some' );
						text = Parse.GetBeforeLastWord( text, ' ' );
						LIB_ASSERT.strictEqual( text, 'Here are' );
						word = Parse.GetLastWord( text, ' ' );
						LIB_ASSERT.strictEqual( word, 'are' );
						text = Parse.GetBeforeLastWord( text, ' ' );
						LIB_ASSERT.strictEqual( text, 'Here' );
						word = Parse.GetLastWord( text, ' ' );
						LIB_ASSERT.strictEqual( word, 'Here' );
						text = Parse.GetBeforeLastWord( text, ' ' );
						LIB_ASSERT.strictEqual( text, '' );
						return;
					} );


			} ); // GetFirstWord and GetAfterFirstWord Tests


	} ); // General Parsing Tests
