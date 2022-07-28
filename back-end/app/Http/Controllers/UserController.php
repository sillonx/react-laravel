<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cookie;
use Auth;
use DB;

class UserController extends Controller {
    
    public function register(Request $request) {

        $validator = Validator::make($request->all(),[
            'name' => 'required|string|min:4',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'role_id' => 'required|string'
        ]);
        
        if($validator->fails()){
            return Response()->json([
                'message' => 'Registration failed' 
            ], 400);
        }
        
        $role = DB::table('roles')->select('id')->where('public',$request->input('role_id'))->first()->id;

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'role_id' => $role
        ]);

        return Response()->json([
            'message' => 'Registration successful'
        ], 200);
    }
    
    public function login(Request $request) {
        
        if(!Auth::attempt($request->only(['email', 'password']))){
        
            return Response()->json([
                'message' => 'Login failed'  
            ], 401);
        }
        
        $user = Auth::user();
        
        $token = $user->createToken('token')->plainTextToken;

        if ($request->remember) {
            $cookie = cookie('jwt', $token, 60*24*365); // one year
        }
        else {
            $cookie = cookie('jwt', $token, 60); // one hour
        }

        return Response()->json([   
            'message' => 'Login successful',
            'user' => $user,
            'permissions' => ['admin','user']
        ], 200)->withCookie($cookie);
    }

    public function logout() {

        $cookie = Cookie::forget('jwt');

        return Response()->json([
            'message' => 'Logout successful'
        ], 200)->withCookie($cookie);
    }

    // Donner age au token
    public function verify(Request $request) {

        if ($request->hasCookie('jwt') != false) {
            [$id, $token] = explode('|', $request->cookie('jwt'), 2);
            $accessToken = DB::table('personal_access_tokens')->where('id', $id)->first();
            if (hash_equals($accessToken->token, hash('sha256', $token))) {
                $user = DB::table('Users')->select('name','email','created_at')->where('id', $accessToken->tokenable_id)->first();
                return Response()->json([
                    'message' => 'Valid token',
                    'user' => $user,
                    'permissions' => ['admin','user']
                ], 200);
            }
            else {
                return Response()->json([
                    'message' => 'Token is invalid'
                ], 401);
            }
        }
        else {
            return Response()->json([
                'message' => 'No token was found'
            ], 400);
        }
    }
}