import React, {useState, useEffect} from "react";
import './App.css';
import Axios from "axios";

function App() {
  //initialize form object & corresponding key-value pairs
  const [form, setForm] = useState({});


  const [userList, setUserList] = useState([]);

  //get user information from database when app starts
  useEffect(()=>{
    setForm({
      regemail:"",
      regpassword:"",
      regclinicName:"",
      regphoneNumber:"",
      regaddress:"",
      userLoginEmail:"",
      userLoginPassword:""
    });
    
    getUser();
  }, []);



 
  

  //get user information from database
  const getUser = ()=>{
    Axios.get('http://localhost:4469/api/get').then(
    (response)=>{
      setUserList(response.data)
    })
  }

  //When user clicked the "register" button
  const registerButtonClicked = () => {
    Axios.post('http://localhost:4469/api/register',{
      email: form.regemail,
      password: form.regpassword,
      clinicName: form.regclinicName,
      phoneNumber: form.regphoneNumber,
      address: form.regaddress
    }).then( () => {
      alert("sucessful insert");
      clearField();
      getUser();
    });
  };

  //When user clicked the "log in" button
  const loginButtonClicked = () => {
    Axios.post('http://localhost:4469/api/login',{
      email: form.userLoginEmail,
      password: form.userLoginPassword
    }).then( () => {
      alert("sucessful login");
      clearField();
    });
  };

  //create a function to clear all the input field based on user actions
  function clearField(){
    // var a = document.querySelectorAll("input[type='text']");
    // for(var i=0; i<a.length; i++){
    //   a[i].value = "";
    //   form[a[i].name]="";
    // }
    setForm({
      regemail:"",
      regpassword:"",
      regclinicName:"",
      regphoneNumber:"",
      regaddress:"",
      userLoginEmail:"",
      userLoginPassword:""
    });
    console.log(form);
    
  }

    //set form object key-value pair, store the data into form object
    const handleFieldOnChange = (e)=>{
      form[e.target.name] = e.target.value;
      console.log(form);
    }

  //return and render the application's first page
  return <div className="App">
    <h1>Clinic User Registration</h1>
    <div className="form">
      <div className="fieldName">Email: </div>
      <input type="text" name="regemail" onChange={(e)=>{
        handleFieldOnChange(e)
      }}></input>
      <button onClick={clearField}>Clear</button>



      <div className="fieldName">password: </div>
      <input type="text" name="regpassword" onChange={(e)=>{
        handleFieldOnChange(e)
      }}></input>
      <div className="fieldName">Clinic Name: </div>
      <input type="text" name="regclinicName" onChange={(e)=>{
        handleFieldOnChange(e)
      }}></input>
      <div className="fieldName">Phone number: </div>
      <input type="text" name="regphoneNumber" onChange={(e)=>{
        handleFieldOnChange(e)
      }}></input>
      <div className="fieldName">Address: </div>
      <input type="text" name="regaddress" onChange={(e)=>{
        handleFieldOnChange(e)
      }}></input>
    </div>
    <button onClick={registerButtonClicked}>Register</button>


    <h1>Clinic User Log in</h1>
    <div className="form">
      <div className="fieldName">Email: </div>
      <input type="text" name="userLoginEmail" onChange={(e)=>{
        handleFieldOnChange(e)
      }}></input>
      <div className="fieldName">password: </div>
      <input type="text" name="userLoginPassword" onChange={(e)=>{
        handleFieldOnChange(e)
      }}></input>
    </div>
    <button onClick={loginButtonClicked}>Login</button>



    {/* Show user information from database ( for development ) */}
    {userList.map((val)=>{
      return <div>email: {val.email}, clinic name: {val.clinicName}</div>
    })}
  </div>
}

export default App;
