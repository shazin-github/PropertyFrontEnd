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
use GuzzleHttp\Exception\RequestException as guzzleException;
use \Storage;
use App\http\utilities\city;
use App\http\utilities\states;
use Image;

class propertyController extends Controller {
    protected $request;
    protected $guzzle;
    protected $apiUrl;
    protected $helper;

    public function __construct(Request $request,  Helper $helper, Guzzle $guzzle) {
        //$this->guzzle->setDefaultOption(env('API_URL'));
        // $this->guzzle->setConfig('defaults/verify', true);
        $this->request = $request;
        $this->apiUrl = env('API_URL');
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
        $resp  = $this->guzzle->request('POST', $this->apiUrl.'property', ['form_params' => $data]);
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
        $resp = false;
        try {
            $resp  = $this->guzzle->request('GET', $this->apiUrl.'property/livesearch'.$queryString);
            $result = json_decode($resp->getBody());
        } catch (guzzleException $e) {
            if ($e->hasResponse()) {
                $result =  $e->getResponse();
            }
        }
        if($resp && $resp->getStatusCode() == 200 && $result->success == true){
            return Response::json(['success'=>true, 'data'=> $result->data]);
        } else {
            return Response::json(['success'=>false, 'msg'=>'Not Found']);
        }
    }

    public function allProperty() {
        $resp = false;
        try {
            $resp  = $this->guzzle->request('GET', $this->apiUrl.'property');
            $result = json_decode($resp->getBody());
            //echo $resp->getBody();
        } catch (guzzleException $e) {
            // var_dump($e);
            if ($e->hasResponse()) {
                $result =  $e->getResponse();
            }
        }
        if($resp && $resp->getStatusCode() == 200 && $result->success == true){
            return Response::json(['success'=>true, 'data'=> $result->data]);
        } else {
            return Response::json(['success'=>false, 'msg'=>'Not Found']);
        }
    }

    public function recentProperty() {
        $resp = false;
        try {
            $resp  = $this->guzzle->request('GET', $this->apiUrl.'property/recentproperty');
            $result = json_decode($resp->getBody());
            //echo $resp->getBody();
        } catch (guzzleException $e) {
            // var_dump($e);
            if ($e->hasResponse()) {
                $result =  $e->getResponse();
            }
        }
        if($resp && $resp->getStatusCode() == 200 && $result->success == true){
            return Response::json(['success'=>true, 'data'=> $result->data]);
        } else {
            return Response::json(['success'=>false, 'msg'=>'Not Found']);
        }
    }

    public function mostviewProperty() {
        $resp = false;
        try {
            $resp  = $this->guzzle->request('GET', $this->apiUrl.'property/ShowWithMostViews');
            $result = json_decode($resp->getBody());
            //echo $resp->getBody();
        } catch (guzzleException $e) {
            // var_dump($e);
            if ($e->hasResponse()) {
                $result =  $e->getResponse();
            }
        }
        if($resp && $resp->getStatusCode() == 200 && $result->success == true){
            return Response::json(['success'=>true, 'data'=> $result->data]);
        } else {
            return Response::json(['success'=>false, 'msg'=>'Not Found']);
        }
    }

    public function addPropertyView($id) {
        $resp = false;
        $queryString = "?id=".$id;
        try {
            $resp  = $this->guzzle->request('PUT', $this->apiUrl.'property/updateviews'.$queryString);
            $result = json_decode($resp->getBody());
        } catch (guzzleException $e) {
            if ($e->hasResponse()) {
                $result =  $e->getResponse();
            }
        }
        if($resp && $resp->getStatusCode() == 200 && $result->success == true){
            return Response::json(['success'=>true, 'data'=> $result->data]);
        } else {
            return Response::json(['success'=>false, 'msg'=>'Not Found']);
        }
    }

    public function userProperty() {
        $resp = false;
        try {
            $resp  = $this->guzzle->request('GET', $this->apiUrl.'property/SearchWithUser?user_id='.session('user_id') );
            $result = json_decode($resp->getBody());
            //echo $resp->getBody();
        } catch (guzzleException $e) {
            echo $e;
            if ($e->hasResponse()) {
                $result =  $e->getResponse();
            }
        }
        if($resp && $resp->getStatusCode() == 200 && $result->success == true){
            return Response::json(['success'=>true, 'msg'=> $result->data]);
        } else {
            return Response::json(['success'=>false, 'msg'=>'Data Not Found']);
        }
    }

