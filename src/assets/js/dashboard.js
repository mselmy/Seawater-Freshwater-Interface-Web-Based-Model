
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
  //let hf = +document.getElementById('hf').value;
  let hf = 1;
  let L = +document.getElementById('L').value*100;
  let step = +document.getElementById('step').value;
  let formula = +document.getElementById('formula').value;
  return { Q, K, pf, ps, hs, hf, L, step, formula };
}

function ValidData(Data) {
  console.log(Data);
  for (let key in Data) {
    if ( key != "formula" && (Data[key] <= 0 || isNaN(Data[key]))) {
      alert('All fields must be positive numbers!');
      return false;
    }
  }
  return true;
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

let myChartInstance;

function LoadChart(Data){
  const ctx = document.getElementById('myChart');

  if (myChartInstance) {
    myChartInstance.destroy();
  }

  ctx.classList.remove('d-none');

  // Extract data from the table
  let tableData = $('#myTable').DataTable().rows().data().toArray();
  let labels = tableData.map(row => row[0]); // x values
  let data = tableData.map(row => row[1]); // z values

  // Define formula names
  const formulaNames = [
    "Ghyben-Herzberg",
    "Glover",
    "Rumer-Harleman",
    "Verruijt"
  ];

  // Create a new chart instance and assign it to the global variable
  myChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: formulaNames[Data.formula],
          data: data,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "X", // X-axis title
            font: {
              size: 16, // X-axis title font size
            },
          },
          reverse: true, // Reverse the x-axis
          position: "top", // Position the x-axis at the top
        },
        y: {
          title: {
            display: true,
            text: "Z", // y-axis title
            font: {
              size: 16, // X-axis title font size
            },
          },
          beginAtZero: true,
          reverse: true, // Reverse the x-axis
          position: "right", // Position the x-axis at the top
        },
      },
    },
  });
}


Enumerator = {
  GhybenHerzberg: 0,
  Glover: 1,
  RumerHarleman: 2,
  Verruijt: 3
}

async function Calculate(table) {
  let Data = GetUserDate();
  if (!ValidData(Data)) {
    return;
  }
  let xtoe = await GetXToeValues(Data);
  UpdateTable(table, xtoe, Data);
  LoadChart(Data);
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