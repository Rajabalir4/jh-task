import React, { Component } from 'react'

export default class FriendDetailsCard extends Component {
    render() {
        let {friend,toggleFavorite,deleteItem} = this.props;
        return (
            <div className="friend-details-card">
                <div className="text-wrapper">
                    <span className="text-lg">{friend.name}</span>
                    <span className="text-sm">is your friend</span>
                </div>
                <div className="img-wrapper">
                    <img className="img-button" src={friend.favorite?require("../assets/images/star.svg").default:require("../assets/images/star-gray.svg").default} onClick={()=>toggleFavorite(friend.id)} alt="favorite"/>
                    <img className="img-button" src={require("../assets/images/delete.svg").default} onClick={()=>deleteItem(friend.id)} alt="delete"/>
                </div>
            </div>
        )
    }
}
