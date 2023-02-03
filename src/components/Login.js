import React , {useState} from 'react'
import {useNavigate} from 'react-router-dom';

export default function Login(props) {

    let navigate = useNavigate();
    const [credentials , setCredentials] = useState({ name:"" , email:"" , password:"" , cpassword:""})
   
    const handleSubmit = async(e)=> {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json'
          } ,
          body:JSON.stringify({email:credentials.email , password:credentials.password})
          })
          const json = await response.json();
          console.log(json)

          if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logged in  Successfully" , "success");
            navigate("/");
          }
          else{
            props.showAlert("Invalid Details", "danger");
          }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="email" className='form-label'>Email address</label>
    <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group form-label">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
