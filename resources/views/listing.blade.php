@extends('layouts.default')

@section('content-wrapper')
  <div class="container">
    <div class="section-header no-pad-bottom">
      <h1>Listing</h1>

    </div>
   <section class="double-gap-bottom">
      <div class="row row-fit">
            <div class="box-caption">
              <h4>Search</h4>
              <p>Where are you looking?</p>
            </div>
        <div class="map-filter-box" ng-controller="listingController">
            <div class="search-class">
              <form class="submit-form" method="GET" name="searchForm" ng-submit="searchProperty()">
                <div class="select-box wd-80 pull-left">
                  <input class="filter-box-input js-input no-select drop-wd" type="text" id="purpose" readonly value="" placeholder="Buy" />
                  <ul>
                    <li>Rent</li>
                    <li>Sale</li>
                  </ul>
                </div>
                <input class="filter-box-input js-input no-select search-wd" id="search" type="text" value="" placeholder="Search Location..." />
                <div class="select-box wd-110 pull-left">
                  <input class="filter-box-input js-input no-select drop-wd" type="text" id="bedroom" readonly value="" placeholder="Bedrooms" />
                  <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                  </ul>
                </div>
                <div class="select-box wd-80 pull-left">
                  <input class="filter-box-input js-input no-select drop-wd" type="text" id="bathroom" readonly value="" placeholder="Baths" />
                  <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                  </ul>
                </div>
                <input type="hidden" id="search_lat" /> <input type="hidden" id="search_lng" />
                <input type="submit" class="button theme-button-1 update-properties" value="Search" />
              </form>
          </div>
          </div>
     <div class="search-gap"></div>
        <div class="col-md-24">
          <div class="listing-div">


            <div class="listing-style">
              <div class="list-property">
                <div class="cover list-img">
                  <a href="single-full-width.html">
                    <img alt="list property cover" src="img/my-properties-6.jpg">
                  </a>
                </div>
                <div class="list-content">
                  <div class="property-header">
                    <p class="price">$250 <span class="type">for rent</span></p>
                    <h2><a href="single-full-width.html">Grand hotel room</a></h2>
                    <p class="address">LA 325</p>
                  </div>

                  <div class="property-body">
                    <p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristique quam</p>

                    <ul class="post-meta">
                      <li class="area">
                        <span class="tool-tip"></span>
                        <span class="nr">100</span>
                      </li>
                      <li class="bedrooms">
                        <span class="tool-tip"></span>
                        <span class="nr">1</span>
                      </li>
                      <li class="bathrooms">
                        <span class="tool-tip"></span>
                        <span class="nr">1</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="listing-style">
              <div class="list-property">
                <div class="cover list-img">
                  <a href="single-full-width.html">
                    <img alt="list property cover" src="img/my-properties-6.jpg">
                  </a>
                </div>
                <div class="list-content">
                  <div class="property-header">
                    <p class="price">$250 <span class="type">for rent</span></p>
                    <h2><a href="single-full-width.html">Grand hotel room</a></h2>
                    <p class="address">LA 325</p>
                  </div>

                  <div class="property-body">
                    <p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristique quam</p>

                    <ul class="post-meta">
                      <li class="area">
                        <span class="tool-tip"></span>
                        <span class="nr">100</span>
                      </li>
                      <li class="bedrooms">
                        <span class="tool-tip"></span>
                        <span class="nr">1</span>
                      </li>
                      <li class="bathrooms">
                        <span class="tool-tip"></span>
                        <span class="nr">1</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="listing-style">
              <div class="list-property">
                <div class="cover list-img">
                  <a href="single-full-width.html">
                    <img alt="list property cover" src="img/my-properties-6.jpg">
                  </a>
                </div>
                <div class="list-content">
                  <div class="property-header">
                    <p class="price">$250 <span class="type">for rent</span></p>
                    <h2><a href="single-full-width.html">Grand hotel room</a></h2>
                    <p class="address">LA 325</p>
                  </div>

                  <div class="property-body">
                    <p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristique quam</p>

                    <ul class="post-meta">
                      <li class="area">
                        <span class="tool-tip"></span>
                        <span class="nr">100</span>
                      </li>
                      <li class="bedrooms">
                        <span class="tool-tip"></span>
                        <span class="nr">1</span>
                      </li>
                      <li class="bathrooms">
                        <span class="tool-tip"></span>
                        <span class="nr">1</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="listing-style">
              <div class="list-property">
                <div class="cover list-img">
                  <a href="single-full-width.html">
                    <img alt="list property cover" src="img/my-properties-6.jpg">
                  </a>
                </div>
                <div class="list-content">
                  <div class="property-header">
                    <p class="price">$250 <span class="type">for rent</span></p>
                    <h2><a href="single-full-width.html">Grand hotel room</a></h2>
                    <p class="address">LA 325</p>
                  </div>

                  <div class="property-body">
                    <p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristique quam</p>

                    <ul class="post-meta">
                      <li class="area">
                        <span class="tool-tip"></span>
                        <span class="nr">100</span>
                      </li>
                      <li class="bedrooms">
                        <span class="tool-tip"></span>
                        <span class="nr">1</span>
                      </li>
                      <li class="bathrooms">
                        <span class="tool-tip"></span>
                        <span class="nr">1</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="listing-style">
              <div class="list-property">
                <div class="cover list-img">
                  <a href="single-full-width.html">
                    <img alt="list property cover" src="img/my-properties-6.jpg">
                  </a>
                </div>
                <div class="list-content">
                  <div class="property-header">
                    <p class="price">$250 <span class="type">for rent</span></p>
                    <h2><a href="single-full-width.html">Grand hotel room</a></h2>
                    <p class="address">LA 325</p>
                  </div>

                  <div class="property-body">
                    <p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristique quam</p>

                    <ul class="post-meta">
                      <li class="area">
                        <span class="tool-tip"></span>
                        <span class="nr">100</span>
                      </li>
                      <li class="bedrooms">
                        <span class="tool-tip"></span>
                        <span class="nr">1</span>
                      </li>
                      <li class="bathrooms">
                        <span class="tool-tip"></span>
                        <span class="nr">1</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="listing-style">
              <div class="list-property">
                <div class="cover list-img">
                  <a href="single-full-width.html">
                    <img alt="list property cover" src="img/my-properties-6.jpg">
                  </a>
                </div>
                <div class="list-content">
                  <div class="property-header">
                    <p class="price">$250 <span class="type">for rent</span></p>
                    <h2><a href="single-full-width.html">Grand hotel room</a></h2>
                    <p class="address">LA 325</p>
                  </div>

                  <div class="property-body">
                    <p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristique quam</p>

                    <ul class="post-meta">
                      <li class="area">
                        <span class="tool-tip"></span>
                        <span class="nr">100</span>
                      </li>
                      <li class="bedrooms">
                        <span class="tool-tip"></span>
                        <span class="nr">1</span>
                      </li>
                      <li class="bathrooms">
                        <span class="tool-tip"></span>
                        <span class="nr">1</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="listing-style">
              <div class="list-property">
                <div class="cover list-img">
                  <a href="single-full-width.html">
                    <img alt="list property cover" src="img/my-properties-6.jpg">
                  </a>
                </div>
                <div class="list-content">
                  <div class="property-header">
                    <p class="price">$250 <span class="type">for rent</span></p>
                    <h2><a href="single-full-width.html">Grand hotel room</a></h2>
                    <p class="address">LA 325</p>
                  </div>

                  <div class="property-body">
                    <p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristique quam</p>

                    <ul class="post-meta">
                      <li class="area">
                        <span class="tool-tip"></span>
                        <span class="nr">100</span>
                      </li>
                      <li class="bedrooms">
                        <span class="tool-tip"></span>
                        <span class="nr">1</span>
                      </li>
                      <li class="bathrooms">
                        <span class="tool-tip"></span>
                        <span class="nr">1</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="listing-style">
              <div class="list-property">
                <div class="cover list-img">
                  <a href="single-full-width.html">
                    <img alt="list property cover" src="img/my-properties-6.jpg">
                  </a>
                </div>
                <div class="list-content">
                  <div class="property-header">
                    <p class="price">$250 <span class="type">for rent</span></p>
                    <h2><a href="single-full-width.html">Grand hotel room</a></h2>
                    <p class="address">LA 325</p>
                  </div>

                  <div class="property-body">
                    <p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristique quam</p>

                    <ul class="post-meta">
                      <li class="area">
                        <span class="tool-tip"></span>
                        <span class="nr">100</span>
                      </li>
                      <li class="bedrooms">
                        <span class="tool-tip"></span>
                        <span class="nr">1</span>
                      </li>
                      <li class="bathrooms">
                        <span class="tool-tip"></span>
                        <span class="nr">1</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
@endsection
