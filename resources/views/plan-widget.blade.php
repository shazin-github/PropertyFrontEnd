@extends('layouts.default')

@section('content-wrapper')
    <section class="user-account-section">
        <div class="container">
            <div class="user-account-tabs">
                <!-- Menu Controlls -->
                <ul class="heading">
                    {{--<li><a class="profile" href="{{ URL::to('my-profile/') }}"><span>My Profile</span></a></li>--}}
                    {{--<li><a class="submit "  href="{{ URL::to('#/submit') }}"  ><span>Submit new property</span></a></li>--}}
                    {{--<li><a class="properties" href="{{ URL::to('#/properties')}}"><span>My Properties</span></a></li>--}}

                </ul>

                <!-- Body -->
                <div ng-controller="userController as vm" class="tabs-body plan-outter-div">
                    <h1 class="padded">Select Plan</h1>
                    <div ng-if="vm.planList" class="plan" ng-repeat="plan in vm.planList">
                        <h1 class="title"><% plan.name %></h1>
                        <div class="plan-price">
                            <p class="no-gap"><% plan.price %></p></div>

                        <div class="row no-gap padded">
                            <p class="plan-text"><% plan.summery %> <a href="javascript:;" class="plan-btn">Select Plan</a>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </section>

@endsection