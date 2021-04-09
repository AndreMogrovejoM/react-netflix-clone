import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyBbtlQL8IV7Q2KT1uv9WPpchgnd0hkderg",
    authDomain: "netx-clone-yt.firebaseapp.com",
    projectId: "netx-clone-yt",
    storageBucket: "netx-clone-yt.appspot.com",
    messagingSenderId: "978858887537",
    appId: "1:978858887537:web:fd9b256ef6390c4d22ced0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth }
export default db;