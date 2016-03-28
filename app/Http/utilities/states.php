<?php

namespace App\http\utilities;


class states {

    protected static $states = [

        'Azad Jammu & Kashmir',
        'Balochistan',
        'Federally Administered Tribal Areas',
        'Gilgit-Baltistan',
        'Islamabad Capital Territory',
        'Khyber Pakhtunkhwa',
        'Punjab',
        'Sindh',
    ];

    public static function All(){
        return static::$states;
    }
}