
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

async function carregarGraficoMoeda(base = 'USD', destino = 'BRL') {
    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    const formatoData = (data) => data.toISOString().split('T')[0];
    const inicio = formatoData(seteDiasAtras);
    const fim = formatoData(hoje);

    const url = `https://api.frankfurter.app/${inicio}..${fim}?from=${base}&to=${destino}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const labels = Object.keys(data.rates);
      const valores = labels.map(dataKey => data.rates[dataKey][destino]);

      const ctx = document.getElementById('currencyChart').getContext('2d');

      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: `${base} para ${destino}`,
            data: valores,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(16, 41, 41, 0.62)',
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });
    } catch (error) {
      console.error('Erro ao carregar dados da API:', error);
    }
  }

  carregarGraficoMoeda(); // USD para BRL