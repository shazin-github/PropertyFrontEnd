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

class userController extends Controller{
	protected $request;
	protected $guzzle;
	protected $apiUrl;

    public function __construct(Request $request, Guzzle $guzzle){
    	$this->guzzle = $guzzle;
    	//$this->guzzle->setDefaultOption(env('API_URL'));
    	// $this->guzzle->setConfig('defaults/verify', true);
        $this->request = $request;
        $this->apiUrl = env('API_URL');
    }

    public function postLogin() {
        $data = $this->request->all();
        $validator = Validator::make($data,[
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return Response::json(['success'=>false, 'msg'=>'Email & password are required' ]);
        }

        $resp = $this->curlPost('user/userAuthenticate', $data);
        $result = json_decode($resp);
        // var_dump($result);
        if($result->status_code == 200 && $result->success[0] == true){
        	session(['username' => $data['email']]);
            return Response::json(['success'=>true, 'msg'=>'Login successful']);
        } else {
            return Response::json(['success'=>false, 'msg'=>'Email or Password is invalid']);
        }
    }

    public function postRegister() {
        $data = $this->request->all();
        $validator = Validator::make($data,[
        	'firstname' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'confirmPassword' => 'required|same:password',
        ]);

        if ($validator->fails()) {
        	$msg = $validator->messages()->toJson();
            return Response::json(['success'=>false, 'msg'=>array($msg)]);
        }
		
		unset($data['confirmPassword']);
        $resp = $this->curlPost('user', $data);
       	$result = json_decode($resp);

        if($result->status_code == 200){
        	session(['username' => $data['email']]);
            return Response::json(['success'=>true, 'msg'=>'Registration successful']);
        } else {
        	if($result->status_code == 400)
            	return Response::json(['success'=>false, 'msg'=>$this->makeError('Email alreay exists') ]);
            else
            	return Response::json(['success'=>false, 'msg'=>$this->makeError('Registration failed') ]);
        }
    }

    public function getLogout() {
    	$this->request->session()->flush();
    	return Response::json(['success'=>true, 'msg'=>'Logout successful']);
    }

    public function curlPost($endpoint, $data){
    	try{
	    	$ch = curl_init($this->apiUrl.$endpoint);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
			$response = curl_exec($ch);
			curl_close($ch);
			return $response;
		} catch(Exception $e) {
			var_dump($e);
		}
		return $response;
    }

    public static function makeError($msg){
		$error = [
					'field_name'=>[$msg] 
				];
		$error = json_encode($error);		
		return array($error);
	}
}