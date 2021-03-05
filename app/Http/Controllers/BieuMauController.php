<?php

namespace App\Http\Controllers;
use App\Bieumau;
use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\DB;
class BieuMauController extends Controller
{
    public function index()
    {
        $bieumau = Bieumau::all();
                            

        return $bieumau->toJson();
    }
	 public function store(Request $request)
    {
  $validatedData = $request->validate([
            'sohieu' => 'required',
            'tenbieumau' => 'required',
            'loaisolieu' => 'required',
            'namnhap' => 'required',
            'idkybaocao' => 'required'
          ]);
  
          $bieumau = Bieumau::create([
            'sohieu' => $validatedData['sohieu'],
            'tenbieumau' => $validatedData['tenbieumau'],
            'loaisolieu' => $validatedData['loaisolieu'],
            'namnhap' => $validatedData['namnhap'],
            'idkybaocao' => $validatedData['idkybaocao']
        
          ]);
     
      return response()->json('Biểu mãu đã tạo');
    }
    public function update(Request $request, $ID)
    {
        DB::table('bieumau')
        ->where('id', $ID)
        ->update([
            'sohieu' => $request->get('sohieu'),
            'tenbieumau' => $request->get('tenbieumau'),
            'loaisolieu' => $request->get('loaisolieu'),
            'namnhap' => $request->get('namnhap'),
            'idkybaocao' => $request->get('idkybaocao')
            ]);
        return response()->json('Cập nhật kỳ báo cáo thành công');
    }
    public function destroy($id)
    {
      
      $bieumau = Bieumau::where('id',$id);
      $bieumau->delete();

      return response()->json('Xóa thành công');
    }
    public function bieumautheoid($id)
    {
      $bieumau = Bieumau::where('id',$id)->first();

      return  $bieumau->toJson();
    }
    public function bieumautheoidkybaocao($id)
    {
      $bieumau = Bieumau::where('idkybaocao',$id)->get();
                            

      return $bieumau->toJson();
    }
}
