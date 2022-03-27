import React from 'react'
import { Button } from '../Button'
import {Link} from 'react-router-dom'
import {AiOutlineUser} from 'react-icons/ai'
import {MdOutlineEmail} from 'react-icons/md'
import {BiPhoneCall} from 'react-icons/bi'
import {BsFillKeyFill} from 'react-icons/bs'
import {MdOutlineWork} from 'react-icons/md'
import Navbar from '../Navbar'


function Register() {
    return (
        <div >
            <Navbar/>
        <div className='container'>
            <div className='form-2R'>
            <h1>REGISTER</h1>

            <div className='label3'>
                <AiOutlineUser className='FaReg'/>
                <h2  className='I3'>Insert Username</h2>
            </div>
            <input name="username" className="input1"/>
            <div className='label4'>
                <MdOutlineEmail className='FaReg'/>
                <h2 className='I3'>Insert Email</h2>
            </div>
            <input  name='email' type="email" className='input2'/>
            <div className='label4'>
                <BiPhoneCall className='FaReg'/>
                <h2 className='I3'>Insert No.Tlp</h2>
            </div>
            <input  name='no_tlp' type="number" className='input2'/>

            <div className='label4'>
                <BsFillKeyFill className='FaReg'/>
                <h2 className='I3'>Create Password</h2>
            </div>
            <input  name='password' type="password" className='input2'/>
            <div className='label4'>
                <MdOutlineWork className='FaReg'/>
                <h2 className='I3'>Role</h2>
            </div>
            <select name="hobi" className='input2' >
                <option value="0"> </option>
                <option value="1">KASIR</option>
                <option value="2">CUSTOMER</option>
                <option value="3">OWNER</option>
            </select>
            <br/>
            <br/>
            <Button to="/"className="sign-up" buttonSize={"btn--medium"} buttonColor={'blue'}>Sign-Up</Button>
            <p>Sudah Punya Akun?</p>
            <Link to="/sign-in" className='sign2'>Login Disini</Link>
        </div>
        </div>
    </div>
    )
}

export default Register
