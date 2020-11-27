'use strict';

//=====================================================================
//=====================================================================
//
//		REFERENCES
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
const REF =
{
	State: require( './refs/ref.locations.state.json' ),
	County: require( './refs/ref.locations.county.json' ),
	// City: require( './refs/ref.locations.city.json' ),
	City: require( './refs/ref.simplemaps.city.json' ),
	ZipCode: require( './refs/ref.simplemaps.zip-code.json' ),
	Country: require( './refs/ref.countries.json' ),
	StreetType: require( './refs/ref.street-types.json' ),
	RoomType: require( './refs/ref.room-types.json' ),
	Month: require( './refs/ref.months.json' ),
	Weekday: require( './refs/ref.weekdays.json' ),
};


exports.Ref = REF;
exports.LookupMonthName = LookupMonthName;


//=====================================================================
//=====================================================================
//
//		LOOK UP MONTH NAME
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
function LookupMonthName( MonthName )
{
	MonthName = MonthName.toLowerCase().trim();
	let item = REF.Month.find(
		month =>
			( ( month.month_name === MonthName )
				|| ( month.short_name === MonthName ) ) );
	return item;
}

