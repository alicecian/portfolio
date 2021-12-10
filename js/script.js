// google sheet key
// 1EL5_nLM2U2plM88rBy58Q9h8j9eeaEX3VwHDpdTuPTM

// https://spreadsheets.google.com/feeds/list/1EL5_nLM2U2plM88rBy58Q9h8j9eeaEX3VwHDpdTuPTM/1/public/values?alt=json


/*———— From glitch, Tomo —— www.tomokihara.com ——— */

const sheetUrl = "https://spreadsheets.google.com/feeds/list/1EL5_nLM2U2plM88rBy58Q9h8j9eeaEX3VwHDpdTuPTM/1/public/values?alt=json"


//The array which we will put the data in.
let googleSheet = [];
let dateArray = []; 
let titleArray = []; 
let newsArray = []; 

//Number of latest news you want to show. 
let newsNumber = 5;


//Fetching Google Sheet
fetch(sheetUrl)
    .then(function(response){
            return response.json();
    })
    .then(function(data){
        googleSheet = data.feed.entry;
        console.log(googleSheet);
        
        for (var i = 0; i < googleSheet.length; i += 1){
            dateArray.push(googleSheet[i].gsx$date.$t);
            titleArray.push(googleSheet[i].gsx$title.$t);
            newsArray.push(googleSheet[i].gsx$description.$t);
        }  
        console.log("Loaded Google Sheets -> Length of Sheet :" + googleSheet.length)
        
        //Trigger initialize content
        updateHtml();

    }).catch(function(){
        //If loading is not successful....
        console.log("Oh no, Can't load Google Docs!");
    })


updateHtml= () =>{

    /*————If you want to show all the news uncomment the section below.

    //newsNumber = googleSheet.length;

    ——————*/

    for(var i = googleSheet.length - 1 ; i>=googleSheet.length - newsNumber; i--){

        
        //Create element <p> with the custom class to make it pretty in CSS.   
        var dateHTML = document.createElement("p");
        dateHTML.className = "gSheet_date";

        var titleHTML = document.createElement("p");
        titleHTML.className = "gSheet_title";
        
        var newsHTML = document.createElement("p");
        newsHTML.className = "gSheet_news";
      

        //Gets the data from JSON and .createTextNode puts it into the dateHTML <p> element
        dateHTML.appendChild(document.createTextNode(dateArray[i]));
        newsHTML.appendChild(document.createTextNode(newsArray[i]));
        titleHTML.appendChild(document.createTextNode(titleArray[i]));

        //Gets div element sheet Update and add the texts
        var element = document.getElementById("sheetUpdate");
        
        //The order of this effects how the news is lined up.
        element.appendChild(titleHTML);
        element.appendChild(newsHTML);
        element.appendChild(dateHTML);
    }
}


