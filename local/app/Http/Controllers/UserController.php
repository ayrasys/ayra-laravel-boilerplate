<?php


namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Spatie\Permission\Models\Role;
use DB;
use Hash;
use Theme;
use Auth;
use App\Helpers\AyraHelp;
use Illuminate\Support\Facades\Redis;
class UserController extends Controller
{

    public function __construct()
    {
        //$this->middleware('auth');
    }
    public function getUsersList(Request $request){
             
    $users_arr=User::orderBy('id', 'desc')->get();
    $data_arr = array();
    $i=0;
   foreach ($users_arr as $key => $value) {
$i++;
    $data_arr[]=array(
      'id' => $i,
      'name' => $value->name,
      'email' => $value->email,
      'role' =>  $value->getRoleNames()[0],
      'status' =>  $value->status
      
    );
  }
  $resp_jon= json_encode($data_arr);
  $data = $alldata = json_decode($resp_jon);

  $datatable = array_merge(['pagination' => [], 'sort' => [], 'query' => []], $_REQUEST);

  // search filter by keywords
  $filter = isset($datatable['query']['generalSearch']) && is_string($datatable['query']['generalSearch'])
      ? $datatable['query']['generalSearch'] : '';
  if ( ! empty($filter)) {
      $data = array_filter($data, function ($a) use ($filter) {
          return (boolean)preg_grep("/$filter/i", (array)$a);
      });
      unset($datatable['query']['generalSearch']);
  }

  // filter by field query
  $query = isset($datatable['query']) && is_array($datatable['query']) ? $datatable['query'] : null;
  if (is_array($query)) {
      $query = array_filter($query);
      foreach ($query as $key => $val) {
          $data = list_filter($data, [$key => $val]);
      }
  }

  $sort  = ! empty($datatable['sort']['sort']) ? $datatable['sort']['sort'] : 'asc';
  $field = ! empty($datatable['sort']['field']) ? $datatable['sort']['field'] : 'id';

  $meta    = [];
  $page    = ! empty($datatable['pagination']['page']) ? (int)$datatable['pagination']['page'] : 1;
  $perpage = ! empty($datatable['pagination']['perpage']) ? (int)$datatable['pagination']['perpage'] : -1;

  $pages = 1;
  $total = count($data); // total items in array

  // sort
  usort($data, function ($a, $b) use ($sort, $field) {
      if ( ! isset($a->$field) || ! isset($b->$field)) {
          return false;
      }

      if ($sort === 'asc') {
          return $a->$field > $b->$field ? true : false;
      }

      return $a->$field < $b->$field ? true : false;
  });

  // $perpage 0; get all data
  if ($perpage > 0) {
      $pages  = ceil($total / $perpage); // calculate total pages
      $page   = max($page, 1); // get 1 page when $_REQUEST['page'] <= 0
      $page   = min($page, $pages); // get last page when $_REQUEST['page'] > $totalPages
      $offset = ($page - 1) * $perpage;
      if ($offset < 0) {
          $offset = 0;
      }

      $data = array_slice($data, $offset, $perpage, true);
  }

  $meta = [
      'page'    => $page,
      'pages'   => $pages,
      'perpage' => $perpage,
      'total'   => $total,
  ];


  // if selected all records enabled, provide all the ids
  if (isset($datatable['requestIds']) && filter_var($datatable['requestIds'], FILTER_VALIDATE_BOOLEAN)) {
      $meta['rowIds'] = array_map(function ($row) {
          return $row->id;
      }, $alldata);
  }


  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

  $result = [
      'meta' => $meta + [
              'sort'  => $sort,
              'field' => $field,
          ],
      'data' => $data,
  ];

  echo json_encode($result, JSON_PRETTY_PRINT);

    }
    /**
     * show user home
     */
    public function getUserDashboard(Request $request){
        $slug_name = $request->slug;
        $users = Auth::user();
        $email=AyraHelp::getEmail(Auth::user()->id);
        if($users->slug==$slug_name){
            $theme = Theme::uses('userdashboard')->layout('layout');
            $data = ['info' => 'Hello World'];
            return $theme->scope('index', $data)->render();
        }else{

          // $value = config('ayra.sex'); //custom call of config file this ways
          // echo "<pre>";
          // print_r($value);
          // die;
          abort(404);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){

   if ($users = Redis::get('users.all')) {
  $users_data=$users;
  }else{

  $users = User::get();
  Redis::set('users.all', $users);
  $users_data=$users;

  }


   $theme = Theme::uses('admin')->layout('layout');
   $data = ['data' =>$users_data];
   return $theme->scope('users.index', $data)->render();




    }
    public function index_(Request $request)
    {
        $data = User::orderBy('id','DESC')->paginate(5);
        return view('users.index',compact('data'))
            ->with('i', ($request->input('page', 1) - 1) * 5);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $roles = Role::pluck('name','name')->all();
        $theme = Theme::uses('admin')->layout('layout');
        $data = ['roles' => $roles];
        return $theme->scope('users.create', $data)->render();
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|same:confirm-password',
            'roles' => 'required'
        ]);


        $input = $request->all();
        $input['password'] = Hash::make($input['password']);


        $user = User::create($input);
        $user->assignRole($request->input('roles'));


        return redirect()->route('users.index')
                        ->with('success','User created successfully');
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);

        $theme = Theme::uses('admin')->layout('layout');
        $data = ['user' => $user];
        return $theme->scope('users.show', $data)->render();

    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::find($id);
        $roles = Role::pluck('name','name')->all();
        $userRole = $user->roles->pluck('name','name')->all();


      //  return view('users.edit',compact('user','roles','userRole'));

        $theme = Theme::uses('admin')->layout('layout');
        $data = [
          'user' => $user,
            'roles' => $roles,
              'userRole' => $userRole
        ];
        return $theme->scope('users.edit', $data)->render();

    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$id,
            'password' => 'same:confirm-password',
            'roles' => 'required'
        ]);


        $input = $request->all();
        if(!empty($input['password'])){
            $input['password'] = Hash::make($input['password']);
        }else{
            $input = array_except($input,array('password'));
        }


        $user = User::find($id);
        $user->update($input);
        DB::table('model_has_roles')->where('model_id',$id)->delete();


        $user->assignRole($request->input('roles'));


        return redirect()->route('users.index')
                        ->with('success','User updated successfully');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::find($id)->delete();
        return redirect()->route('users.index')
                        ->with('success','User deleted successfully');
    }
}
