<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use \Validator;
use \Cache;
use \Response;
use \Storage;
use \RequestException;
use GuzzleHttp\Client as Guzzle;
use GuzzleHttp\ClientException;

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
        $resp = null;
        try{
        	$resp  = $this->guzzle->request('POST', env('API_URL').'user/userAuthenticate', ['form_params'=>$data]);
        } catch(\Exception $e){
       		return Response::json(['success'=>false, 'msg'=>"Can't send request"]);
       	}

        $result = json_decode($resp->getBody());
        
        if($resp->getStatusCode() == 200 && $result->success == true){
        	session(['username' => $data['email']]);
        	session(['user_id' => $result->data->user_id]);

        	$data = ['id' => session('user_id')];
	       	$resp = null;
	       	try{
	       		$resp  = $this->guzzle->request('GET', env('API_URL').'user', ['query'=>$data]);
	       	} catch(\Exception $e){
       			return Response::json(['success'=>false, 'msg'=>$this->makeError("Can't send request")]);
       		}
	        $result = json_decode($resp->getBody());
	        session(['firstname' => $result->data[0]->firstname]);
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
		$resp = null;
		try{
        	$resp  = $this->guzzle->request('POST', env('API_URL').'user', ['form_params'=>$data]);
        } catch(\Exception $e){
       		return Response::json(['success'=>false, 'msg'=>$this->makeError("Can't send request")]);
       	}
        $result = json_decode($resp->getBody());

        if($resp->getStatusCode() == 200){
        	session(['username' => $data['email']]);
        	session(['firstname' => $data['firstname']]);
        	session(['user_id' => $result->data]);
            return Response::json(['success'=>true, 'msg'=>'Registration successful']);
        } else {
        	if($result->status_code == 400)
            	return Response::json(['success'=>false, 'msg'=>$this->makeError('Email alreay exists') ]);
            else
            	return Response::json(['success'=>false, 'msg'=>$this->makeError('Registration failed') ]);
        }
    }

    public function postProfile() {
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
		$data['id'] = session('user_id');
		$resp = null;
		try{
       		$resp  = $this->guzzle->request('PUT', env('API_URL').'user', ['form_params'=>$data]);
       	} catch(\Exception $e){
       		return Response::json(['success'=>false, 'msg'=>$this->makeError('Update failed')]);
       	}
        
        $result = json_decode($resp->getBody());
                
        if($resp->getStatusCode() == 200 && $result->success == true){
        	session(['firstname' => $data['firstname']]);
            return Response::json(['success'=>true, 'msg'=>'Profile updated successfully']);
        } else {
            return Response::json(['success'=>false, 'msg'=>$this->makeError('Update failed')]);
        }
    }

    public function getProfile() {
       	$data = ['id' => session('user_id')];
       	$resp = null;
       	try{
       		$resp  = $this->guzzle->request('GET', env('API_URL').'user', ['query'=>$data]);
       	} catch(\Exception $e){
       		return Response::json(['success'=>false, 'msg'=>$this->makeError("Can't send request")]);
       	}
        $result = json_decode($resp->getBody());
                
        if($resp->getStatusCode() == 200){
            return Response::json(['success'=>true, 'msg'=>$result->data[0]]);
        } else {
        	return Response::json(['success'=>false, 'msg'=>$this->makeError('User not found')]);
        }
    }

    public function getLogout() {
    	$this->request->session()->flush();
    	return Response::json(['success'=>true, 'msg'=>'Logout successful']);
    }

    public function postProfilePic() {
		if(Input::hasFile('profilePic') ) {
			$fileSizeLimit = 60 * 1024 * 1024;
			$f = Input::file('profilePic');

			if ( $f->getSize() > $fileSizeLimit ) {
				return Response::json(['success'=>false, 'msg'=>'Maximum allowed size is '.($fileSizeLimit/1024)]);
			}

			if ( !($f->getMimeType() =='image/jpeg' || $f->getMimeType() =='image/jpg' 
				|| $f->getMimeType() =='image/gif')) {
				return Response::json(['success'=>false, 'msg'=>'Allowed types are jpeg, jpg and gif']);		
			}
			$type = explode('/', $f->getMimeType())[1];
			$dr = DIRECTORY_SEPARATOR;
			$path = 'images'.$dr.'profileImages'.$dr.'User_'.session('user_id').'.'.$type;
			
			$file = file_get_contents($f->getRealPath());
			$mkfile = file_put_contents(storage_path($path), $file);
			
			if($mkfile)
				return Response::json(['success'=>true, 'msg'=>'Picture uploaded succcessfully', 
					'image_url'=>$path]);
		}

		return Response::json(['success'=>false, 'error'=>'Picture not found']);
	}

    public static function makeError($msg){
		$error = [
					'field_name'=>[$msg] 
				];
		$error = json_encode($error);		
		return array($error);
	}
}