    public function postM_PropertyPic(){
        $f_photo = $this->request->all();
        $photo_array = [];
        foreach ($f_photo as $photo) {
            $type = explode('/', $photo->getMimeType())[1];
            $dr = DIRECTORY_SEPARATOR;
            $ran = random_int(1, 9999999);
            $resizepath = 'propertyimage'.$dr.'images'.$dr.'propertyImages'.$dr.'User_'.session('user_id').'_'.$ran.'.'.$type;
            //dd($resizepath);
            $path = 'images'.$dr.'propertyImages'.$dr.'User_'.session('user_id').'_'.$ran.'.'.$type;
            $thumb_path = 'thumbnail'.$dr.'images'.$dr.'propertyImages'.$dr.'User_'.session('user_id').'_'.$ran.'.'.$type;

            $img = Image::make($photo->getRealPath())
                ->resize(257, 290);
            $img->save(storage_path($resizepath));

            $file = file_get_contents($photo->getRealPath());

            Image::make($photo->getRealPath())
                ->fit(200)
                ->save(storage_path($thumb_path));

            $mkfile = file_put_contents(storage_path($path), $file);
            if($mkfile){
                $photo_array[] = $path;
            }
        }
        if($photo_array){
            $p_url = implode("|", $photo_array);
            return Response::json(['success'=>true, 'msg'=>'Picture uploaded succcessfully',
                'image_url'=>$p_url]);
        }
        return Response::json(['success'=>false, 'error'=>'Picture not found']);


    }

    public function postPropertyPic() {
        if(Input::hasFile('propImages') ) {
            $fileSizeLimit = 60 * 1024 * 1024;
            $f = Input::file('propImages');

            if ( $f->getSize() > $fileSizeLimit ) {
                return Response::json(['success'=>false, 'msg'=>'Maximum allowed size is '.($fileSizeLimit/1024)]);
            }

            if ( !($f->getMimeType() =='image/jpeg' || $f->getMimeType() =='image/jpg'
                || $f->getMimeType() =='image/gif')) {
                return Response::json(['success'=>false, 'msg'=>'Allowed types are jpeg, jpg and gif']);
            }
            $type = explode('/', $f->getMimeType())[1];
            $dr = DIRECTORY_SEPARATOR;
            $ran = random_int(1, 9999999);
            $path = 'images'.$dr.'propertyImages'.$dr.'User_'.session('user_id').'_'.$ran.'.'.$type;
            $thumb_path = 'thumbnail'.$dr.'images'.$dr.'propertyImages'.$dr.'User_'.session('user_id').'_'.$ran.'.'.$type;

            $file = file_get_contents($f->getRealPath());
            $img = \Image::make($file)
                ->fit(200);
            $mkfile_th = file_put_contents(storage_path($thumb_path), $img);
            $mkfile = file_put_contents(storage_path($path), $file);

            if($mkfile)
                return Response::json(['success'=>true, 'msg'=>'Picture uploaded succcessfully',
                    'image_url'=>$path]);
        }

        return Response::json(['success'=>false, 'error'=>'Picture not found']);
    }

    public function getPropertyDetail($id) {
        $resp = false;
        $queryString = "?id=".$id;
        try {
            $resp  = $this->guzzle->request('GET', $this->apiUrl.'property/SearchById'.$queryString);
            $result = json_decode($resp->getBody());
        } catch (guzzleException $e) {
            if ($e->hasResponse()) {
                $result =  $e->getResponse();
            }
        }
        if($resp && $resp->getStatusCode() == 200 && $result->success == true){
            return Response::json(['success'=>true, 'data'=> $result->data]);
        } else {
            return Response::json(['success'=>false, 'msg'=>'Not Found']);
        }
    }

    public function getPropertyPic($id) {
        $dr = DIRECTORY_SEPARATOR;
        $path = 'images'.$dr.'propertyImages'.$dr.$id;
            $file = file_get_contents(storage_path($path));
            return response($file, 200)->header('Content-Type', 'image/jpeg');
    }
    public function getPropertythumPic($id) {
        $dr = DIRECTORY_SEPARATOR;
        $path = 'thumbnail'.$dr.'images'.$dr.'propertyImages'.$dr.$id;
        $file = file_get_contents(storage_path($path));
        return response($file, 200)->header('Content-Type', 'image/jpeg');
    }
    public function getPropertyResizePic($id) {
        $dr = DIRECTORY_SEPARATOR;
        $path = 'propertyimage'.$dr.'images'.$dr.'propertyImages'.$dr.$id;
        $file = file_get_contents(storage_path($path));
        return response($file, 200)->header('Content-Type', 'image/jpeg');
    }
    public function getCity(){
        $city_List = city::all();
        return Response::json(['success'=>true, 'data'=> $city_List]);
    }

    public function getstate(){
        $state_List = states::all();
        return Response::json(['success'=>true, 'data'=> $state_List]);
    }


}