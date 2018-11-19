<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
class Permission extends \Spatie\Permission\Models\Permission
{
    public static function defaultPermissions()
    {
        return [           
            'viewPost',
            'addPost',
            'editPost',
            'deletePost',
            'role-list',
           'role-create',
           'role-edit',
           'role-delete',
           'product-list',
           'product-create',
           'product-edit',
           'product-delete'
        ];
    }
}