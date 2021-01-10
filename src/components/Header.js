import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import jwt from 'jsonwebtoken';

class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            isNavOpen: false,
        }
    }

    SignOut() {
        localStorage.removeItem('userToken');
    }

    ButtonClicked() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    render() {
        const decodedUser = localStorage.length != 0 ? jwt.verify(localStorage.getItem('userToken'), 'Empayfi',) : null;
        return (
            <header>
                <nav className="container navbar navbar-expand-lg navbar-light justify-content-between">
                    <Link className="navbar-brand" activeClassName="active" to="/">
                        Ne Yemek Yapsam ?
                        <img src={require("../styles/images/homefood.png")} style={{ marginLeft: "5%" }} width="50px" />
                    </Link>
                    <button className="navbar-toggler" type="button" onClick={this.ButtonClicked.bind(this)}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse" style={{ display: this.state.isNavOpen ? "block" : "none", marginLeft: "30%" }}>
                        <ul className="navbar-nav">

                            {decodedUser == null ?

                                <li className="nav-item">
                                    <Link className="nav-link" activeClassName="active" to="/"> Anasayfa </Link>
                                </li>
                                : null
                            }

                            <li className="nav-item">
                                <Link className="nav-link" activeClassName="active" to="/YemekAra"> Yemek Ara </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" activeClassName="active" to="/hakkimizda"> Hakkımızda </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" activeClassName="active" to="/iletisim"> İletişim </Link>
                            </li>
                            {decodedUser != null ?
                                <li className="nav-item">
                                    <Link className="nav-link" activeClassName="" to="/" onClick={this.SignOut.bind(this)}> Çıkış Yap </Link>
                                </li> : null
                            }
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}


export default Header;
