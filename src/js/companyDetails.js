import {
    DisplayDetails
} from "./DisplayDetails.js";

function companyDetails(table) {
    const rows = document.querySelectorAll("tbody tr")

    const details = new DisplayDetails;
    rows.forEach(row => {
        row.addEventListener("click", (e) => {
            const id = getId(row.innerText)
            const dataCompany = table.filter(el => {
                return el[0] == id
            })
            details.displayData(dataCompany)

        })

    })
}

function getId(row) {
    const rowArr = row
    return rowArr.split("	")[0]
}

export {
    companyDetails
}