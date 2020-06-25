import {
    sorting
} from "./sorting.js";

import {
    companyDetails
} from "./companyDetails.js";

const placeForTable = document.querySelector("tbody")
let currentPage = 1;
const rowsInOnePage = 35;

function displayTable(tabelToDisplay, resetCurrentPage) {

    if (resetCurrentPage) {
        currentPage = 1
    }
    placeForTable.innerHTML = ""
    currentPage--
    let start = rowsInOnePage * currentPage
    let end = start + rowsInOnePage;

    let paginatedItems = tabelToDisplay.slice(start, end);

    paginatedItems.forEach(el => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td class = "id">${el[0]}</td>
        <td class = "name">${el[1]}</td>
        <td>${el[2]}</td>
        <td>${el[3]}</td>`;
        placeForTable.appendChild(tr);
    })
    setupPagination(tabelToDisplay, rowsInOnePage)
    companyDetails(tabelToDisplay)
}


const placeForPagination = document.querySelector(".pagination")

function setupPagination(tabelToDisplay, rowsInOnePage) {
    placeForPagination.innerHTML = ""
    let page_count = Math.ceil(tabelToDisplay.length / rowsInOnePage)
    for (let i = 1; i < page_count + 1; i++) {
        let btn = paginationButton(i, tabelToDisplay)
        placeForPagination.appendChild(btn)
    }

}

function paginationButton(number, table) {
    const div = document.createElement("div")
    div.classList.add("block")
    div.innerText = number;

    if (currentPage + 1 == number) {
        div.classList.add("active")
    }

    div.addEventListener("click", function () {
        currentPage = number;
        sorting(table, 3, false)
    })
    return div
}


export {
    displayTable
}