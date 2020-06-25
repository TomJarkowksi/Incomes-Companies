import {
    MonthlyIncomes
} from "./MonthlyIncomes.js";


class DisplayDetails {
    constructor() {
        this.name = document.querySelector(".basic__name span")
        this.id = document.querySelector(".basic__id span")
        this.city = document.querySelector(".basic__city span")
        this.total = document.querySelector(".basic__total span")
        this.average = document.querySelector(".detailed__average span")
        this.lastMonth = document.querySelector(".detailed__lastMonth span")
        this.inputFrom = document.querySelector(".fromDate")
        this.inputTo = document.querySelector(".toDate")
        this.buttonBack = document.querySelector(".details__button")
        this.results = document.querySelector(".range__result")
        this.detailsView = document.querySelector(".details")
        this.tableView = document.querySelector(".table")
        this.buttonDate = document.querySelector(".buttonDate")
        this.chart = new MonthlyIncomes
    }

    displayData(data) {
        this.clearPlace()
        this.openDetails()

        this.name.innerText = data[0][1]
        this.id.innerText = data[0][0]
        this.city.innerText = data[0][2]
        this.total.innerText = data[0][3]

        this.dataIncomes = this.dataConversion(data[0][4])

        this.lastYearIncomes = this.sliceIncomes(this.dataIncomes, 1)
        this.lastMonthIncomes = this.sliceIncomes(this.lastYearIncomes, 2)

        this.lastMonthValue = this.summing(this.lastMonthIncomes)

        this.average.innerText = (parseFloat(data[0][3]) / this.dataIncomes.length).toFixed(2)
        this.lastMonth.innerText = this.lastMonthValue.toFixed(2)

        this.dateRange(this.dataIncomes)
        this.chart.displayChart(this.dataIncomes)
        this.closeDetails()
    }

    clearPlace() {
        this.name.innerText = ""
        this.id.innerText = ""
        this.city.innerText = ""
        this.total.innerText = ""
        this.average.innerText = ""
        this.results.innerHTML = ""
        this.lastMonth.innerText = ""
    }

    dataConversion(dataToConversion) {

        const arrayAfterConversion = []

        dataToConversion.incomes.forEach(el => {
            const year = parseInt(el.date.slice(0, 4))
            const month = parseInt(el.date.slice(5, 7))
            const hour = parseInt(el.date.slice(8, 10))
            const oneArr = [parseFloat(el.value), year, month, hour]
            arrayAfterConversion.push(oneArr)
        })

        return arrayAfterConversion
    }

    sliceIncomes(data, column) {

        this.dataSorted = data.sort((a, b) => a[column] - b[column]).reverse();

        let endSlice
        let flague = true
        this.dataSorted.forEach((el, index) => {
            if (el[column] !== this.dataSorted[0][column] && flague) {
                endSlice = index;
                flague = !flague
            }
        })
        return this.dataSorted.slice(0, endSlice)
    }

    dateRange(dataIncomes) {

        this.buttonDate.addEventListener("click", () => {

            this.rangeFrom = []
            this.rangeTo = []

            this.rangeFrom.push(parseInt(this.inputFrom.value.slice(0, 4)), parseInt(this.inputFrom.value.slice(5, 7)), parseInt(this.inputFrom.value.slice(8, 10)))

            this.rangeTo.push(parseInt(this.inputTo.value.slice(0, 4)), parseInt(this.inputTo.value.slice(5, 7)), parseInt(this.inputTo.value.slice(8, 10)))

            if (this.checkDateInput(this.rangeFrom, this.rangeTo)) {
                return this.displayError()
            }

            this.onlyDataWithRange = this.serchDataWithRange(this.rangeFrom, this.rangeTo, dataIncomes)
            this.displayDetailsWithRange(this.onlyDataWithRange)
        })

    }
    displayError() {
        this.error = document.createElement("p")
        this.error.innerHTML = "You probably did not complete the form or the date 'from' is greater than 'to'!"
        this.error.style.textAlign = "center"
        this.results.innerHTML = ""
        this.results.appendChild(this.error)
    }
    checkDateInput(rangeFrom, rangeTo) {
        if (!rangeFrom[0] || !rangeTo[0] || !rangeFrom[1] || !rangeTo[1] || !rangeFrom[2] || !rangeTo[2]) {
            return "error"
        }
        if (rangeTo[0] == rangeFrom[0]) {
            if (rangeTo[1] == rangeFrom[1]) {
                if (rangeTo[2] < rangeFrom[2]) {
                    return "error"

                }
            } else if (rangeTo[1] < rangeFrom[1]) {
                return "error"

            }
        } else if (rangeTo[0] < rangeFrom[0]) {
            return "error"
        }
    }


    serchDataWithRange(rangeFrom, rangeTo, dataIncomes) {

        this.sortAscending = dataIncomes.sort((a, b) => a[1] - b[1] || a[2] - b[2] || a[3] - b[3]);
        let indexStart
        let indexEnd
        this.flague1 = true
        this.flague2 = true
        this.sortDecreasing = this.sortAscending.slice().reverse()

        this.sortAscending.forEach((el, index) => {
            if (el[1] == rangeFrom[0] && el[2] == rangeFrom[1] && el[3] >= rangeFrom[2] && this.flague1) {
                indexStart = index
                this.flague1 = false
            } else if (el[1] > rangeFrom[0] && this.flague1) {
                indexStart = index
                this.flague1 = false
            } else if (el[1] == rangeFrom[0] && el[2] > rangeFrom[1] && this.flague1) {
                indexStart = index
                this.flague1 = false
            }
        })

        this.sortDecreasing.forEach((el, index) => {
            if (el[1] == rangeTo[0] && el[2] == rangeTo[1] && el[3] <= rangeTo[2] && this.flague2) {
                indexEnd = index
                this.flague2 = false
            } else if (el[1] < rangeTo[0] && this.flague2) {
                indexEnd = index
                this.flague2 = false
            } else if (el[1] == rangeTo[0] && el[2] < rangeTo[1] && this.flague2) {
                indexEnd = index
                this.flague2 = false
            }
        })

        if (indexStart == undefined) {
            indexStart = this.sortAscending.length
        }
        if (indexEnd == undefined) {
            indexEnd = this.sortDecreasing.length
        }

        return this.sortAscending.slice(indexStart, this.sortDecreasing.length - indexEnd)

    }


    displayDetailsWithRange(onlyDataWithRange) {
        this.totalIncome = document.createElement("p")
        this.averageIncome = document.createElement("p")

        this.averageIncomeValue = this.summing(onlyDataWithRange)

        this.totalIncome.innerHTML = `Total Income : ${this.averageIncomeValue.toFixed(2)}`;
        this.averageIncome.innerHTML = `Average Income: ${(this.averageIncomeValue)?(this.averageIncomeValue / onlyDataWithRange.length).toFixed(2): 0.00}`;
        this.results.innerHTML = ""
        this.results.appendChild(this.totalIncome)
        this.results.appendChild(this.averageIncome)
    }

    closeDetails() {
        this.buttonBack.addEventListener("click", () => {
            this.detailsView.style.display = "none"
            this.tableView.style.display = "flex"
        })
    }
    openDetails() {
        this.detailsView.style.display = "flex"
        this.tableView.style.display = "none"
    }
    summing(arr) {
        let sum = 0;
        arr.forEach((el) => {
            sum += parseFloat(el[0]);
        });
        return sum
    }
}

export {
    DisplayDetails
}