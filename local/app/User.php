<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Eloquent;
use Illuminate\Database\Eloquent\SoftDeletes;
use \Cache;
// use Illuminate\Foundation\Auth\User as Authenticatable;

use Illuminate\Auth\Authenticatable as AuthenticableTrait;

class User extends Authenticatable
{
    use Notifiable;
    use HasRoles;
    use AuthenticableTrait;
    use HasSlug;
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username','name', 'email', 'password','provider','provider_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('username')
            ->saveSlugsTo('slug');
    }
    public function isOnline()
    {
        return Cache::has('user-is-online-' . $this->id);
    }
}
