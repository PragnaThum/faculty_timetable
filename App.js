let table = document.getElementById("dataTable");
var form = document.getElementById('form');
const container = document.querySelector(".container");//empty table
const container1 = document.querySelector(".container1");//login form
const container2 = document.querySelector(".container2");//back btn
//const bgclr = document.getElementsByTagName(".bgclr")
form.addEventListener('submit', async function (e) {
    container.classList.remove("hidden");
    container.classList.add("visible");
    container1.classList.remove("visible");
    document.body.style.backgroundColor = "white";
    container1.classList.add("hidden");
    container2.classList.remove("hidden");
    container2.classList.add("visible");
    //bgclr.classList.add("bgclr");

    //auto submission 
    e.preventDefault()
    var ans = document.getElementById('user').value
    container.prepend(`${ans}`)


    fetch('http://localhost:3000/employees', {
        method: "POST",
        body: JSON.stringify({
            faculty: ans
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })

        .then((data) => {
            return data.json();
        }).then((objectdata) => {
            function fillScheduleTable(data) {
                const table = document.getElementById('schedule');
                const tbody = table.querySelector('tbody');
                const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

                data.forEach(item => {
                    const period = item.period;
                    const day = item.day;
                    const section = item.section;
                    // console.log(tbody.rows);

                    const row = Array.from(tbody.rows).find(r => r.cells[0].textContent.trim() === day);
                    console.log(row);
                    if (row) {
                        const cell = row.cells[period];
                        console.log(cell);
                        if (cell) {
                            cell.textContent = section;
                        }
                    }
                });
            }

            fillScheduleTable(objectdata);


        }).catch((err) => console.log("check once"))


});