import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCANc8pvhwmLJ8gUBke_t2nu_l1PbEjSJU",
  authDomain: "netflix-clone-project-371ab.firebaseapp.com",
  projectId: "netflix-clone-project-371ab",
  storageBucket: "netflix-clone-project-371ab.appspot.com",
  messagingSenderId: "510366271423",
  appId: "1:510366271423:web:a8dbafd36a565bb57d830a",
  measurementId: "G-1F4GHK3PBH",
}

const app = initializeApp(firebaseConfig)

export const firebaseAuth = getAuth(app)
