# Testing Output


```


  00) General Parsing Tests
    GetFirstWord and GetAfterFirstWord Tests
      ✓ Here                      -->  Here |
      ✓ Here are some words       -->  Here | are some words
      ✓ Here are some words       -->  Here | are some words
      ✓ Here.are.some.words       -->  Here | are.some.words
      ✓ Here. are. some. words.   -->  Here | are. some. words.
      ✓ Here are some words       -->  Here | are | some | words
    GetLastWord and GetBeforeLastWord Tests
      ✓ Here                      -->  Here |
      ✓ Here are some words       -->  Here are some | words
      ✓ Here are some words       -->  Here are some | words
      ✓ Here.are.some.words       -->  Here.are.some | words
      ✓ Here. are. some. words    -->  Here. are. some. | words
      ✓ Here. are. some. words.   -->  Here. are. some. words. |
      ✓ Here are some words       -->  Here | are | some | words

  11) Person Name Tests
    ✓ PersonName.Parse() - returns: an empty PersonName object.
    ✓ PersonName.Parse( null ) - returns: an empty PersonName object.
    ✓ PersonName.Parse( '' ) - returns: an empty PersonName object.
    ✓ PersonName.Parse( 'Smith' ) - returns: last_name.
    ✓ PersonName.Parse( 'Mr. Smith' ) - returns: honorific, last_name.
    ✓ PersonName.Parse( 'John Smith' ) - returns: first_name, last_name.
    ✓ PersonName.Parse( 'John J. Smith' ) - returns: first_name, middle_name, last_name.
    ✓ PersonName.Parse( 'Mr. John Smith' ) - returns: honorific, first_name, last_name.
    ✓ PersonName.Parse( 'Mr. John J. Smith' ) - returns: honorific, first_name, middle_name, last_name.
    ✓ PersonName.Parse( 'Mr. John J. Smith, Jr.' ) - returns: honorific, first_name, middle_name, last_name, suffix.
    ✓ PersonName.Parse( 'Mr John J Smith Jr' ) - returns: honorific, first_name, middle_name, last_name, suffix.

  12) Phone Number Tests
    ✓ PhoneNumber.Parse( '567890' )                             --> 567890
    ✓ PhoneNumber.Parse( '4567890' )                            --> 456-7890
    ✓ PhoneNumber.Parse( '456-7890' )                           --> 456-7890
    ✓ PhoneNumber.Parse( '1234567890' )                         --> (123) 456-7890
    ✓ PhoneNumber.Parse( '1234567890x42' )                      --> (123) 456-7890 ext 42
    ✓ PhoneNumber.Parse( '123-456-7890' )                       --> (123) 456-7890
    ✓ PhoneNumber.Parse( '(123) 456-7890' )                     --> (123) 456-7890
    ✓ PhoneNumber.Parse( '011 (123) 456-7890' )                 --> +011 (123) 456-7890
    ✓ PhoneNumber.Parse( '+011 (123) 456-7890' )                --> +011 (123) 456-7890
    ✓ PhoneNumber.Parse( '+011 (123) 456-7890 ext 42' )         --> +011 (123) 456-7890 ext 42
    ✓ PhoneNumber.Parse( '+011 (123) 456-7890 x42' )            --> +011 (123) 456-7890 ext 42
    ✓ PhoneNumber.Parse( '+011 123-456-7890 x42' )              --> +011 (123) 456-7890 ext 42
    ✓ PhoneNumber.Parse( '+011 123.456.7890 x42' )              --> +011 (123) 456-7890 ext 42

  13) Address Tests
    ✓ MailAddress.Parse() - returns: an empty Address object.
    ✓ MailAddress.Parse( null ) - returns: an empty Address object.
    ✓ MailAddress.Parse( '' ) - returns: an empty Address object.
    ✓ MailAddress.Parse( 'USA' ) - returns: country.
    ✓ MailAddress.Parse( 'Usa' ) - returns: country.
    ✓ MailAddress.Parse( 'FL, USA' ) - returns: state, country.
    ✓ MailAddress.Parse( 'Fl, Usa' ) - returns: state, country.
    ✓ MailAddress.Parse( 'Miami Fl, Usa' ) - returns: city, state, country.
    ✓ MailAddress.Parse( 'Miami, Fl, Usa' ) - returns: city, state, country. (8ms)
    ✓ MailAddress.Parse( '123 Main St, Miami, Fl 33050 Usa' ) - returns: street, city, state, zip, country.
    ✓ MailAddress.Parse( '123 Main St, Miami, Fl 33050-1234 Usa' ) - returns: street, city, state, zip, country.
    ✓ MailAddress.Parse( '123 Main St Miami Fl 33050 Usa' ) - returns: street, city, state, zip, country.
    ✓ MailAddress.Parse( '123 Main St, Apt C Miami Fl 33050 Usa' ) - returns: street, city, state, zip, country.
    ✓ MailAddress.Parse( '123 Main St., Apt-C, Miami Fl 33050' ) - returns: street, city, state, zip.
    ✓ MailAddress.Parse( 'Main St., Apt-C, Miami Fl 33050' ) - returns: street, city, state, zip.
    ✓ MailAddress.Parse( '4900 Brittany Dr S Apt 1501, Saint Petersburg, Fl 33715' ) - returns: street, room_number, city, state, zip.
    ✓ MailAddress.Parse( '4900 Brittany Dr, S, Apt 1501, Saint Petersburg, Fl, 33715, USA' ) - returns: street, room_number, city, state, zip.
    ✓ MailAddress.Parse( '4900 Brittany Dr, S, Apt. 1501, St. Petersburg, Fl, 33715, USA' ) - returns: street, room_number, city, state, zip.
    ✓ MailAddress.Parse( '2883 Downing Ct, Palm Harbor, Fl 34684' )
    ✓ MailAddress.Parse( '159 Edisto pl Saint Johns Fl 34684' )
    ✓ MailAddress.Parse( '61 knotwood way town of nocatee fl 32081' )
    ✓ MailAddress.Parse( '3546 s ocean blvd apt 625 south palm beach fl 33480' )
    ✓ MailAddress.Parse( '6952 sw 149th ter, village of, palmetto bay, fl 33158' )

  15) DateTime Tests
    Various Date Formats
      ✓ handle: mm/dd/yyyy
      ✓ handle: m/d/yyyy
      ✓ handle: mm-dd-yyyy
      ✓ handle: m-d-yyyy
      ✓ handle: yyyy-mm-dd
      ✓ handle: yyyy-m-d
      ✓ handle: month d, yyyy
      ✓ handle: month-d-yyyy
      ✓ handle: month/d/yyyy
      ✓ handle: d month yyyy
      ✓ handle: d-month-yyyy
      ✓ handle: d/month/yyyy
    Parse Day of week
      ✓ handle: dow, dd month yyyy
      ✓ handle: dow,dd month yyyy hh:mm:ss zone+offset
    Parse Date and Time
      ✓ handle: mm/dd/yyyy hh:mm:ss
      ✓ handle: mm/dd/yyyy hh:mm:ss.nnn
      ✓ handle: mm/dd/yyyy h:mm:ss
      ✓ handle: mm/dd/yyyy - h:mm
    Parse Time Zones
      ✓ handle: ISO Format
      ✓ handle: ISO Format (short)
      ✓ handle: mm/dd/yyyy hh:mm:ss zone
      ✓ handle: mm/dd/yyyy hh:mm:ss +offset
      ✓ handle: mm/dd/yyyy hh:mm:ss +offset (no zeros)
      ✓ handle: mm/dd/yyyy hh:mm:ss +offset (as time)
      ✓ handle: mm/dd/yyyy hh:mm:ss -offset
      ✓ handle: mm/dd/yyyy hh:mm:ss zone+offset
      ✓ handle: mm/dd/yyyy hh:mm:ss zone-offset
    Compressed date strings
      ✓ handle: compressed date
      ✓ handle: compressed date and time
      ✓ handle: number of seconds since whenever
      ✓ handle: number of milliseconds since whenever
    Reject invalid dates
      ✓ reject: empty string
      ✓ reject: garbage


  93 passing (77ms)


```


