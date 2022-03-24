import React from 'react'; 
import { useNavigate, Link } from 'react-router-dom'


const ErrorPage = props => {
    const navigate = useNavigate();
return (
    <div className = 'error'>
        <p className = 'error-page'>Oopsies! This ultimate little axolotl doesn't recognize you.</p>
        <Link to='/'><button>Maybe try again?</button></Link>
        <button onClick = {() => navigate('/newUser-Contacts')}>Create an account</button>
    </div>
)

}; 
 



export default ErrorPage;