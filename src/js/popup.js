let checker = 0;

window.onload = function () {
    theme();//checks theme
    // pingURL();
    //isOnline();
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("nav_button").addEventListener("click",mode_change);
    document.getElementById("nav_logo").addEventListener("click",open_autojoomer);
   
});
   

// function getRandomString () {
    //     return Math.random().toString(36).substring(2, 15)
    //   }
      
    //   async function isOnline () {
    //     if (!window.navigator.onLine){
    //         conn_status=0;
    //         return false
    //     }
    //     // avoid CORS errors with a request to your own origin
    //     const url = new URL(window.location.origin)
      
    //     // random value to prevent cached responses
    //     url.searchParams.set('rand', getRandomString())
      
    //     try {
    //       const response = await fetch(
    //         url.toString(),
    //         { method: 'HEAD' },
    //       )
      
    //       console.log(response.ok);
    //       conn_status=1;
    //       return response.ok
    //     } catch {
    //         conn_status=0;
    //       return false
    //     }
    //   }

// function pingURL() {

//     // The custom URL entered by user
//     var URL = "https://api.publicapis.org/entries";
//     console.log("url = " + URL);
//     var settings = {
    
//         // Defines the configurations
//         // for the request
//         cache: false,
//         dataType: "html",
//         async: true,
//         crossDomain: true,
//         url: URL,
//         method: "GET",
//         timeout: 10000,
//         headers: {
//         accept: "*",
//         "Access-Control-Allow-Origin": "*",
//         },
    
//         // Defines the response to be made
//         // for certain status codes
//         statusCode: {
//         200: function (response) {
//                 // let offline=document.getElementById("dis_conn")
//                 // let online=document.getElementById("wifi_conn")
//                 // online.style.display="flex";
//                 // offline.style.display="none";
//                 console.log("on");
//         },
//         400: function (response) {
//             // let offline=document.getElementById("dis_conn")
//             // let online=document.getElementById("wifi_conn")
//             // online.style.display="none";
//             // offline.style.display="flex";
//             console.log("off");
//         },
//         0: function (response) {
//                 // let offline=document.getElementById("dis_conn")
//                 // let online=document.getElementById("wifi_conn")
//                 // online.style.display="none";
//                 // offline.style.display="flex";
//                 console.log("off");
//         },
//         },
//     };
    
//     // Sends the request and observes the response
//     $.ajax(settings)
//     .done(function (response) {
//         console.log(response);
//     })
//     .fail(function (response) {
//         console.log("Error " + response);
//     });
//  }


function open_autojoomer() {
    window.open('https://www.autojoomer.co/', target="_blank");
}

function mode_change() {

        let element1 = document.body;
        element1.classList.toggle("dark_bg");

        if(checker)
        {
            window.localStorage.setItem("dark_check", 0);
            checker = 0;
        }
        else
        {
            window.localStorage.setItem("dark_check", 1);
            checker = 1;
        }
        

        let element2 = document.getElementById("reminders")
        console.log(element2)

        if(checker === 1)
        {
            element2.classList.remove("sections");
            element2.classList.add("dark_content")
        }
        else
        {
            element2.classList.remove("dark_content")
            element2.classList.add("sections");
        }


        let element3 = document.getElementsByClassName("foot_box")
        for (let i = 0; i < element3.length; i++) {
            if (element3[i].classList.contains("foot_item")) {

                element3[i].classList.remove("foot_item");
                element3[i].classList.add("dark_foot");
                console.log("going to dark")

            }
            else {
                element3[i].classList.remove("dark_foot")
                element3[i].classList.add("foot_item");
                console.log("dark to light");
                
            }
        }
        
    };

function theme(){
    console.log("theme")

    const mode = window.localStorage.getItem("dark_check")
    // console.log("mode", mode)
    if(mode === null || mode == 0);
    else
    {
        console.log("Changing mode ...", mode)
        mode_change();
    }
}




// connect to wifi button

document.addEventListener('DOMContentLoaded', function () {

        document.getElementById("dis_conn").addEventListener("click",connect_wifi)
       
    });
async function connect_wifi(){
    console.log("clicked")
    let id = null;
    clearInterval(id);
    const elem = document.getElementById("svg_wifi").querySelectorAll("path");   
    id = setInterval(tower, 5);
    async function tower() {
        for (let i = 0; i < elem.length; i++) {
            elem[i].style.fill= "#4990F5" ;
            await new Promise(done => setTimeout(() => done(), 200));
        }
        
    }
    await new Promise(done => setTimeout(() => done(), 1000));
    window.open("https://msftconnecttest.com/redirect"), "_blank";
    // let offline=document.getElementById("dis_conn")
    // let online=document.getElementById("wifi_conn")
    // offline.style.display="none";
    // online.style.display="flex";
}

