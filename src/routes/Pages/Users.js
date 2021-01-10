import React from 'react'
import { browserHistory } from 'react-router';
import * as Http from 'utils/http.helper'

class Users extends React.Component {

  constructor() {
    super();

    this.state = {
      userList: [],
      hasError: false,
      errorMessage: ""
    }
  }

  componentDidMount() {
    // HTTP Call
    Http.post('users/getUserList', null).then(res => {
      if (res.durum) {
        res.data.forEach(element => {
          this.setState(res => {
            const userList = res.userList.push(element);
          })
        });
      }

      if (!res.durum) {
        this.setState({
          hasError: !res.durum,
          errorMessage: res.message
        })
      }

    });
  }

  onDeleteUserClick(_id, email) {
    const user = {
      _id: _id,
      email: email
  }

    Http.post('users/deleteUser', user).then(res => {
      if (res.durum) {
        window.location.reload(false);
      }

      if (!res.durum) {
        this.setState({ 
          hasError: !res.durum,
          errorMessage: res.message
        })
      }

    });
  }

  render() {
    return (
      <div className="container" style={{ marginTop: "-10%" }}>
        <h1>Kullanıcılar</h1>
        <div className="table-responsive">
          <table className="table col-md-12" id="myTable" >
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>İsim</th>
                <th>Mail</th>
                <th>Rol</th>
                <th>Son Giriş Zamanı</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody className="table-success">

              {this.state.userList.map((users, index) => {
                return (
                  <tr key={users._id}>
                    <td>{users._id}</td>
                    <td>{users.name}</td>
                    <td>{users.email}</td>
                    <td>{users.role == 0 ? "Admin" : "Üye"}</td>
                    <td>{users.dateCreated.substr(0, 10)}</td>
                    <td><img src={require("../../styles/images/delete.png")} width="30px" onClick={this.onDeleteUserClick.bind(this, users._id, users.email)} /> </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}


export default Users;
