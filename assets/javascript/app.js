$(document).ready(function () {

    //GLOBAL VARIABLES
    //------------------------
    var trainName = "";
    var trainDestination = "";
    var timeInput = "";
    var trainFrequency = "";


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


    //Database value store
    database.ref().on("child_added", function (childSnap) {
        trainName = childSnap.val().trainName;
        trainDestination = childSnap.val().trainDestination;
        timeInput = childSnap.val().timeInput;
        trainFrequency = childSnap.val().trainFrequency;
        //---Data calculated 
        var minutesAway = childSnap.val().minutesAway;
        var nextArrival = childSnap.val().nextArrival;

        //appends to html table
        $("#table-body").append(
            "<tr><td>" + trainName + "</td>" +
            "<td>" + trainDestination + "</td>" +
            "<td>" + trainFrequency + "</td>" +
            "<td>" + nextArrival + "</td>" +
            "<td>" + minutesAway + "</td></tr>"
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


        //military time
        var timeConverted = moment(timeInput, "HH:MM").subtract("1,years");
        console.log(timeConverted)
        var currentTime = moment();
        console.log("current military time:  " + currentTime.format("HH:MM"));

        //Difference current time - first train
        var diffTime = currentTime.diff(moment(timeConverted), "minutes");


        var trainRemainder = diffTime % trainFrequency;


        var minutesLeft = trainFrequency - trainRemainder;


        var nextTrain = moment().add(minutesLeft, "minutes").format("HH:MM a");


        //Creates local "temporary" object for holding data
        var newTrain = {
            trainName: trainName,
            trainDestination: trainDestination,
            timeInput: timeInput,
            trainFrequency: trainFrequency,
            minutesAway: minutesLeft,
            nextArrival: nextTrain
        }

        console.log(newTrain)
        database.ref().push(newTrain);

        //clears form for next train 
        $("#nameInput").val("");
        $("#destinationInput").val("");
        $("#timeInput").val("");
        $("#frequencyInput").val("");


        return false;
    })


});