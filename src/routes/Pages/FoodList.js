import React from 'react'
import { Link } from 'react-router';
import * as Http from 'utils/http.helper'
import FoodDetail from './FoodDetail';
import jwt from 'jsonwebtoken';

class FoodList extends React.Component {

    constructor() {
        super();

        this.state = {
            FoodList: [],
            hasError: false,
            errorMessage: ""
        }
    }

    componentDidMount() {
        // HTTP Call
        const decodedUser = localStorage.length != 0 ? jwt.verify(localStorage.getItem('userToken'), 'Empayfi',) : "";
        const foodMaterials = {
            foodMaterials: this.props.location.state.materials,
            userFavoriteFood: decodedUser.userFavoriteFood
          }
          console.log(foodMaterials);
        Http.post('Foods/getFood', foodMaterials).then(res => {
            if (res.durum) {
                res.data.forEach(element => {
                    this.setState(res => {
                        const FoodList = res.FoodList.push(element);
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

    render() {
        const decodedUser = localStorage.length != 0 ? jwt.verify(localStorage.getItem('userToken'), 'Empayfi',) : "";
        console.log(decodedUser);
        return (
            <div style={{ paddingTop: "5%" }}>
                <div className="card-container">
                    <div className="row">
                        {this.state.FoodList.map((Foods, index) => {
                            return (
                                <div className="col-md-3" style={{ marginTop: "1%" }} key={Foods._id}>
                                    <div className="card">
                                        {/* <Link to={(window.location.pathname) == "/Admin/YemekListesi" ? "/Admin/YemekDetayi" : "/YemekDetayi"} style={{ textDecoration: 'none' }}> */}
                                        <Link to={{
                                            pathname: (window.location.pathname) == "/Admin/YemekListesi" ? "/Admin/YemekDetayi" : "/YemekDetayi",
                                            state: {
                                                foodID: Foods._id,
                                                foodName: Foods.foodName,
                                                userID: decodedUser.userID
                                            }
                                            }}>
                                            <div className="view overlay">
                                                <span className="time">
                                                    <svg width="30px" height="40px" viewBox="0 0 16 16" className="bi bi-clock" fill="white">
                                                        <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z" />
                                                        <path fillRule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />

                                                    </svg>
                                                    {Foods.time}dk
                                                </span>
                                                <img style={{width:"50%"}} src={Foods.image} alt="Card image cap" />
                                            </div>
                                            <div className="card-body">
                                                <h4 className="card-title">{Foods.foodName}</h4>
                                                <p className="card-text"> {Foods.recipe.substr(0,85)}... </p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                        {this.state.FoodList == 0 ? <h3 className="container" style={{paddingTop:"160px"}}> Elinizdeki malzemelere uygun yemek bulunamadı </h3> : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default FoodList;
