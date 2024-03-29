

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

const database = firebase.database();

//show clock
updateTime();
//update clock every 1 seconds
setInterval(updateTime, 1000);

function updateTime() {
    let dt = new Date(), hours = dt.getHours(), minutes = dt.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    document.getElementById("time").textContent = `${hours}:${minutes}`;
}


document.getElementById("submitTrain").addEventListener("click", (event) => {
    event.preventDefault();
    let train = {
        trainName: document.querySelector("#trainName").value.trim(),
        destination: document.querySelector("#destination").value.trim(),
        firstTrain: document.querySelector("#firstTrain").value.trim(),
        freq: document.querySelector("#freq").value.trim()
    };

    document.getElementById("modal").style.display = "none";

    nextTrainTime(train);
    database.ref("/trains").push(train);


});

database.ref("/trains").on("child_added", (snapshot) => {
    let trains = snapshot.val();

    let trainsHTML = `
    <tr>
        <td>${trains.trainName}</td>
        <td>${trains.destination}</td>
        <td>${trains.freq}</td>
        <td>${trains.nextArrival}</td>
        <td>${trains.minAway} mins away</td>
    </tr>
    `

    //insert html as string to table body
    document.getElementById("trainTableBody").insertAdjacentHTML("beforeEnd", trainsHTML);

});


function nextTrainTime(train) {
    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21


    let firstTrainConverted = moment(train.firstTrain, "HH:mm").subtract(1, "years");


    let currentTime = moment();

    let diffTime = moment().diff(moment(firstTrainConverted), "minutes");


    let tRemainder = diffTime % train.freq;

    let tMinutesTillTrain = train.freq - tRemainder;

    let nextTrain = moment().add(tMinutesTillTrain, "minutes");



    train.minAway = tMinutesTillTrain;
    train.nextArrival = moment(nextTrain).format("hh:mm");

};


document.getElementById("addTrain").addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("modal").style.display = "block";
});

document.getElementById("cancel").addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("modal").style.display = "none";
});






