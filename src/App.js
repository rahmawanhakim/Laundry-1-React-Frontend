import React from 'react'
import './App.css';
import {Switch, Route} from 'react-router-dom'
import Home from './component/Pages/Home';
import User from './component/Pages/User';
import Member from './component/Pages/Member';
import Login from './component/Pages/Login/Login';
import Transaksi from './component/Pages/transaksi';
import LoginKasir from './component/Pages/Login/LoginKasir';
import LoginOwner from './component/Pages/Login/LoginOwner';
import Paket from './component/Pages/Paket';
import Outlet from './component/Pages/Outlet';


class App extends React.Component{
  render(){
  return (
    
   
      <Switch>
        <Route path="/home" exact component ={Home} />
        <Route path="/user" component ={User}/>
        <Route path = "/member" component = {Member}/>
        <Route path= "/" exact component = {Login}/>
        <Route path= "/login-kasir" component ={LoginKasir}/>
        <Route path= "/login-owner" component = {LoginOwner}/>
        <Route path= "/transaksi" component = {Transaksi} />
        <Route path="/outlet" component = {Outlet}/>
        <Route path= "/paket" component = {Paket}/>
      </Switch>
    
  )
}
}

export default App
