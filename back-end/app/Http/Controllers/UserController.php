<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
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

        $role = DB::table('roles')->select('public')->where('id',$user->role_id)->first()->public;

        return Response()->json([   
            'message' => 'Login successful',
            'user' => $user,
            'accessToken' => $token,
            'role' => $role
        ], 200);
    }
}
