function enquireProduct(specifiedElement, type) {
    specifiedElement.onclick = ""
    specifiedElement.style = "cursor: wait; background-color: rgb(150, 150, 150);"
    specifiedElement.textContent = "Process"
    let modHREF = ""
    if (modHREF.indexOf("#")) {
        for (var i = 0; i < modHREF.indexOf("#"); i++) {
            modHREF += location.href[i]
        }
    } else {
        modHREF = location.href
    }
    let win = window.open("mailto:pgnetmail@yahoo.com?subject=Automatic " + type + " Enquiry&body=" + modHREF + "#" + specifiedElement.id)
    const timer = setInterval(() => {
        if (win.closed) {
            clearInterval(timer);
            specifiedElement.textContent = "Enquired";
            specifiedElement.style = "cursor: not-allowed; background-color: rgb(150, 150, 150);";
        }
    }, 500);
}