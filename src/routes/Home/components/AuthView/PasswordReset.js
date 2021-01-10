import React from 'react';

const PasswordReset = ({onViewChange}) => (
    <div>
        <form className="form-inline">
            <div className="form-group">
                <input maxLength="35" style={{width:"425px", marginRight:"10px", marginTop: "-7px"}} type="text" className="form-control" id="staticEmail2" placeholder="EPosta" />
            </div>
            <button type="submit" className="btn btn-primary mb-2">Şifremi Sıfırla</button>
        </form>

        <p>
            Üye Giriş yapmak için <b><u><a style={{fontSize:"18px"}} href="#" onClick = {e => {
                e.preventDefault();
                onViewChange(1);
            }}>tıklayınız.</a></u></b>
        </p>
    </div>
)

export default PasswordReset;