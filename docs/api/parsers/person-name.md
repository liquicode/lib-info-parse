
# PersonName Parser


## PersonName Parts

```javascript
{
	honorific: '',		// Mr, Mrs, Dr, etc.
	first_name: '',		// First Name
	middle_name: '',	// Middle Name
	last_name: '',		// Last Name
	suffix: '',			// Jr, Sr, etc.
}
```


## Reference Data

***Honorifics***

```javascript
'mr', 'ms', 'mrs', 'miss', 'dr', 'sir', 'lady', 'lord',
```

***Suffixes***

```javascript
'jr', 'sr', 'iii',
```


## Parse( String )

Calling parse with no parameters (`Parse()` or `Parse('')`) will return an empty `PersonNameParts` object.

If the string contains only a single word, it is assumed to be a last name.
If there are two words, it is assumed to represent a first name and a last name.

`Parse` uses reference data to identify any honorifics and suffixes within the string.


## Unparse( Parts )

Takes a `PersonNameParts` object and rebuilds a single string from it.


## Examples

```javascript
// Create an InfoParse object.
InfoParse = require( '@liquicode/lib-info-parse' ).NewInfoParse();

// Parse a Name.
parts = InfoParse.PersonName.Parse( 'heLLo worLd' );
/* parts =
	honorific: '',
	first_name: 'hello',
	middle_name: '',
	last_name: 'world',
	suffix: '',
*/
name = InfoParse.PersonName.Unparse( parts );
/* name = 'Hello World' */

// Parse another Name.
parts = InfoParse.PersonName.Parse( 'Mr. John J Smith, Jr.' );
/* parts =
	honorific: 'mr',
	first_name: 'john',
	middle_name: 'j',
	last_name: 'smith',
	suffix: 'jr',
*/
name = InfoParse.PersonName.Unparse( parts );
/* name = 'Mr John J Smith Jr' */

```
