<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Theme;
use Auth;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('guest');
    }
    
//this controller is used for indentify users

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $aj="981144";

       //$users = User::role('admin')->get();
       $userRoles=[];
       if (Auth::user()) {   // Check is user logged in
        $user = auth()->user();
        $userRoles = $user->getRoleNames();
        $user_role = $userRoles[0];
       }else{
        $user_role='GUEST';
       }



       switch($user_role){
        case 'Admin':
        return $this->AdminDashboard();
        break;
        case 'User':

        return $this->UserDashboard();
        break;

        default:
        return $this->Front();
        break;
       }


        //return view('home');
    }
    public function AdminDashboard(){
        $theme = Theme::uses('admin')->layout('layout');
        $data = ['info' => 'Hello World'];
        return $theme->scope('index', $data)->render();
    }
    public function UserDashboard(){

        $theme = Theme::uses('users')->layout('layout');
        $data = ['info' => 'Hello World'];
        return $theme->scope('index', $data)->render();
    }
    public function Front(){
        $theme = Theme::uses('default')->layout('layout');
        $data = ['info' => 'Hello World'];
        return $theme->scope('index', $data)->render();
    }

    public function update_data(Request $request){
      $name=$request->name;
      User::where('id', 1)
          ->update(['name' => $name]);


    }

}
