
# DateTime Parser


## DateTime Parts

```javascript
{
	date: null,				// A Javascript Date object.
	year: 0,				// The four digit year.
	month_name: '',			// The full name of the month.
	month_num: 0,			// The month number (1..12).
	day_name: '',			// The full name of the day (Monday-Sunday).
	day_of_month: 0,		// The two digit day of the month (1..31).
	day_of_week: 0,			// The single digit day of the week (Mon-Sun: 1..7)
	hours: 0,				// The hours component (0..23).
	minutes: 0,				// The minutes component (0..59).
	seconds: 0,				// The seconds component (0..59).
	milliseconds: 0,		// The milliseconds component (0..999).
	timezone_offset: ''		// The timezone offset (-2359..+2359)
}
```


## Reference Data

```javascript
day_of_week: [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday' ],
day_of_week_abbrev: [ 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun' ],
months: [ 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december' ],
months_abbrev: [ 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec' ],
```


## Parse( String, AssumeTimeZone = '+0000' )

This function parses a text string and attempts to convert it to a javascript `Date` object.
All parsing is case insensitive.

**Parameters**

- `Text`:
	The text date string to parse.
	See notes below for formatting and restrictions.
- `AssumeTimeZone`:
	The time zone to use for calculation when it is not present in the `Text` date string.
	This parameter is given as a four digit offset to UTC/GMT.
	This parameter must also be prepended with either a plus or minus sign.
	Examples: '+0530', '-0530', but not: '0530'.

**Date Components**

A date string can be composed of the following components:

- Day of the week (dow):
	`dow` is a textual representation of the day of the week.
	Such as 'Monday' or in its abbreviated form 'Mon'.
	While detected, the `dow` is not stored or used in date determination.
	`dow` Can appear with a trailing comma.
- Month name (month):
	`month` is a textual representation of the month name.
	Such as 'January' or in its abbreviated form 'Jan'.
- Month number (mm):
	Starting with 'January' as 1, the number of the month within the year.
	`mm` is a one or two digit text string and may optionally include a leading zero.
	Examples: '1', '01', '12', but not: '012'.
- Day number (dd):
	The number of the day within the month.
	`dd` is a one or two digit text string and may optionally include a leading zero.
	Examples: '1', '01', '12', but not: '012'.
- Year number (yyyy):
	The four digit year.
- Time (time):
	A time string in the basic form of `h:m`.
	The hours component `h` may include a leading zero.
	The minutes component `m` may include a leading zero.
	Optionally, a two digit seconds component `ss` may be present (`h:m:ss`).
	Optionally, a three digit milliseconds component `nnn` may be present (`h:m:ss.nnn`).
- Zone (zone):
	The abbreviated name of the time zone.
	While detected, the `zone` is not used in date determination.
	Instead, this function relies on the `offset` component to determine the correct time zone.
	Only `UTC` and `GMT` are currently supported.
- Offset (offset):
	This component is given as a one to four digit offset to UTC/GMT.
	Optionally, `offset` may include a leading zero.
	Optionally, `offset` may include a leading plus sign.
	To indicate a negative offset to UTC, `offset` can include a leading minus sign.
	Examples: '+5', '-5', '530', '+530', '+0530', '-0530'.
	If `offset` is not provided, the `AssumeTimeZone` function parameter is used.

**Date Formatting**

The date portion of the string (excluding any `time`, `zone`, or `offset` component) can be of the following forms:

- `m/d/yyyy`
- `m-d-yyyy`
- `yyyy-m-dd`

Where the month component `m` can be either a one to two digit month number or a textual month name.
Refer to this function's unit tests for a more complete list of supported formats and component combinations.


## Unparse( Parts )

