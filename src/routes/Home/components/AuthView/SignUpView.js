import React from 'react';
import { browserHistory } from 'react-router';
import * as Http from 'utils/http.helper'

class SignUpView extends React.Component {

    constructor() {
        super();

        this.state = {
            name: "",
            email: "",
            password: "",
            hasError: false,
            errorMessage: "",
        }
    }

    onInputChanged(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSignUp(e) {
        e.preventDefault();

        if (this.state.email === "" || this.state.password === "" || this.state.name === "") {
            this.setState({
                hasError: true,
                errorMessage: "Lütfen tüm alanları doldurunuz!"
            });

            return;
        }

        Http.post('auth/sign-up', this.state)
            .then(res => {

                if (!res.durum) {

                    this.setState({
                        hasError: !res.durum,
                        errorMessage : res.error.code === 11000 ? "Bu email adresi sistemde kayıtlı" : "Beklenmeyen bir hata oluştu!"
                    })
                }

                if(res.durum){
                    browserHistory.push('/YemekAra');
                }

            });
    }

    renderError() {
        return <div className="alert alert-danger" style={{ width: "516px", "marginLeft": "auto", marginRight: "auto", "marginTop": "20px" }}>{this.state.errorMessage}</div>;
    }

    render() {
        const { onViewChange } = this.props;
        const Error = this.renderError.bind(this);
        return (
            <div>
                <form className="form-inline" style={{width:"800px"}} onSubmit={this.onSignUp.bind(this)}>
                    <div className="form-group">
                        <input maxLength="35" type="text" name="name" className="form-control" placeholder="İsim-Soyisim" value={this.state.name} onChange={this.onInputChanged.bind(this)} />
                    </div>
                    <div className="form-group" style={{marginLeft:"1%"}}>
                        <input maxLength="35" type="text" name="email" className="form-control" placeholder="E-Posta" value={this.state.email} onChange={this.onInputChanged.bind(this)} />
                    </div>
                    <div className="form-group" style={{marginLeft:"1%"}}>
                        <input maxLength="15" type="password" name="password" className="form-control" placeholder="Şifre" value={this.state.password} onChange={this.onInputChanged.bind(this)} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{marginLeft:"1%"}}>Kayıt Ol!</button>
                </form>

                {this.state.hasError ? <Error /> : null}
                <p>
                    Zaten üye misiniz? <br />
                    O zaman giriş yapmak için <b><u><a style={{ fontSize: "18px" }} href="#" onClick={e => {
                        e.preventDefault();
                        onViewChange(1);
                    }}>tıklayınız.</a></u></b>
                </p>
            </div >
        )
    }

}


export default SignUpView;