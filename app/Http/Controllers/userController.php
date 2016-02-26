<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use \Validator;
use \Cache;
use \Response;
use GuzzleHttp\Client as Guzzle;

class userController extends Controller{
	protected $request;
	protected $guzzle;
	protected $apiUrl;

    public function __construct(Request $request, Guzzle $guzzle){
    	$this->guzzle = $guzzle;
    	$this->guzzle->setDefaultOption('verify', false);
        $this->request = $request;
        $this->apiUrl = env('API_URL');
    }

    public function postLogin() {
        $data = $this->request->all();
        $validator = Validator::make($data,[
            'login' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return Response::json(['success'=>false, 'msg'=>'Username & password are required']);
        }
        
        $resp = null;
        try{
        	$resp = $this->guzzle->request('POST', $this->apiUrl.'v1/user/userAuthenticate',['body'=>$data]);
        } catch (\Exception $e) {
    		echo 'Uh oh! ' . $e->getMessage();
    		var_dump($resp);
		}

       	//$result = json_decode($resp->getBody());
        //var_dump($result);
        if($result->success){
        	session(['username' => 'username from $result']);
            return Response::json(['success'=>true, 'msg'=>'Login successful']);
        } else {
            return Response::json(['success'=>false, 'msg'=>'Username or Password is invalid']);
        }
    }

    public function getLogout() {
    	$this->request->session()->flush();
    	return Response::json(['success'=>true, 'msg'=>'Logout successful']);
    }

    public function postRegister() {
        $data = $this->request->all();
        $validator = Validator::make($data,[
        	'firstName' => 'required',
            'login' => 'required',
            'password' => 'required|min:6',
            'confirmPassword' => 'required|same:password',
        ]);

        if ($validator->fails()) {
        	$msg = $validator->messages()->toJson();
            return Response::json(['success'=>false, 'msg'=>array($msg)]);
        }
        
        $resp = $this->guzzle->get($this->apiUrl.'test');
       	$result = json_decode($resp->getBody());
        if($result->success){
        	session(['username' => 'username from $result']);
            return Response::json(['success'=>true, 'msg'=>'Registration successful']);
        } else {
            return Response::json(['success'=>false, 'msg'=>'Registration failed']);
        }
    }
}