import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class SideBarMain extends Component {
  constructor () {
    super()
    this.state = {
      iduser: localStorage.getItem('userid'),
      usercurrent: []
    
  }
}
  componentWillMount(){
    axios.get('/index.php/api/infouser/'+localStorage.getItem('userid')).then(response => {
      console.log(response.data)
      this.setState({
        usercurrent: response.data
      })
    })
  }
render(){
  const { iduser,usercurrent } = this.state
  return(
    <div className="navbar-default sidebar" role="navigation">
    <div className="sidebar-nav navbar-collapse slimscrollsidebar">
    {(() => {
            if (usercurrent.role==="1") {
              return (
                <ul className="nav" id="side-menu">
                <li className="sidebar-search hidden-sm hidden-md hidden-lg">
                  {/* input-group */}
                  <div className="input-group custom-search-form">
                    <input type="text" className="form-control" placeholder="Search..." /> <span className="input-group-btn">
                      <button className="btn btn-default" type="button"> <i className="fa fa-search" /> </button>
                    </span> </div>
                  {/* /input-group */}
                </li>
                <li className="user-pro">
                <a href='#' className="waves-effect"><img src="./public/app_assets/plugins/images/users/d1.jpg" alt="user-img" className="img-circle" /> <span className="hide-menu">{usercurrent.name}<span className="" /></span>
                  </a>
                
                </li>
                <li className="nav-small-cap m-t-10">--- Menu Chính</li>
              
                <li> <Link to='/Demo/lihanet/quan-ly-bieu-mau' className="waves-effect"><i className="icon-people p-r-10" /> <span className="hide-menu"> Quản lý Biểu Mẫu</span></Link>
             
                </li>
                <li> <Link to='/Demo/lihanet/quan-ly-san-luong' className="waves-effect"><i className="icon-people p-r-10" /> <span className="hide-menu"> Quản lý sản lượng </span></Link>
             
             </li>
                
           
                    
                    
                  
                
              
              </ul>
              )
              }
              else if (usercurrent.role==="3") {
                return (
                  <ul className="nav" id="side-menu">
                  <li className="sidebar-search hidden-sm hidden-md hidden-lg">
                    {/* input-group */}
                    <div className="input-group custom-search-form">
                      <input type="text" className="form-control" placeholder="Search..." /> <span className="input-group-btn">
                        <button className="btn btn-default" type="button"> <i className="fa fa-search" /> </button>
                      </span> </div>
                    {/* /input-group */}
                  </li>
                  <li className="user-pro">
                  <a href='#' className="waves-effect"><img src="./public/app_assets/plugins/images/users/d1.jpg" alt="user-img" className="img-circle" /> <span className="hide-menu">{usercurrent.name}<span className="" /></span>
                    </a>
                  
                  </li>
                  <li className="nav-small-cap m-t-10">--- Menu Chính</li>
                
             
                  <li> <Link to='/lich-hen-tong' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Lịch hẹn</span></Link>
                   
                   </li>
                  
             
                      
                      
                    
                  
                
                </ul>
                )
                }
              else
              {
                return(
                  <ul className="nav" id="side-menu">
                  <li className="sidebar-search hidden-sm hidden-md hidden-lg">
                    {/* input-group */}
                    <div className="input-group custom-search-form">
                      <input type="text" className="form-control" placeholder="Search..." /> <span className="input-group-btn">
                        <button className="btn btn-default" type="button"> <i className="fa fa-search" /> </button>
                      </span> </div>
                    {/* /input-group */}
                  </li>
                  <li className="user-pro">
                  <a href='#' className="waves-effect"><img src="./public/app_assets/plugins/images/users/d1.jpg" alt="user-img" className="img-circle" /> <span className="hide-menu">{usercurrent.name}<span className="" /></span>
                    </a>
                  
                  </li>
                  <li className="nav-small-cap m-t-10">--- Menu Chính</li>
              
                  <li> <Link to='/tat-ca-khach-hang' className="waves-effect"><i className="icon-people p-r-10" /> <span className="hide-menu"> Khách hàng </span></Link>
               
                  </li>
              
                  <li> <Link to='/lich-hen-tong' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Lịch hẹn</span></Link>
                 
                 </li>
                    
                        
                   
                      
                    
                  
                
                </ul>
                )
              }
          })()}
 
    </div>
  </div>
  )
}
}
       
      
    

    export default SideBarMain