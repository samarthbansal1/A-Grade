const url = "ws://localhost:5500/myWebsocket"
const mywsServer = new WebSocket(url)
mywsServer.onopen = (event) => {
    console.log("it works");
    mywsServer.send("ready")
}
mywsServer.onmessage = event => {
    console.log(event.data);

    const classGrades = JSON.parse(event.data);
    const table = document.getElementById("tbody");
    const elems = table.getElementsByTagName("tr");
    const elems2 = document.getElementById("ul").getElementsByTagName("li");
    for (let i = 0; i < elems.length; i++) {
        const arr = elems[i].getElementsByTagName("td");
        arr[0].innerHTML = classGrades[i][0];
        arr[1].innerHTML = classGrades[i][1];
        let l = createLetterGrade(classGrades[i][1]);
        if (l.length > 0) arr[2].innerHTML = l;
        else arr[2].innerHTML = "";
        elems2[i].innerHTML = classGrades[i][0];
    }

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