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
                <div ng-controller="userController as vm" class="tabs-body plan-outter-div" >
                    <h1 class="padded">Select Plan</h1>
                    <div ng-if="vm.planList" class="plan" ng-repeat="plan in vm.planList" ng-cloak="" >
                        <h1 class="title"><% plan.name %></h1>
                        <div class="plan-price">
                            <p class="no-gap"><% plan.price %></p></div>

                        <div class="row no-gap padded">
                            <p class="plan-text"><% plan.summery %>
                                <?php
                                if(Session::has('username')){
                                    ?>
                                <a  href="javascript:;" class="plan-btn" ng-click="vm.changePlan(plan.id)">Select Plan</a>
                                <?php } ?>
                        </div>
                    </div>

                    <div class="payment-gatway" ng-if="vm.paymentGateway">
                        <div style="margin-top: 25px" class="main-content">
                            <h3>Payment GateWay</h3>
                            <div class="form-outter">
                                <form class="submit-form" method="POST" name="paymentForm" id="paymentForm" ng-submit="vm.paymentMethod()">
                                    <div ng-class="vm.paymentStatus ? 'alert-success' : 'alert-danger'" id="success_alert"><% vm.msg %></div>
                                    <div class="row no-gap">
                                        <lable class="lable-style">Name</lable>
                                        <input type="text" placeholder="Name">
                                    </div>
                                    <div class="row no-gap">
                                        <lable class="lable-style">Email</lable>
                                        <input type="text" placeholder="Email">
                                    </div>
                                    <div class="row no-gap">
                                        <lable class="lable-style">Card Number</lable>
                                        <input type="text" placeholder="Card Number">
                                    </div>
                                    <div class="row no-gap">
                                        <input type="submit" class="button theme-button-2 pull-right" value="Payment">
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </section>

@endsection