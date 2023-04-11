// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getAuth } from "firebase/auth";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9aO0HSSNV3NQK1yclloO_zfnvtIZCIn4",
  authDomain: "verbs-app.firebaseapp.com",
  projectId: "verbs-app",
  storageBucket: "verbs-app.appspot.com",
  messagingSenderId: "245852857107",
  appId: "1:245852857107:web:03810790925c4fd358b0e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
const db = getFirestore(app);


// por alguna razon se ejecuta cuando el usuarion cambia
// devuelve el usuario
// onAuthStateChanged(auth,async(user)=>{
//     // loginCheck(user)
//     console.log(user)
//     console.log(user.uid)
//     // if(user){
//     //     loginCheck(user)
//     // }else{
//     //     loginCheck(user)
//     // }
// })


// console.log(user.uid)


// existe usuario, en este caso si existe el unico usuario que puede entrar, yo
export async function userExists(uid) {
    // donde queremos buscar la refetencia, mandar llamar funcion que busca referencia
    // cuando buscas en un documento que ya sabes
    const docRef = doc(db, "users", uid);
    const res = await getDoc(docRef);
  
    // console.log(res);
    // devuelve si existe o no
    return res.exists();
  }

export async function signOut(){
    await auth.signOut();

}

export async function getUserInfo(uid) {
    // console.log(uid)
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    } catch (error) {
        console.log(error)
    }
  }


  // 

  export async function insertVerb(verb,type) {
    try {
      // para enviar datos, docRef recibe la coleccion creo y res envia los datos
      const docRef = collection(db, type);
      // creo que envia los datos
      const res = await addDoc(docRef, verb);
      // console.log(res)
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  

  export async function updateVerb(docId, verb,type) {
    try {
      const docRef = doc(db, type, docId);
      const res = await setDoc(docRef, verb);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  // para cargar los links cuando carga la pagina en el dashboard
export async function getLinks(type) {
  // console.log("s9")
  const links = [];
  try {
    const collectionRef = collection(db, type);
    // const q = query(collectionRef, where("uid", "==", uid));
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const link = { ...doc.data() };
      link.docId = doc.id;
      links.push(link);
    });
    
    // console.log(links)
    return links;
  } catch (error) {
    console.log(error);
  }
}

// creo que docRef, osea doc solo busca, y ya haces con eso despues lo que sea

export async function deleteVerb(docId,type) {
  try {
    // console.log(docId)
    const docRef = doc(db, type, docId);
    const res = await deleteDoc(docRef);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function existsVerbMode(verbMode) {
  // console.log(username)
  const verbModes = [];
  // cuando buscas en varios documentos donde no sabes
  // const docsRef = collection(db, "types");
  const q = query(collection(db, "types"), where("type", "==", verbMode));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    verbModes.push(doc.data());
  });
  // console.log(users)

  return verbModes.length > 0 ? verbModes[0].type : null;
}