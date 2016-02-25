<?php
namespace App\Providers;
use Illuminate\Support\ServiceProvider;
use GuzzleHttp\Client;
class GuzzleServiceProvider extends ServiceProvider{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register(){
        \Log::info('guzzle registered');
        $this->app->bind('Guzzle\Http\Client;', function ($app) {
            $client = new Client([
                // Base URI is used with relative requests
                'base_uri' => 'https://www.google.com.pk',
                'verify' => false
            ]);
            $client->setDefaultOption(
                'verify', false
            );
            return $client;
        });
    }
}
