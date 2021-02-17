import './App.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {User} from './template';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      loading: false,
      userEdit:{},
      idx:""
    }
  }

  // componentDidMount() {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response => response.json())
  //     .then(json => {
  //       this.setState({
  //         user: json,
  //         loading:true
  //       })
  //     })
  //     .catch(() => {
  //       alert("Failed fetchind data")
  //     })
  //     .finally(() => {
  //       this.setState({ loading: false })
  //     })
  // }

  componentDidMount(){
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/albums'),
      fetch('https://jsonplaceholder.typicode.com/photos')
  ])
      .then(([aa, bb, cc]) => Promise.all([aa.json(), bb.json(), cc.json()]))
      .then(([firstJson, secondJson, thirdJson3]) => this.setState({
          user: firstJson,
          albums: secondJson,
          photos: thirdJson3,
          loading: false
      })).finally(
          this.setState({
              loading: false
          })
      )
  }

  delete = (idx) => {
    if(window.confirm("Apakah ingin menghapus data")){
      console.log(idx);
      let newUser = this.state.user
      newUser.splice(idx, 1)
      this.setState({
        user: newUser
      })
      alert("data dihapus")
    }
  }

  save = (data) => {
    const { name, username, city, company} = data
      let newUser = this.state.user
      let index = this.state.idx;
      newUser[index].name = name;
      newUser[index].username = username;
      newUser[index].address.city = city;
      newUser[index].company.name = company;
      this.setState({
        user: newUser,
        name:"",
        username:"",
        city:"",
        company:""

      })
      alert('Data Berhasil DiUpdate..');
  }



  update =(idx)=>{
    this.setState({
      idx:idx
    });
    const updateUser = this.state.user[idx];
    this.setState({
      userEdit:updateUser
    })
  }

  reset = ()=>{
    this.setState({
      userEdit:{}
    })
  }

  // showLoading = () => {
  //   if (this.state.loading)
  //     return <h2>Loading..</h2>
  // }

  setValue = el => {
    this.setState({
        [el.target.name]: el.target.value
    })
}

  render() {
    // console.log(this.state.user);
    // if("name" in this.state.userEdit){
    //   this.setState({
    //     name:this.state.userEdit.name,
    //     username:this.state.userEdit.username,
    //     city:this.state.userEdit.address.city,
    //     company:this.state.userEdit.company.name
    //   })
    //   this.reset();
    // }
    
    return (
      <Router>
        <Switch>
          <Route>
            <User
            loading={this.showLoading} 
            save={this.save} 
            hapus={this.delete} 
            edit={this.update}
            editData={this.state.userEdit} 
            user={this.state.user}
            reset={this.reset} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

