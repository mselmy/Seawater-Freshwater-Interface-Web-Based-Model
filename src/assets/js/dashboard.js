// const { data } = require("jquery");

//const { data } = require("jquery");

// $(function () {


//   // =====================================
//   // Profit
//   // =====================================
//   var chart = {
//     series: [
//       { name: "Earnings this month:", data: [355, 390, 300, 350, 390, 180, 355, 390] },
//       { name: "Expense this month:", data: [280, 250, 325, 215, 250, 310, 280, 250] },
//     ],

//     chart: {
//       type: "bar",
//       height: 345,
//       offsetX: -15,
//       toolbar: { show: true },
//       foreColor: "#adb0bb",
//       fontFamily: 'inherit',
//       sparkline: { enabled: false },
//     },


//     colors: ["#5D87FF", "#49BEFF"],


//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: "35%",
//         borderRadius: [6],
//         borderRadiusApplication: 'end',
//         borderRadiusWhenStacked: 'all'
//       },
//     },
//     markers: { size: 0 },

//     dataLabels: {
//       enabled: false,
//     },


//     legend: {
//       show: false,
//     },


//     grid: {
//       borderColor: "rgba(0,0,0,0.1)",
//       strokeDashArray: 3,
//       xaxis: {
//         lines: {
//           show: false,
//         },
//       },
//     },

//     xaxis: {
//       type: "category",
//       categories: ["16/08", "17/08", "18/08", "19/08", "20/08", "21/08", "22/08", "23/08"],
//       labels: {
//         style: { cssClass: "grey--text lighten-2--text fill-color" },
//       },
//     },


//     yaxis: {
//       show: true,
//       min: 0,
//       max: 400,
//       tickAmount: 4,
//       labels: {
//         style: {
//           cssClass: "grey--text lighten-2--text fill-color",
//         },
//       },
//     },
//     stroke: {
//       show: true,
//       width: 3,
//       lineCap: "butt",
//       colors: ["transparent"],
//     },


//     tooltip: { theme: "light" },

//     responsive: [
//       {
//         breakpoint: 600,
//         options: {
//           plotOptions: {
//             bar: {
//               borderRadius: 3,
//             }
//           },
//         }
//       }
//     ]


//   };

//   var chart = new ApexCharts(document.querySelector("#chart"), chart);
//   chart.render();


//   // =====================================
//   // Breakup
//   // =====================================
//   var breakup = {
//     color: "#adb5bd",
//     series: [38, 40, 25],
//     labels: ["2022", "2021", "2020"],
//     chart: {
//       width: 180,
//       type: "donut",
//       fontFamily: "Plus Jakarta Sans', sans-serif",
//       foreColor: "#adb0bb",
//     },
//     plotOptions: {
//       pie: {
//         startAngle: 0,
//         endAngle: 360,
//         donut: {
//           size: '75%',
//         },
//       },
//     },
//     stroke: {
//       show: false,
//     },

//     dataLabels: {
//       enabled: false,
//     },

//     legend: {
//       show: false,
//     },
//     colors: ["#5D87FF", "#ecf2ff", "#F9F9FD"],

//     responsive: [
//       {
//         breakpoint: 991,
//         options: {
//           chart: {
//             width: 150,
//           },
//         },
//       },
//     ],
//     tooltip: {
//       theme: "dark",
//       fillSeriesColor: false,
//     },
//   };

//   var chart = new ApexCharts(document.querySelector("#breakup"), breakup);
//   chart.render();



//   // =====================================
//   // Earning
//   // =====================================
//   var earning = {
//     chart: {
//       id: "sparkline3",
//       type: "area",
//       height: 60,
//       sparkline: {
//         enabled: true,
//       },
//       group: "sparklines",
//       fontFamily: "Plus Jakarta Sans', sans-serif",
//       foreColor: "#adb0bb",
//     },
//     series: [
//       {
//         name: "Earnings",
//         color: "#49BEFF",
//         data: [25, 66, 20, 40, 12, 58, 20],
//       },
//     ],
//     stroke: {
//       curve: "smooth",
//       width: 2,
//     },
//     fill: {
//       colors: ["#f3feff"],
//       type: "solid",
//       opacity: 0.05,
//     },

