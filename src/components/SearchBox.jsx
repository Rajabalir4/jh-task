import React,{useState} from 'react'

export default function SearchBox(props) {
    let [query,setQuery] = useState("");
    let [showSearch,setShowSearch] = useState(false);
    const onChange = (e)=>{
        setQuery(e.target.value);
        props.handleSearch(e.target.value)
    }

    const toggleSearch = ()=>{
        props.handleSearch("");
        setQuery("");
        setShowSearch(!showSearch)
    }
    return (
        <div className="search-header-wrapper">
           {showSearch?
           <div className="search-box">
           <input  type="text" placeholder="Search..." onChange={onChange} value={query}/> 
            <img src={require("../assets/images/remove.svg").default} alt="search" onClick={toggleSearch}/>
            </div>:
            <div className="header-wrapper">
            <div className="heading">FriendsList</div>
            <img src={require("../assets/images/search.svg").default} alt="search" onClick={toggleSearch}/>
            </div>}
        </div>
    )
}
