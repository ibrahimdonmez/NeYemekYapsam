import React from 'react'
import jwt from 'jsonwebtoken';

export class Admin extends React.Component {

  render() {
    const decodedUser = localStorage.length != 0 ? jwt.verify(localStorage.getItem('userToken'), 'Empayfi',) : "";
    return (
      <div className="home-container">
        <div className="container">
          <h1>Hoşgeldiniz {decodedUser.userName} ! </h1>

        </div>
      </div>
    )
  }
}

export default Admin;
 