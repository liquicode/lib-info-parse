"use strict";


const LIB_INFO_PARSE = require( '../src/lib-info-parse.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `15) DateTime Tests`, function ()
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
	describe( `Various Date Formats`, function ()
	{


		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '05/01/2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: m/d/yyyy`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '5/1/2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm-dd-yyyy`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '05-01-2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: m-d-yyyy`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '5-1-2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: yyyy-mm-dd`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '2005-05-01' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: yyyy-m-d`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '2005-5-1' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: month d, yyyy`, function ()
		{
			let parts = InfoParse.DateTime.Parse( 'May 1, 2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: month-d-yyyy`, function ()
		{
			let parts = InfoParse.DateTime.Parse( 'May-1-2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: month/d/yyyy`, function ()
		{
			let parts = InfoParse.DateTime.Parse( 'May/1/2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: d month yyyy`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '1 May 2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: d-month-yyyy`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '1 May 2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: d/month/yyyy`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '1/May/2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

	} );


	//---------------------------------------------------------------------
	describe( `Parse Day of week`, function ()
	{

		//---------------------------------------------------------------------
		it( `handle: dow, dd month yyyy`, function ()
		{
			let parts = InfoParse.DateTime.Parse( 'Wed, 29 Jul 2020' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2020-07-29T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: dow,dd month yyyy hh:mm:ss zone+offset`, function ()
		{
			let parts = InfoParse.DateTime.Parse( 'Wed,29 Jul 2020' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2020-07-29T00:00:00.000Z' );
		} );

	} );


	//---------------------------------------------------------------------
	describe( `Parse Date and Time`, function ()
	{

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy hh:mm:ss`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '05/01/2005 09:05:23' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T09:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy hh:mm:ss.nnn`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '05/01/2005 09:05:23.421' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T09:05:23.421Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy h:mm:ss`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '05/01/2005 9:05:23' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T09:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy - h:mm`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '05/01/2005 - 9:05' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T09:05:00.000Z' );
		} );

	} );


	//---------------------------------------------------------------------
	describe( `Parse Time Zones`, function ()
	{

		//---------------------------------------------------------------------
		it( `handle: ISO Format`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '2005-05-01T14:05:23.000Z' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T14:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: ISO Format (short)`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '2005-05-01T14:05:23Z' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T14:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy hh:mm:ss zone`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '05/01/2005 14:05:23 GMT' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T14:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy hh:mm:ss +offset`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '05/01/2005 14:05:23 +0100' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T13:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy hh:mm:ss +offset (no zeros)`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '05/01/2005 14:05:23 +1' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T13:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy hh:mm:ss +offset (as time)`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '05/01/2005 14:05:23 +01:00' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T13:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy hh:mm:ss -offset`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '05/01/2005 14:05:23 -0100' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T15:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy hh:mm:ss zone+offset`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '05/01/2005 14:05:23 GMT+0100' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T13:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy hh:mm:ss zone-offset`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '05/01/2005 14:05:23 GMT-0100' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T15:05:23.000Z' );
		} );

	} );


	//---------------------------------------------------------------------
	describe( `Compressed date strings`, function ()
	{

		//---------------------------------------------------------------------
		it( `handle: compressed date`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '20050501' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: compressed date and time`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '20050501150523' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T15:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: number of seconds since whenever`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '1465241631' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2016-06-06T19:33:51.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: number of milliseconds since whenever`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '1465241631421' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2016-06-06T19:33:51.421Z' );
		} );

	} );


	//---------------------------------------------------------------------
	describe( `Reject invalid dates`, function ()
	{

		//---------------------------------------------------------------------
		it( `reject: empty string`, function ()
		{
			let parts = InfoParse.DateTime.Parse( '' );
			LIB_ASSERT.strictEqual( parts.date, null, 'Invalid date.' );
		} );

		//---------------------------------------------------------------------
		it( `reject: garbage`, function ()
		{
			let parts = InfoParse.DateTime.Parse( 'Hello, World!' );
			LIB_ASSERT.strictEqual( parts.date, null, 'Invalid date.' );
		} );

	} );


} );
