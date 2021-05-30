import React, {useState, useEffect} from "react";
import './App.css';
import Axios from "axios";

function App() {
  //initialize form object & corresponding key-value pairs
  const [form, setForm] = useState({
    regemail:"",
    regpassword:"",
    regclinicName:"",
    regphoneNumber:"",
    regaddress:"",
    userLoginEmail:"",
    userLoginPassword:""
  });
  const regemail = form.regemail;
  const regpassword = form.regpassword;
  const regclinicName = form.regclinicName;
  const regphoneNumber = form.regphoneNumber;
  const regaddress = form.regaddress;
  const userLoginEmail = form.userLoginEmail;
  const userLoginPassword = form.userLoginPassword;
  
  
  const [userList, setUserList] = useState([]);

  //get user information from database when app starts
  useEffect(()=>{
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
    console.log(form.regemail);
    Axios.post('http://localhost:4469/api/no',{
      email: form.regemail,
      password: form.regpassword,
      clinicName: form.regclinicName,
      phoneNumber: form.regphoneNumber,
      address: form.regaddress
    }).then( () => {
      alert("sucessful insert");
      // clearField();
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
      // clearField();
    });
  };

  //create a function to clear all the input field based on user actions
  function clearField(){
    setForm({
      regemail:"",
      regpassword:"",
      regclinicName:"",
      regphoneNumber:"",
      regaddress:"",
      userLoginEmail:"",
      userLoginPassword:""
    });
  }

  //set form object key-value pair, store the data into form object
  const handleFieldOnChange = (e)=>{
    if(e.keyCode === 8 /*&& form[e.target.name].length > 0*/){
      // form[e.target.name] = form[e.target.name].substring(0,form[e.target.value].length)-1
      console.log("backspace");
    }
    else{
      form[e.target.name] = form[e.target.name] + e.target.value;
    }
    
    console.log(form);
  }

  //return and render the application's first page
  return <div className="App">
    <h1>Clinic User Registration</h1>
    <div className="form">
      <div className="fieldName">Email: </div>
      <input type="text" name="regemail" onChange={(e)=>{
        handleFieldOnChange(e)
      }} value={regemail}></input>
      <div className="fieldName">password: </div>
      <input type="text" name="regpassword" onChange={(e)=>{
        handleFieldOnChange(e)
      }} value={regpassword}></input>
      <div className="fieldName">Clinic Name: </div>
      <input type="text" name="regclinicName" onChange={(e)=>{
        handleFieldOnChange(e)
      }} value={regclinicName}></input>
      <div className="fieldName">Phone number: </div>
      <input type="text" name="regphoneNumber" onChange={(e)=>{
        handleFieldOnChange(e)
      }} value={regphoneNumber}></input>
      <div className="fieldName">Address: </div>
      <input type="text" name="regaddress" onChange={(e)=>{
        handleFieldOnChange(e)
      }} value={regaddress}></input>
    </div>
    <button onClick={registerButtonClicked}>Register</button>


    <h1>Clinic User Log in</h1>
    <div className="form">
      <div className="fieldName">Email: </div>
      <input type="text" name="userLoginEmail" onChange={(e)=>{
        // handleFieldOnChange(e)
        setForm(userLoginEmail=>e.target.value);
      }} value={userLoginEmail}></input>
      <div className="fieldName">password: </div>
      <input type="text" name="userLoginPassword" onChange={(e)=>{
        // handleFieldOnChange(e)
        setForm(userLoginPassword=>e.target.value);
      }} value={userLoginPassword}></input>
    </div>
    <button onClick={loginButtonClicked}>Login</button>



    {/* Show user information from database ( for development ) */}
    {userList.map((val)=>{
      return <div>email: {val.email}, clinic name: {val.clinicName}</div>
    })}
  </div>
}

export default App;
