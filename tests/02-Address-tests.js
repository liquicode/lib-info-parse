"use strict";


const LIB_INFO_PARSE = require( '../src/lib-info-parse.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `02) Address Tests`,
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
		it( `GetAddressParts() - returns: an empty Address object.`,
			async function ()
			{
				let parts = Parse.GetAddressParts();
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.street, '' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetAddressParts( null ) - returns: an empty Address object.`,
			async function ()
			{
				let parts = Parse.GetAddressParts( null );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.street, '' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetAddressParts( '' ) - returns: an empty Address object.`,
			async function ()
			{
				let parts = Parse.GetAddressParts( '' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.street, '' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetAddressParts( 'USA' ) - returns: country.`,
			async function ()
			{
				let parts = Parse.GetAddressParts( 'USA' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, 'usa' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetAddressParts( 'Usa' ) - returns: country.`,
			async function ()
			{
				let parts = Parse.GetAddressParts( 'Usa' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, 'usa' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetAddressParts( 'FL, USA' ) - returns: state, country.`,
			async function ()
			{
				let parts = Parse.GetAddressParts( 'FL, USA' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, 'usa' );
				LIB_ASSERT.strictEqual( parts.state, 'fl' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetAddressParts( 'Fl, Usa' ) - returns: state, country.`,
			async function ()
			{
				let parts = Parse.GetAddressParts( 'Fl, Usa' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, 'usa' );
				LIB_ASSERT.strictEqual( parts.state, 'fl' );
				return;
			} );

		//---------------------------------------------------------------------
		it( `GetAddressParts( 'Miami Fl, Usa' ) - returns: city, state, country.`,
			async function ()
			{
				let parts = Parse.GetAddressParts( 'Miami Fl, Usa' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, 'usa' );
				LIB_ASSERT.strictEqual( parts.state, 'fl' );
				LIB_ASSERT.strictEqual( parts.city, 'miami' );
				return;
			} );

		//---------------------------------------------------------------------
		it( `GetAddressParts( 'Miami, Fl, Usa' ) - returns: city, state, country.`,
			async function ()
			{
				let parts = Parse.GetAddressParts( 'Miami, Fl, Usa' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, 'usa' );
				LIB_ASSERT.strictEqual( parts.state, 'fl' );
				LIB_ASSERT.strictEqual( parts.city, 'miami' );
				return;
			} );

		//---------------------------------------------------------------------
		it( `GetAddressParts( '123 Main St, Miami, Fl 33050 Usa' ) - returns: street, city, state, zip, country.`,
			async function ()
			{
				let parts = Parse.GetAddressParts( '123 Main St, Miami, Fl 33050 Usa' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, 'usa' );
				LIB_ASSERT.strictEqual( parts.zip, '33050' );
				LIB_ASSERT.strictEqual( parts.state, 'fl' );
				LIB_ASSERT.strictEqual( parts.city, 'miami' );
				LIB_ASSERT.strictEqual( parts.street, '123 main st' );
				parts.street_parts = Parse.GetStreetParts( parts.street );
				LIB_ASSERT.strictEqual( parts.street_parts.building_number, '123' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_name, 'main' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_type, 'st' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetAddressParts( '123 Main St, Miami, Fl 33050-1234 Usa' ) - returns: street, city, state, zip, country.`,
			async function ()
			{
				let parts = Parse.GetAddressParts( '123 Main St, Miami, Fl 33050-1234 Usa' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, 'usa' );
				LIB_ASSERT.strictEqual( parts.zip, '33050' );
				LIB_ASSERT.strictEqual( parts.zip_plus_four, '1234' );
				LIB_ASSERT.strictEqual( parts.state, 'fl' );
				LIB_ASSERT.strictEqual( parts.city, 'miami' );
				LIB_ASSERT.strictEqual( parts.street, '123 main st' );
				parts.street_parts = Parse.GetStreetParts( parts.street );
				LIB_ASSERT.strictEqual( parts.street_parts.building_number, '123' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_name, 'main' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_type, 'st' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetAddressParts( '123 Main St Miami Fl 33050 Usa' ) - returns: street, city, state, zip, country.`,
			async function ()
			{
				let parts = Parse.GetAddressParts( '123 Main St Miami Fl 33050 Usa' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, 'usa' );
				LIB_ASSERT.strictEqual( parts.zip, '33050' );
				LIB_ASSERT.strictEqual( parts.state, 'fl' );
				LIB_ASSERT.strictEqual( parts.city, 'miami' );
				LIB_ASSERT.strictEqual( parts.street, '123 main st' );
				parts.street_parts = Parse.GetStreetParts( parts.street );
				LIB_ASSERT.strictEqual( parts.street_parts.building_number, '123' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_name, 'main' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_type, 'st' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetAddressParts( '123 Main St, Apt C Miami Fl 33050 Usa' ) - returns: street, city, state, zip, country.`,
			async function ()
			{
				let parts = Parse.GetAddressParts( '123 Main St, Apt C Miami Fl 33050 Usa' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, 'usa' );
				LIB_ASSERT.strictEqual( parts.zip, '33050' );
				LIB_ASSERT.strictEqual( parts.state, 'fl' );
				LIB_ASSERT.strictEqual( parts.city, 'miami' );
				LIB_ASSERT.strictEqual( parts.street, '123 main st apt c' );
				parts.street_parts = Parse.GetStreetParts( parts.street );
				LIB_ASSERT.strictEqual( parts.street_parts.building_number, '123' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_name, 'main' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_type, 'st' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_type, 'apt' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_number, 'c' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetAddressParts( '123 Main St., Apt-C, Miami Fl 33050' ) - returns: street, city, state, zip.`,
			async function ()
			{
				let parts = Parse.GetAddressParts( '123 Main St., Apt-C, Miami Fl 33050' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, '' );
				LIB_ASSERT.strictEqual( parts.zip, '33050' );
				LIB_ASSERT.strictEqual( parts.state, 'fl' );
				LIB_ASSERT.strictEqual( parts.city, 'miami' );
				LIB_ASSERT.strictEqual( parts.street, '123 main st apt-c' );
				parts.street_parts = Parse.GetStreetParts( parts.street );
				LIB_ASSERT.strictEqual( parts.street_parts.building_number, '123' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_name, 'main' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_type, 'st' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_type, 'apt' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_number, 'c' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetAddressParts( 'Main St., Apt-C, Miami Fl 33050' ) - returns: street, city, state, zip.`,
			async function ()
			{
				let parts = Parse.GetAddressParts( 'Main St., Apt-C, Miami Fl 33050' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, '' );
				LIB_ASSERT.strictEqual( parts.zip, '33050' );
				LIB_ASSERT.strictEqual( parts.state, 'fl' );
				LIB_ASSERT.strictEqual( parts.city, 'miami' );
				LIB_ASSERT.strictEqual( parts.street, 'main st apt-c' );
				parts.street_parts = Parse.GetStreetParts( parts.street );
				LIB_ASSERT.strictEqual( parts.street_parts.building_number, '' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_name, 'main' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_type, 'st' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_type, 'apt' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_number, 'c' );
				parts.street = Parse.GetStreet( parts.street_parts );
				let address = Parse.GetAddress( parts );
				LIB_ASSERT.strictEqual( address, 'Main St Apt C, Miami, Fl 33050' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetAddressParts( '4900 Brittany Dr S Apt 1501, Saint Petersburg, Fl 33715' ) - returns: street, room_number, city, state, zip.`,
			async function ()
			{
				let parts = Parse.GetAddressParts( '4900 Brittany Dr S Apt 1501, Saint Petersburg, Fl 33715' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, '' );
				LIB_ASSERT.strictEqual( parts.zip, '33715' );
				LIB_ASSERT.strictEqual( parts.state, 'fl' );
				LIB_ASSERT.strictEqual( parts.city, 'saint petersburg' );
				LIB_ASSERT.strictEqual( parts.street, '4900 brittany dr s apt 1501' );
				parts.street_parts = Parse.GetStreetParts( parts.street );
				LIB_ASSERT.strictEqual( parts.street_parts.building_number, '4900' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_name, 'brittany' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_type, 'dr' );
				LIB_ASSERT.strictEqual( parts.street_parts.compass_direction, 's' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_type, 'apt' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_number, '1501' );
				parts.street = Parse.GetStreet( parts.street_parts );
				let address = Parse.GetAddress( parts );
				LIB_ASSERT.strictEqual( address, '4900 Brittany Dr S Apt 1501, Saint Petersburg, Fl 33715' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetAddressParts( '4900 Brittany Dr, S, Apt 1501, Saint Petersburg, Fl, 33715, USA' ) - returns: street, room_number, city, state, zip.`,
			async function ()
			{
				let parts = Parse.GetAddressParts( '4900 Brittany Dr, S, Apt 1501, Saint Petersburg, Fl, 33715, USA' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, 'usa' );
				LIB_ASSERT.strictEqual( parts.zip, '33715' );
				LIB_ASSERT.strictEqual( parts.state, 'fl' );
				LIB_ASSERT.strictEqual( parts.city, 'saint petersburg' );
				LIB_ASSERT.strictEqual( parts.street, '4900 brittany dr s apt 1501' );
				parts.street_parts = Parse.GetStreetParts( parts.street );
				LIB_ASSERT.strictEqual( parts.street_parts.building_number, '4900' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_name, 'brittany' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_type, 'dr' );
				LIB_ASSERT.strictEqual( parts.street_parts.compass_direction, 's' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_type, 'apt' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_number, '1501' );
				parts.street = Parse.GetStreet( parts.street_parts );
				let address = Parse.GetAddress( parts );
				LIB_ASSERT.strictEqual( address, '4900 Brittany Dr S Apt 1501, Saint Petersburg, Fl 33715 Usa' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetAddressParts( '4900 Brittany Dr, S, Apt. 1501, St. Petersburg, Fl, 33715, USA' ) - returns: street, room_number, city, state, zip.`,
			async function ()
			{
				let parts = Parse.GetAddressParts( '4900 Brittany Dr, S, Apt. 1501, St. Petersburg, Fl, 33715, USA' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, 'usa' );
				LIB_ASSERT.strictEqual( parts.zip, '33715' );
				LIB_ASSERT.strictEqual( parts.state, 'fl' );
				LIB_ASSERT.strictEqual( parts.city, 'saint petersburg' );
				LIB_ASSERT.strictEqual( parts.street, '4900 brittany dr s apt 1501' );
				parts.street_parts = Parse.GetStreetParts( parts.street );
				LIB_ASSERT.strictEqual( parts.street_parts.building_number, '4900' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_name, 'brittany' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_type, 'dr' );
				LIB_ASSERT.strictEqual( parts.street_parts.compass_direction, 's' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_type, 'apt' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_number, '1501' );
				parts.street = Parse.GetStreet( parts.street_parts );
				let address = Parse.GetAddress( parts );
				LIB_ASSERT.strictEqual( address, '4900 Brittany Dr S Apt 1501, Saint Petersburg, Fl 33715 Usa' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetAddressParts( '2883 Downing Ct, Palm Harbor, Fl 34684' )`,
			async function ()
			{
				let parts = Parse.GetAddressParts( '2883 Downing Ct, Palm Harbor, Fl 34684' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, '' );
				LIB_ASSERT.strictEqual( parts.zip, '34684' );
				LIB_ASSERT.strictEqual( parts.state, 'fl' );
				LIB_ASSERT.strictEqual( parts.city, 'palm harbor' );
				LIB_ASSERT.strictEqual( parts.street, '2883 downing ct' );
				parts.street_parts = Parse.GetStreetParts( parts.street );
				LIB_ASSERT.strictEqual( parts.street_parts.building_number, '2883' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_name, 'downing' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_type, 'ct' );
				LIB_ASSERT.strictEqual( parts.street_parts.compass_direction, '' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_type, '' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_number, '' );
				parts.street = Parse.GetStreet( parts.street_parts );
				let address = Parse.GetAddress( parts );
				LIB_ASSERT.strictEqual( address, '2883 Downing Ct, Palm Harbor, Fl 34684' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetAddressParts( '159 Edisto pl Saint Johns Fl 34684' )`,
			async function ()
			{
				let parts = Parse.GetAddressParts( '159 Edisto Pl Saint Johns Fl 34684' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, '' );
				LIB_ASSERT.strictEqual( parts.zip, '34684' );
				LIB_ASSERT.strictEqual( parts.state, 'fl' );
				LIB_ASSERT.strictEqual( parts.city, 'saint johns' );
				LIB_ASSERT.strictEqual( parts.street, '159 edisto pl' );
				parts.street_parts = Parse.GetStreetParts( parts.street );
				LIB_ASSERT.strictEqual( parts.street_parts.building_number, '159' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_name, 'edisto' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_type, 'pl' );
				LIB_ASSERT.strictEqual( parts.street_parts.compass_direction, '' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_type, '' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_number, '' );
				parts.street = Parse.GetStreet( parts.street_parts );
				let address = Parse.GetAddress( parts );
				LIB_ASSERT.strictEqual( address, '159 Edisto Pl, Saint Johns, Fl 34684' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetAddressParts( '61 knotwood way town of nocatee fl 32081' )`,
			async function ()
			{
				let parts = Parse.GetAddressParts( '61 knotwood way town of nocatee fl 32081' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, '' );
				LIB_ASSERT.strictEqual( parts.zip, '32081' );
				LIB_ASSERT.strictEqual( parts.state, 'fl' );
				LIB_ASSERT.strictEqual( parts.city, 'town of nocatee' );
				LIB_ASSERT.strictEqual( parts.street, '61 knotwood way' );
				parts.street_parts = Parse.GetStreetParts( parts.street );
				LIB_ASSERT.strictEqual( parts.street_parts.building_number, '61' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_name, 'knotwood' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_type, 'way' );
				LIB_ASSERT.strictEqual( parts.street_parts.compass_direction, '' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_type, '' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_number, '' );
				parts.street = Parse.GetStreet( parts.street_parts );
				let address = Parse.GetAddress( parts );
				LIB_ASSERT.strictEqual( address, '61 Knotwood Way, Town Of Nocatee, Fl 32081' );
				return;
			} );

		//---------------------------------------------------------------------
		it( `GetAddressParts( '3546 s ocean blvd apt 625 south palm beach fl 33480' )`,
			async function ()
			{
				let parts = Parse.GetAddressParts( '3546 s ocean blvd apt 625 south palm beach fl 33480' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, '' );
				LIB_ASSERT.strictEqual( parts.zip, '33480' );
				LIB_ASSERT.strictEqual( parts.state, 'fl' );
				LIB_ASSERT.strictEqual( parts.city, 'south palm beach' );
				LIB_ASSERT.strictEqual( parts.street, '3546 s ocean blvd apt 625' );
				parts.street_parts = Parse.GetStreetParts( parts.street );
				LIB_ASSERT.strictEqual( parts.street_parts.building_number, '3546' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_name, 's ocean' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_type, 'blvd' );
				LIB_ASSERT.strictEqual( parts.street_parts.compass_direction, '' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_type, 'apt' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_number, '625' );
				parts.street = Parse.GetStreet( parts.street_parts );
				let address = Parse.GetAddress( parts );
				LIB_ASSERT.strictEqual( address, '3546 S Ocean Blvd Apt 625, South Palm Beach, Fl 33480' );
				return;
			} );

		//---------------------------------------------------------------------
		it( `GetAddressParts( '6952 sw 149th ter, village of, palmetto bay, fl 33158' )`,
			async function ()
			{
				let parts = Parse.GetAddressParts( '6952 sw 149th ter, village of, palmetto bay, fl 33158' );
				LIB_ASSERT.notStrictEqual( parts, null );
				LIB_ASSERT.strictEqual( parts.country, '' );
				LIB_ASSERT.strictEqual( parts.zip, '33158' );
				LIB_ASSERT.strictEqual( parts.state, 'fl' );
				LIB_ASSERT.strictEqual( parts.city, 'village of palmetto bay' );
				LIB_ASSERT.strictEqual( parts.street, '6952 sw 149th ter' );
				parts.street_parts = Parse.GetStreetParts( parts.street );
				LIB_ASSERT.strictEqual( parts.street_parts.building_number, '6952' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_name, 'sw 149th' );
				LIB_ASSERT.strictEqual( parts.street_parts.street_type, 'ter' );
				LIB_ASSERT.strictEqual( parts.street_parts.compass_direction, '' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_type, '' );
				LIB_ASSERT.strictEqual( parts.street_parts.room_number, '' );
				parts.street = Parse.GetStreet( parts.street_parts );
				let address = Parse.GetAddress( parts );
				LIB_ASSERT.strictEqual( address, '6952 Sw 149th Ter, Village Of Palmetto Bay, Fl 33158' );
				return;
			} );

	} ); // Address Tests
