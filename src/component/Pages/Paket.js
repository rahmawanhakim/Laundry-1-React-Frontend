import React from "react";
import axios from "axios";
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import './User.css'
import NavbarUs from "../Navbar/NavbarUs";



export default class Paket extends React.Component{
    constructor(){
        super()
        this.state = {
            id_paket: "",
            jenis : "",
            harga : "",
            pakets : [] ,
            action: "",
            isModalOpen: false
        }
    }
    getPaket = () => {
        let url = "http://localhost:8080/laundry-1/api/paket"
        axios.get(url)
        .then(response => {
            this.setState({pakets: response.data })
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        console.log(this.state.pakets)
    }
    componentDidMount = () =>{
        this.getPaket()
    }
    handleAdd = () =>{
        this.setState({
            id_paket: 0,
            jenis : "",
            harga: "",
            action: "insert",
            isModalOpen: true
            
        })
    }
    handleEdit = (item) =>{
        this.setState({
            id_paket: item.id_paket,
            jenis: item.jenis,
            harga: item.harga,
            action: "update",
            isModalOpen: true
        })
    }
    handleSave =(event)=>{
        event.preventDefault();
        let url = "http://localhost:8080/laundry-1/api/paket"
        let form = {
            id_paket: this.state.id_paket,
            jenis: this.state.jenis,
            harga  : this.state.harga
        }
        if (this.state.action === "insert") {
            axios.post(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getPaket()
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            axios.put(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getPaket()
                console.log(response)
            })
            .catch(error => {
                console.error();
            })
        } 
    }
    handleDelete = (id_paket) => {
        let url = "http://localhost:8080/laundry-1/api/paket/" + id_paket
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url)
          .then(response => {
            this.getPaket();
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
    render(){
        return(

            

            <div>
                <NavbarUs/>
            <div>
                
                <Container className="my-4">
                    
                        <Card.Body className="card-body">
                            <h2 className="paket-title">
                                LIST OF paket
                            </h2>
                            
                            <br />
                            <div >
                                <Button className="button-add" onClick={() => this.handleAdd()}>
                                    Add New paket
                                </Button>
                            </div>

                            <ul >
                            {this.state.pakets.map(paket =>( 
                                <li className="list">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            <h1 className="text">Jenis Paket:</h1>
                                            <h6 className="isi">{paket.jenis}</h6>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            <h1 className="text">Harga :</h1> 
                                            <h6 className="isi">{paket.harga}</h6>
                                        </div>
                                       
                                        <div className="col-lg-2 col-md-3 ">
                                            <button className="edit" onClick={() => this.handleEdit(paket)}>
                                                <AiFillEdit className="icon"/>
                                            </button>
                                            <button className="delete" onClick={() => this.handleDelete(paket.id_paket)}>
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
                        <Modal.Title>Form New paket</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}>
                        <Modal.Body>
                            <Form.Group className="mb-2">
                                <Form.Label>Jenis Paket</Form.Label>
                                <Form.Control type="text" value={this.state.jenis} 
                                onChange={ev => this.setState({ jenis : ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Harga </Form.Label>
                                <Form.Control type="text" value={this.state.harga}
                                onChange={ev => this.setState({ harga : ev.target.value})} />
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
        )     
    }
}
