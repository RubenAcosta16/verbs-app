import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import {auth} from './firebase.js'
// import {showMessage} from './showMessage.js'



const signInForm=document.querySelector("#login-form")

signInForm.addEventListener("submit",async e=>{
    e.preventDefault()

    const email=signInForm["login-email"].value
    const passsword=signInForm["login-password"].value

    try {
        const credentials=await signInWithEmailAndPassword(auth,email,passsword)

        console.log(credentials)

    // cosa especial de bootstrap
    const signInModal = document.querySelector("#signinModal");
    const modal = bootstrap.Modal.getInstance(signInModal);
    modal.hide();


        // showMessage("Welcome "+credentials.user.email)
        console.log("Welcome "+credentials.user.email)
                
    } catch (error) {
        // console.log(error)
        if(error.code==="auth/wrong-password"){
            // showMessage("Wrong password","e")
            console.log("Wrong password")
        }else if(error.code==="auth/user-not-found"){
            // showMessage("User not found","e")
            console.log("User not found","e")
        }else {
            // showMessage(error.message,"e")
            console.log(error.message,"e")
        }
    }

})