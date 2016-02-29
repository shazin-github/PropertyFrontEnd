<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use \Validator;
use \Cache;
use \Response;
use \RequestException;
use GuzzleHttp\Client as Guzzle;
use App\Helpers\Helper;

class propertyController extends Controller {
    protected $request;
    protected $guzzle;
    protected $apiUrl;
    protected $helper;

    public function __construct(Request $request, Guzzle $guzzle, Helper $helper) {
        $this->guzzle = $guzzle;
        //$this->guzzle->setDefaultOption(env('API_URL'));
        // $this->guzzle->setConfig('defaults/verify', true);
        $this->request = $request;
        $this->apiUrl = env('API_URL');
        $this->helper = $helper;
    }

    public function postProperty() {
        $data = $this->request->all();
        $validator = Validator::make($data,[
            'location' => 'required',
            'property' => 'required',
            'feature' => 'required',
            'seller' => 'required',
        ]);

        if ($validator->fails()) {
            return Response::json(['success'=>false, 'msg'=>'Property Details are Invalid' ]);
        }

        $resp = $this->helper->curlPost('property', $data);
        $result = json_decode($resp);
        dd($result);
        if($result->status_code == 200 && $result->success[0] == true){
            return Response::json(['success'=>true, 'msg'=>'Property Added Successfully']);
        } else {
            return Response::json(['success'=>false, 'msg'=>'Internal Server Error']);
        }
    }
}