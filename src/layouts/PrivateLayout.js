import React from 'react'
import PropTypes, { func } from 'prop-types'
import AdminHeader from '../components/AdminHeader'
import jwt from 'jsonwebtoken';

class PrivateLayout extends React.Component {

  render() {
    const decodedUser = localStorage.length != 0 ? jwt.verify(localStorage.getItem('userToken'), 'Empayfi',) : null;

    return (
      <div>
        {decodedUser != null && decodedUser.userRole == 0 ?
          <div className="d-flex" id="wrapper">
            <AdminHeader />
            <div id="page-content-wrapper">
              <div className="container-fluid">
                {this.props.children}
              </div>
            </div>
          </div> :
          <div className="container">
            <h2 style={{ color: "#da0605", marginTop:"28%" }}> Buraya sadece admin yetkisi olanlar girebilir ! </h2>
          </div>
          }
      </div>
    )
  }
}
PrivateLayout.propTypes = {
  children: PropTypes.node,
}

export default PrivateLayout
