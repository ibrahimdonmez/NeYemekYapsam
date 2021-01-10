import React from 'react';
import { connect } from 'react-redux';
import { post } from 'utils/http.helper.js';
import { userInit } from 'store/userReducer'
import { browserHistory } from 'react-router';

class LoginView extends React.Component {

    constructor() {
        super();

        this.state = {
            name: "",
            email: "",
            password: "",
            role: "",
            hasError: false,
            errorMessage: ""
        }
    }

    emailChanged(e) {
        this.setState({
            email: e.target.value
        })
    }

    passwordChanged(e) {
        this.setState({
            password: e.target.value
        })
    }

    onUserClick() {
        // HTTP Call
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        post('auth/login', user).then(res => {
            if (res.durum) {
                localStorage.setItem('userToken', res.token);
                this.props.userInit({ email: user.email });
                //redirect dashboard
                this.setState({
                    name: res.name,
                    role: res.role
                })
                if (this.state.role == "1") {
                    browserHistory.push('/YemekAra');
                }
                
                else if (this.state.role == "0") {
                    browserHistory.push({
                        pathname: '/Admin',
                        state: { userName: this.state.name }
                      })
                }
            }

            if (!res.durum) {
                this.setState({
                    hasError: !res.durum,
                    errorMessage: res.message
                })
            }

        });
    }

    renderError() {
        return <div className="alert alert-danger" style={{ width: "516px", "marginLeft": "auto", marginRight: "auto", "marginTop": "20px" }}>{this.state.errorMessage}</div>;
    }

    render() {

        const onViewChange = this.props.onViewChange;
        const Error = this.renderError.bind(this);

        if (this.state.name != "") {
            return <div>Hoşgeldiniz {this.state.name}  !</div>
        } else {
            return (
                <div>

                    <form className="form-inline">
                        <div className="form-group">
                            <input maxLength="35" type="text" className="form-control" placeholder="E-Posta" value={this.state.email} onChange={this.emailChanged.bind(this)} />
                        </div>
                        <div className="form-group mx-sm-3">
                            <input maxLength="15" type="password" className="form-control" placeholder="Şifre" value={this.state.password} onChange={this.passwordChanged.bind(this)} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.onUserClick.bind(this)}>Giriş Yap</button>
                        <a href="#" onClick={e => {
                            e.preventDefault();
                            onViewChange(3);
                        }}>Şifremi Unuttum!</a>
                    </form>
                    {this.state.hasError ? <Error /> : null}
                    <p>
                        Henüz üye olmadınız mı? <br />
                        Ücretsiz kayıt olmak için <b><u><a style={{ fontSize: "18px" }} href="#" onClick={e => {
                            e.preventDefault();
                            onViewChange(2);
                        }} >tıklayınız.</a></u></b>
                    </p>
                </div>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        userInit: (user) => dispatch(userInit(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
// export default LoginView;