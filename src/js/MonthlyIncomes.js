import {
    Chart
} from "../../node_modules/chart.js/dist/Chart.js";

class MonthlyIncomes {
    constructor() {}

    displayChart(dataIncomes) {
        this.sortedIncomes = dataIncomes.sort(
            (a, b) => a[1] - b[1] || a[2] - b[2] || a[3] - b[3]
        );

        this.monthIncomesArr = [];
        this.monthIncomes = 0;

        this.sortedIncomes.forEach((el, index) => {
            if (
                index < this.sortedIncomes.length - 1 &&
                el[2] == this.sortedIncomes[index + 1][2]
            ) {
                this.monthIncomes += parseFloat(el[0]);
            } else {
                this.monthIncomes += parseFloat(el[0]);
                this.oneMonth = [this.monthIncomes, el[1], el[2]];
                this.monthIncomesArr.push(this.oneMonth);
                this.monthIncomes = 0;
            }
        });

        this.configurationChart(this.monthIncomesArr)
    }

    configurationChart(data) {
        this.ctx = document.getElementById('myChart').getContext('2d')
        this.x = []
        this.y = []
        data.forEach(el => {
            (el[2] < 10) ? this.x.push(`${el[1]}-0${el[2]}`): this.x.push(`${el[1]}-${el[2]}`);
            this.y.push((el[0]).toFixed(2))
        })


        this.myChart = new Chart(this.ctx, {
            type: 'bar',
            labels: [],
            data: {
                datasets: [{
                    label: 'Monthly income',
                    data: [],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                events: []
            }
        });
        this.addData(this.myChart, this.x, this.y)
    }
    addData(chart, label, data) {
        chart.data.labels = label;
        chart.data.datasets[0].data = data;
        chart.update();
    }
}




export {
    MonthlyIncomes
};