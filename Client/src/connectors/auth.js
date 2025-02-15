import axios from 'axios'

async function registerUser(formdata){ 
       try {
              const userAccount = await axios.post("/shopping/auth/register",formdata,{
                     headers: {
                            'Content-Type' : 'application/json'
                     }
              })
              if(userAccount){
                     return await loginUser(formdata)
              }
       } catch (error) {
              console.log("Error in register user function")
              return null
       }
}

async function loginUser(formdata){ 
       try {
              const loggedInUser = await axios.post("/shopping/auth/login",formdata,{
                     headers : {
                            "Content-Type" : 'application/json'
                     }
              })
              return loggedInUser?.data?.data
       } catch (error) {
              console.log(data)
              return null
       }
}

async function logoutUser(){
       try {
              const loggedOutUser = await axios.post("/shopping/auth/logout")
              return loggedOutUser?.data?.data
       } catch (error) {
              console.error("Error in logout user function : ",error.response || error.message)
              return null
       }
}

async function getCurrentUser(){
       try {
              const user = await axios.get("/shopping/auth/getCurrentUser")
              return user?.data?.data
       } catch (error) {
              console.log("Error in get current user function")
              return null
       }
}

export {registerUser,loginUser,logoutUser,getCurrentUser}