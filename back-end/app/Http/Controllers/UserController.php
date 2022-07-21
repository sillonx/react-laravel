<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Auth;

class UserController extends Controller {
    
    public function register(Request $request) {
    
        $validator = Validator::make($request->all(),[
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8'
        ]);
        
        if($validator->fails()){
            return Response()->json([
                'message' => 'Registration failed' 
            ], 400);
        }
        
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password'))
        ]);

        return Response()->json([
            'message' => 'Registration successful',
        ], 200);
    }
    
    public function login (Request $request) {
        
        if(!Auth::attempt($request->only(['email', 'password']))){
        
            return Response()->json([
                'message' => 'Login failed',            
            ], 401);
        }
        
        $user = Auth::user();
            
        $token = $user->createToken('token')->plainTextToken;
        $roles = $user->roles();

        return Response()->json([   
            'message' => 'Login successful',
            'user' => $user,
            'roles' => $roles,
            'accessToken' => $token
        ], 200);
    
    }
}
