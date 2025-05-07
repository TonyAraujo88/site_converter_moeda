
async function fetchCurrencies() {
    const res = await fetch("https://api.frankfurter.app/currencies");
    const currencies = await res.json();
    const fromSelect = document.getElementById("from-currency");
    const toSelect = document.getElementById("to-currency");

    Object.keys(currencies).forEach(code => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        option1.value = option2.value = code;
        option1.text = option2.text = `${code} - ${currencies[code]}`;
        fromSelect.add(option1);
        toSelect.add(option2);
    });

    fromSelect.value = "USD";
    toSelect.value = "BRL";
}

async function convert() {
    const amount = document.getElementById("amount").value;
    const from = document.getElementById("from-currency").value;
    const to = document.getElementById("to-currency").value;

    if (from === to) {
        document.getElementById("result").innerText = "Escolha moedas diferentes.";
        return;
    }

    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
    const data = await res.json();
    const rate = data.rates[to];
    document.getElementById("result").innerText = `${amount} ${from} = ${rate} ${to}`;
}

fetchCurrencies();