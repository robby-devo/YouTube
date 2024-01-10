import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constant";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [suggestions,setSuggestions] = useState([])

  const [showSuggestions,setShowSuggestions] = useState(false)

  const dispatch = useDispatch();

  const searchCache = useSelector((store)=>store.search)



  useEffect(()=>{

    console.log("searchquery",searchQuery)



    // make an api call after every key press
    // but if the difference between 2 api call is <200ms
    // decline the API call

    const timer = setTimeout(() => {

      if(searchCache[searchQuery]){
        setSuggestions(searchCache[searchQuery])

      }else{
        getSearchSuggestions()
      }
    getSearchSuggestions()
      
    }, 200);


    return ()=>{
      clearTimeout(timer)
    }


  },[searchQuery])

  const getSearchSuggestions = async()=>{

    console.log("API CALL" ,searchQuery)

    const data = await fetch(YOUTUBE_SEARCH_API+searchQuery)
    const json = await data.json()

    console.log("json",json)
    setSuggestions(json[1])

  }

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1 ">
        <img
          className="h-8 cursor-pointer"
          src="https://static.vecteezy.com/system/resources/thumbnails/021/190/402/small_2x/hamburger-menu-filled-icon-in-transparent-background-basic-app-and-web-ui-bold-line-icon-eps10-free-vector.jpg"
          alt="hma"
          onClick={() => {
            toggleMenuHandler();
          }}
        />

        <img
          className="h-8 mx-2"
          src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg"
          alt="logo"
        />
      </div>

      <div className="col-span-10 px-10 ">
        <div>

        <input
          className="w-1/2 border border-gray-400 p-2 rounded-l-full
        "
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onFocus={()=>{
            setShowSuggestions(true)
          }}

          onBlur={()=>{
            setShowSuggestions(false)
          }}
        />

        <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">
          Search
        </button>
        </div>

       {showSuggestions &&  (<div className="fixed bg-white py-2 px-5 w-[31rem] shadow-lg rounded-lg border border-gray-100 ">
          <ul >
            {/* <li className="py-2 px-3 shadow-sm hover:bg-gray-100">Iphone</li> */}
            {suggestions.map((suggest)=>{
              console.log("val",suggest)
              return (
                <li  key={suggest} className="py-2 px-3 shadow-sm hover:bg-gray-100">{suggest}</li>
              )
            })}
            

          

          </ul>
        </div>)}

      </div>

      <div>
        <img
          className="h-8"
          src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
          alt="user"
        />
      </div>
    </div>
  );
};

export default Head;
