import React from 'react'
import { browserHistory } from 'react-router';
import * as Http from 'utils/http.helper'

class Foods extends React.Component {

    constructor() {
        super();

        this.state = {
            foodList: [],
            hasError: false,
            errorMessage: ""
        }
    }

    componentDidMount() {
        // HTTP Call
        Http.post('Foods/getFoodList', null).then(res => {
            if (res.durum) {
                res.data.forEach(element => {
                    this.setState(res => {
                        const foodList = res.foodList.push(element);
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

    onDeleteFoodClick(_id, email) {
        const food = {
            _id: _id,
            email: email
        }

        Http.post('Foods/deleteFood', food).then(res => {
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
                <h1>Yemekler</h1>
                <div className="table-responsive">
                    <table className="table col-md-12" id="myTable" >
                        <thead className="thead-dark">
                            <tr>
                                <th width="11%">ID</th>
                                <th width="20%">Yemek Adı</th>
                                <th width="39%">Yemek Malzemeleri</th>
                                <th width="5%">Kalorisi</th>
                                <th width="5%">Zamanı</th>
                                <th width="15%">Oluşturma tarihi</th>
                                <th width="5%">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="table-success">

                            {this.state.foodList.map((foods, index) => {
                                return (
                                    <tr key={foods._id}>
                                        <td>{foods._id}</td>
                                        <td>{foods.foodName}</td>
                                        <td>
                                            {foods.materials.map((materials, index) => {
                                                return (
                                                    <span key={materials}>{materials}, </span>
                                                );
                                            })}
                                        </td>
                                        <td>{foods.calories}</td>
                                        <td>{foods.time}</td>
                                        <td>{foods.dateCreated.substr(0, 10)}</td>
                                        <td><img src={require("../../styles/images/delete.png")} width="30px" onClick={this.onDeleteFoodClick.bind(this, foods._id, foods.email)} /> </td>
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


export default Foods;
