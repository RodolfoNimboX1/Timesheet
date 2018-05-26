  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCT2lT3ls_TL7g_VKB2z3rJfaDH8QtLBhQ",
    authDomain: "my-first-proyect-bro.firebaseapp.com",
    databaseURL: "https://my-first-proyect-bro.firebaseio.com",
    projectId: "my-first-proyect-bro",
    storageBucket: "my-first-proyect-bro.appspot.com",
    messagingSenderId: "166667998604"
  };
  firebase.initializeApp(config);

    // Initial Values
    var name = "";
    var role = "";
    var starDate = "";
    var monthlyRate = 0;

  // Create a variable to reference the database
    var database = firebase.database();

    // Capture Button Click
  $("#add-user").on("click", function(event) {
          // Don't refresh the page!
    event.preventDefault();

  name = $("#name-input").val().trim();
  role = $("#role-input").val().trim();
  startDate = $("#date-input").val().trim();
  monthlyRate = $("#rate-input").val().trim();

  //instead of .set use .push 
      database.ref().push({   
        name: name,
        role: role,
        starDate: startDate,
        monthlyRate: monthlyRate,
        dataAdded: firebase.database.ServerValue.TIMESTAMP // accesing the firebase database object and then the servervalue and use attribute TIMESTAMP use it because of the time zone. we use server value not by the user computer time 
      });
});

//Firebase watcher + inital loader + order/limit HINT()
database.ref().orderByChild("dataAdded").limitToLast(1).on("child_added",function(snapshot) {  //gives you the last result added 
var v = snapshot.val();

      // Console.loging the last user's data
      console.log(v.name);
      console.log(v.role);
      console.log(v.starDate);
      console.log(v.monthlyRate);

       // Firebase watcher + initial loader HINT: .on("value")
 database.ref().on("child_added", function(snapshot) {

    // change html to reflect
    //$("#name-display").text(snapshot.val().name);
    $("#new-row").append("<tr><td>"+snapshot.val().name+"</td><td>"+snapshot.val().role+"</td><td>"+snapshot.val().starDate+"</td><td>"+snapshot.val().monthlyRate+"</td></tr>")

});
});