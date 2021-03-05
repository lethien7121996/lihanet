<?php

namespace App\Http\Controllers;
use App\Kybaocao;
use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\DB;
class KyBaoCaoController extends Controller
{
    public function index()
    {
        $kybaocao = Kybaocao::all();
                            

        return $kybaocao->toJson();
    }
	 public function store(Request $request)
    {
  $validatedData = $request->validate([
            'tenkybaocao' => 'required',
          ]);
  
          $kybaocao = Kybaocao::create([
            'tenkybaocao' => $validatedData['tenkybaocao'],
        
          ]);
     
      return response()->json('Kỳ báo cáo đã tạo');
    }
    public function update(Request $request, $ID)
    {
        DB::table('kybaocao')
        ->where('ID', $ID)
        ->update([
            'tenkybaocao' => $request->get('tenkybaocao')
            ]);
        return response()->json('Cập nhật kỳ báo cáo thành công');
    }
    public function destroy($id)
    {
      
      $kybaocao = Kybaocao::where('ID',$id);
      $kybaocao->delete();

      return response()->json('Xóa thành công');
    }
    public function kybaocaotheoid($id)
    {
      $kybaocao = Kybaocao::where('ID',$id)->first();

      return  $kybaocao->toJson();
    }
}
