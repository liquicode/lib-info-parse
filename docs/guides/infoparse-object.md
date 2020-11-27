
# InfoParse Object


## InfoParse Construction

Create a new `InfoParse` object from the library:

```javascript
const LibInfoParse = require( '@liquicode/lib-info-parse' );
let infoparse = LibInfoParse.NewInfoParse();
```


## General Parsing Functions

The `InfoParse` object contains a few general purpose parsing functions:

- `GetFirstWord( Phrase, Delimiters )`: Get the first word of `Phrase`, as defined by characters in the `Delimiters` string.
- `GetAfterFirstWord( Phrase, Delimiters )`: Get everything after the first word in `Phrase`, as defined by characters in the `Delimiters` string.
- `GetLastWord( Phrase, Delimiters )`: Get the last word of `Phrase`, as defined by characters in the `Delimiters` string.
- `GetBeforeLastWord( Phrase, Delimiters )`: Get everything before the last word in `Phrase`, as defined by characters in the `Delimiters` string.


## InfoParse Parsers

The `InfoParse` object exposes a number of specific parser engines:

- `PersonName`: Parse person names, including honorifics and suffixes.
- `PhoneNumber`: Parse various phone number formats.
- `MailAddress`: Parse US mailing addresses.
- `StreetAddress`: Parse street addresses to get house number, street name, and street type.
- `DateTime`: Parse various date/time formats.


## Parser Functions

All parsers support the following functions:

- `Parse( String )`: Parse the string and return a `Parts` object containing the parsed information.
- `Unparse( Parts )`: Unparse the information in a `Parts` object back into a single string.

