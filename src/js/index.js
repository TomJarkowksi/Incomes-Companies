import "../style/style.css";

import {
    summing
} from "./summing.js";

import {
    sorting
} from "./sorting.js";
import {
    serch
} from "./serch.js";


const table = []
const sfd = []
const getData = () => {
    const urlData = "https://recruitment.hal.skygate.io/companies";

    fetch(urlData)
        .then((response) => {
            if (response.status !== 200) {
                throw new Error("Unfortunately something went wrong");
            } else {
                return response.json();
            }
        })
        .then((response) => {
            getIncome(response);
        })
        .catch((err) => {
            throw new Error(err)
        });
};

function getIncome(arrayWithCompanies) {

    const requests = arrayWithCompanies.map(company => fetch(`https://recruitment.hal.skygate.io/incomes/${company.id}`));
    Promise.all(requests)
        .then(responses => {
            return responses
        })
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then(response => saveData(response, arrayWithCompanies));

}

function saveData(response, companiesArr) {
    companiesArr.forEach((el, index) => {
        const rowInTable = []
        const sumIncomes = summing(response[index].incomes)
        rowInTable.push(el.id, el.name, el.city, parseFloat(sumIncomes.toFixed(2)), response[index])
        table.push(rowInTable)
    });

    turnOffSpinner()
    sorting(table, 3, false)
    serch(table)

}

function turnOffSpinner() {
    const spinner = document.querySelector(".spinner")
    const tableArea = document.querySelector(".table")
    spinner.style.display = "none"
    tableArea.style.display = "flex"
}
getData();