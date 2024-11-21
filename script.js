var tblEnq = []

if (localStorage.getItem("enquired")) {
    for (var i = 0; i <= localStorage.getItem("enquired").length; i++) {
        localStorage.getItem("enquired")[i].textContent = "Enquired";
        localStorage.getItem("enquired")[i].style = "cursor: not-allowed; background-color: rgb(150, 150, 150);";
        tblEnq = localStorage.getItem("enquired");
    }
}

function enquireProduct(specifiedElement, type) { // function called by Enquire button on any page - pass arguments 'this' and a capitalized, singular purchase type (i.e. Coin)
    specifiedElement.onclick = ""; // makes the button in question do nothing when clicked - can only send one enquiry
    specifiedElement.style = "cursor: wait; background-color: rgb(150, 150, 150);"; //changes button color to a light gray and gives a spinny wheel of death when you hover over it
    specifiedElement.textContent = "Sending"; // makes the button say 'Sending' instead of 'Enquire'
    let modHREF = ""; // defines an empty string
    if (location.href.indexOf("#")) { // if there is a pound anywhere in the URL, indicating that you're on an ID
        for (var i = 0; i < modHREF.indexOf("#"); i++) { // iterate over every letter in the URL until you reach the ID pound, not including that pound
            modHREF += location.href[i]; // append that letter to the previously defined empty string, so that there's no ID and you can append one later in the mail body link
        }
    } else { // if there isn't a pound
        modHREF = location.href; // just set it to the URL
    }
    let win = window.open("mailto:pgnetmail@yahoo.com?subject=Automatic " + type + " Enquiry&body=" + modHREF + "#" + specifiedElement.id); // open a mail window mailing to pgnetmail@yahoo.com with subject Automatic [Purchase Type] Enquiry and body text linking to the coin on the page. sets variable to a representation of that window if opened successfully, null if not
    if (win == null) {specifiedElement.textContent = "Failed | Refresh"; throw Exception("Could not open a mail window!")}; // if null (could not open window) tell the user to refresh the page and throw an exception
    var timer = setInterval(() => { // execute every 500 ms (.5 s)
        if (win.closed) { // if the mail window is closed
            tblEnq.push(specifiedElement);
            localStorage.setItem("enquired", tblEnq);
            specifiedElement.textContent = "Enquired"; // tell the user they've made their enquiry
            specifiedElement.style = "cursor: not-allowed; background-color: rgb(150, 150, 150);"; // indicate that the user can make no further enquiries
            clearInterval(timer); // stop the timer
        }
    }, 500);
}