//     markers: {
//       size: 0,
//     },
//     tooltip: {
//       theme: "dark",
//       fixed: {
//         enabled: true,
//         position: "right",
//       },
//       x: {
//         show: false,
//       },
//     },
//   };
//   new ApexCharts(document.querySelector("#earning"), earning).render();
// })

// MyCode

//Ghyben-Herzberg formula
function ghybenHerzberg(x, q, pf, ps, K) {
  return Math.sqrt((2 * pf * q * x) / ((ps - pf) * K));
}

//Glover formula
function glover(x, q, pf, ps, K) {
  return Math.sqrt((2 * pf * q * x) / ((ps - pf) * K) + Math.pow((pf * q / (ps - pf) / K), 2));
}

//Rumer Jr & Harleman formula
function rumerHarleman(x, q, pf, ps, K) {
  return Math.sqrt((2 * pf * q * x) / ((ps - pf) * K) + 0.55 * Math.pow((pf * q / (ps - pf) / K), 2));
}

//Verruijt formula
function verruijt(x, q, K, B) {
  return Math.sqrt(Math.pow((q / B / K), 2) * (1 - B) / (1 + B) + 2 * q * x / (B * K * (1 + B)));
}

function GetUserDate() {
  let Q = +document.getElementById('Q').value*1000000;
  let K = +document.getElementById('K').value*100;
  let pf = +document.getElementById('pf').value;
  let ps = +document.getElementById('ps').value;
  let hs = +document.getElementById('hs').value*100;
  let hf = +document.getElementById('hf').value;
  let L = +document.getElementById('L').value*100;
  let step = +document.getElementById('step').value;
  let formula = +document.getElementById('formula').value;
  return { Q, K, pf, ps, hs, hf, L, step, formula };
}

function GetZValue(Data, x) {

  let q = Data.Q / 8;
  let B = (Data.ps - Data.pf) / Data.pf;
  let kstar = Data.K * B;

  switch (Data.formula) {
    case Enumerator.GhybenHerzberg:
      return ghybenHerzberg(x, q, Data.pf, Data.ps, Data.K)/100;
    case Enumerator.Glover:
      return glover(x, q, Data.pf, Data.ps, Data.K)/100;
    case Enumerator.RumerHarleman:
      return rumerHarleman(x, q, Data.pf, Data.ps, Data.K)/100;
    case Enumerator.Verruijt:
      return verruijt(x, q, Data.K, B)/100;
    default:
      return 0;
  }
}

function UpdateTable(table, xtoe, Data) {
  let rowsCount = Math.ceil(xtoe / Data.step);
  let data = [];
  for (let i = 0; i < rowsCount; i++) {
    let x = i * Data.step;
    let z;
    if (x < xtoe) {
      z = GetZValue(Data, x*100);
    } else {
      break;
    }
    data.push([x.toFixed(3), z]);
  }
  data.push([xtoe.toFixed(4), GetZValue(Data, xtoe*100)]);
  table.rows().remove().draw();
  table.rows.add(data).draw(false);
}

function GetXToeValues(Data) {
  let step = 0.0001;
  let z = 0;
  let x = 0;
  while (z < Data.hs/100) {
    z = GetZValue(Data, (x*100));
    x += step;
  }
  return x - 2 * step;
}

Enumerator = {
  GhybenHerzberg: 0,
  Glover: 1,
  RumerHarleman: 2,
  Verruijt: 3
}

async function Calculate(table) {
  let Data = GetUserDate();
  let xtoe = await GetXToeValues(Data);
  UpdateTable(table, xtoe, Data);
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('calculate').addEventListener('click', function () {
    Calculate(table);
  });

  let table = new DataTable('#myTable', {
    columns: [
      { label: 'x', name: 'x', title: 'x (m)' },
      { label: 'z', name: 'z', title: 'z (m)' },
    ]
  });
});