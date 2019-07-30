import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner';

const Logout = props => {
  console.log('logout props', props);
  useEffect(() => {
    setTimeout(props => {
      localStorage.clear();
      props.history.push("/"); }, 1000)
  }, []);

  return (
    <main className="logout">
      <Loader type="Circles" color="#FFCE00" height={80} width={80} />
      <p>Logging You Out</p>
    </main>
  )
}

export default Logout;