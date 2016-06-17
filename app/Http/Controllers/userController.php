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
use Mail;
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
        	$resp  = $this->guzzle->request('POST', $this->apiUrl.'user/userAuthenticate', ['form_params'=>$data]);
        } catch(\Exception $e){

			$response = $e->getResponse();

			$responseBodyAsString = $response->getBody()->getContents();

			$result = json_decode($responseBodyAsString);



			if($result->status_code == 401){

				return Response::json(['success'=>false, 'msg'=>"Email Verification Is Requried ! Please Check Your Email."]);

			}else{
				if($result->status_code == 404){
					return Response::json(['success'=>false, 'msg'=>"Invalid Email & Password"]);
				}
			}


       		return Response::json(['success'=>false, 'msg'=>"Can't send request"]);
       	}

        $result = json_decode($resp->getBody());
        
        if($resp->getStatusCode() == 200 && $result->success == true){
        	session(['username' => $data['email']]);
        	session(['user_id' => $result->data->user_id]);

        	$data = ['id' => session('user_id')];
	       	$resp = null;
	       	try{
	       		$resp  = $this->guzzle->request('GET', $this->apiUrl.'user', ['query'=>$data]);
	       	} catch(\Exception $e){
       			return Response::json(['success'=>false, 'msg'=>$this->makeError("Can't send request")]);
       		}
	        $result = json_decode($resp->getBody());
	        session(['firstname' => $result->data[0]->firstname]);
			session(['image' => $result->data[0]->image_url]);
            return Response::json(['success'=>true, 'msg'=>'Login successful']);
        } else {
            return Response::json(['success'=>false, 'msg'=>'Email or Password is invalid']);
        }
    }

    public function postRegister(Mail $mailer) {
        $data = $this->request->all();
        $validator = Validator::make($data,[
        	'firstname' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'confirmPassword' => 'required|same:password',
        ]);
		//dd($mail);
        if ($validator->fails()) {
        	$msg = $validator->messages()->toJson();
            return Response::json(['success'=>false, 'msg'=>array($msg)]);
        }
		
		unset($data['confirmPassword']);
		$data['confirmation_code'] = str_random(8);

		$data['image_url'] = 'images/profileImages/default_avatar_large.jpeg'; // set a default profile image
		$resp = null;
		try{
        	$resp  = $this->guzzle->request('POST', $this->apiUrl.'user', ['form_params'=>$data]);
        } catch(\Exception $e){
            $response = $e->getResponse();

            $responseBodyAsString = $response->getBody()->getContents();

            $result = json_decode($responseBodyAsString);

            if($result->status_code == 400){

                return Response::json(['success' => false, 'msg' => $this->makeError("Email Already Exist")]);

            }else{
                return Response::json(['success' => false, 'msg' => $this->makeError("Can't send request")]);
            }


       	}
        $result = json_decode($resp->getBody());

        if($resp->getStatusCode() == 200){

			$mailer::send('confirm' , ['confirmation_code'=> $data['confirmation_code'],'id'=>$result->data] , function($message ) use ($data){
					$message->from('broker.test043@gmail.com' , 'Broker Test')
						->to($data['email'])
						->subject('Test Email');
			} );

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
       		$resp  = $this->guzzle->request('PUT', $this->apiUrl.'user', ['form_params'=>$data]);
       	} catch(\Exception $e){
//			$response = $e->getResponse();
//
//			$responseBodyAsString = $response->getBody()->getContents();
//
//			$result = json_decode($responseBodyAsString);


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
       		$resp  = $this->guzzle->request('GET', $this->apiUrl.'user', ['query'=>$data]);
       	} catch(\Exception $e){
       		return Response::json(['success'=>false, 'msg'=>$this->makeError("Can't send request")]);
       	}
        $result = json_decode($resp->getBody());
                
        if($resp->getStatusCode() == 200){

			session(['image' => $result->data[0]->image_url]);
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
			$path = 'images'.$dr.'profileImages'.$dr.'User_'.time().'_'.session('user_id').'.'.$type;
			
			$file = file_get_contents($f->getRealPath());
			$mkfile = file_put_contents($path, $file);
			
			if($mkfile) {
				session(['image' => $path]);
				return Response::json(['success' => true, 'msg' => 'Picture uploaded succcessfully',
					'image_url' => $path]);
			}
		}

		return Response::json(['success'=>false, 'error'=>'Picture not found']);
	}

	public function confirmUser($confirmCode, $user_id){

		$data['confirmation_code'] = $confirmCode ;
		$data['id'] = $user_id;

		try{
			$resp  = $this->guzzle->request('GET', $this->apiUrl.'user/confirmCode?confirmation_code='.$confirmCode.'&id='.$user_id);
		} catch(\Exception $e){
			$response = $e->getResponse();

			$responseBodyAsString = $response->getBody()->getContents();

			$result = json_decode($responseBodyAsString);

			if($result->status_code == 404){

				return redirect('404');

			}

		}
		$result = json_decode($resp->getBody());

		if($resp->getStatusCode() == 200){

			session(['image' => $result->data[0]->image_url]);
       	session(['username' => $result->data[0]->email]);
	       	session(['firstname' => $result->data[0]->firstname]);
			session(['user_id' => $result->data[0]->id]);
			return redirect('/my-profile');
		} else {
			return redirect('404');
		}


	}

    public static function makeError($msg){
		$error = [
					'field_name'=>[$msg] 
				];
		$error = json_encode($error);		
		return array($error);
	}

	public function isAgent(){
		$postData = $this->request->all();

		$data = ['user_id' => $postData[0]];

		$resp = null;

		try{
			$resp  = $this->guzzle->request('GET', $this->apiUrl.'user/isAgent', ['query'=>$data]);

		} catch(\Exception $e){
			//return Response::json(['success'=>false, 'msg'=>$this->makeError("Can't send request")]);
			$response = $e->getResponse();

			$responseBodyAsString = $response->getBody()->getContents();

			$result = json_decode($responseBodyAsString);

			if($result->status_code == 404){

				return Response::json(['success' => false, 'msg' => $this->makeError("User Not Agent")]);

			}else{
				return Response::json(['success' => false, 'msg' => $this->makeError("Can't send request")]);
			}
		}
		$result = json_decode($resp->getBody());

		if($resp->getStatusCode() == 200){

			return Response::json(['success'=>true, 'msg'=>$result->data[0]]);
		} else {
			return Response::json(['success'=>false, 'msg'=>$this->makeError('User Not Agent')]);
		}
	}

	public function getPlanList(){

		$resp  = $this->guzzle->request('GET', $this->apiUrl.'user/getPlanList');

		$result = json_decode($resp->getBody());

		if($resp->getStatusCode() == 200){

			return Response::json(['success'=>true, 'msg'=>$result->data]);

		} else {

				return Response::json(['success'=>false, 'msg'=>$this->makeError('User not found')]);

		}
	}

	public function getPlanDetail($id){

		$data = ['planId' => $id];

		$resp  = $this->guzzle->request('GET', $this->apiUrl.'user/getPlanDetail', ['query'=>$data]);

		$result = json_decode($resp->getBody());

		if($resp->getStatusCode() == 200){

			return Response::json(['success'=>true, 'msg'=>$result->data[0]]);

		} else {

				return Response::json(['success'=>false, 'msg'=>$this->makeError('User not found')]);
		}
	}

	public  function switchToAgent(){

		$data = $this->request->all();

		$resp  = $this->guzzle->request('PUT', $this->apiUrl.'user', ['form_params'=>$data]);

		$result = json_decode($resp->getBody());

		if($resp->getStatusCode() == 200){

			return Response::json(['success'=>true, 'msg'=>$result->data[0]]);

		} else {

			return Response::json(['success'=>false, 'msg'=>$this->makeError('User not found')]);
		}
	}

}