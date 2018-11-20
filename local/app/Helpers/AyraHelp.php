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


}

