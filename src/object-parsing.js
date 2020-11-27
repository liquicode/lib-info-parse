'use strict';

//=====================================================================
//=====================================================================
//
//		OBJECT PARSING
//
//=====================================================================
//=====================================================================

exports.ExpandPerson = ExpandPerson;
exports.CollapsePerson = CollapsePerson;


//---------------------------------------------------------------------
function ExpandPerson( Person )
{
	Person.person_name_parts = this.GetPersonNameParts( Person.person_name );
	Person.address_parts = this.GetAddressParts( Person.address );
	Person.phone_number_parts = this.GetPhoneNumberParts( Person.phone_number );
	return Person;
}


//---------------------------------------------------------------------
function CollapsePerson( Person )
{
	if ( Person.person_name_parts )
	{
		Person.person_name = this.GetPersonName( Person.person_name_parts );
		delete Person.person_name_parts;
	}
	if ( Person.address_parts )
	{
		Person.address = this.GetAddress( Person.address_parts );
		delete Person.address_parts;
	}
	if ( Person.phone_number_parts )
	{
		Person.phone_number = this.GetPhoneNumber( Person.phone_number_parts );
		delete Person.phone_number_parts;
	}
	return Person;
}
