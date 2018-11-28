<?php


namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use DB;
use Theme;
use Auth;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
         // $this->middleware('permission:role-list');
         // $this->middleware('permission:get_role_index');
         // $this->middleware('permission:role-create', ['only' => ['create','store']]);
         // $this->middleware('permission:role-edit', ['only' => ['edit','update']]);
         // $this->middleware('permission:role-delete', ['only' => ['destroy']]);
    }


    public function getRolesList(Request $request){

    $users_arr=Role::orderBy('id', 'desc')->get();
    $data_arr = array();
    $i=0;
   foreach ($users_arr as $key => $value) {
     $i++;


    $data_arr[]=array(
      'id' => $i,
      'rowid' => $value->id,
      'name' =>  $value->name

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

     public function getRolesDetails(Request $request)
     {
         $roles_arr=Role::where('id', $request->user_id)->first();
         $permission_arr=Permission::get();
         return  array(
            'roles' =>$roles_arr ,
            'permission' =>$permission_arr ,
            'authid' =>15,
          );
     }
     public function deleteRoles()
     {
        echo "it is accessible";
     }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      $roles = Role::orderBy('id','DESC');
      $theme = Theme::uses('admin')->layout('layout');
      $data = ['roles' =>$roles];
      return $theme->scope('roles.index', $data)->render();

        // $roles = Role::orderBy('id','DESC')->paginate(5);
        // return view('roles.index',compact('roles'))
        //     ->with('i', ($request->input('page', 1) - 1) * 5);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $permission = Permission::get();
        $theme = Theme::uses('admin')->layout('layout');
        $data = ['permission' => $permission];
        return $theme->scope('roles.create', $data)->render();

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
            'name' => 'required|unique:roles,name',
            'permission' => 'required',
        ]);


        $role = Role::create(['name' => $request->input('name')]);
        $role->syncPermissions($request->input('permission'));


        return redirect()->route('roles.index')
                        ->with('success','Role created successfully');
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $role = Role::find($id);
        $rolePermissions = Permission::join("role_has_permissions","role_has_permissions.permission_id","=","permissions.id")
            ->where("role_has_permissions.role_id",$id)
            ->get();


        return view('roles.show',compact('role','rolePermissions'));
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $role = Role::find($id);
        $permission = Permission::get();
        $rolePermissions = DB::table("role_has_permissions")->where("role_has_permissions.role_id",$id)
            ->pluck('role_has_permissions.permission_id','role_has_permissions.permission_id')
            ->all();
        return view('roles.edit',compact('role','permission','rolePermissions'));
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
            'permission' => 'required',
        ]);


        $role = Role::find($id);
        $role->name = $request->input('name');
        $role->save();


        $role->syncPermissions($request->input('permission'));


        return redirect()->route('roles.index')
                        ->with('success','Role updated successfully');
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table("roles")->where('id',$id)->delete();
        return redirect()->route('roles.index')
                        ->with('success','Role deleted successfully');
    }
}
