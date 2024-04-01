import { useState } from 'react';
import './App.css'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios';

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  document.title = 'Login | DEMC';

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const authenticate = new Promise( (resolve, reject) => {
      axios.get(('http://localhost:3000/api/get/auth/getToken/' + username ), {
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`
        }
      })
      .then((response) => {
        if (response.status == 200) {
          setTimeout(() => {
            resolve(response);
          }, 3000)
        }
      })
      .catch((error) => {
        reject(error);
      })
    }) 
    toast.promise(
      authenticate,
      {
        pending: {
          render(){
            return "Logging In..."
          },
        },
        success: {
          render(){
            return 'Logged In As ' + username
          },
        },
        error: {
          render(){
            return "Incorrect username / Password."
          }
        }
      }
  )
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>DEMC - Login</h1>
        <input type="text" placeholder="Username" id='username' onChange={e => setUsername(e.target.value)} required/>
        <input type="password" placeholder="Password" id='password' onChange={e => setPassword(e.target.value)} required/>
        <button type="submit">Login</button>
      </form>
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      closeOnClick
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="colored"
      stacked
      />
    </div>
  )
}

export default App
