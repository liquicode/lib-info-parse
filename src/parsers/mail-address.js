'use strict';

const LIB_STRING = require( 'string' );
const LIB_STRING_SIMILARITY = require( 'string-similarity' );

//=====================================================================
//=====================================================================
//
//		MAIL ADDRESS PARSER
//
//=====================================================================
//=====================================================================

exports.Parse = GetAddressParts;
exports.Unparse = GetAddress;
exports.NewParts = NewAddressPartsObject;
exports.MatchParts = MatchAddressParts;


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


//---------------------------------------------------------------------
function GetAddressParts( Address )
{
	let address_parts = NewAddressPartsObject();
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
	word = this.infoparse.GetLastWord( address, delimiters );
	if ( parse_address_country( this.infoparse.Ref, address_parts, word ) )
	{
		address = this.infoparse.GetBeforeLastWord( address, delimiters ).trim();
	}
	if ( address.endsWith( ',' ) ) { address = address.substr( 0, address.length - 1 ).trim(); }
	if ( !address ) { return address_parts; }

	// Get the Zipcode.
	word = this.infoparse.GetLastWord( address, delimiters );
	if ( parse_address_zipcode( this.infoparse.Ref, address_parts, word ) )
	{
		address = this.infoparse.GetBeforeLastWord( address, delimiters ).trim();
	}
	if ( address.endsWith( ',' ) ) { address = address.substr( 0, address.length - 1 ).trim(); }
	if ( !address ) { return address_parts; }

	// Get the State.
	word = this.infoparse.GetLastWord( address, delimiters );
	if ( parse_address_state( this.infoparse.Ref, address_parts, word ) )
	{
		address = this.infoparse.GetBeforeLastWord( address, delimiters ).trim();
	}
	if ( address.endsWith( ',' ) ) { address = address.substr( 0, address.length - 1 ).trim(); }
	if ( !address ) { return address_parts; }

	// Get the City.
	// word = '';
	// for ( let index = 0; index < 6; index++ )
	// {
	// 	word = ( GetLastWord( address, delimiters ) + ' ' + word ).trim();
	// 	address = GetBeforeLastWord( address, delimiters ).trim();
	// 	if ( parse_address_city( this.infoparse.Ref, address_parts, word, address_parts.state ) )
	// 	{
	// 		break;
	// 	}
	// }

	// Get the longest city at the end of the address.
	{
		let found_city = '';
		let found_city_text = '';
		this.infoparse.Ref.City.forEach(
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
			let zipcode = this.infoparse.Ref.ZipCode.find( zipcode => zip === address_parts.zip );
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
function NewAddressPartsObject()
{
	return {
		street: '',
		city: '',
		state: '',
		zip: '',
		zip_plus_four: '',
		country: '',
	};
}


//---------------------------------------------------------------------
function unabbreviate_city_name( City )
{
	let unabbreviated = '';
	while ( City )
	{
		let word = this.infoparse.GetFirstWord( City, ' .' );
		if ( word )
		{
			word = word.toLowerCase();
			if ( word === 'st' ) { word = 'Saint'; }
			else if ( word === 'pt' ) { word = 'Point'; }
			else if ( word === 'mt' ) { word = 'Mount'; }
			unabbreviated += ' ' + word;
			City = this.infoparse.GetAfterFirstWord( City, ' .' );
		}
	}
	unabbreviated = unabbreviated.trim();
	return unabbreviated;
}


//---------------------------------------------------------------------
function MatchAddressParts( AddressParts, MatchesParts )
{
	let result = 0;
	result += LIB_STRING_SIMILARITY.compareTwoStrings( AddressParts.street, MatchesParts.street );
	result += LIB_STRING_SIMILARITY.compareTwoStrings(
		unabbreviate_city_name( AddressParts.city ),
		unabbreviate_city_name( MatchesParts.city ) );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( AddressParts.state, MatchesParts.state );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( AddressParts.zip, MatchesParts.zip );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( AddressParts.zip_plus_four, MatchesParts.zip_plus_four );
	result += LIB_STRING_SIMILARITY.compareTwoStrings( AddressParts.country, MatchesParts.country );
	return ( result / 6 );
}


