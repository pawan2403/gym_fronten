import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/Services/authservice.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-wallboard',
  templateUrl: './wallboard.component.html',
  styleUrls: ['./wallboard.component.css']
})
export class WallboardComponent {
  timeInterval: any;
  currentDay: any;
  totaUserCount: any;
  totalPlatinumUsers: any;
  totalDiamondUsers: any;
  totalGoldUsers: any;
  totalSilverUsers: any;
  totalActiveUsers: any;
  totalInactiveUsers: any;
  totalActivePlatinumUsers: any;
  totalActiveDiamondUsers: any;
  totalActiveGoldUsers: any;
  totalActiveSilverUsers: any;
  charts: any;
  chart: any;
  record_found_call_count: boolean = false
  no_record_found_call_count: boolean = false
  chartjs: any;
  chartsjs: any;

  constructor(
    private auth_service: AuthserviceService,
    private router: Router,) { }

  ngOnInit() {
    this.getLiveDateTime();
    this.getAllCount();
    this.getAllActiveCount();
  }

  getChannelsPieChartInstance(skillChart: any) {
    this.chartOptions = skillChart;
  }

  chartOptions = {
    animationEnabled: true,
    title: {
      text: "Sales by Department"
    },
    data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###.##'%'",
      dataPoints: [
        { y: 14.1, name: "Toys" },
        { y: 28.2, name: "Electronics" },
        { y: 14.4, name: "Groceries" },
        { y: 43.3, name: "Furniture" }
      ]
    }]
  }

  public getLiveDateTime() {
    this.timeInterval = setInterval(() => {
      this.currentDay = new Date()
    }, 1000);
  }

  public getAllCount() {
    this.auth_service.getAllCount().subscribe((result: any) => {
      console.log("TOTAL_COUNT", result)
      this.totaUserCount = result.data.totalUsers
      this.totalPlatinumUsers = result.data.totalPlatinumUsers
      this.totalDiamondUsers = result.data.totalDiamondUsers
      this.totalGoldUsers = result.data.totalGoldUsers
      this.totalSilverUsers = result.data.totalSilverUsers
      this.totalActiveUsers = result.data.totalActiveUsers
      this.totalInactiveUsers = result.data.totalInactiveUsers

      const data = [this.totaUserCount, this.totalActiveUsers, this.totalInactiveUsers];
      const labels = ['TOTAL USER', 'ACTIVE USER', 'IN-ACTIVE USER'];
      if (this.totaUserCount > 0 || this.totalActiveUsers > 0 || this.totalInactiveUsers > 0) {
        this.record_found_call_count = true;
        this.no_record_found_call_count = false;
        setTimeout(() => {
          this.createChart(labels, data);
        }, 2)
      } else {
        this.no_record_found_call_count = true;
        this.record_found_call_count = false;
        setTimeout(() => {
          this.createZeroChart();
        }, 3)
      }
    })
  }

  public getAllActiveCount() {
    this.auth_service.getAllActiveCount().subscribe((result: any) => {
      console.log("TOTAL_ACTIVE_COUNT", result)
      this.totalActivePlatinumUsers = result.data.totalActiveDiamondUsers
      this.totalActiveDiamondUsers = result.data.totalActiveDiamondUsers
      this.totalActiveGoldUsers = result.data.totalActiveGoldUsers
      this.totalActiveSilverUsers = result.data.totalActiveSilverUsers
      const data = [this.totalActivePlatinumUsers, this.totalActiveDiamondUsers, this.totalActiveGoldUsers];
      const labels = ['ACTIVE PLATINUM USER', 'ACTIVE DIAMOND USER', 'ACTIVE GOLD USER'];
      if (this.totalActivePlatinumUsers > 0 || this.totalActiveDiamondUsers > 0 || this.totalActiveGoldUsers > 0) {
        this.record_found_call_count = true;
        this.no_record_found_call_count = false;
        setTimeout(() => {
          this.createCharts(labels, data);
        }, 2)
      } else {
        this.no_record_found_call_count = true;
        this.record_found_call_count = false;
        setTimeout(() => {
          this.createZeroCharts();
        }, 3)
      }
    })
  }

  createChart(labels: string[], data: number[]) {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: {
        labels: labels.map((label, index) => `${label}: ${data[index]}`),
        datasets: [{
          data: data,
          backgroundColor: [
            'rgb(255, 150, 150)',
            'rgb(150, 200, 255)',
            'rgb(255, 230, 150)',
          ],
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1.1,
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                size: 12,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
              },
              // usePointStyle: true, //change the shape of box
              boxWidth: 15 // Set the width of the legend box
            },
            // position: 'bottom',//change position of box
            // onClick: null // Disable the default legend behavior
          },
          tooltip: {
            enabled: true, // disabled hover data showing
            // displayColors: false ,
          }
        }
      }
    });
  }

  createZeroChart() {
    if (this.charts) {
      this.charts.destroy();
    }
    const data = [0.1, 0.1, 0.1];
    const labels = [
      'DVA CALLS: 0 ',
      'AGENT CALLS: 0',
      'ABANDONED CALLS: 0 '
    ];
    this.charts = new Chart("MyZeroChart", {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgb(255, 150, 150)',
            'rgb(150, 200, 255)',
            'rgb(255, 230, 150)',
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1.1,
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                size: 14,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
              },
              // usePointStyle: true, //change the shape of box
              boxWidth: 20 // Set the width of the legend box
            },
            // position: 'bottom',//change position of box
            // onClick: null // Disable the default legend behavior
          },
          tooltip: {
            enabled: false // disabled hover data showing
          }
        }
      }
    });
  }

  createCharts(labels: string[], data: number[]) {
    if (this.chartjs) {
      this.chartjs.destroy();
    }
    this.chartjs = new Chart("MyCharts", {
      type: 'pie',
      data: {
        labels: labels.map((label, index) => `${label}: ${data[index]}`),
        datasets: [{
          data: data,
          backgroundColor: [
            'rgb(255, 150, 150)',
            'rgb(150, 200, 255)',
            'rgb(255, 230, 150)',
          ],
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1.1,
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                size: 12,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
              },
              // usePointStyle: true, //change the shape of box
              boxWidth: 15 // Set the width of the legend box
            },
            // position: 'bottom',//change position of box
            // onClick: null // Disable the default legend behavior
          },
          tooltip: {
            enabled: true, // disabled hover data showing
            // displayColors: false ,
          }
        }
      }
    });
  }

  createZeroCharts() {
    if (this.chartsjs) {
      this.chartsjs.destroy();
    }
    const data = [0.1, 0.1, 0.1];
    const labels = [
      'DVA CALLS: 0 ',
      'AGENT CALLS: 0',
      'ABANDONED CALLS: 0 '
    ];

    this.chartsjs = new Chart("MyZeroCharts", {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgb(255, 150, 150)',
            'rgb(150, 200, 255)',
            'rgb(255, 230, 150)',
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1.1,
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                size: 13,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
              },
              // usePointStyle: true, //change the shape of box
              boxWidth: 20 // Set the width of the legend box
            },
            // position: 'bottom',//change position of box
            // onClick: null // Disable the default legend behavior
          },
          tooltip: {
            enabled: false // disabled hover data showing
          }
        }
      }
    });
  }

}
