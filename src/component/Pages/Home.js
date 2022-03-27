import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom'
import './Customer.css'
import NavbarUs from '../Navbar/NavbarUs';


export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            userName: "",
            countMember: "",
            countUser: "",
            countPaket: "",
            countTransaksi: "",
            token: ""
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            // window.location = "/"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getUsername = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        this.setState({userName: user.username})
    }
    getMember = () => {
        let url = "http://localhost:8080/Laundry-1/api/member"
        axios.get(url)
        .then(response => {
          this.setState({countMember: response.data.length});
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
    }

    getTransaksi = () => {
        let url = "http://localhost:8080/Laundry-1/api/transaksi"
        axios.get(url)
        .then(response => {
          this.setState({countTransaksi: response.data.length});
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
    }
    getOutlet = () => {
        let url = "http://localhost:8080/Laundry-1/api/outlet"
        axios.get(url)
        .then(response => {
          this.setState({countOutlet: response.data.length});
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
    }

    getPaket = () => {
        let url = "http://localhost:8080/Laundry-1/api/paket"
        axios.get(url)
        .then(response => {
            this.setState({countPaket: response.data.length})
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }
    getUser = () => {
        let url = "http://localhost:8080/Laundry-1/api/user"
        axios.get(url)
        .then(response => {
          this.setState({countUser: response.data.length});
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
    }
    componentDidMount = () => {
        this.getMember()
        this.getUser()
        this.getPaket()
        this.getTransaksi()
        this.getOutlet()
        this.getUsername()
    }
    render(){
        return(
            <div >
          <NavbarUs>
            <h1>Haloo</h1>          
          </NavbarUs>
          <div>
            <h1 className='username'>WELCOME BACK  {this.state.userName}</h1>
            <h1 className='dash'>DASHBOARD</h1>
           
            <div className='hero'>
              <button className="button-ts">
              <h1 className='ts'>TRANSAKSI COUNT</h1>
              <Link to="/transaksi">
            <button className="button-tsn">{this.state.countTransaksi}</button>
              </Link>
            </button>

            <button className="button-ts2">
              <h1 className='ts2'>USER COUNT</h1>
              <Link to="/user">
            <button className="button-tsn2">{this.state.countUser}</button>
              </Link>
            </button>

            <button className="button-ts3">
              <h1 className='ts3'>OUTLET COUNT</h1>
              <Link to="/outlet">
            <button className="button-tsn3" >{this.state.countOutlet}</button>
              </Link>
            </button>

            <button className="button-ts4">
              <h1 className='ts4'>MEMBER COUNT</h1>
              <Link to="/member">
            <button className="button-tsn4" >{this.state.countMember}</button>
              </Link>
            </button>

            

            
            </div>
            
            
          </div>
          <br/>
          <br/>
      </div>
        )     
    }
}