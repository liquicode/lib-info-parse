'use strict';

const LIB_STRING = require( 'string' );

//=====================================================================
//=====================================================================
//
//		PARSE ADDRESS
//
//=====================================================================
//=====================================================================

exports.UnabbreviateCityName = UnabbreviateCityName;

exports.GetAddressParts = GetAddressParts;
exports.GetAddress = GetAddress;

exports.GetStreetParts = GetStreetParts;
exports.GetStreet = GetStreet;


//---------------------------------------------------------------------
function parse_address_country( REF, Address, Country )
{
	Country = Country.trim().toLowerCase();
	let result = REF.Country.find(
		country => 
		{
			if ( country.country_code === Country ) { return country; }
			if ( country.names.includes( Country ) ) { return country; }
		} );
	if ( result ) 
	{
		Address.country = result.country_code;
		return true;
	}
	return false;
}


//---------------------------------------------------------------------
function parse_address_zipcode( REF, Address, Zipcode )
{
	if ( Zipcode.length === 5 )
	{
		if ( LIB_STRING( Zipcode ).isNumeric() )
		{
			Address.zip = Zipcode;
			Address.zip_plus_four = '';
			return true;
		}
	}
	else if ( Zipcode.length === 10 )
	{
		let ich = Zipcode.indexOf( '-' );
		if ( ich !== 5 ) { return false; }
		let part1 = Zipcode.substr( 0, 5 );
		let part2 = Zipcode.substr( 6 );
		if ( LIB_STRING( part1 ).isNumeric() && LIB_STRING( part2 ).isNumeric() )
		{
			Address.zip = part1;
			Address.zip_plus_four = part2;
			return true;
		}
	}
	return false;
}


//---------------------------------------------------------------------
function parse_address_state( REF, Address, State )
{
	State = State.trim().toLowerCase();
	if ( State.length === 2 )
	{
		let result = REF.State.find( state => state.state_code === State );
		if ( result )
		{
			Address.state = result.state_code;
			return true;
		}
	}
	else 
	{
		let result = REF.State.find( state => state.state_name === State );
		if ( result )
		{
			Address.state = result.state_code;
			return true;
		}
	}
	return false;
}


// //---------------------------------------------------------------------
// function parse_address_city(REF, AddressParts, City, State )
// {
// 	City = City.trim().toLowerCase();
// 	State = State.trim().toLowerCase();
// 	let result = REF.City.find(
// 		city =>
// 		{
// 			if ( State && ( city.state !== State ) ) { return; }
// 			if ( city.city === City ) { return city; }
// 			if ( city.alts.includes( City ) ) { return city; }
// 		}
// 	);
// 	if ( !result ) { return false; }
// 	AddressParts.city = result.city;
// 	return true;
// }


// //---------------------------------------------------------------------
// function parse_street_type( REF,StreetType )
// {
// 	if ( REF.StreetType.includes( StreetType ) ) 
// 	{
// 		return StreetType;
// 	}
// 	else
// 	{
// 		return "";
// 	}
// }


//---------------------------------------------------------------------
function UnabbreviateCityName( City )
{
	let unabbreviated = '';
	while ( City )
	{
		let word = this.GetFirstWord( City, ' .' );
		if ( word )
		{
			word = word.toLowerCase();
			if ( word === 'st' ) { word = 'Saint'; }
			else if ( word === 'pt' ) { word = 'Point'; }
			else if ( word === 'mt' ) { word = 'Mount'; }
			unabbreviated += ' ' + word;
			City = this.GetAfterFirstWord( City, ' .' );
		}
	}
	unabbreviated = unabbreviated.trim();
	return unabbreviated;
}


