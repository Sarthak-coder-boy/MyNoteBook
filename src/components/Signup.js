import React , {useState} from 'react'
import {useNavigate} from 'react-router-dom';

export default function Signup(props) {

  let navigate = useNavigate();
    const [credentials , setCredentials] = useState({name:"" , email:"" , password:"" , cpassword:""})

  const handleSubmit = async(e)=> {
    e.preventDefault();
    const {name , email , password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
    method: "POST",
        headers: { 'Content-Type': 'application/json'
      } ,
      body:JSON.stringify({name , email , password})
      })
      const json = await response.json();
      console.log(json)
      if(json.success){
        // Save the auth token and redirect
        localStorage.setItem('token',json.authtoken);
        props.showAlert("Account Created Successfully" , "success");
        navigate("/");
      }
      else{
        props.showAlert("Invalid Credentials" , "danger");
      }
}

const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name] : e.target.value})
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="name" className='form-label'>Name</label>
    <input type="text" className="form-control" id="name" name='name' onChange={onChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="email" className='form-label'>Email address</label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password" className='form-label'>Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required/>
  </div>
  <div className="form-group">
    <label htmlFor="cpassword" className='form-label'>Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
