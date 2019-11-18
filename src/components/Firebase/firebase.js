import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
    /*apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,*/
    apiKey: "AIzaSyDG5V5TbBUBubeLLGZPFkxVuZfiQP6ffoo",
    authDomain: "reddit-8b4b4.firebaseapp.com",
    databaseURL: "https://reddit-8b4b4.firebaseio.com/",
    projectId: "reddit-8b4b4",
    storageBucket: "gs://reddit-8b4b4.appspot.com",
    messagingSenderId: 404557240002,
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }

}

export default Firebase;