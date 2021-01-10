import React from 'react';
import LoginView from './LoginView';
import SignUpView from './SignUpView';
import PasswordReset from './PasswordReset';

class AuthView extends React.Component {

    constructor() {
        super();

        // 1: Giriş ekranı
        // 2: Kayıt Ekranı
        // 3: Şifre Değişme Ekranı
        this.state = {
            currentView: 1

        }
    }

    changeView(newView){
        this.setState({
            currentView : newView
        })
    }

    render() {
        const view = this.state.currentView === 1
                        ? <LoginView onViewChange={this.changeView.bind(this)}/>
                        : this.state.currentView === 2
                        ? <SignUpView onViewChange={this.changeView.bind(this)}/>
                        : <PasswordReset onViewChange={this.changeView.bind(this)}/>
        return (
            view
        )
    }
}

export default AuthView;