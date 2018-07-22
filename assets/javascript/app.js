$(document).ready(function () {

    //GLOBAL VARIABLES
    //------------------------
    var trainName = "";
    var trainDestination = "";
    var timeInput = "";
    var trainFrequency = "";
    var nextArrival = "";
    var minutesAway = "";


    //FIREBASE DATABASE
    //------------------------
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyByexU0wzg2V7Scr-1aEfDXgZ9diEp1WoU",
        authDomain: "train-schedule-w7.firebaseapp.com",
        databaseURL: "https://train-schedule-w7.firebaseio.com",
        projectId: "train-schedule-w7",
        storageBucket: "train-schedule-w7.appspot.com",
        messagingSenderId: "694982066951"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    //PROCESSES 
    //------------------------------

    //On click, storing user input value
    $("#addTrain").on("click", function () {
        trainName = $("#nameInput").val().trim();
        trainDestination = $("#destinationInput").val().trim();
        timeInput = $("#timeInput").val().trim();
        trainFrequency = $("#frequencyInput").val().trim();

        console.log(trainName);
        console.log(trainDestination);
        console.log(timeInput);
        console.log(trainFrequency);

    })


});