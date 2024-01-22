import {useReducer,useEffect,useRef} from 'react';

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

export default function useFetchWithQueryParam(searchQuery) {
    const [state,dispatch] = useReducer(reducer,{data:[],loading:true,error:''});
    const timerRef = useRef(null);
    useEffect(()=>{
        async function getData(delay) {
          try{
            if(timerRef.current) {
              clearTimeout(timerRef.current);
            }
            timerRef.current=setTimeout(async()=>{
              const res=await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
              if(res.ok) {
                const data=await res.json();
                dispatch({type:'fetch_data',payload:data.products})
              }
              else {
                throw new Error(`HTTP error! Status: ${res.status}`)
              }
            },delay)   
          }
          catch(error) {
            dispatch({type:'error',payload:error})
          }
        }
        getData(800);
       
      },[searchQuery]);
      return state;
}