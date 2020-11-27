'use strict';

//=====================================================================
//=====================================================================
//
//		OBJECT FACTORIES
//
//=====================================================================
//=====================================================================


exports.NewPersonObject = NewPersonObject;
exports.NewPersonNamePartsObject = NewPersonNamePartsObject;
exports.NewAddressPartsObject = NewAddressPartsObject;
exports.NewStreetPartsObject = NewStreetPartsObject;
exports.NewPhoneNumberPartsObject = NewPhoneNumberPartsObject;
exports.NewBirthDataObject = NewBirthDataObject;


//---------------------------------------------------------------------
function NewPersonObject()
{
	return {
		person_id: '',
		person_name: '',
		person_gender: '',
		person_age: '',
		address: '',
		phone_number: '',
		email_address: '',
		birthday: '',
		birth_data: NewBirthDataObject(),
		researches: {},
	};
};


// //---------------------------------------------------------------------
// function NewResearchObject()
// {
// 	return {
// 		person_id: '',
// 		source_name: '',
// 		source_id: '',
// 		source_timestamp: '',
// 		observables: {},
// 	};
// }


//---------------------------------------------------------------------
function NewPersonNamePartsObject()
{
	return {
		honorific: '',
		first_name: '',
		middle_name: '',
		last_name: '',
		suffix: '',
	};
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
function NewStreetPartsObject()
{
	return {
		building_number: '',
		street_name: '',
		street_type: '',
		compass_direction: '',
		room_type: '',
		room_number: '',
	};
}


//---------------------------------------------------------------------
function NewPhoneNumberPartsObject()
{
	return {
		country_code: '',
		area_code: '',
		prefix: '',
		number: '',
		extension: '',
	};
}


//---------------------------------------------------------------------
function NewBirthDataObject()
{
	return {
		birth_day: null,
		birth_month: null,
		birth_year: null,
		birth_city: '',
		birth_state: '',
		birth_country: '',
		birth_hospital: '',
	};
}

