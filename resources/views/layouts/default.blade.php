<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
    <title>Realtor</title>
    <meta name="description" content="Here goes description" />
    <meta name="author" content="author name" />
    <link rel="shortcut icon" href="{{URL::to('img/favicon.png')}}" type="image/x-icon" />

    <!-- Mobile Specific Meta -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

    <!-- Style CSS -->
    <link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css">

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.2.0/dropzone.css">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="{{URL::to('css/owl-carousel.css')}}" />
    <link rel="stylesheet" href="{{URL::to('css/bootstrap.css')}}" />
    <link rel="stylesheet" href="{{URL::to('css/lightbox.css')}}" />
    <link rel="stylesheet" href="{{URL::to('css/animate.css')}}" />
    <link rel="stylesheet" href="{{URL::to('css/bxslider.css')}}" />
    <link rel="stylesheet" href="{{URL::to('css/nouislider.css')}}" />
    <link rel="stylesheet" href="{{URL::to('css/icomoon.css')}}" />
    <link rel="stylesheet" href="{{URL::to('css/screen.css')}}" />
    <link rel="stylesheet" href="{{URL::to('css/custom.css')}}" />
    <link rel="stylesheet" href="{{URL::to('css/album.css')}}" />
    <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/flexslider/2.2.2/flexslider.css">
    {{--<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.0.0/angular-material.min.css">--}}
    <link rel='stylesheet' href='{{URL::to('css/unite-gallery.css')}}' type='text/css' />
    <style>
        .verification-heading {
            display: block;
            color: #086fb5;
            max-width: 363px;
            font-size: 31px;
            line-height: 1em;
            font-weight: 500;
            padding-bottom: 7px;
            margin: 0 0 10px;
            border-bottom: 3px solid #086fb5;
        }
        .verification-body {
            margin: 0 0 45px;
            color: #333;
            font-size: 18px;
            font-weight: 500;
            line-height: 1.5em;
        }
        .my-table{
            width: 400px;
            height: 400px;
            border: 1px solid black;
        }

        .photo-gallery{
            width: 100px;
            display: inline-block;
            white-space: nowrap;
            border: 1px solid black;
        }
        .item-cover{
            min-height: 290px !important;
        }
        /*.flexslider{*/
            /*height: 400px !important;*/
            /*width: 1000px !important;*/
            /*float: none !important;*/
            /*margin: 10px 287px 60px !important;*/
            /*margin-top: 10px;*/
            /*margin-right: 287px;*/
            /*margin-bottom: 60px;*/
            /*margin-left: 287px;*/
        /*}*/
        /*.flex-viewport{*/
            /*max-height: 400px;*/
        /*}*/
        .flex-direction-nav a{
            height: 50px;
        }
    </style>
</head>
<body data-smooth-scroll="on"> <!-- id="front-page" -->
  <div id="overlay">
    <table width="100%" height="100%">
      <tr><td valign="middle"><img src="{{URL::to('img/rolling.svg')}}" width="80px" height="80px"/><p>Loading</p></td></tr>
    </table>
  </div>

    <!-- Site Preloader -->
    <div class="site-preloader">
        <div class="preloader-content">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                <g>
                    <polygon fill-rule="evenodd" clip-rule="evenodd" fill="#036AB0" points="52.346,69.705 24.321,69.531 67.362,98.879
                        91.266,98.879   "/>
                    <rect x="9.856" y="44.682" fill-rule="evenodd" clip-rule="evenodd" fill="#036AB0" width="14.465" height="54.362"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" fill="#036AB0" d="M47.868,1.947c21.055,0,38.123,17.068,38.123,38.123
                        c0,21.055-17.068,38.123-38.123,38.123c-21.055,0-38.123-17.068-38.123-38.123C9.745,19.015,26.813,1.947,47.868,1.947
                        L47.868,1.947z M47.868,16.58c-12.973,0-23.49,10.517-23.49,23.49c0,12.973,10.517,23.49,23.49,23.49
                        c12.973,0,23.49-10.517,23.49-23.49C71.357,27.097,60.841,16.58,47.868,16.58z"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" fill="#036AB0" d="M47.535,1.166c21.055,0,38.123,17.068,38.123,38.123
                        c0,21.055-17.068,38.123-38.123,38.123c-21.055,0-38.123-17.068-38.123-38.123C9.412,18.234,26.48,1.166,47.535,1.166L47.535,1.166
                        z M47.535,15.799c-12.973,0-23.49,10.517-23.49,23.49c0,12.973,10.517,23.49,23.49,23.49c12.973,0,23.49-10.517,23.49-23.49
                        C71.025,26.316,60.508,15.799,47.535,15.799z"/>
                </g>
            </svg>
        </div>
    </div>

    <!-- Page Wrapper -->
    <div id="page">
        <!-- Header -->
        @include('header')

        <!-- Main Content -->
        <div class="content-wrapper">
            @if(session('user_id'))
                @yield('content-wrapper')
            @else
                @include('login')

                @yield('content-wrapper')
            @endif
        </div>

        @include('footer')
    </div>
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js"></script>
<script src="http://maps.googleapis.com/maps/api/js?libraries=places"></script>
<script src="{{URL::to('js/infobox.js')}}"></script>
<script src="{{URL::to('js/jquery.js')}}"></script>
<script src="{{URL::to('js/jquery-ui.js')}}"></script>
<script src="{{URL::to('js/bxslider.js')}}"></script>
<script src="{{URL::to('js/marquee.js')}}"></script>
<script src="{{URL::to('js/nouislider.js')}}"></script>
<script src="{{URL::to('js/modernizr.js')}}"></script>
<script src="{{URL::to('js/imagesloaded.js')}}"></script>
<script src="{{URL::to('js/smooth-scroll.js')}}"></script>
<script src="{{URL::to('js/owl-carousel.js')}}"></script>
<script src="{{URL::to('js/isotope.js')}}"></script>
<script src="{{URL::to('js/theia.js')}}"></script>
<script src="{{URL::to('js/lightbox.js')}}"></script>
<script src="{{URL::to('js/options.js')}}"></script>
<script src="{{URL::to('js/custom.js')}}"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/flexslider/2.2.2/jquery.flexslider.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.10.3/TweenMax.min.js"></script>
<script type='text/javascript' src='{{URL::to('js/unitegallery.min.js')}}'></script>
<script type='text/javascript' src='{{URL::to('js/ug-theme-tilesgrid.js')}}'></script>
<script type="text/javascript" src="{{URL::to('app/lib/requirejs/require.js')}}" data-main="{{URL::to('app/main.js')}}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.2.0/dropzone.js" type="text/javascript"></script>

<script>

    Dropzone.options.addphotoform = {

        paramName: '',

        dictDefaultMessage: 'Drop photo here to upload',

        maxFilesize: 3,

        acceptedFiles: '.jpg , .jpeg , .png , .bmp ',

    };

</script>
    @yield('custom-scripts')
</body>
</html>