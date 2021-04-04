import React, { Component } from "react";
import FriendDetailsCard from "./FriendDetailsCard";
import SearchBox from "./SearchBox";

export default class FriendListContainer extends Component {
  state = {
    friendsList: [
      {
        id: 1,
        name: "rahul gupta",
        favorite: true,
      },
      {
        id: 2,
        name: "Rajab Nagori",
        favorite: false,
      }
    ],
    textField: "",
    rows: 4,
    activePage:1,
    searchString:""
  };
  render() {
    const { textField } = this.state;
    return (
      <div className="container">
        <div className="friends-list-wrapper">
            <SearchBox handleSearch={this.handleSearch}/>
         
          <input
            className="text-field"
            type="text"
            placeholder="Enter your friend's Name"
            value={textField}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
          />
          <div className="friends-list">{this.renderFriendsList()}</div>
          <div className="paging-bar">
          {this.renderPagingBar()}
          </div>
          
        </div>
      </div>
    );
  }


  renderPagingBar = ()=>{
    var { friendsList ,rows,activePage} = this.state;
    let noPages = Math.ceil(friendsList.length/rows)
    var pageElements = [];
    for (let i =1;i<=noPages;i++){
        pageElements.push(<span onClick={()=>{
            this.setState({activePage:i})}}
            className={activePage===i?"active-page":{}}
            >{i}</span>)
    }
    return pageElements
  }
 

  renderFriendsList = () => {
    const { friendsList ,rows,activePage,searchString} = this.state;

    let filteredList = [...friendsList.filter(friend=>{
        return friend.name.toLowerCase().includes(searchString.toLowerCase())
    })]
    

    const indexOfLastItem  = activePage * rows;
   const indexOfFirstItem = indexOfLastItem - rows;
   const tempList     = [...filteredList.slice( indexOfFirstItem, indexOfLastItem )];

    return tempList
      .reduce((acc, friend) => {
        if (friend.favorite) return [friend, ...acc];
        else return [...acc, friend];
      }, [])
      .map((friend) => (
        <FriendDetailsCard
          friend={friend}
          toggleFavorite={this.toggleFavorite}
          deleteItem={this.deleteItem}
          key={friend.id}
        />
      ));
  };

  handleKeyDown = (e) => {
    var { textField } = this.state;
    if (e.key === "Enter" && textField.length > 0) {
      const { friendsList } = this.state;
      // temp user data object
      let data = {
        id: new Date().valueOf() + Math.floor(Math.random() * 10),
        name: textField,
        favorite: false,
      };
      let newList = [data,...friendsList];

      this.setState({ textField: "", friendsList: newList });
    }
  };

  handleChange = (e) => {
    this.setState({ textField: e.target.value });
  };

  deleteItem = (id) => {
    const { friendsList } = this.state;
    let tempList = [...friendsList.filter((friend) => friend.id !== id)];
    this.setState({ friendsList: tempList });
  };

  toggleFavorite = (id) => {
    const { friendsList } = this.state;
    let objIndex = friendsList.findIndex((friend) => friend.id === id);
    let tempList = [...friendsList];
    tempList[objIndex].favorite = !friendsList[objIndex].favorite;
    this.setState({ friendsList: tempList });
  };

  handleSearch=(searchString)=>{
    this.setState({searchString:searchString})
  }
}
