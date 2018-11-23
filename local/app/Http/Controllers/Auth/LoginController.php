<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Socialite;
use App\User;
use Auth;
class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
    /*
    public function socialLogin($social){
        return Socialite::driver($social)->redirect();        
    }
    public function handleProviderCallback($social){
       echo "<pre>";
       $userSocial=Socialite::driver($social)->user();
       print_r($userSocial);
       die;

       $user = User::where(['email' => $userSocial->getEmail()])->first();
       if($user){
         Auth::login($user);
         return redirect()->action('HomeController@index');

       }else{
         User::create([
            'name' =>$userSocial->getName(),
            'email' => $userSocial->getName(),
            'password' => Hash::make($data['password']),
        ]);

        //return view('auth.register',['name' => $userSocial->getName(), 'email' => $userSocial->getEmail()]);       

       }
    }
*/
    public function socialLogin($social)
    {
        return Socialite::driver($social)->redirect();
    }
    public function handleProviderCallback($social)
    {
        $user = Socialite::driver($social)->user();

        $authUser = $this->findOrCreateUser($user, $social);
        Auth::login($authUser, true);

        return redirect($this->redirectTo);
    }
    public function findOrCreateUser($user, $provider)
    {
        $authUser = User::where('provider_id', $user->id)->first();
        if ($authUser) {
	
            return $authUser;
        }
        $user =User::create([
            'name'     => $user->name,
            'email'    => $user->email,
            'provider' => $provider,
            'provider_id' => $user->id
        ]);
        $user->assignRole('User');
	
    }


}
