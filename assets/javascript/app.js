
// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyAzk2feAG8E4Hl5g-C9IlxLTUd95NTbVQ0",
    authDomain: "trainscheduler-9ce49.firebaseapp.com",
    databaseURL: "https://trainscheduler-9ce49.firebaseio.com",
    projectId: "trainscheduler-9ce49",
    storageBucket: "trainscheduler-9ce49.appspot.com",
    messagingSenderId: "916742100598",
    appId: "1:916742100598:web:697ec18a9f3f12d1"
};
// Initialize Firebase
firebase.initializeApp(config);

console.log("loded");

document.getElementById("submitTrain").addEventListener("click", (event) => {
    event.preventDefault();
    console.log("listening");
    let trainName = document.querySelector("#trainName").value.trim();
    let destination = document.querySelector("#destination").value.trim();
    let firstTrain = document.querySelector("#firstTrain").value.trim();
    let freq = document.querySelector("#freq").value.trim();

    console.log();
})

