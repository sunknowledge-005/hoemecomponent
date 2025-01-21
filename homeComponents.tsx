import React,{useState} from "react";
import { Link, useNavigate  } from "react-router-dom";
import LOGO from "../../../assets/img/logo.png";
import axios from 'axios';
import sessionStore from '../../../common/sessionStoreComponent';
import { Validation } from "../patient/commonPatientIndex";
import CommonConfig from '../../../common/commonConfig';
import {newTab} from '../../common/windowPopUp';
import { useAppDispatch,useAppSelector,callSettingSaveApi,executeArgs,settingStoreStateReset,CommonSettingConfig,commonConfig } from "../setting/commonSettingIndex";
import { security,initialObj,requiredFields,homeStateObject,keycloak_security,request_domain } from "./config";
import { cloneDeep } from "lodash";
// require('dotenv').config()

const obj = {
     isDigit:Boolean(false),
     isUpper:false,
     isLower:false,
     isSpecialChar:false,
     isCheckedLength:false,
     isWhiteSpace:false
}
var isLogin = false;
const ACCESSTOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJpcTdkMjl3SS03Vl9FejBSVmduek9Yc2hvWVE1Mko1ek5jUkxWS1NKNGNjIn0.eyJleHAiOjE3Mzc3ODk5ODQsImlhdCI6MTczNzM1Nzk4NCwianRpIjoiNTg1M2E2ZWEtMTg0MS00NGNmLTk1YTItNWFhOGIzYWFkM2Q4IiwiaXNzIjoiaHR0cDovLzEwLjEwLjYuMTM6OTA4MC9yZWFsbXMvamhpcHN0ZXIiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNGM5NzM4OTYtNTc2MS00MWZjLTgyMTctMDdjNWQxM2EwMDRiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW50ZXJuYWwiLCJzZXNzaW9uX3N0YXRlIjoiZTcwN2YwYjctMjRkMS00OTg2LTg0MDAtNzI2ZjE0N2ZkZmJlIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly8xMC4xMC42LjEyOjgwODEiLCJodHRwOi8vMTAuMTAuNi4yNjozMDAwIiwiaHR0cDovLzEwLjEwLjYuMTY6MzAwMC8iLCJodHRwOi8vMTAuMTAuNi4xMzozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJST0xFX1VTRVIiLCJvZmZsaW5lX2FjY2VzcyIsIlJPTEVfQURNSU4iLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiJlNzA3ZjBiNy0yNGQxLTQ5ODYtODQwMC03MjZmMTQ3ZmRmYmUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicm9sZXMiOlsiUk9MRV9VU0VSIiwib2ZmbGluZV9hY2Nlc3MiLCJST0xFX0FETUlOIiwidW1hX2F1dGhvcml6YXRpb24iXSwibmFtZSI6IkFkbWluIEFkbWluaXN0cmF0b3IiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJBZG1pbiIsImZhbWlseV9uYW1lIjoiQWRtaW5pc3RyYXRvciIsImVtYWlsIjoiYWRtaW5AbG9jYWxob3N0In0.FI3d6-VkmICvuJ1IoGtXvCansBKjIq0O1g6sTM4mt-_XVjUMIn45G5kq4WEbWSE5zMgE9xJBA_LVNbbjojWMxZt15aIVKlw168mUDPU6tLuTJrP8OLIeSSykWQscLrychZa3EWDTz4kmT6EAqM7zS1FD8KSepqb1E1v5gfCw95QD04HZiR-u6kBcRfSedR1dXF2vf1PbA-ZDQ2u-hgUEwwTDmWyHdG9OMH-aYMNE_A-c_35I-VTX5NK3TGflaJOkCI64yNYaaJgJbPsqBmApZLXVkK6fTXDYDH4dvtuwLXi-NRhNkj9ASdsMQx6pH0hJVYW_sXiI1cDQd9eFvQwAfA";
 
