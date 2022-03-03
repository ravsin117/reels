import '../styles/globals.css'
import './signup.css'
import './login.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../component/Feed.css";
import "../component/Profile.css";

import Authwrapper from '../context/auth';

function MyApp({ Component, pageProps }) {
  return(
    <Authwrapper>
      <Component {...pageProps} /> 
    </Authwrapper>
    
    ) 
}

export default MyApp
