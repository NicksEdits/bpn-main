import React, { useEffect, useState } from 'react'
import Routes from './routes/routes'
import { UidContext } from './components/AppContext';
import axios from 'axios';

function App() {

  const [uid, setUid] = useState(null);
  
  useEffect(() => 
  {
    const fetchToken = () => 
    {
      axios({
        method: "get",
        url: "/jwtid",
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.split("")[0] !== "<"){
          setUid(res.data);
        }
        else setUid(null)
      })
      .catch(() => console.log("No token"));
    }; 
    fetchToken();
  }, [uid]);


  return (
      <UidContext.Provider value={uid}>
        <Routes/>
      </UidContext.Provider>  
  );
}

export default App;
