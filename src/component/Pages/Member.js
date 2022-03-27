import React from "react";
import axios from "axios";

import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import "./User.css"
import NavbarUs from "../Navbar/NavbarUs";

export default class Member extends React.Component {
    constructor() {
        super()
        this.state = {
            id_member: "",
            nama_member: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: "",
            members: [],
            action: "",
            isModalOpen: false
        }
    }
    getMember = async () => {
        let url = "http://localhost:8080/laundry-1/api/member"
        await axios.get(url)
        .then(response => { 
            this.setState({members: response.data})
            console.log(response)
        })
        .catch(error => {
            console.log(error);
        })
        console.log(this.state.members)
    }
    componentDidMount = () => {
        this.getMember()
    }
    handleAdd = () =>{
        this.setState({
            id_member: 0,
            nama_member: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: "",
            action: "insert",
            isModalOpen: true
        })
    }
    handleEdit = (item) =>{
        this.setState({
            id_member: item.id_member,
            nama_member: item.nama_member,
            alamat: item.alamat,
            jenis_kelamin: item.jenis_kelamin,
            tlp: item.tlp,
            action: "update",
            isModalOpen: true
        })
    }
    handleSave = (event) =>{
        event.preventDefault();
        let url = "http://localhost:8080/laundry-1/api/member"
        let form = {
            id_member: this.state.id_member,
            nama_member: this.state.nama_member,
            alamat: this.state.alamat,
            jenis_kelamin: this.state.jenis_kelamin,
            tlp: this.state.tlp
        }
        
        if(this.state.action === "insert"){
            axios.post(url, form)
            .then(response => { 
                window.alert(response.data.message)
                this.getMember()
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            axios.put(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getMember()
                console.log(response)
            })
            .catch(error => {
                console.error();
            })
        } 
    }
    handleDelete = (id_member) => {
        let url = "http://localhost:8080/laundry-1/api/member/" + id_member
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url)
          .then(response => {
            this.getMember();
            console.log(response)
          })
          .catch(error => {
            console.log(error);
          })
        }
    }
    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }
    render() {
        return (
            <div>
                <NavbarUs/>
                <div>
                <Container className="my-4">
                    
                        <Card.Body className="card-body">
                            <h2 className="user-title">
                                LIST OF MEMBER
                            </h2>
                            
                            <br />
                            <div className="">
                                <Button className="button-add" onClick={() => this.handleAdd()}>
                                    Add Member
                                </Button>
                            </div>

                            <ul>
                            {this.state.members.map(member => (
                                <li className="list">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-5 col-sm-4">
                                            <h1 className="text">Nama :</h1>
                                            <h6 className="isi">{member.nama_member}</h6>
                                        </div>
                                        <div className="col-lg-3 col-md-7 col-sm-8">
                                        <h1 className="text">Alamat :</h1>
                                        <h6 className="isi">{member.alamat}</h6>
                                        </div>
                                        <div className="col-lg-2 col-md-5 col-sm-4">
                                        <h1 className="text">Jenis_kelamin :</h1>
                                        <h6 className="isi">{member.jenis_kelamin}</h6>
                                        </div>
                                        <div className="col-lg-2 col-md-4 col-sm-4">
                                        <h1 className="text">Telepon :</h1>
                                        <h6 className="isi">{member.tlp}</h6>
                                        </div>
                                        <div className="col-lg-2 col-md-3 col-sm-4">
                                        <button className="edit" onClick={() => this.handleEdit(member)}>
                                        <AiFillEdit className="icon"/>
                                        </button>
                                           <button className="delete" onClick={() => this.handleDelete(member.id_member)}>
                                            <MdDelete className="icon"/>
                                        </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            </ul>
                        </Card.Body>
                    
                </Container>

                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form New User</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}>
                        <Modal.Body>
                            <Form.Group className="mb-2">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" value={this.state.nama_member} 
                                onChange={ev => this.setState({ nama_member : ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Alamat </Form.Label>
                                <Form.Control type="text" value={this.state.alamat}
                                onChange={ev => this.setState({alamat: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Jenis Kelamin </Form.Label>
                                <Form.Select value={this.state.jenis_kelamin} 
                                onChange={ev => this.setState({jenis_kelamin: ev.target.value})}>
                                    <option > </option>
                                    <option >L</option>
                                    <option >P</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Telepon </Form.Label>
                                <Form.Control type="number" value={this.state.tlp}
                                onChange={ev => this.setState({tlp: ev.target.value})} />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Modal.Body>
                    </Form>
                </Modal>
            </div>
            </div>
        );
    }
}