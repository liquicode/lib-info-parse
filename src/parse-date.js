'use strict';

//=====================================================================
//=====================================================================
//
//		PARSE DATE
//
//=====================================================================
//=====================================================================

exports.MonthYearToDate = MonthYearToDate;


//---------------------------------------------------------------------
function MonthYearToDate( MonthYear )
{
	let month = this.GetFirstWord( MonthYear );
	let year = this.GetLastWord( MonthYear );
	let month_item = this.LookupMonthName( month );
	if ( !month_item ) return '';
	let date = `${year}-${month_item.month_number_2d}-01`;
	return date;
}

