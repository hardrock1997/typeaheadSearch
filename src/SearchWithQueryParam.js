import useFetchWithQueryParam from "./useFetchWithQueryParam";
import Search from "./Search";
import { useState} from 'react';
import './App.css';
export default function SearchWithQueryParam() {
    const [searchQuery,setSearchQuery] = useState('');
    const state=useFetchWithQueryParam(searchQuery);
    function handleSearchQuery(e) {
        setSearchQuery(e.target.value);
      }
    return (
        <div className=".App">
            <Search searchQuery={searchQuery} handleSearchQuery={handleSearchQuery}/>
            {state.loading && <h1>Loading...</h1>}
            {state.error!=='' && <h1>Error...</h1>}
        
            <div className='suggestions'>
            {searchQuery!=='' && state.data.length===0 ? <h1 className='notfound'>Data not found</h1>:''}
            {searchQuery!=='' && state.data.map((ele)=>{
            return (
                <>
                <h3 >{ele.title}</h3>
                <hr/>
                </>
            )
            })}
            </div>
        </div>
    )
}