function Home() {
  const navigate = useNavigate();
  const session = new sessionStore();

     /************************************ ****************************************/
     const dispatch = useAppDispatch();
     const [password, setPassword] = useState("Abc.@678");
      const [errorMessage, setErrorMessage] = useState("");
      const [state,setState] = useState(cloneDeep(obj));
      const [loginState,setLoginState] = useState(cloneDeep(initialObj));
      const [stateObject,setStateObject] = useState(cloneDeep(homeStateObject));
      const _getUser = useAppSelector((state)=>state.setting.saveLogin);
     

/********************************************************************************* */


     const loginFunc = () =>{
          const keycloakUrl = security.key_cloak_url;         console.log("1>>keycloakUrl>>",keycloakUrl)     
          const clientId = security.client_id;               console.log("1>>clientId>>",clientId)   
          const clientSecret = security.client_secret;     console.log("1>>clientSecret>>",clientSecret)   
          const getToken = async () => {
            try {
              const response = await fetch(keycloakUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
                },
                body: new URLSearchParams({
                  'grant_type': security.grant_type,
                }),
              });
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const data = await response.json(); console.log("data>>",data);
              
              if(!!data.access_token){
                const keycloakUrl = keycloak_security.key_cloak_url;  console.log("2>>keycloakUrl>>",keycloakUrl);           
                // const clientId = keycloak_security.client_id;          console.log("2>>clientId>>",clientId); 
                // const clientSecret = keycloak_security.client_secret;  console.log("2>>clientSecret>>",clientSecret); 
      
                const clientId = security.client_id;          console.log("2>>clientId>>",clientId); 
                const clientSecret = security.client_secret;  console.log("2>>clientSecret>>",clientSecret);
                const username = 'admin';
                const password = 'admin';
                const getHipsterToken = async() =>{
                  try{
                    const response = await fetch(keycloakUrl, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
                      },
                      body: new URLSearchParams({
                        'grant_type': keycloak_security.grant_type,
                      }),
                    });
                    if (!response.ok) {
                      throw new Error(`HTTP jhipster error! Status: ${response.status}`);
                    }
                    const dataHip = await response.json(); 
                    console.log("dataHip>>",dataHip);
                    
                    if(!!dataHip.access_token){
                      let fields = {...loginState};
                      /* @ts-ignore */
                      const validationObj = new Validation();
                      console.log("fields>>",fields);
                      console.log("requiredFields>>",requiredFields);
                      const submitStatus = validationObj.fieldValidation(fields, requiredFields);
                      if (submitStatus === 0) {
                          setStateObject({ ...stateObject, isError: 1 });
                      } 
                      else {
                        setStateObject({ ...stateObject, isError: 0, isSave:true });
                        const dataFields = {...fields};
                        isLogin = true;
                        var postData = {
                          username: dataFields.username,
                          password: dataFields.password
                        };   
                        console.log("postData>>",postData)        
                        let axiosConfig = {
                          headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${dataHip.access_token}`
                          }
                        };   
                        //http://10.10.6.12:8081/services/settings/api/validateLogin        
                        axios.post(request_domain+'/'+CommonSettingConfig.COMPONENT_SETTINGS+'/'+CommonSettingConfig.VALIDATE_LOGIN, postData, axiosConfig)
                        .then((res) => {
                         console.log("res.data>>",res.data)
                          if(!!res && !!res.data && !!res.data.data && Object.keys(res.data.data).length>0){
                              session.storeSecureData(CommonConfig.SESSION_TOKEN, res.data.token);
                              const {firstName,lastName,username,roleName,userId,roleId,fullName} = res.data.data;
                              const stringifyObj = JSON.stringify({firstName,lastName,username,roleName,userId,roleId,fullName});
                              console.log("stringifyObj>>",stringifyObj);
                              session.storeSecureData(CommonConfig.SESSION_USER_DETAILS, stringifyObj);
                              navigate('/dashboard');
                          }
                          else{
                             /* @ts-ignore */
                            showNotify(res.data.message, "error");
                          }
                        })
                        .catch((err) => {
                          console.log("AXIOS ERROR: ", err);
                        })
                      }
                    }
                  }
                  catch(error){
                    console.error('Error obtaining jhipster token:', error);
                  }
                }
                getHipsterToken();  
              }
            } 
            catch (error) {
              console.error('Error obtaining token:', error);
            }
          };
          getToken();
     }

     const checkTime = () =>{
          console.log("calling............")
          setTimeout(()=>{
              newTab('/logoutnotify','_blank')
          },5000)
     
          // setTimeout(function() {
          //      newTab('/logoutnotify','_blank');
          //  }, 3000)
     }

// console.log('REACT_APP_API_KEY', process.env.REACT_APP_API_KEY);z
// console.log(process.env);
  const _handleLogin = () =>{
     session.storeSecureData(CommonConfig.SESSION_TOKEN, ACCESSTOKEN);
     navigate('/dashboard');
     //loginFunc();
   }

 
  const _handleChange = (event:any) =>{
    let fields = {...loginState};
    let fieldName = event.target.name;
    let fieldValue = event.target.value;
    //@ts-ignore
    fields[fieldName] = fieldValue;
    setLoginState(fields);
  }
 //@ts-ignore
  const checkPasswordValidity = (value) => {
    let fields = {...state};
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      fields['isWhiteSpace'] = false;
    }
    else if(isNonWhiteSpace.test(value)){
      fields['isWhiteSpace'] = true;
    }
 
  const isContainsUppercase = /^(?=.*[A-Z]).*$/;
  if (!isContainsUppercase.test(value)) {
    fields['isUpper'] = false;
  }
  else if(isContainsUppercase.test(value)){
    fields['isUpper'] = true;
  }
 
  const isContainsLowercase = /^(?=.*[a-z]).*$/;
  if (!isContainsLowercase.test(value)) {
    fields['isLower'] = false;
  }
  else if(isContainsLowercase.test(value)){
    fields['isLower'] = true;
  }
 
 
  const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
  if (!isContainsSymbol.test(value)) {
    fields['isSpecialChar'] = false;
  }
  else{
    fields['isSpecialChar'] = true;
  }
 
  const isValidLength = /^.{8,20}$/;
  if (!isValidLength.test(value)) {
    fields['isCheckedLength'] = false;
  }
  else{
    fields['isCheckedLength'] = true;
  }
 
  const isContainsNumber = /^(?=.*[0-9]).*$/;
  if (!isContainsNumber.test(value)) {
    fields['isDigit'] = false;
  }
  else if(isContainsNumber.test(value)){
    fields['isDigit'] = true;
  }
  setState(fields);
  //return null;
}
  const _handlePassword = (event:any) =>{
    let new_pass = event.target.value;
    if(!!new_pass){
      setPassword(new_pass);
      checkPasswordValidity(new_pass);
    }
    else{
      setErrorMessage("");
    }
  }
  return (
     <main>
     <div className="container">
       <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
         <div className="container">
           <div className="row justify-content-center">
             <div className="col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center">
               <div className="d-flex justify-content-center py-4 login">
                 <Link to="index.html" className="logo d-flex align-items-center w-auto">
                   <img src={LOGO} alt="logo" />
                   <span className="d-none d-lg-block">DME Billing</span>
                 </Link>
               </div>
               <div className="card mb-4">
                 <div className="card-body">
                   <div className="pt-4 pb-2">
                     <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                     <p className="text-center small">
                       Enter your username & password to login
                     </p>
                   </div>
                   <div className="row g-3 needs-validation">
                     <div className="col-12">
                       <label htmlFor="yourUsername" className="form-label">
                         Username <span>*</span>
                       </label>
                       <div className="input-group has-validation">
                         <span className="input-group-text" id="inputGroupPrepend">@</span>
                         <input type="text" name="username" className="form-control" id="username" value={loginState.username} onChange={(e)=>_handleChange(e)} />
                         <div className="invalid-feedback">
                           Please enter your username.
                         </div>
                       </div>
                        {/* @ts-ignore */}
                        <Validation data={{field: "username", value: loginState.username || '', isError: stateObject.isError, validationType: 'field'}} />
                     </div>
                     <div className="col-12">
                       <label htmlFor="yourPassword" className="form-label">Password <span>*</span></label>
                       <input type="password" maxLength={20} minLength={8} name="password" className="form-control" id="yourPassword" onChange={(e)=>_handleChange(e)} required />
                       <div className="invalid-feedback">
                         Please enter your password!
                       </div>
                       {/* @ts-ignore */}
                       <Validation data={{field: "Password", value: loginState.password || '', isError: stateObject.isError, validationType: 'field'}} />
                       <hr/>
                       {/* <div>
                         <ul>
                           {!!state.isDigit?
                           <li style={{color:"green"}}>Password contains at least one digit!</li>
                             :
                             <li style={{color:"black"}}>Password contains at least one digit!</li>
                           }
                           {!!state.isUpper? 
                             <li style={{color:"green"}}>Password contains at least one uppercase letter!</li>
                             :
                             <li style={{color:"black"}}>Password contains at least one uppercase letter!</li>
                           }
                           {!!state.isLower?
                             <li style={{color:"green"}}>Password contains at least one lowercase letter!</li>
                             :
                             <li style={{color:"black"}}>Password contains at least one lowercase letter!</li>
                           }
                           {!!state.isSpecialChar?
                             <li style={{color:"green"}}>Password contains at least one special character!</li>
                             :
                             <li style={{color:"black"}}>Password contains at least one special character!</li>
                           }
                           {!!state.isSpecialChar?
                             <li style={{color:"green"}}>Password contains between 8-20 character!</li>
                             :
                             <li style={{color:"black"}}>Password contains between 8-20 character!</li>
                           }
                           {!!state.isWhiteSpace?
                             <li style={{color:"green"}}>Password must not contain Whitespaces.!</li>
                             :
                             <li style={{color:"black"}}>Password must not contain Whitespaces.!</li>
                           }
                         </ul>
                       </div>
                       <div style = {{ color: "red" }}> {errorMessage} </div> */}
                     </div>
                     <div className="col-12">
                       <div className="form-check">
                         <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                         <label className="form-check-label" htmlFor="rememberMe">
                           Remember me
                         </label>
                       </div>
                     </div>
                     <div className="col-12">
                       <button onClick={()=>_handleLogin()} className="btn btn-primary w-100">Login</button>
                     </div>
                     <div className="col-12">
                       <p className="small mb-0">
                         Dont have account?{" "}
                         <Link to="pages-register.html">
                           Create an account
                         </Link>
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>
     </div>
   </main>
  );
}
 
export default Home;
