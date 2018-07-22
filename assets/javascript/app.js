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

    database.ref().on("child_added", function (childSnap) {
        trainName = childSnap.val().trainName;
        trainDestination = childSnap.val().trainDestination;
        timeInput = childSnap.val().timeInput;
        trainFrequency = childSnap.val().trainFrequency;

        //appends to html table
        $("#table-body").append(
            "<tr><td>" + trainName + "</td>" +
            "<td>" + trainDestination + "</td>" +
            "<td>" + timeInput + "</td>" +
            "<td>" + trainFrequency + "<td></tr>"
        )
    });



    //PROCESSES 
    //------------------------------

    //On click, storing user input value
    $("#addTrain").on("click", function () {
        event.preventDefault();

        trainName = $("#nameInput").val().trim();
        trainDestination = $("#destinationInput").val().trim();
        timeInput = $("#timeInput").val().trim();
        trainFrequency = $("#frequencyInput").val().trim();

        //Testing to check value input works
        console.log(trainName);
        console.log(trainDestination);
        console.log(timeInput);
        console.log(trainFrequency);

        //Creates local "temporary" object for holding data
        var newTrain = {
            trainName: trainName,
            trainDestination: trainDestination,
            timeInput: timeInput,
            trainFrequency: trainFrequency
        }
        database.ref().push(newTrain);
        //clears form for next train 
        $("#nameInput").val("");
        $("#destinationInput").val("");
        $("#timeInput").val("");
        $("#frequencyInput").val("");
    })


});