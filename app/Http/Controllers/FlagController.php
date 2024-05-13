<?php

namespace App\Http\Controllers;

use App\FlagModelType;
use App\FlagType;
use App\Models\Flag;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class FlagController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => [new Enum(FlagType::class), 'required'],
            'model' => [new Enum(FlagModelType::class), 'required'],
            'model_id' => 'nullable|integer',
        ]);
        if ($data) {

            $flag = new Flag();

            $flag->type = $data['type'];
            $flag->model = $data['model'];
            $flag->model_id = $data['model_id'];
            $flag->save();

            return response()->json([
                'success' => true,
            ]);
        }
        return redirect()->back()->withErrors($data);
    }

    public function destroy(Flag $flag) {
       $flag->delete();
       return response()->json([
           'success' => true,
       ]);
    }

}
