<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use \Validator;
use \Cache;
use \Response;
use \RequestException;
use App\Helpers\Helper;
use GuzzleHttp\Client as Guzzle;

class propertyController extends Controller {
    protected $request;
    protected $guzzle;
    protected $apiUrl;
    protected $helper;

    public function __construct(Request $request,  Helper $helper, Guzzle $guzzle) {
        //$this->guzzle->setDefaultOption(env('API_URL'));
        // $this->guzzle->setConfig('defaults/verify', true);
        $this->request = $request;
        $this->apiUrl = 'http://localhost:8002/v1/';
        $this->helper = $helper;
        $this->guzzle = $guzzle;
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
        $data['seller'] = session('user_id');
        $resp  = $this->guzzle->request('POST', env('API_URL').'property', ['form_params' => $data]);
        $result = json_decode($resp->getBody());

        if($resp->getStatusCode() == 200 && $result->success == true){
            return Response::json(['success'=>true, 'msg'=>'Property Added Successfully']);
        } else {
            return Response::json(['success'=>false, 'msg'=>'Internal Server Error']);
        }
    }

    public function searchProperty() {
        $data = $this->request->all();
        $queryString = "?purpose=".$data['purpose']."&bedroom=".$data['bedroom']."&bathroom=".$data['bathroom']."&latitude=".$data['latitude']."&longitude=".$data['longitude'];
        $resp  = $this->guzzle->request('GET', $this->apiUrl.'property/livesearch'.$queryString);
        $result = json_decode($resp->getBody());
        if($resp->getStatusCode() == 200 && $result->success == true){
            return Response::json(['success'=>true, 'data'=> $result->data]);
        } else {
            return Response::json(['success'=>false, 'msg'=>'Internal Server Error']);
        }
    }
}