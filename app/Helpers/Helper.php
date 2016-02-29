<?php

namespace App\Helpers;

use GuzzleHttp\Client as Guzzle;

class Helper{

    private $apiUrl;

    public function __construct(Guzzle $guzzle) {
        $this->apiUrl = 'http://localhost:8002/v1/';
        $this->guzzle = $guzzle;
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

    public function guzzlePost($method, $endpoint, $data) {
        $response = $this->guzzle->request($method, $this->apiUrl.$endpoint, $data);
        return ($response->getBody());
    }

}