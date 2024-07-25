import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { prime } from "../src/auxilliary/prime.js";


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyBiDBG_AUCI6z3NpMf2V8IOflAau_SJRD4",
    authDomain: "fatura-kesme-ve-yonetme.firebaseapp.com",
    projectId: "fatura-kesme-ve-yonetme",
    storageBucket: "fatura-kesme-ve-yonetme.appspot.com",
    messagingSenderId: "1035428225343",
    appId: "1:1035428225343:web:d8c773c60ad1c9482b338a",
    measurementId: "G-M16R0XN9RS"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp); 
const db = getFirestore(firebaseApp);



const app = createApp(App)
app.use(router)
prime(app);
app.mount('#app')
export{db,auth}
