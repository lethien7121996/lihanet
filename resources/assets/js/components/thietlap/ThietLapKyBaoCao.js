import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ThietLapKyBaoCao extends Component {
  constructor () {
    super()

    this.state = {
        kybaocao: [],
        tenkybaocao:'',
        updateid:''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewKyBaoCao  = this.handleCreateNewKyBaoCao.bind(this)
    this.handleChiTietKyBaoCao  = this.handleChiTietKyBaoCao.bind(this)
    this.handleUpdateKyBaoCao  = this.handleUpdateKyBaoCao.bind(this)
    this.handleDeleteKyBaoCao  = this.handleDeleteKyBaoCao.bind(this)
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
    axios.get('/Demo/lihanet/index.php/api/kybaocao').then(response => {
        this.setState({
            kybaocao: response.data
        })
      })
      
  }
  componentDidMount() {
   
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
  
  handleCreateNewKyBaoCao (event) {
    event.preventDefault()

    const { history } = this.props

    const kybaocao = {
      tenkybaocao: this.state.tenkybaocao

    }
    console.log(kybaocao);
    axios.post('/Demo/lihanet/index.php/api/kybaocao', kybaocao)
      .then(response => {
        // redirect to the homepage
        axios.get('/Demo/lihanet/index.php/api/kybaocao').then(response => {
            this.setState({
                kybaocao: response.data
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
  handleDeleteKyBaoCao(event)
  {
      event.preventDefault()
      let idkybaocao=event.target.attributes.getNamedItem('data-idkybaocao').value

      axios.get('/Demo/lihanet/index.php/api/kybaocaodelete/'+idkybaocao)
      .then(response => {
        // redirect to the homepage
        axios.get('/Demo/lihanet/index.php/api/kybaocao').then(response => {
            this.setState({
              kybaocao: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietKyBaoCao(event)
  {
    event.preventDefault()
    
    
    let idpc=event.target.attributes.getNamedItem('data-idkybaocao').value
    axios.get('/Demo/lihanet/index.php/api/kybaocaotheoid/'+idpc).then(response => {
      
      document.getElementById("updatetenkybaocao").value = response.data["tenkybaocao"]

      document.getElementById("updateid").value = response.data["ID"]
   
      this.setState({
        tenkybaocao: response.data["tenkybaocao"],
       
        updateid: response.data["ID"]
      })
    })
  }
  handleUpdateKyBaoCao(event)
  {
    event.preventDefault()
     const kybaocaoupdate = {
        tenkybaocao: this.state.tenkybaocao
      }
      console.log(kybaocaoupdate);
      axios.post('/Demo/lihanet/index.php/api/kybaocaoupdate/'+this.state.updateid,kybaocaoupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/Demo/lihanet/index.php/api/kybaocao').then(response => {
            this.setState({
              kybaocao: response.data
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
  
render () {
const { kybaocao } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Danh sách kỳ báo cáo
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="table-responsive">
        <table className="table color-table primary-table" >
          <thead key="thead">
            <tr>
              <th>Tên kỳ báo cáo</th>
              
             
              <th className="icon-list-demo btnthemele btnactiongroup">  <button type="button" className="btn btn-block  btncustom" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </thead>
          <tfoot key="tfoot">
            <tr>
            <th>Tên kỳ báo cáo</th>
             
            
              <th className="icon-list-demo btnthemele"><button type="button" className="btn btn-block  btncustom" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </tfoot>
          <tbody key="tbody">
          {kybaocao.map(cd => ( 
            <tr key={cd.ID} id={"kybaocaoitem"+cd.ID} data-itemngt={cd.ID}>
            
              <td data-ingt={cd.ID}>{cd.tenkybaocao}</td>
             
              <td className="btnaction"><button data-idkybaocao={cd.ID} onClick={this.handleDeleteKyBaoCao} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={cd.ID}><i className="fa fa-trash-o" data-idkybaocao={cd.ID}></i></button><button onClick={this.handleChiTietKyBaoCao} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idkybaocao={cd.ID} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" data-idkybaocao={cd.ID}></i></button></td>
             
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
          <form onSubmit={this.handleCreateNewKyBaoCao}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên</label>
              <input type="text" className="form-control" name="tenkybaocao" id="recipient-name1" onChange={this.handleFieldChange} /> </div>
       
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
          <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật Kỳ Báo Cáo</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateKyBaoCao}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên ký báo cáo</label>
              <input type="text" className="form-control" name="tenkybaocao" id="updatetenkybaocao" onChange={this.handleFieldChange} /> </div>
            
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

export default ThietLapKyBaoCao