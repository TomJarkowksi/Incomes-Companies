import {
    sorting
} from "./sorting.js";

function serch(table) {
    const input = document.querySelector(".searchBox");

    input.addEventListener("keyup", (e) => {
        const arrayWithFoundCompanies = table.filter(function (el) {
            return el[1].toLowerCase().includes(e.target.value.toLowerCase())
        })
        if (e.target.value == null) {
            sorting(table, 3, false)
        } else {
            sorting(arrayWithFoundCompanies, 3, true)
        }
    })

}

export {
    serch
}