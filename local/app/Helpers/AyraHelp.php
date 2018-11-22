<?php
//app/Helpers/AyraHelp.php
namespace App\Helpers;
use Illuminate\Support\Facades\DB;
use App\User;
use Auth;
class AyraHelp {

    //this is used to get name of user
    public static function getEmail($user_id) {
        $user = DB::table('users')->where('id', $user_id)->first();

        return (isset($user->email) ? $user->email : '');
    }
    public static function getNewUserCount() {
        $user = DB::table('users')->where('is_read', '0')->get()->toArray();
    
        return count($user);
    }

   //this function is used to get baseurl and route path
   public static function getBaseURL(){
     return url('/');
   }
   public static function getRouteName(){
     $route_arr= explode(url('/')."/",url()->current());
     if(array_key_exists(1,$route_arr)){
     return $route_arr[1];
     }

   }

}
