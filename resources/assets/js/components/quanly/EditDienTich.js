import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EditDienTich extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: props.value,
            idsanluong: props.idsl,
            idtt: props.idtt,
            editing: false
        };
        this.initEditor();
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.handleUpdateSanLuong = this.handleUpdateSanLuong.bind(this);
    }

    initEditor() {
        this.editor = <input type="text" defaultValue={this.state.text} onKeyPress={(event) => {
            const key = event.which || event.keyCode;
           
            if (key === 13) { //enter key
                this.save(event.target.value)
                this.handleUpdateSanLuong(event.target.value)
                
                var ttnext=Number(this.state.idtt)+1;
                document.getElementById('dtich'+ttnext).click();
              
                axios.get('/Demo/lihanet/index.php/api/thongkesanluong').then(response => {
    
                        document.getElementById("tongsanluong").innerHTML = response.data[0].tongsanluong;
                        document.getElementById("tongdientich").innerHTML=response.data[0].tongdientich;
                        document.getElementById("tongchitieu").innerHTML=Number(response.data[0].tongsanluong)*Number(response.data[0].tongdientich)
                   
                  })
                    
                
            }
            else if (key === 97)
            {
                this.save(event.target.value)
                this.handleUpdateSanLuong(event.target.value)
            }
        }} autoFocus={true}/>;
    }

    edit() {
        this.setState({
            text: this.state.text,
            editing: true
        })
    };

    save(value) {
        this.setState({
            text: value,
            editing: false
        })
    };
    handleUpdateSanLuong(value)
    {
  
     const sanluongupdate = {
       dientich: value
      }
      console.log(sanluongupdate);
      axios.post('/Demo/lihanet/index.php/api/dientichupdate/'+this.state.idsanluong,sanluongupdate)
      .then(response => {
      
          
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
       
      })
      
    
  }
    componentDidUpdate() {
        this.initEditor();
    }

    render() {
        return this.state.editing ?
            this.editor
            : <p className="lopdientich" id={"dtich"+this.state.idtt} onClick={this.edit}>{this.state.text}</p>
    }
}
export default EditDienTich