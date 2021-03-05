import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Header from './Header'
import SideBarMain from './SideBarMain'
import MetaPage from './MetaPage'
import Login from './Login'
import ThietLapKyBaoCao from './thietlap/ThietLapKyBaoCao'
import QuanLyBieuMau from './quanly/QuanLyBieuMau'
import QuanLySanLuong from './quanly/QuanLySanLuong'
class App extends Component {
  
  render () {
    let login = localStorage.getItem('jwts');
    let userid = localStorage.getItem('userids');
    if (!login) { 
       
        return (
            <BrowserRouter>
        
<HashRouter>
                <div>
                    <Redirect to='/Demo/lihanet/login'/>
                    
                    <Route exact path='/Demo/lihanet/login' component={Login} />
                   
                </div>
            </HashRouter>
           
            <Switch>
            <Route path='/Demo/lihanet/tong-quan' component={ThietLapKyBaoCao} />
            </Switch>
               
                   
              
          
            
            </BrowserRouter>
        )
        
    }
    else
    {
      if(userid==3)
      {
        return(

          <BrowserRouter>
              
                  
                
                
              <Header />
              <SideBarMain />
              <div id="page-wrapper">
            <div className="container-fluid">
              <MetaPage />
          
              <Switch>
              
                <Route exact path='/Demo/lihanet/' component={ThietLapKyBaoCao} />
                
          
              </Switch>
              </div>
          <footer className="footer text-center"> 2020 &copy; ỨNG DỤNG QUẢN LÝ PHÒNG KHÁM NHA KHOA </footer>
               </div>
              
          
          
            
            
          </BrowserRouter>
           
           )
      }
      else
      {
        return(

          <BrowserRouter>
              
                  
                
                
              <Header />
              <SideBarMain />
              <div id="page-wrapper">
            <div className="container-fluid">
              <MetaPage />
          
              <Switch>
               <Route exact path='/Demo/lihanet/' component={QuanLyBieuMau} />
               <Route exact path='/Demo/lihanet/quan-ly-bieu-mau' component={QuanLyBieuMau} />
               <Route exact path='/Demo/lihanet/quan-ly-san-luong' component={QuanLySanLuong} />
               <Route exact path='/Demo/lihanet/nhap-lieu' component={ThietLapKyBaoCao} />
 
          
           
              </Switch>
              </div>
          <footer className="footer text-center"> 2021 &copy; ỨNG DỤNG QUẢN LÝ LIHANET </footer>
               </div>
              
          
          
            
            
          </BrowserRouter>
           
           )
      }

 }
  }
}
    
 

ReactDOM.render(<App />, document.getElementById('root'))