<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
    <title>Realtor</title>
    <meta name="description" content="Here goes description" />
    <meta name="author" content="author name" />
    <link rel="shortcut icon" href="img/favicon.png" type="image/x-icon" />

    <!-- Mobile Specific Meta -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

    <!-- Style CSS -->
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="css/owl-carousel.css" />
    <link rel="stylesheet" href="css/bootstrap.css" />
    <link rel="stylesheet" href="css/lightbox.css" />
    <link rel="stylesheet" href="css/animate.css" />
    <link rel="stylesheet" href="css/bxslider.css" />
    <link rel="stylesheet" href="css/nouislider.css" />
    <link rel="stylesheet" href="css/icomoon.css" />
    <link rel="stylesheet" href="css/screen.css" />
	<link rel="stylesheet" href="css/custom.css" />
</head>
</head>
<body data-smooth-scroll="on"> <!-- id="front-page" -->
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
            @include('login')
            @yield('content-wrapper')     
        </div>

        @include('footer')
    </div>
    <!-- Scripts -->
    <script src="http://maps.googleapis.com/maps/api/js"></script>
    <script src="js/infobox.js"></script>
    <script src="js/jquery.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="js/bxslider.js"></script>
    <script src="js/marquee.js"></script>
    <script src="js/nouislider.js"></script>
    <script src="js/modernizr.js"></script>
    <script src="js/imagesloaded.js"></script>
    <script src="js/smooth-scroll.js"></script>
    <script src="js/owl-carousel.js"></script>
    <script src="js/isotope.js"></script>
    <script src="js/theia.js"></script>
    <script src="js/lightbox.js"></script>
    <script src="js/options.js"></script>
</body>
</html>