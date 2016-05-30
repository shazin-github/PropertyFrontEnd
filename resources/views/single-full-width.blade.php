@extends('layouts.default')
@section('content-wrapper')

	<!-- Single Property Container -->
	<section class="single-property-container" ng-controller="propertyDetailController" ng-init="init_id({!! $id !!})">
	<div class="row no-gap">
		<input type="hidden" name="property_id" id="property_id" value="{!! $id !!}"  />
		<div class="col-md-8 col-lg-8 no-pad">

			<div class="imgdiv" id="sliding" >

				<img ng-attr-src="{{ url('<% currentimage.img %>') }}" ng-click="toggleModal(currentimage)" >

			</div>

		</div>
		<div class="col-md-16 col-lg-16  "  >
		<div id="thumbWrapper" class="force-overflow scrollbar style-4"  >
			<ul id="thumbList" >
				<li ng-repeat="image in images_array" ng-click="toggleModal(image)">
					<img ng-src="{{url('<% image.thumb %>')}}"  alt="Property Images">

				</li>
			</ul>


		</div>
		</div>




			<modal visible="showModal">
				<div class="col-md-24 col-lg-24 no-pad margin-top"  >


						<span class="angular-lightbox-inner">
              				<a href class="previous" title="Previous" ng-click="showpre(currentimage.ind)">«</a>
             				 <img ng-attr-src="{{ url('<% currentimage.img %>') }}"  >
							<a href class="next" title="Next" ng-click="shownext(currentimage.ind)" >»</a>
              				<a href class="close" title="Close">×</a>
           				 </span>

				</div>
			</modal>




		{{--<div class="col-md-16 col-lg-16 no-pad" style="float: left;">--}}
			{{--<ng-gallery images="images_array">--}}
			{{--</ng-gallery>--}}

	{{--</div>--}}
		{{--<div class="col-md-16 col-lg-16 no-pad">--}}
			{{--<div class="event-rht">--}}
				 {{--<div id="gallery" style="display:none;">--}}

                    {{--<a href="#">--}}
                    {{--<img alt=""--}}
                         {{--src="{{url('img/most-viewed-1.jpg')}}"--}}
                         {{--data-image="{{url('img/most-viewed-1.jpg')}}"--}}
                         {{--data-description=""--}}
                         {{--style="display:none">--}}
                    {{--</a>--}}

                    {{--<a href="#">--}}
                    {{--<img alt=""--}}
                         {{--src="{{url('img/most-viewed-2.jpg')}}"--}}
                         {{--data-image="{{url('img/most-viewed-2.jpg')}}"--}}
                         {{--data-description=""--}}
                         {{--style="display:none">--}}
                    {{--</a>--}}
                    {{--<a href="#">--}}
                    {{--<img alt=""--}}
                         {{--src="{{url('img/most-viewed-3.jpg')}}"--}}
                         {{--data-image="{{url('img/most-viewed-3.jpg')}}"--}}
                         {{--data-description=""--}}
                         {{--style="display:none">--}}
                    {{--</a>--}}
                    {{--<a href="#">--}}
                    {{--<img alt=""--}}
                         {{--src="{{url('img/most-viewed-4.jpg')}}"--}}
                         {{--data-image="{{url('img/most-viewed-4.jpg')}}"--}}
                         {{--data-description=""--}}
                         {{--style="display:none">--}}
                    {{--</a>--}}
                    {{--<a href="#">--}}
                    {{--<img alt=""--}}
                         {{--src="{{url('img/most-viewed-5.jpg')}}"--}}
                         {{--data-image="{{url('img/most-viewed-5.jpg')}}"--}}
                         {{--data-description=""--}}
                         {{--style="display:none">--}}
                    {{--</a>--}}
                    {{--<a href="#">--}}
                    {{--<img alt=""--}}
                         {{--src="{{url('img/most-viewed-6.jpg')}}"--}}
                         {{--data-image="{{url('img/most-viewed-6.jpg')}}"--}}
                         {{--data-description=""--}}
                         {{--style="display:none">--}}
                    {{--</a>--}}
                    {{--<a href="#">--}}
                    {{--<img alt=""--}}
                         {{--src="{{url('img/most-viewed-1.jpg')}}"--}}
                         {{--data-image="{{url('img/most-viewed-1.jpg')}}"--}}
                         {{--data-description=""--}}
                         {{--style="display:none">--}}
                    {{--</a>--}}
                    {{--<a href="#">--}}
                    {{--<img alt=""--}}
                         {{--src="{{url('img/most-viewed-2.jpg')}}"--}}
                         {{--data-image="{{url('img/most-viewed-2.jpg')}}"--}}
                         {{--data-description=""--}}
                         {{--style="display:none">--}}
                    {{--</a>--}}
                    {{--<a href="#">--}}
                    {{--<img alt=""--}}
                         {{--src="{{url('img/most-viewed-3.jpg')}}"--}}
                         {{--data-image="{{url('img/most-viewed-3.jpg')}}"--}}
                         {{--data-description=""--}}
                         {{--style="display:none">--}}
                    {{--</a>--}}
                    {{--<a href="#">--}}
                    {{--<img alt=""--}}
                         {{--src="{{url('img/most-viewed-4.jpg')}}"--}}
                         {{--data-image="{{url('img/most-viewed-4.jpg')}}"--}}
                         {{--data-description=""--}}
                         {{--style="display:none">--}}
                    {{--</a>--}}
                    {{--<a href="#">--}}
                    {{--<img alt=""--}}
                         {{--src="{{url('img/most-viewed-5.jpg')}}"--}}
                         {{--data-image="{{url('img/most-viewed-5.jpg')}}"--}}
                         {{--data-description=""--}}
                         {{--style="display:none">--}}
                    {{--</a>--}}
					 {{--<a href="#">--}}
						 {{--<img alt=""--}}
							  {{--src="{{url('img/most-viewed-5.jpg')}}"--}}
							  {{--data-image="{{url('img/most-viewed-5.jpg')}}"--}}
							  {{--data-description=""--}}
							  {{--style="display:none">--}}
					 {{--</a>--}}
					 {{--<a href="#">--}}
						 {{--<img alt=""--}}
							  {{--src="{{url('img/most-viewed-5.jpg')}}"--}}
							  {{--data-image="{{url('img/most-viewed-5.jpg')}}"--}}
							  {{--data-description=""--}}
							  {{--style="display:none">--}}
					 {{--</a>--}}
					 {{--<a href="#">--}}
						 {{--<img alt=""--}}
							  {{--src="{{url('img/most-viewed-5.jpg')}}"--}}
							  {{--data-image="{{url('img/most-viewed-5.jpg')}}"--}}
							  {{--data-description=""--}}
							  {{--style="display:none">--}}
					 {{--</a>--}}
                {{--</div>--}}
			{{--</div>--}}

		{{--</div>--}}
	</div>
	<div class="container">
			<div class="section-header no-icon hide">
				<h1>Single Property</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec viverra erat. Aenean elit tellus mattis quis maximus et malesuada congue velit</p>
			</div>

			<!-- Main Description Box -->
			<div class="main-description-box">
				<!-- Property Description -->
				<div class="property-description-box">
				<div class="property-description">
				  <div class="row">
					<div class="col-sm-14">
						<div class="rating-box">
						  <i class="fa fa-star"></i>
						  <i class="fa fa-star"></i>
						  <i class="fa fa-star"></i>
						  <i class="fa fa-star"></i>
						  <i class="fa fa-star"></i>
						</div>
						<h4><% title %></h4>
					  <p class="address"><% address %></p>

					  <div class="services gap-top">
						<ul class="align-left">
						  <li class="bathrooms"><p>Bathrooms: <span><% bathroom %></span></p></li>
						  <li class="bedrooms"><p>Bedrooms: <span><% bedroom %></span></p></li>
						  <li class="area"><p>Area: <span><% area  %> </span> <span style="text-transform: uppercase;"> <% area_type %></span> </p></li>
						</ul>
					  </div>
					  <div class="text-description no-gap">
						<p><span class=""><% added_at %> Days on </span><span class="">Realtor</span></p>
						<p><% description %></p>
					  </div>
					</div>

					<div class="col-sm-10">
					  <div class="price">
						<p class="pull-right"><% price %> <span>for <% purpose %></span></p>
					  </div>
					 </div>
				  </div>

				</div>
				</div>
				<div class="row">
				  <div class="col-sm-12 col-md-12">
					<section class="double-gap-bottom ">
					  <h2 class="double-gap-bottom blue-border-bottom pad-bottom ">Features <span class="fs-18 color-gray1"> for  <% address %></span> </h2>
					  <p class="gap-bottom fs-18 color-gray1">Information last updated on <% update_date %> </p>
					  <div class="row no-gap feature-class">
						<div class="col-lg-8 fs-18">
						  <ul>
							<li>Price: <% price %></li>
							<li><% bedroom %> Bedroom</li>
							<li><% bathroom %> Bathroom</li>
							<li ng-class="park!=0 ? ' ' : 'feature-util-hide'">Parking</li>
							<li ng-class="ac!=0 ? ' ' : 'feature-util-hide'">Air Condition</li>
							<li ng-class="swim!=0 ? ' ' : 'feature-util-hide'">Swimming Pool</li>
							<li ng-class="balcony!=0 ? ' ' : 'feature-util-hide'">Balcony</li>
						  </ul>
						</div>
					  </div>
					</section>

					<!--<section class="double-gap-bottom ">
					  <h2 class="double-gap-bottom blue-border-bottom pad-bottom ">Popularity on Realtor</h2>
					  <div class="row no-gap">
						<div class="seller-metric col-sm-24 col-md-12 pull-left">
						  <div class="seller-metric-icon">1K</div>
						  <div class="seller-metric-text"><strong> Views since listing</strong><br> 1,452 all-time</div>
						</div>
						<div class="seller-metric col-sm-24 col-md-12 pull-left"><div class="seller-metric-icon">32</div>
						  <div class="seller-metric-text"><strong> Shoppers saved</strong><br> this home to their favorites</div></div></div>
					  <a class="button theme-button-2 gap-top" href="#"> Contact an agent </a>


					</section> -->

				  </div>
				  <div class="col-sm-114 col-md-12">
					<div class="map-info pull-right double-gap-bottom full">
					  <!-- <iframe width="" height="" frameborder="0" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d54447.26463684356!2d74.34649627986188!3d31.470450441588902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1454961823511" style="border:0" allowfullscreen="" class="pull-right signle-page-map"></iframe> -->
						<div id="property_map" class="pull-right signle-page-map"></div>
					</div>
					<!-- <div class="property-agent no-gap">
					  <div class="agent">
						<h2 class="caption">Contact the agent</h2>
						<p class="position">agent</p>

						<div class="image">
						  <a href="agent.html">
							<img alt="agent photo" src="img/agent-2.jpg">
						  </a>
						</div>

						<h3><a href="agent.html">Elias Doe</a></h3>

						<ul class="social-block">
						  <li><a href="single-full-width.html#"><i class="fa fa-facebook"></i></a></li>
						  <li><a href="single-full-width.html#"><i class="fa fa-twitter"></i></a></li>
						  <li><a href="single-full-width.html#"><i class="fa fa-linkedin-square"></i></a></li>
						</ul>

						<form class="simple-form">
						  <input type="text" placeholder="Full name" class="js-input">
						  <input type="text" placeholder="Email" class="js-input">
						  <input type="text" placeholder="Subject" class="js-input">
						  <textarea placeholder="Message" class="js-input"></textarea>
						  <button class="submit-btn">Write</button>
						</form>
					  </div>
					</div> -->
				  </div>
				</div>
				<div class="row">
					<div class="col-sm-14 col-md-16">
						<section class="double-gap-bottom ">
							<cd-school-list schoollist="schools" />
						</section>
					</div>

				</div>
			</div>
		</div>
	</section>
@endsection

@section('custom-scripts')
<script type="text/javascript">
	jQuery(document).ready(function(){
		jQuery("#gallery").unitegallery({
			theme_navigation_type:"arrows"
		});
	});
</script>
@endsection