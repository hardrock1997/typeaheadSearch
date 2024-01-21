import {useReducer,useEffect} from 'react';

function reducer(state,action) {
  if(action.type==='fetch_data') {
    return {...state,data:action.payload,loading:false};
  }
  else if(action.type==='error') {
    return {...state,data:[],error:action.payload,loading:false};
  }
  else {
    return state;
  }
}

export default function useFetch(searchQuery) {
    const [state,dispatch] = useReducer(reducer,{data:[],loading:true,error:''});
    useEffect(()=>{
        async function getData() {
          try{
            const res=await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
            if(res.ok) {
              const data=await res.json();
              dispatch({type:'fetch_data',payload:data.products})
            }
            else {
              throw new Error(`HTTP error! Status: ${res.status}`)
            }
           
          }
          catch(error) {
            console.log(error)
            dispatch({type:'error',payload:error})
          }
        }
        getData();
      },[searchQuery]);
      return state;
}