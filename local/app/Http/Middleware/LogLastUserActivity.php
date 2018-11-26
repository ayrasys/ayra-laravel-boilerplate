<?php

namespace App\Http\Middleware;
use Auth;
use Closure;
use Carbon\Carbon;
use \Cache;
class LogLastUserActivity
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
      if(Auth::check()) {
        $expiresAt = Carbon::now()->addMinutes(1);
        Cache::put('user-is-online-' . Auth::user()->id, true, $expiresAt);
      }
      return $next($request);
    }
}