//---------------------------------------------------------------------
function GetAddressParts( Address )
{
	let address_parts = this.NewAddressPartsObject();
	if ( !Address ) { return address_parts; }
	let delimiters = ' ,;';

	// Remove punctuation and whitespace.
	let address = LIB_STRING( Address )
		.toLowerCase()
		.replaceAll( '.', ' ' )
		.replaceAll( ',', ' ' )
		.collapseWhitespace()
		.trim()
		.s
		;

	// Convert to a single line.
	{
		let address_lines = address.split( '\n' );
		if ( address_lines.length > 1 )
		{
			address = address_lines.join( ',' );
		}
	}

	let word = null;

	// Get the Country.
	word = this.GetLastWord( address, delimiters );
	if ( parse_address_country( this.Ref, address_parts, word ) )
	{
		address = this.GetBeforeLastWord( address, delimiters ).trim();
	}
	if ( address.endsWith( ',' ) ) { address = address.substr( 0, address.length - 1 ).trim(); }
	if ( !address ) { return address_parts; }

	// Get the Zipcode.
	word = this.GetLastWord( address, delimiters );
	if ( parse_address_zipcode( this.Ref, address_parts, word ) )
	{
		address = this.GetBeforeLastWord( address, delimiters ).trim();
	}
	if ( address.endsWith( ',' ) ) { address = address.substr( 0, address.length - 1 ).trim(); }
	if ( !address ) { return address_parts; }

	// Get the State.
	word = this.GetLastWord( address, delimiters );
	if ( parse_address_state( this.Ref, address_parts, word ) )
	{
		address = this.GetBeforeLastWord( address, delimiters ).trim();
	}
	if ( address.endsWith( ',' ) ) { address = address.substr( 0, address.length - 1 ).trim(); }
	if ( !address ) { return address_parts; }

	// Get the City.
	// word = '';
	// for ( let index = 0; index < 6; index++ )
	// {
	// 	word = ( GetLastWord( address, delimiters ) + ' ' + word ).trim();
	// 	address = GetBeforeLastWord( address, delimiters ).trim();
	// 	if ( parse_address_city( this.Ref, address_parts, word, address_parts.state ) )
	// 	{
	// 		break;
	// 	}
	// }

	// Get the longest city at the end of the address.
	{
		let found_city = '';
		let found_city_text = '';
		this.Ref.City.forEach(
			city =>
			{
				if ( city.state !== address_parts.state ) { return; }
				if ( address.endsWith( city.city ) )
				{
					if ( city.city.length > found_city.length )
					{
						found_city = city.city;
						found_city_text = city.city;
					}
				}
				city.alts.forEach(
					alt_city =>
					{
						if ( address.endsWith( alt_city ) )
						{
							if ( city.city.length > found_city.length )
							{
								found_city = city.city;
								found_city_text = alt_city;
							}
						}
					} );
			} );
		if ( found_city )
		{
			address_parts.city = found_city;
			address = address.substr( 0, address.length - found_city_text.length ).trim();
		}
	}

	// Do zipcode lookup for missing city and/or state.
	if ( !address_parts.city && !address_parts.state )
	{
		if ( address_parts.zip )
		{
			let zipcode = this.Ref.ZipCode.find( zipcode => zip === address_parts.zip );
			if ( !zipcode ) { throw new Error( `Unable to parse address [${Address}].` ); }
			address_parts.city = zipcode.city;
			address_parts.state = zipcode.state;
		}
		else
		{
			// address += ' ' + word;
			// address = address.trim();
			throw new Error( `Unable to parse address [${Address}].` );
		}
	}
	if ( address.endsWith( ',' ) ) { address = address.substr( 0, address.length - 1 ).trim(); }
	if ( !address ) { return address_parts; }

	// The rest of the address is the street.
	address_parts.street = address;

	// Return, OK.
	return address_parts;
}


//---------------------------------------------------------------------
function GetAddress( AddressParts )
{
	let address = '';
	if ( AddressParts.street ) { address += ' ' + AddressParts.street; }
	if ( AddressParts.city ) { address += ', ' + AddressParts.city; }
	if ( AddressParts.state ) { address += ', ' + AddressParts.state; }
	if ( AddressParts.zip ) { address += ' ' + AddressParts.zip; }
	if ( AddressParts.zip_plus_four ) { address += '-' + AddressParts.zip_plus_four; }
	if ( AddressParts.country ) { address += ' ' + AddressParts.country; }
	address = LIB_STRING( address ).titleCase().trim().s;
	return address;
}


