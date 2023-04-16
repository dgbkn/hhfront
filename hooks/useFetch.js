import { useState, useEffect } from 'react';



//  action=getBatches 

const BASE_API_URL ="https://hh.devgoyal3.repl.co/";

const useFetch = (part,authToken=null,isGet = true,body = null) => {
  const [data, setData] = useState(null);
  const [loading, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    var fetchParams = { 
      method: isGet ? 'GET' : 'POST' ,
      signal: abortCont.signal
     };

     if(auth){
      fetchParams.headers["Authorization"] = authToken;
     }

     if(!isGet & body){
      fetchParams.body = JSON.stringify(body),
      fetchParams.headers['Content-Type'] = 'application/json';
     }


     fetch(`${BASE_API_URL}${part}}`, fetchParams)
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('Could Not fetch the data for that resource');
        } 

        return res.json();
      })
      .then(data => {
        setIsPending(false);
        console.log(data);
        setData(data);
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      });

    // abort the fetch
    return () => abortCont.abort();
  }, [part])

  return { data, loading, error };
}
 
export default useFetch;