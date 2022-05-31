import { useEffect, useState } from "react";
import Home from "./screens/home";
import Login from "./screens/login";
import { setClientToken } from "./spotify";

function App() {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    console.log(token)
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split('&')[0].split('=')[1];
      window.localStorage.setItem('token', _token)
      setToken(_token);
      setClientToken(_token);
    } else {
      setClientToken(token);
    }
  }, [token])

  return (
    <div>
      {!token ? <Login /> :
        <Home />}
    </div>
  );
}

export default App;
