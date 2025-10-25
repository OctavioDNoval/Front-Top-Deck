// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAIHdSzMIGq5CBuiytA6zYdjOx7E60VuBc",
	authDomain: "topdeck-e0b90.firebaseapp.com",
	projectId: "topdeck-e0b90",
	storageBucket: "topdeck-e0b90.firebasestorage.app",
	messagingSenderId: "1010226629903",
	appId: "1:1010226629903:web:4188f6ad23f467acee827a",
	measurementId: "G-45EF2BZCPV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
