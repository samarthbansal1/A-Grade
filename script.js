const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

const url = "ws://localhost:5500/myWebsocket"
const mywsServer = new WebSocket(url)
mywsServer.onopen = (event) => {
    console.log("it works");
    document.getElementsByClassName("btn")[0].addEventListener("click", () => {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        window.location.pathname = "/hackSB-main/gradeViewer/webp.html";
        console.log("a")
        mywsServer.send(`${email},${password}`);
        mywsServer.close();
    });
}

const createLetterGrade = grade =>{
    if (!grade) return "";

    const grades = {A: 90, B: 80, C: 70, D: 60, F: 0};
    let letterGrade = "";

    Object.keys(grades).some(k =>{
        if(grade>=grades[k]){
            letterGrade += k;
            return true;
        }
    });

    if(grade >= 70){
        if(grade%10>=0 && grade%10<3 && grade<100) letterGrade+="-";
        else if (grade%10>=7 && grade < 90) letterGrade+="+";
    }
    return letterGrade;
}

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});