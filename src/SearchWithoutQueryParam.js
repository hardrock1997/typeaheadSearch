import useFetchWithoutQueryParam from './useFetchWithoutQueryParam';
import Search from "./Search";
import { useState} from 'react';
import React from 'react';
import './App.css';

export default function SearchWithoutQueryParam() {

    const [searchQuery,setSearchQuery] = useState('');
    const [state]=useFetchWithoutQueryParam();

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
            {state.data.filter((d)=>{
                if(searchQuery!=='') {
                   return d.title.toLowerCase().includes(searchQuery); 
                }
                else {
                    return d;
                }
            }).map((ele)=>{
                return (
                    <React.Fragment key={ele.id}>
                        <h3>{ele.title}</h3>
                        <hr/>
                    </React.Fragment>
                )
            })
            }
            </div>
        </div>
    )
}