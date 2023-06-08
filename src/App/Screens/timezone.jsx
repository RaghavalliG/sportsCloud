import React from 'react';




    const timeData = [
        {
          label: '(GMT-11:00) Midway Island',
          timezone: 'Pacific/Midway',
        },
        {
          label: '(GMT-11:00) Samoa',
          timezone: 'US/Samoa',
        },
        {
          label: '(GMT-10:00) Hawaii',
          timezone: 'US/Hawaii',
        },
        {
          label: '(GMT-09:00) Alaska',
          timezone: 'US/Alaska',
        },
        {
          label: '(GMT-08:00) Pacific Time (US & Canada)',
          timezone: 'US/Pacific',
        },
        {
          label: '(GMT-08:00) Tijuana',
          timezone: 'America/Tijuana',
        },
        {
          label: '(GMT-07:00) Arizona',
          timezone: 'US/Arizona',
        },
        {
          label: '(GMT-07:00) Mountain Time (US & Canada)',
          timezone: 'US/Mountain',
        },
        {
          label: '(GMT-07:00) Chihuahua',
          timezone: 'America/Chihuahua',
        },
        {
          label: '(GMT-07:00) Mazatlan',
          timezone: 'America/Mazatlan',
        },
        {
          label: '(GMT-06:00) Mexico City',
          timezone: 'America/Mexico_City',
        },
        {
          label: '(GMT-06:00) Monterrey',
          timezone: 'America/Monterrey',
        },
        {
          label: '(GMT-06:00) Saskatchewan',
          timezone: 'Canada/Saskatchewan',
        },
        {
          label: '(GMT-06:00) Central Time (US & Canada)',
          timezone: 'US/Central',
        },
        {
          label: '(GMT-05:00) Eastern Time (US & Canada)',
          timezone: 'US/Eastern',
        },
        {
          label: '(GMT-05:00) Indiana (East)',
          timezone: 'US/East-Indiana',
        },
        {
          label: '(GMT-05:00) Bogota',
          timezone: 'America/Bogota',
        },
        {
          label: '(GMT-05:00) Lima',
          timezone: 'America/Lima',
        },
        {
          label: '(GMT-04:30) Caracas',
          timezone: 'America/Caracas',
        },
        {
          label: '(GMT-04:00) Atlantic Time (Canada)',
          timezone: 'Canada/Atlantic',
        },
        {
          label: '(GMT-04:00) La Paz',
          timezone: 'America/La_Paz',
        },
        {
          label: '(GMT-04:00) Santiago',
          timezone: 'America/Santiago',
        },
        {
          label: '(GMT-03:30) Newfoundland',
          timezone: 'Canada/Newfoundland',
        },
        {
          label: '(GMT-03:00) Buenos Aires',
          timezone: 'America/Buenos_Aires',
        },
        {
          label: '(GMT-03:00) Greenland',
          timezone: 'Greenland',
        },
        {
          label: '(GMT-02:00) Stanley',
          timezone: 'Atlantic/Stanley',
        },
        {
          label: '(GMT-01:00) Azores',
          timezone: 'Atlantic/Azores',
        },
        {
          label: '(GMT-01:00) Cape Verde Is.',
          timezone: 'Atlantic/Cape_Verde',
        },
        {
          label: '(GMT) Casablanca',
          timezone: 'Africa/Casablanca',
        },
        {
          label: '(GMT) Dublin',
          timezone: 'Europe/Dublin',
        },
        {
          label: '(GMT) Lisbon',
          timezone: 'Europe/Lisbon',
        },
        {
          label: '(GMT) London',
          timezone: 'Europe/London',
        },
        {
          label: '(GMT) Monrovia',
          timezone: 'Africa/Monrovia',
        },
        {
          label: '(GMT+01:00) Amsterdam',
          timezone: 'Europe/Amsterdam',
        },
        {
          label: '(GMT+01:00) Belgrade',
          timezone: 'Europe/Belgrade',
        },
        {
          label: '(GMT+01:00) Berlin',
          timezone: 'Europe/Berlin',
        },
        {
          label: '(GMT+01:00) Bratislava',
          timezone: 'Europe/Bratislava',
        },
        {
          label: '(GMT+01:00) Brussels',
          timezone: 'Europe/Brussels',
        },
        {
          label: '(GMT+01:00) Budapest',
          timezone: 'Europe/Budapest',
        },
        {
          label: '(GMT+01:00) Copenhagen',
          timezone: 'Europe/Copenhagen',
        },
        {
          label: '(GMT+01:00) Ljubljana',
          timezone: 'Europe/Ljubljana',
        },
        {
          label: '(GMT+01:00) Madrid',
          timezone: 'Europe/Madrid',
        },
        {
          label: '(GMT+01:00) Paris',
          timezone: 'Europe/Paris',
        },
        {
          label: '(GMT+01:00) Prague',
          timezone: 'Europe/Prague',
        },
        {
          label: '(GMT+01:00) Rome',
          timezone: 'Europe/Rome',
        },
        {
          label: '(GMT+01:00) Sarajevo',
          timezone: 'Europe/Sarajevo',
        },
        {
          label: '(GMT+01:00) Skopje',
          timezone: 'Europe/Skopje',
        },
        {
          label: '(GMT+01:00) Stockholm',
          timezone: 'Europe/Stockholm',
        },
        {
          label: '(GMT+01:00) Vienna',
          timezone: 'Europe/Vienna',
        },
        {
          label: '(GMT+01:00) Warsaw',
          timezone: 'Europe/Warsaw',
        },
        {
          label: '(GMT+01:00) Zagreb',
          timezone: 'Europe/Zagreb',
        },
        {
          label: '(GMT+02:00) Athens',
          timezone: 'Europe/Athens',
        },
        {
          label: '(GMT+02:00) Bucharest',
          timezone: 'Europe/Bucharest',
        },
        {
          label: '(GMT+02:00) Cairo',
          timezone: 'Africa/Cairo',
        },
        {
          label: '(GMT+02:00) Harare',
          timezone: 'Africa/Harare',
        },
        {
          label: '(GMT+02:00) Helsinki',
          timezone: 'Europe/Helsinki',
        },
        {
          label: '(GMT+02:00) Istanbul',
          timezone: 'Europe/Istanbul',
        },
        {
          label: '(GMT+02:00) Jerusalem',
          timezone: 'Asia/Jerusalem',
        },
        {
          label: '(GMT+02:00) Kyiv',
          timezone: 'Europe/Kiev',
        },
        {
          label: '(GMT+02:00) Minsk',
          timezone: 'Europe/Minsk',
        },
        {
          label: '(GMT+02:00) Riga',
          timezone: 'Europe/Riga',
        },
        {
          label: '(GMT+02:00) Sofia',
          timezone: 'Europe/Sofia',
        },
        {
          label: '(GMT+02:00) Tallinn',
          timezone: 'Europe/Tallinn',
        },
        {
          label: '(GMT+02:00) Vilnius',
          timezone: 'Europe/Vilnius',
        },
        {
          label: '(GMT+03:00) Baghdad',
          timezone: 'Asia/Baghdad',
        },
        {
          label: '(GMT+03:00) Kuwait',
          timezone: 'Asia/Kuwait',
        },
        {
          label: '(GMT+03:00) Nairobi',
          timezone: 'Africa/Nairobi',
        },
        {
          label: '(GMT+03:00) Riyadh',
          timezone: 'Asia/Riyadh',
        },
        {
          label: '(GMT+03:00) Moscow',
          timezone: 'Europe/Moscow',
        },
        {
          label: '(GMT+03:30) Tehran',
          timezone: 'Asia/Tehran',
        },
        {
          label: '(GMT+04:00) Baku',
          timezone: 'Asia/Baku',
        },
        {
          label: '(GMT+04:00) Volgograd',
          timezone: 'Europe/Volgograd',
        },
        {
          label: '(GMT+04:00) Muscat',
          timezone: 'Asia/Muscat',
        },
        {
          label: '(GMT+04:00) Tbilisi',
          timezone: 'Asia/Tbilisi',
        },
        {
          label: '(GMT+04:00) Yerevan',
          timezone: 'Asia/Yerevan',
        },
        {
          label: '(GMT+04:30) Kabul',
          timezone: 'Asia/Kabul',
        },
        {
          label: '(GMT+05:00) Karachi',
          timezone: 'Asia/Karachi',
        },
        {
          label: '(GMT+05:00) Tashkent',
          timezone: 'Asia/Tashkent',
        },
        {
          label: '(GMT+05:30) Kolkata',
          timezone: 'Asia/Kolkata',
        },
        {
          label: '(GMT+05:45) Kathmandu',
          timezone: 'Asia/Kathmandu',
        },
        {
          label: '(GMT+06:00) Ekaterinburg',
          timezone: 'Asia/Yekaterinburg',
        },
        {
          label: '(GMT+06:00) Almaty',
          timezone: 'Asia/Almaty',
        },
        {
          label: '(GMT+06:00) Dhaka',
          timezone: 'Asia/Dhaka',
        },
        {
          label: '(GMT+07:00) Novosibirsk',
          timezone: 'Asia/Novosibirsk',
        },
        {
          label: '(GMT+07:00) Bangkok',
          timezone: 'Asia/Bangkok',
        },
        {
          label: '(GMT+07:00) Jakarta',
          timezone: 'Asia/Jakarta',
        },
        {
          label: '(GMT+08:00) Krasnoyarsk',
          timezone: 'Asia/Krasnoyarsk',
        },
        {
          label: '(GMT+08:00) Chongqing',
          timezone: 'Asia/Chongqing',
        },
        {
          label: '(GMT+08:00) Hong Kong',
          timezone: 'Asia/Hong_Kong',
        },
        {
          label: '(GMT+08:00) Kuala Lumpur',
          timezone: 'Asia/Kuala_Lumpur',
        },
        {
          label: '(GMT+08:00) Perth',
          timezone: 'Australia/Perth',
        },
        {
          label: '(GMT+08:00) Singapore',
          timezone: 'Asia/Singapore',
        },
        {
          label: '(GMT+08:00) Taipei',
          timezone: 'Asia/Taipei',
        },
        {
          label: '(GMT+08:00) Ulaan Bataar',
          timezone: 'Asia/Ulaanbaatar',
        },
        {
          label: '(GMT+08:00) Urumqi',
          timezone: 'Asia/Urumqi',
        },
        {
          label: '(GMT+09:00) Irkutsk',
          timezone: 'Asia/Irkutsk',
        },
        {
          label: '(GMT+09:00) Seoul',
          timezone: 'Asia/Seoul',
        },
        {
          label: '(GMT+09:00) Tokyo',
          timezone: 'Asia/Tokyo',
        },
        {
          label: '(GMT+09:30) Adelaide',
          timezone: 'Australia/Adelaide',
        },
        {
          label: '(GMT+09:30) Darwin',
          timezone: 'Australia/Darwin',
        },
        {
          label: '(GMT+10:00) Yakutsk',
          timezone: 'Asia/Yakutsk',
        },
        {
          label: '(GMT+10:00) Brisbane',
          timezone: 'Australia/Brisbane',
        },
        {
          label: '(GMT+10:00) Canberra',
          timezone: 'Australia/Canberra',
        },
        {
          label: '(GMT+10:00) Guam',
          timezone: 'Pacific/Guam',
        },
        {
          label: '(GMT+10:00) Hobart',
          timezone: 'Australia/Hobart',
        },
        {
          label: '(GMT+10:00) Melbourne',
          timezone: 'Australia/Melbourne',
        },
        {
          label: '(GMT+10:00) Port Moresby',
          timezone: 'Pacific/Port_Moresby',
        },
        {
          label: '(GMT+10:00) Sydney',
          timezone: 'Australia/Sydney',
        },
        {
          label: '(GMT+11:00) Vladivostok',
          timezone: 'Asia/Vladivostok',
        },
        {
          label: '(GMT+12:00) Magadan',
          timezone: 'Asia/Magadan',
        },
        {
          label: '(GMT+12:00) Auckland',
          timezone: 'Pacific/Auckland',
        },
        {
          label: '(GMT+12:00) Fiji',
          timezone: 'Pacific/Fiji',
        },
      ]
    export default timeData;

    