export default function Search({searchQuery,handleSearchQuery}) {
    return (
        <div>
            <input type='text' className='searchbar' value={searchQuery} onChange={handleSearchQuery}/>
        </div>
    )
}