import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import EditSanLuong from './EditSanLuong'
import EditDienTich from './EditDienTich'
class QuanLySanLuong extends Component {
  constructor () {
    super()

    this.state = {
        sanluonglist: [],
        parentId:'0',
        tenchitieu:'',
        sanluong:'0',
        donvi:'Ha',
        thongtin:'chưa có thông tin',
        updateid:'',
        tongsanluong: '',
        tongdientich: '',
        tongchitieu: ''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewSanLuong  = this.handleCreateNewSanLuong.bind(this)
    this.handleChiTietSanLuong  = this.handleChiTietSanLuong.bind(this)
    this.handleUpdateSanLuong  = this.handleUpdateSanLuong.bind(this)
    this.handleDeleteSanLuong  = this.handleDeleteSanLuong.bind(this)
    this.handleadd  = this.handleadd.bind(this)
    this.getChiTieuCon = this.getChiTieuCon.bind(this)
  }
  componentWillMount() {
    const scripts = [
      './public/app_assets/js/datatable/custom.js',
  ];
  const scripttag = document.getElementById("tagscripts");
  scripttag.innerHTML = '';
  scripts.forEach(s => {
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = s;
    script.async = true
    scripttag.appendChild(script);
  })
    axios.get('/Demo/lihanet/index.php/api/sanluong').then(response => {
        this.setState({
            sanluonglist: response.data
        })
      })
      axios.get('/Demo/lihanet/index.php/api/thongkesanluong').then(response => {
        this.setState({
            tongsanluong: response.data[0].tongsanluong,
            tongdientich: response.data[0].tongdientich,
            tongchitieu: Number(response.data[0].tongsanluong)*Number(response.data[0].tongdientich)
        })
      })
      
  }
  componentDidMount() {
    const scripts = [
        './public/app_assets/js/datatable/custom.js',
    ];
    const scripttag = document.getElementById("tagscripts");
    scripttag.innerHTML = '';
    scripts.forEach(s => {
      const script = document.createElement("script");
      script.type = 'text/javascript';
      script.src = s;
      script.async = false
      scripttag.appendChild(script);
    })
  }

  
  handleFieldChange (event) {
   

   var checkedArr = [];
   var value;
    if(event.target.type == 'checkbox')
    {
      
        const checkeds = document.getElementsByTagName('input');
        for (var i = 0; i < checkeds.length; i++) {
          if (checkeds[i].checked) {
            checkedArr.push(checkeds[i].value);
          }
        }
        value = checkedArr;
      this.setState({ [event.target.name]: value });
    }
    else if(event.target.type == 'file')
    {
    
      this.setState({
        [event.target.name]:event.target.files[0]
      })
    }
    else
    {
      this.setState({
        [event.target.name]: event.target.value
      })
      
    }
   
  }
  
  handleCreateNewSanLuong (event) {
    event.preventDefault()

    const { history } = this.props

    const sanluong = {
        parentId: this.state.parentId,
        tenchitieu: this.state.tenchitieu,
        sanluong: this.state.sanluong,
        donvi: this.state.donvi,
        thongtin: this.state.thongtin
    }
    console.log(sanluong);
    axios.post('/Demo/lihanet/index.php/api/sanluong', sanluong)
      .then(response => {
        // redirect to the homepage
        axios.get('/Demo/lihanet/index.php/api/sanluong').then(response => {
            this.setState({
                sanluonglist: response.data
            })
          })
        var button = document.getElementById('btn-end')
        button.click()
        document.getElementById("recipient-name1").value = ""
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        var button = document.getElementById('btn-end')
        button.click()
      })
  }
  handleDeleteSanLuong(event)
  {
      event.preventDefault()
      let idbieumau=event.target.attributes.getNamedItem('data-id').value

      axios.get('/Demo/lihanet/index.php/api/bieumaudelete/'+idbieumau)
      .then(response => {
        // redirect to the homepage
        axios.get('/Demo/lihanet/index.php/api/bieumau').then(response => {
            this.setState({
                bieumau: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietSanLuong(event)
  {
    event.preventDefault()
    
    
    let idpc=event.target.attributes.getNamedItem('data-idbieumau').value
    axios.get('/Demo/lihanet/index.php/api/bieumautheoid/'+idpc).then(response => {
      
      document.getElementById("updatesohieu").value = response.data["sohieu"]
      document.getElementById("updatetenbieumau").value = response.data["tenbieumau"]
      document.getElementById("updateloaisolieu").value = response.data["loaisolieu"]
      document.getElementById("updatenamnhap").value = response.data["namnhap"]
      document.getElementById("updateidkybaocao").value = response.data["idkybaocao"]
      document.getElementById("updateid").value = response.data["id"]
      var selectbl=document.getElementById("updatekybaocaoselect").childNodes;
      for(var i = 0; i < selectbl.length; i++) {
        var datadv=selectbl[i].value;
        if(datadv==response.data["idkybaocao"])
        {
           selectbl[i].setAttribute('selected', true);
        }
       }
     
   
      this.setState({
        sohieu: response.data["sohieu"],
        tenbieumau: response.data["tenbieumau"],
        loaisolieu: response.data["loaisolieu"],
        namnhap: response.data["namnhap"],
        idkybaocao: response.data["idkybaocao"],
        updateid: response.data["ID"]
      })
    })
  }
  handleUpdateSanLuong(event)
  {
    event.preventDefault()
     const bieumauupdate = {
        sohieu: this.state.sohieu,
        tenbieumau: this.state.tenbieumau,
        loaisolieu: this.state.loaisolieu,
        namnhap: this.state.namnhap,
        idkybaocao: this.state.idkybaocao,
      }
      console.log(kybaocaoupdate);
      axios.post('/Demo/lihanet/index.php/api/bieumauupdate/'+this.state.updateid,bieumauupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/Demo/lihanet/index.php/api/bieumau').then(response => {
            this.setState({
              bieumau: response.data
            })
          })
          var button = document.getElementById('btn-ends')
          button.click()
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        var button = document.getElementById('btn-ends')
        button.click()
      })
      
    
  }
  handleadd(event){
    var idkbc=event.target.getAttribute("data-kbc")
    var selectbl=document.getElementById("kybaocaoselect").childNodes;
    for(var i = 0; i < selectbl.length; i++) {
      var datadv=selectbl[i].value;
      if(datadv==idkbc)
      {
         selectbl[i].setAttribute('selected', true);
      }
     }
     this.setState({
       idkybaocao: idkbc
     })
  }
  getChiTieuCon(event)
  {     
    var idcha=event.target.getAttribute("data-id")
    this.state.sanluonglist.map(cd =>{
        if(cd.parentId==idcha)
        {
            return (
<tr><td onClick={this.getChiTieuCon}>{cd.tenchitieu}</td><td>{cd.sanluong}</td><td>{cd.donvi}</td><td>{cd.thongtin}</td></tr>
            )
        }
       
          
      })

      
  }
render () {
const { sanluonglist,tongsanluong,tongdientich,tongchitieu } = this.state;

return (
  
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box quanlybieu">
        <h3 className="box-title">QUẢN LÝ SẢN LƯỢNG
</h3>

  <div className="row">
  
  <div className="col-sm-12 m-b-40">
    <div className="col-sm-4"><h2>Tổng sản lượng : <span id="tongsanluong">{tongsanluong}</span> (Tạ)</h2></div>
    <div className="col-sm-4"><h2>Tổng diện tích : <span id="tongdientich">{tongdientich}</span> (Ha)</h2></div>
    <div className="col-sm-4"><h2>Chỉ tiêu lúa hằng năm : <span id="tongchitieu">{tongchitieu}</span> (Ta/Ha)</h2></div>
    </div>
    <div className="col-sm-12">
   
 
      <div className="table-responsive">
        <table className="table color-table primary-table" >
          <thead key="thead">
            <tr>
              <th className="textleftpa">Tên chỉ tiêu</th>
              <th className="textleftpa">Sản lượng</th>
              <th className="textleftpa">Diện tích</th>
              <th className="textleftpa">Đơn vị</th>
              <th className="textleftpa">Thông tin</th>
              <th className="icon-list-demo btnaddthem"></th>
           
            </tr>
          </thead>
       
          <tbody key="tbody" id="tablesanluong">
            

                
             
                       
                       
                        
                      
                       
                        {sanluonglist.map((cd,i) =>(
                             
                            <tr data-idcha={cd.parentId}>
                                <td onClick={this.getChiTieuCon} data-id={cd.id}>{cd.tenchitieu}</td>
                                <td className="colsl"><EditSanLuong idtt={i} idsl={cd.id} value={cd.sanluong}/></td>
                                <td className="coldt"><EditDienTich idtt={i} idsl={cd.id} value={cd.dientich}/></td>
                                <td>{cd.donvi}</td>
                                <td>{cd.thongtin}</td>
                            </tr>
                            
                             
                                
                            ))}
         
         <tr className="hidden">
                                <td data-id={11}>ẩn</td>
                                <td className="colsl"><EditSanLuong idtt={11} idsl={11} value={0}/></td>
                                <td className="coldt"><EditDienTich idtt={11} idsl={11} value={0}/></td>
                                <td></td>
                                <td></td>
                            </tr>
                    
                  
            
        
         

           
          </tbody>
        </table>
      </div>
    
  </div>
</div>
      </div>
    </div>
    <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">Thêm Mới Sản lượng</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewSanLuong}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên chỉ tiêu</label>
              <input type="text" className="form-control" name="tenchitieu" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Sản lượng</label>
              <input type="text" className="form-control" name="sanluong" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Đơn vị</label>
              <input type="text" className="form-control" name="donvi" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Thông tin</label>
              <input type="text" className="form-control" name="thongtin" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Chỉ tiêu cha</label>
                        <select className="form-control" name="parentId" id="kybaocaoselect" onChange={this.handleFieldChange}>
                        <option value="0">Chọn chỉ tiêu cha</option>
                        {sanluonglist.map(cd => ( 
                            <option key={cd.id} value={cd.id}>{cd.tenchitieu}</option>
                        ))}
                          
                         
                    </select>
                        </div>
                  </div>
         
              </div>
            <div className="modal-footer">
          <button type="button" id="btn-end" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
          <button type="submit" className="btn btn-primary" >LƯU LẠI</button>
        </div>
          </form>
        </div>
       
      </div>
    </div>
  </div>
  <div className="modal fade" id="exampleModal1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật Biểu Mẫu</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateBieuMau}>
          <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Số Hiệu</label>
              <input type="text" className="form-control" name="sohieu" id="updatesohieu" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên Biểu Mẫu</label>
              <input type="text" className="form-control" name="tenbieumau" id="updatetenbieumau" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Loại Số Liệu</label>
              <input type="text" className="form-control" name="loaisolieu" id="updateloaisolieu" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Năm Nhập</label>
              <input type="text" className="form-control" name="namnhap" id="updatenamnhap" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Kỳ báo cáo</label>
                        <select className="form-control" name="idkybaocao" id="updatekybaocaoselect" onChange={this.handleFieldChange}>
                        <option value="0">Chọn kỳ báo cáo</option>
                        {sanluonglist.map(cd => ( 
                            <option key={cd.ID} value={cd.id}>{cd.tenchitieu}</option>
                        ))}
                          
                         
                    </select>
                        </div>
                  </div>
         
              </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">ID:</label>
              <input className="form-control" id="updateid" name="updateid" onChange={this.handleFieldChange} />
            </div>
            <div className="modal-footer">
          <button type="button" id="btn-ends" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
          <button type="submit" className="btn btn-primary" >LƯU LẠI</button>
        </div>
          </form>
        </div>
       
      </div>
    </div>
  </div>
  </div>
  )
}
}

export default QuanLySanLuong