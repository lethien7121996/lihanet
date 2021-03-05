<?php
namespace App\Http\Controllers;
use App\Quanlysanluong;
use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\DB;
class QuanLySanLuongController extends Controller
{
    public function index()
    {
        $quanlysanluong = Quanlysanluong::with('childs')->get();
                            

        return $quanlysanluong->toJson();
    }
	 public function store(Request $request)
    {
  $validatedData = $request->validate([
            'parentId' => 'required',
            'tenchitieu' => 'required',
            'sanluong' => 'required',
            'dientich' => 'required',
            'donvi' => 'required',
            'thongtin' => 'required'
          ]);
  
          $quanlysanluong = Quanlysanluong::create([
            'parentId' => $validatedData['parentId'],
            'tenchitieu' => $validatedData['tenchitieu'],
            'sanluong' => $validatedData['sanluong'],
            'dientich' => $validatedData['dientich'],
            'donvi' => $validatedData['donvi'],
            'thongtin' => $validatedData['thongtin']
        
          ]);
     
      return response()->json('Biểu mãu đã tạo');
    }
    public function updatesanluong(Request $request, $ID)
    {
        DB::table('quanlysanluong')
        ->where('id', $ID)
        ->update([
         
            'sanluong' => $request->get('sanluong'),
          
            ]);
        return response()->json('Cập nhật kỳ báo cáo thành công');
    }
    public function updatedientich(Request $request, $ID)
    {
        DB::table('quanlysanluong')
        ->where('id', $ID)
        ->update([
         
            'dientich' => $request->get('dientich'),
          
            ]);
        return response()->json('Cập nhật kỳ báo cáo thành công');
    }
    public function destroy($id)
    {
      
      $quanlysanluong = Quanlysanluong::where('id',$id);
      $quanlysanluong->delete();

      return response()->json('Xóa thành công');
    }
    public function bieumautheoid($id)
    {
      $quanlysanluong = Quanlysanluong::where('id',$id)->first();

      return  $quanlysanluong->toJson();
    }
    public function bieumautheoidkybaocao($id)
    {
      $quanlysanluong = Quanlysanluong::where('idkybaocao',$id)->get();
                            

      return $quanlysanluong->toJson();
    }
    public function thongkesanluong()
    {
      $quanlysanluong = Quanlysanluong::select(DB::raw("SUM(sanluong) as tongsanluong"),DB::raw("SUM(dientich) as tongdientich"))->get();
                            

      return $quanlysanluong->toJson();
    }
}
