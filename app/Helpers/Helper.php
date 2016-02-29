<?php

namespace App\Helpers;

class Helper{

    private $apiUrl;

    public function __construct() {
        $this->apiUrl =env('API_URL');
    }

    public function curlPost($endpoint, $data){
        $data = http_build_query($data);

        try{
            $ch = curl_init($this->apiUrl.$endpoint);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch,CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            $response = curl_exec($ch);
            curl_close($ch);
            return $response;
        } catch(Exception $e) {
            var_dump($e);
        }
        return $response;
    }

}