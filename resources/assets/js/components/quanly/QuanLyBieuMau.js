import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class QuanLyBieuMau extends Component {
  constructor () {
    super()

    this.state = {
        kybaocao: [],
        bieumau: [],
        sohieu:'',
        tenbieumau:'',
        loaisolieu:'',
        namnhap:'',
        idkybaocao:'',
        updateid:'',
        
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewBieuMau  = this.handleCreateNewBieuMau.bind(this)
    this.handleChiTietBieuMau  = this.handleChiTietBieuMau.bind(this)
    this.handleXemBieuMau  = this.handleXemBieuMau.bind(this)
    this.handleUpdateBieuMau  = this.handleUpdateBieuMau.bind(this)
    this.handleDeleteBieuMau  = this.handleDeleteBieuMau.bind(this)
    this.handleadd  = this.handleadd.bind(this)
    this.tabopencl = this.tabopencl.bind(this)
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
    axios.get('/Demo/lihanet/index.php/api/bieumau').then(response => {
        this.setState({
            bieumau: response.data
        })
      })
      axios.get('/Demo/lihanet/index.php/api/kybaocao').then(response => {
        this.setState({
            kybaocao: response.data
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
      script.async = true
      scripttag.appendChild(script);
    })
  }

  componentDidUpdate() {
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
  
  handleCreateNewBieuMau (event) {
    event.preventDefault()

    const { history } = this.props

    const bieumau = {
      sohieu: this.state.sohieu,
        tenbieumau: this.state.tenbieumau,
        loaisolieu: this.state.loaisolieu,
        namnhap: this.state.namnhap,
        idkybaocao: this.state.idkybaocao
    }
    console.log(bieumau);
    axios.post('/Demo/lihanet/index.php/api/bieumau', bieumau)
      .then(response => {
        // redirect to the homepage
        axios.get('/Demo/lihanet/index.php/api/bieumau').then(response => {
            this.setState({
                bieumau: response.data
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
  handleDeleteBieuMau(event)
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
  handleXemBieuMau(event)
  {
    event.preventDefault()
    
    
    let idpc=event.target.attributes.getNamedItem('data-idbieumau').value
    axios.get('/Demo/lihanet/index.php/api/bieumautheoid/'+idpc).then(response => {
      
      document.getElementById("xemsohieu").value = response.data["sohieu"]
      document.getElementById("xembieumau").value = response.data["tenbieumau"]
      document.getElementById("xemloaisolieu").value = response.data["loaisolieu"]
      document.getElementById("xemnamnhap").value = response.data["namnhap"]
      document.getElementById("xemkybaocaoselect").value = response.data["idkybaocao"]
    
      var selectbl=document.getElementById("xemkybaocaoselect").childNodes;
      for(var i = 0; i < selectbl.length; i++) {
        var datadv=selectbl[i].value;
        if(datadv==response.data["idkybaocao"])
        {
           selectbl[i].setAttribute('selected', true);
        }
       }
      })
   
      
  }
  handleChiTietBieuMau(event)
  {
    event.preventDefault()
    
    
    let idpc=event.target.attributes.getNamedItem('data-idbieumau').value
    axios.get('/Demo/lihanet/index.php/api/bieumautheoid/'+idpc).then(response => {
      
      document.getElementById("updatesohieu").value = response.data["sohieu"]
      document.getElementById("updatetenbieumau").value = response.data["tenbieumau"]
      document.getElementById("updateloaisolieu").value = response.data["loaisolieu"]
      document.getElementById("updatenamnhap").value = response.data["namnhap"]
      document.getElementById("updatekybaocaoselect").value = response.data["idkybaocao"]
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
        updateid: response.data["id"]
      })
    })
  }
  handleUpdateBieuMau(event)
  {
    event.preventDefault()
     const bieumauupdate = {
        sohieu: this.state.sohieu,
        tenbieumau: this.state.tenbieumau,
        loaisolieu: this.state.loaisolieu,
        namnhap: this.state.namnhap,
        idkybaocao: this.state.idkybaocao,
      }
      console.log(bieumauupdate);
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
  tabopencl(event)
  {
      event.preventDefault()
      var idtabopen=event.target.getAttribute("data-tabbody")
      event.classList.add("active");
  }
render () {
const { bieumau,kybaocao } = this.state;

return (
  
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box quanlybieu">
        <h3 className="box-title">QUẢN LÝ NHẬP LIỆU
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="table-responsive">
        <table className="table color-table primary-table" >
          <thead key="thead">
            <tr>
              <th className="textleftpa">Kỳ báo cáo</th>
              
              <th className="icon-list-demo btnaddthem">Thêm </th>
           
            </tr>
          </thead>
       
          <tbody key="tbody">
            

                
             
                       
                       
                        
                      
                       
                        {kybaocao.map(cd => ( 
                              <tr className="nopadding">
                              <td className="nopadding" colSpan="2">
                                  <div>
                                  <div className="panel-group">
                                  <div className="tabkybaocao" data-tabbody={cd.ID}>
                            <div>
 <div className="panel-heading" data-tabbody={cd.ID} onClick={this.tabopencl}>
                               <p className="headingtabky"><i className="fa fa-chevron-right"></i> <a className="collapsed font-bold"> {cd.tenkybaocao} </a>   <button type="button" onClick={this.handleadd} className="btn btn-circle  btncustom" data-toggle="modal" data-target="#exampleModal" data-kbc={cd.ID} data-whatever="@mdo"><i  onClick={this.handleadd} className="fa fa-plus" data-kbc={cd.ID}></i></button> </p> </div>
                             <div id={"tabbody"+cd.ID} className="tabbb hidden">
                               <div className="panel-body paneltabct">
                               <table className="table table-tpo" >
          <thead key="thead">
            <tr>
              <th className="">Số hiệu</th>
              <th className="">Tên biểu mẫu</th>
              <th className="">Loại số liệu</th>
              <th className="">Năm nhập</th>
              <th className="icon-list-demo btnaddthem">Xem</th>
              <th className="icon-list-demo btnaddthem">Sửa</th>
              <th className="icon-list-demo btnaddthem">Xóa</th>
            </tr>
          </thead>
       
          <tbody key="tbody">
         
                  {bieumau.map(dd=> {
                 
                   
                      if(dd.idkybaocao==cd.ID)
                      return(
<tr className="">
                        <td>{dd.sohieu}</td>
                        <td>{dd.tenbieumau}</td>
                        <td>{dd.loaisolieu}</td>
                        <td>{dd.namnhap}</td>
                     
                        <td className="btnaction">
                           <button onClick={this.handleXemBieuMau}  className="icon-list-demo btn btn-info btn-circle btn-xl" data-idbieumau={dd.id} data-toggle="modal" data-target="#exampleModal2" data-whatever="@mdo"><i data-idbieumau={dd.id} className="fa fa-external-link"></i></button>
                           </td>
                        <td className="btnaction">
                           <button onClick={this.handleChiTietBieuMau} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idbieumau={dd.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i data-idbieumau={dd.id} className="fa fa-pencil"></i></button>
                           </td>
                           <td className="btnaction">
                           <button  className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={dd.id}><i onClick={this.handleDeleteBieuMau} data-id={dd.id} className="fa fa-trash-o"></i></button>
                           </td> 
                    </tr>
                      )
                   
                     
                        
                       })}
                   
                
                 
        
                  
                
                  
        
     
                           
                           
            
          </tbody>
        </table>
                               </div>
                             </div>
                            </div>
                            </div>
                    
                    </div>
                                  </div>
                            
                    </td>
   
              </tr>
                        ))}
         
      
                    
                  
            
        
         

           
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
          <h4 className="modal-title" id="exampleModalLabel1">Thêm Mới Kỳ Báo Cáo</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewBieuMau}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Số Hiệu</label>
              <input type="text" className="form-control" name="sohieu" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên Biểu Mẫu</label>
              <input type="text" className="form-control" name="tenbieumau" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Loại Số Liệu</label>
              <input type="text" className="form-control" name="loaisolieu" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Năm Nhập</label>
              <input type="text" className="form-control" name="namnhap" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Kỳ báo cáo</label>
                        <select className="form-control" name="idkybaocao" id="kybaocaoselect" onChange={this.handleFieldChange}>
                        <option value="0">Chọn kỳ báo cáo</option>
                        {kybaocao.map(cd => ( 
                            <option key={cd.ID} value={cd.ID}>{cd.tenkybaocao}</option>
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
  <div className="modal fade" id="exampleModal2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel2">Xem chi tiết Biểu Mẫu</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateBieuMau}>
          <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Số Hiệu</label>
              <input type="text" className="form-control" name="sohieu" id="xemsohieu" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên Biểu Mẫu</label>
              <input type="text" className="form-control" name="tenbieumau" id="xembieumau" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Loại Số Liệu</label>
              <input type="text" className="form-control" name="loaisolieu" id="xemloaisolieu" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Năm Nhập</label>
              <input type="text" className="form-control" name="namnhap" id="xemnamnhap" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Kỳ báo cáo</label>
                        <select className="form-control" name="idkybaocao" id="xemkybaocaoselect" onChange={this.handleFieldChange}>
                        <option value="0">Chọn kỳ báo cáo</option>
                        {kybaocao.map(cd => ( 
                            <option key={cd.ID} value={cd.ID}>{cd.tenkybaocao}</option>
                        ))}
                          
                         
                    </select>
                        </div>
                  </div>
         
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
                        {kybaocao.map(cd => ( 
                            <option key={cd.ID} value={cd.ID}>{cd.tenkybaocao}</option>
                        ))}
                          
                         
                    </select>
                        </div>
                  </div>
         
              </div>
            <div className="form-group hidden">
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
  <div className="modal fade" id="exampleModal2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel2">Xem chi tiết Biểu Mẫu</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateBieuMau}>
          <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Số Hiệu</label>
              <input type="text" className="form-control" name="sohieu" id="xemsohieu" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên Biểu Mẫu</label>
              <input type="text" className="form-control" name="tenbieumau" id="xembieumau" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Loại Số Liệu</label>
              <input type="text" className="form-control" name="loaisolieu" id="xemloaisolieu" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Năm Nhập</label>
              <input type="text" className="form-control" name="namnhap" id="xemnamnhap" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Kỳ báo cáo</label>
                        <select className="form-control" name="idkybaocao" id="xemkybaocaoselect" onChange={this.handleFieldChange}>
                        <option value="0">Chọn kỳ báo cáo</option>
                        {kybaocao.map(cd => ( 
                            <option key={cd.ID} value={cd.ID}>{cd.tenkybaocao}</option>
                        ))}
                          
                         
                    </select>
                        </div>
                  </div>
         
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

export default QuanLyBieuMau