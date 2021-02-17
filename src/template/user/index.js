import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user:[],
            userEdit:{},
            name:"",
            username:"",
            city:"",
            company:"",
            idx:"",
            
         }
    }
    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }
    
    render() { 


            if("name" in this.props.editData){
                this.setState({
                  name:this.props.editData.name,
                  username:this.props.editData.username,
                  city:this.props.editData.address.city,
                  company:this.props.editData.company.name,
                  
                })
                this.props.reset();
            }
        
        const {name,username,city,company}=this.state
          return (
            <div className="App">
              <h1>DATABASE</h1>
              <div>
                <h2>FORM</h2>
                
                <h1>{this.props.name}</h1>
                <div>
                  <label>Name</label>
                  <input type="text" className="name" name="name" placeholder="Masukkan Nama..." onChange={this.setValue} value={name} ></input>
                </div>
                <div>
                  <label>Username</label>
                  <input type="text" className="user" name="username" placeholder="Username..." onChange={this.setValue} value={username}></input>
                </div>
                <div>
                  <label>City</label>
                  <input type="text"  placeholder="City.." name="city" className="city" onChange={this.setValue} value={city}></input>
                </div>
                <div>
                  <label>Company Name</label>
                  <input type="text" placeholder="Company Name.." name="company" className="company" onChange={this.setValue} value={company}></input>
                </div>
                <div>
                  <button type="button" onClick={()=>this.props.save({name,username,city,company})}>Submit</button>
                </div>
              </div>
              <div>
      
              <h2>TABLE</h2>
              <table className="table">
                <thead className="table-dark">
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>City</th>
                    <th>Company Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {this.props.loading}
                  { 
                    this.props.user.map((user, idx) => {
                      return (
      
                        <tr key={idx} >
                            
                          <td>{idx + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.username}</td>
                          <td>{user.address.city}</td>
                          <td>{user.company.name}</td>
                          <td>
                            <button className="btn btn-warning" type="button" onClick={() => this.props.edit(idx)}>Sunting</button>
                            <button className="btn btn-danger" type="button" onClick={() => this.props.hapus(idx)} >Hapus</button>
                            <button className="btn btn-primary">Lihat</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              </div>
            </div>
         );
    }
}
 
export default User;