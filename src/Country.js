import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';
import {EditDepModal} from './EditDepModal';

export class Country extends Component{

    constructor(props){
        super(props);
        this.state={cons:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'country',{
        method: 'GET',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
        },
    }).then((response)=>{
        console.log(JSON.stringify())
        response.json().then((result)=>{
            console.log(result);
            this.setState({cons:result});
        })
    })

    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        // this.refreshList();
    }

    deleteCon(conid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'country/'+conid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {cons, conid,conname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>CountryId</th>
                        <th>CountryName</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cons.map(con=>
                            <tr key={con.countryId}>
                                <td>{con.countryId}</td>
                                <td>{con.countryName}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        conid:con.countryId,conname:con.countryName})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteCon(con.countryId)}>
            Delete
        </Button>

        <EditDepModal show={this.state.editModalShow}
        onHide={editModalClose}
        conid={conid}
        conname={conname}/>
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Country</Button>

                    <AddDepModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}