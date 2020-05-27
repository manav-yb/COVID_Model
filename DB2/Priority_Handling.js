
var fetch = require("node-fetch");
var ibmdb = require("ibm_db");

let CovidConfirmedCases = (CovidCases,city,state) => CovidCases[state]["districtData"][city]["confirmed"];
function comparePriority(a,b)
{
    if(a.priority <= b.priority) return -1;
    else return 1;
}

//Handling Asynchronous feature of API's using Promises
let ans;
ibmdb.open("DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-lon02-01.services.eu-gb.bluemix.net;UID=CZF74024;PWD=Manav9592830271@;PORT=50000;PROTOCOL=TCPIP", function (err,conn) {
    if (err) return console.log(err);
    
    conn.query("SELECT * FROM CZF74024.TRIP;", function (err, data) {
      if (err)
      {
          console.log("Error in connecting to database");
          return;
      }
      let db = data;
      conn.close(function () {
        console.log('DataBase Connection Closed');
      });

    let CovidUrl = 'https://api.covid19india.org/state_district_wise.json';
    fetch(CovidUrl)
    .then(res => res.json())
    .then((out) => {

        db = [
            {id: 1,Source: 12,Destination: 213,Date: null,Slot: null,priority: 3},
            {id: 2,Source: 12,Destination: 213,Date: null,Slot: null,priority: 3},
            {id: 3,Source: 12,Destination: 213,Date: null,Slot: null,priority: 2},
            {id: 4,Source: 12,Destination: 213,Date: null,Slot: null,priority: 1},
            {id: 5,Source: 12,Destination: 213,Date: null,Slot: null,priority: 1},
        ]
    
        //Sorting based on the priority in ascending Order
        db = db.sort(comparePriority);
    
        //Assuming all the queries are for single date
        let numVehEachSlot = 2;
        let Slots = ["Morning", "Evening"];
    
        let sol = [
            {perm: true,url: 'skfjbv', slot: ""}
        ]
        sol.length = db.length;
    
        let index = 0;
        for(let i in Slots){
            for(let l=0;l<numVehEachSlot;l++)
            {
                let user = db[index];
                let SourcAdd = user.Source.split(',');
                let DestAdd = user.Destination.split(',');
                //Number of Cases is avg of #cases in source and destination cities
                let numCases = (CovidConfirmedCases(out, SourcAdd.slice(-3), SourcAdd.slice(-2)) + CovidConfirmedCases(out, DestAdd.slice(-3), DestAdd.slice(-2)))/2;
                //Call API To HANDLE DIRECTIONS
                
                let permission;
                sol[index].perm = permission;
                sol[index].slot = Slot[i];
                sol[index].url = "";
                index++;
            }
        }

    })
    .catch(err => {throw err});

    });
  });

