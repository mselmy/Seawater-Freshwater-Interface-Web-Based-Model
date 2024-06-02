function GetUserInput()
{
    let q = +document.getElementById('q-2').value;
    let W = +document.getElementById('W-2').value/365000;
    let pf = +document.getElementById('pf-2').value
    let ps = +document.getElementById('ps-2').value;
    let K = +document.getElementById('K-2').value;
    let L = +document.getElementById('L-2').value;
    let Zo = +document.getElementById('Zo-2').value
    let Δz = +document.getElementById('Δz-2').value
    let S = +document.getElementById('S-2').value
    let hb = +document.getElementById('hb-2').value;
    let δ = (ps - pf) / pf;
    let formula = document.getElementById('formula-2').value;
    return { q, W, δ, K, L, Zo, Δz, S, hb, formula };
}

Enumerator = {
    CFB: 0,
    CHB: 1
}

function CFBXTCalculte(Data)
{
    let part1 = (Data.q / Data.W) + Data.L;
    let part2 = ((Data.K * Data.δ * (1 + Data.δ) * Math.pow(Data.Zo, 2)) / (Data.W));
    return part1 - Math.sqrt(Math.pow(part1, 2) - part2);
}

function CFBXDashTCalculte(Data) {
    let part1 = (Data.q / Data.W) + Data.L - (Data.Δz / Data.S);
    let part2 = ((Data.K * Data.δ * (1 + Data.δ) * Math.pow(Data.Zo + Data.Δz, 2)) / (Data.W));
    return part1 - Math.sqrt(Math.pow(part1, 2) - part2) + (Data.Δz / Data.S);
}

function CHBXTCalculte(Data) {
    let qPart1 = (Data.K * (Math.pow(Data.hb + Data.Zo, 2) - (1 + Data.δ) * Math.pow(Data.Zo, 2))) / (2 * Data.L);
    let qPart2 = Data.W * Data.L / 2;
    let q = qPart1 - qPart2;
    Data.q = q;
    return CFBXTCalculte(Data);
}

function CHBXDashTCalculte(Data) {
    let qPart1 = (Data.K * (Math.pow(Data.hb + Data.Zo, 2) - (1 + Data.δ) * Math.pow(Data.Zo + Data.Δz, 2))) / (2 * (Data.L - Data.Δz / Data.S));
    let qPart2 = Data.W * (Data.L - Data.Δz / Data.S) / 2;
    let q = qPart1 - qPart2;
    Data.q = q;
    return CFBXDashTCalculte(Data);
}

function calculateXT(Data){
    if(Data.formula == Enumerator.CFB)
    {
        let X = CFBXTCalculte(Data);
        document.getElementById('XTR-2').value = X;
    }
    else if(Data.formula == Enumerator.CHB)
    {
        let X = CHBXTCalculte(Data);
        document.getElementById('XTR-2').value = X;
    }
}

function calculateXTDash(Data){
    if(Data.formula == Enumerator.CFB)
    {
        let XDash = CFBXDashTCalculte(Data);
        document.getElementById("XT'R-2").value = XDash;
    }
    else if(Data.formula == Enumerator.CHB)
    {
        let XDash = CHBXDashTCalculte(Data);
        document.getElementById("XT'R-2").value = XDash;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formula-2').addEventListener('change', function () {
        let formula = document.getElementById('formula-2').value;
        if (formula == Enumerator.CFB) {
            document.getElementById('qcontainer').classList.remove('d-none');
            document.getElementById('hbcontainer').classList.add('d-none');
        }
        else if (formula == Enumerator.CHB) {
            document.getElementById('qcontainer').classList.add('d-none');
            document.getElementById('hbcontainer').classList.remove('d-none');
        }
    });
    
    document.getElementById('calculate-XT-2').addEventListener('click', function () {
        let Data = GetUserInput();
        calculateXT(Data);
    });

    document.getElementById("calculate-X'T-2").addEventListener('click', function () {
        let Data = GetUserInput();
        calculateXTDash(Data);
    });
});