import {
    displayTable
} from "./displayTable.js";


function sorting(tableToSort, whichColumn, resetCurrentPage) {
    const tableSorted = tableToSort
        .sort((a, b) => a[whichColumn] - b[whichColumn])
        .reverse()

    displayTable(tableSorted, resetCurrentPage)

}

export {
    sorting
}