//---------------------------------------------------------------------
function GetStreetParts( StreetAddress )
{
	let street_parts = this.NewStreetPartsObject();
	if ( !StreetAddress ) { return street_parts; }

	let s_street_address = LIB_STRING( StreetAddress )
		.toLowerCase()
		.collapseWhitespace()
		.trim()
		.replaceAll( '.', '' )
		;

	let word = null;

	// Get the building number.
	word = this.GetFirstWord( s_street_address.s, ' ' );
	if ( word && !Number.isNaN( Number( word ) ) )
	{
		street_parts.building_number = word;
		s_street_address = s_street_address.chompLeft( word ).trimLeft();
	}

	// Get the street name.
	street_parts.street_name = '';
	while ( true )
	{
		word = this.GetFirstWord( s_street_address.s, ' .,' );
		if ( !word ) { break; }
		if ( this.Ref.StreetType.includes( word ) ) 
		{
			street_parts.street_type = word;
			s_street_address = s_street_address.chompLeft( word ).trimLeft();
			if ( s_street_address.startsWith( '.' ) ) { s_street_address = s_street_address.chompLeft( '.' ).trimLeft(); }
			if ( s_street_address.startsWith( ',' ) ) { s_street_address = s_street_address.chompLeft( ',' ).trimLeft(); }
			break;
		}
		street_parts.street_name = street_parts.street_name + ' ' + word;
		s_street_address = s_street_address.chompLeft( word ).trimLeft();
		if ( s_street_address.startsWith( '.' ) ) { s_street_address = s_street_address.chompLeft( '.' ).trimLeft(); }
		if ( s_street_address.startsWith( ',' ) ) { s_street_address = s_street_address.chompLeft( ',' ).trimLeft(); }
	}
	street_parts.street_name = street_parts.street_name.trim();
	if ( s_street_address.endsWith( ',' ) ) { s_street_address = s_street_address.chompLeft( ',' ).trimLeft(); }

	// Get the compass direction.
	word = this.GetFirstWord( s_street_address.s, ' .,-#' );
	if ( [ 'n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw' ].includes( word ) )
	{
		street_parts.compass_direction = word;
		s_street_address = LIB_STRING( this.GetAfterFirstWord( s_street_address.s, ' .,-#' ) );
	}

	// Get the room number.
	street_parts.room_type = '';
	street_parts.room_number = '';
	word = this.GetFirstWord( s_street_address.s, ' .,-#' );
	if ( this.Ref.RoomType.includes( word ) ) 
	{
		street_parts.room_type = word;
		s_street_address = s_street_address.chompLeft( word ).trimLeft();
		if ( s_street_address.startsWith( '.' ) ) { s_street_address = s_street_address.chompLeft( '.' ).trimLeft(); }
		if ( s_street_address.startsWith( ',' ) ) { s_street_address = s_street_address.chompLeft( ',' ).trimLeft(); }
		if ( s_street_address.startsWith( '-' ) ) { s_street_address = s_street_address.chompLeft( '-' ).trimLeft(); }
		if ( s_street_address.startsWith( '#' ) ) { s_street_address = s_street_address.chompLeft( '#' ).trimLeft(); }
	}
	street_parts.room_number = s_street_address.s;

	// Return, OK.
	return street_parts;
}


//---------------------------------------------------------------------
function GetStreet( StreetParts )
{
	let street = '';
	if ( StreetParts.building_number ) { street += ' ' + StreetParts.building_number; }
	if ( StreetParts.street_name ) { street += ' ' + StreetParts.street_name; }
	if ( StreetParts.street_type ) { street += ' ' + StreetParts.street_type; }
	if ( StreetParts.compass_direction ) { street += ' ' + StreetParts.compass_direction; }
	if ( StreetParts.room_type ) { street += ' ' + StreetParts.room_type; }
	if ( StreetParts.room_number ) { street += ' ' + StreetParts.room_number; }
	street = LIB_STRING( street ).titleCase().trim().s;
	return street;
}

