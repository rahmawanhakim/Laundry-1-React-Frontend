import React from "react";
import axios from "axios";
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import './User.css'
import NavbarUs from "../Navbar/NavbarUs";



export default class Outlet extends React.Component{
    constructor(){
        super()
        this.state = {
            id_outlet: "",
            lokasi : "",
            outlets : [] ,
            action: "",
            isModalOpen: false
        }
    }
    getOutlet = () => {
        let url = "http://localhost:8080/laundry-1/api/outlet"
        axios.get(url)
        .then(response => {
            this.setState({outlets: response.data })
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        console.log(this.state.outlets)
    }
    componentDidMount = () =>{
        this.getOutlet()
    }
    handleAdd = () =>{
        this.setState({
            id_outlet: 0,
            lokasi : "",
            action: "insert",
            isModalOpen: true
            
        })
    }
    handleEdit = (item) =>{
        this.setState({
            id_outlet: item.id_outlet,
            lokasi : item.lokasi,
            action: "update",
            isModalOpen: true
        })
    }
    handleSave =(event)=>{
        event.preventDefault();
        let url = "http://localhost:8080/laundry-1/api/outlet"
        let form = {
            id_outlet: this.state.id_outlet,
            lokasi: this.state.lokasi
        }
        if (this.state.action === "insert") {
            axios.post(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getOutlet()
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            axios.put(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getOutlet()
                console.log(response)
            })
            .catch(error => {
                console.error();
            })
        } 
    }
    handleDelete = (id_outlet) => {
        let url = "http://localhost:8080/laundry-1/api/outlet/" + id_outlet
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url)
          .then(response => {
            this.getOutlet();
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
                            <h2 className="outlet-title">
                                LIST OF outlet
                            </h2>
                            
                            <br />
                            <div >
                                <Button className="button-add" onClick={() => this.handleAdd()}>
                                    Add New outlet
                                </Button>
                            </div>

                            <ul >
                            {this.state.outlets.map(outlet =>( 
                                <li className="list">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            <h1 className="text">Lokasi Outlet :</h1>
                                            <h6 className="isi">{outlet.lokasi}</h6>
                                        </div>
                                       
                                        <div className="col-lg-2 col-md-3 ">
                                            <button className="edit" onClick={() => this.handleEdit(outlet)}>
                                                <AiFillEdit className="icon"/>
                                            </button>
                                            <button className="delete" onClick={() => this.handleDelete(outlet.id_outlet)}>
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
                        <Modal.Title>Form New outlet</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}>
                        <Modal.Body>
                            <Form.Group className="mb-2">
                                <Form.Label>Lokasi Outlet</Form.Label>
                                <Form.Control type="text" value={this.state.lokasi} 
                                onChange={ev => this.setState({ lokasi : ev.target.value})} />
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
