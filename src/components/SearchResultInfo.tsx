
type Props ={
    total:number;
    city:string;
}

const SearchResultInfo = ({total,city}:Props) => {
  return (
    <div className="text-xl font-bold flex flex-col">
     {total} Restaurant found in {city}
    </div>
  )
}

export default SearchResultInfo