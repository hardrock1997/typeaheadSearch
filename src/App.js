import './App.css';
import { useState} from 'react';
import useFetch from './useFetch';
import Search from './Search';

function App() {
  const [searchQuery,setSearchQuery] = useState('');
  const state=useFetch(searchQuery)
  function handleSearchQuery(e) {
    setSearchQuery(e.target.value);
  }
  return (
    <div className="App">
        <Search searchQuery={searchQuery} handleSearchQuery={handleSearchQuery}/>
        {state.loading && <h1>Loading...</h1>}
        {state.error!=='' && <h1>Error...</h1>}
       
        <div className='suggestions'>
          {searchQuery!=='' && state.data.map((ele)=>{
          return (
            <h3 key={ele.id}>{ele.title}</h3>
        )
        })}
        </div>
    </div>
  );
}

export default App;
