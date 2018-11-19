<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Theme;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
       //$users = User::role('admin')->get(); 
       $user = auth()->user();
       $userRoles = $user->getRoleNames();
       switch($userRoles[0]){
        case 'Admin': 
        return $this->AdminDashboard();
        break;
        case 'User': 
        return $this->UserDashboard();
        break;
        
        default:     
        echo "Default User";
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
    
}
