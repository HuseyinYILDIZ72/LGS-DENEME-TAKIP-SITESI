// Giriş ekranı kontrolü
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'LGSDENEME' && password === 'LGSDENEME7211') {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'index.html';
  } else {
    document.getElementById('error-message').textContent = 'Kullanıcı adı veya şifre yanlış!';
  }
});

// Login kontrolü
if (localStorage.getItem('isLoggedIn') !== 'true' && !window.location.pathname.endsWith('login.html')) {
  window.location.href = 'login.html';
}

// Çıkış Yap
function logout() {
  localStorage.removeItem('isLoggedIn');
  window.location.href = 'login.html';
}

// Deneme formu kontrolü
document.getElementById('denemeForm')?.addEventListener('submit', function(e) {
  e.preventDefault();

  function calculateNet(correct, wrong) {
    return correct - (wrong / 3);
  }

  const examName = document.getElementById('exam-name').value;
  const examDate = document.getElementById('exam-date').value;

  const turkishCorrect = parseFloat(document.getElementById('turkish-correct').value) || 0;
  const turkishWrong = parseFloat(document.getElementById('turkish-wrong').value) || 0;
  const turkishNet = calculateNet(turkishCorrect, turkishWrong);

  const historyCorrect = parseFloat(document.getElementById('history-correct').value) || 0;
  const historyWrong = parseFloat(document.getElementById('history-wrong').value) || 0;
  const historyNet = calculateNet(historyCorrect, historyWrong);

  const religionCorrect = parseFloat(document.getElementById('religion-correct').value) || 0;
  const religionWrong = parseFloat(document.getElementById('religion-wrong').value) || 0;
  const religionNet = calculateNet(religionCorrect, religionWrong);

  const englishCorrect = parseFloat(document.getElementById('english-correct').value) || 0;
  const englishWrong = parseFloat(document.getElementById('english-wrong').value) || 0;
  const englishNet = calculateNet(englishCorrect, englishWrong);

  const mathsCorrect = parseFloat(document.getElementById('maths-correct').value) || 0;
  const mathsWrong = parseFloat(document.getElementById('maths-wrong').value) || 0;
  const mathsNet = calculateNet(mathsCorrect, mathsWrong);

  const scienceCorrect = parseFloat(document.getElementById('science-correct').value) || 0;
  const scienceWrong = parseFloat(document.getElementById('science-wrong').value) || 0;
  const scienceNet = calculateNet(scienceCorrect, scienceWrong);

  const score = (turkishNet * 4.348) + 
                (historyNet * 1.666) + 
                (religionNet * 1.899) + 
                (englishNet * 1.5075) + 
                (mathsNet * 4.2538) + 
                (scienceNet * 4.1230) + 
                194.752082;

  const result = {
    examName,
    examDate,
    turkishCorrect,
    turkishWrong,
    turkishNet,
    historyCorrect,
    historyWrong,
    historyNet,
    religionCorrect,
    religionWrong,
    religionNet,
    englishCorrect,
    englishWrong,
    englishNet,
    mathsCorrect,
    mathsWrong,
    mathsNet,
    scienceCorrect,
    scienceWrong,
    scienceNet,
    score
  };

  saveResult(result);
  displayResult(result);
});

function saveResult(result) {
  let results = JSON.parse(localStorage.getItem('results')) || [];
  results.push(result);
  localStorage.setItem('results', JSON.stringify(results));
}

function displayResult(result) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
    <h2>Sonuçlar</h2>
    <p>Deneme İsmi: ${result.examName}</p>
    <p>Deneme Tarihi: ${result.examDate}</p>
    <p class="correct">Türkçe Doğru: ${result.turkishCorrect}</p>
    <p class="wrong">Türkçe Yanlış: ${result.turkishWrong}</p>
    <p class="correct">T.C. İnkılap Tarihi Doğru: ${result.historyCorrect}</p>
    <p class="wrong">T.C. İnkılap Tarihi Yanlış: ${result.historyWrong}</p>
    <p class="correct">Din Kültürü ve Ahlak Bilgisi Doğru: ${result.religionCorrect}</p>
    <p class="wrong">Din Kültürü ve Ahlak Bilgisi Yanlış: ${result.religionWrong}</p>
    <p class="correct">Yabancı Dil Doğru: ${result.englishCorrect}</p>
    <p class="wrong">Yabancı Dil Yanlış: ${result.englishWrong}</p>
    <p class="correct">Matematik Doğru: ${result.mathsCorrect}</p>
    <p class="wrong">Matematik Yanlış: ${result.mathsWrong}</p>
    <p class="correct">Fen Bilimleri Doğru: ${result.scienceCorrect}</p>
    <p class="wrong">Fen Bilimleri Yanlış: ${result.scienceWrong}</p>
    <p>Türkçe Net: ${result.turkishNet.toFixed(2)}</p>
    <p>T.C. İnkılap Tarihi Net: ${result.historyNet.toFixed(2)}</p>
    <p>Din Kültürü ve Ahlak Bilgisi Net: ${result.religionNet.toFixed(2)}</p>
    <p>Yabancı Dil Net: ${result.englishNet.toFixed(2)}</p>
    <p>Matematik Net: ${result.mathsNet.toFixed(2)}</p>
    <p>Fen Bilimleri Net: ${result.scienceNet.toFixed(2)}</p>
    <p>Puan: ${result.score.toFixed(2)}</p>
    <button onclick="deleteResult('${result.examName}', this)"><i class="fas fa-trash"></i> Sonucu Sil</button>
  `;
}

function deleteResult(examName, button) {
  let results = JSON.parse(localStorage.getItem('results')) || [];
  results = results.filter(result => result.examName !== examName);
  localStorage.setItem('results', JSON.stringify(results));
  button.parentElement.remove();
}

function loadResults() {
  const results = JSON.parse(localStorage.getItem('results')) || [];
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  results.sort((a, b) => new Date(b.examDate) - new Date(a.examDate));

  results.forEach(result => {
    const resultElement = document.createElement('div');
    resultElement.classList.add('result');
    resultElement.innerHTML = `
      <h2>${result.examName}</h2>
      <p>Deneme Tarihi: ${result.examDate}</p>
      <p class="correct">Türkçe Doğru: ${result.turkishCorrect}</p>
      <p class="wrong">Türkçe Yanlış: ${result.turkishWrong}</p>
      <p class="correct">T.C. İnkılap Tarihi Doğru: ${result.historyCorrect}</p>
      <p class="wrong">T.C. İnkılap Tarihi Yanlış: ${result.historyWrong}</p>
      <p class="correct">Din Kültürü ve Ahlak Bilgisi Doğru: ${result.religionCorrect}</p>
      <p class="wrong">Din Kültürü ve Ahlak Bilgisi Yanlış: ${result.religionWrong}</p>
      <p class="correct">Yabancı Dil Doğru: ${result.englishCorrect}</p>
      <p class="wrong">Yabancı Dil Yanlış: ${result.englishWrong}</p>
      <p class="correct">Matematik Doğru: ${result.mathsCorrect}</p>
      <p class="wrong">Matematik Yanlış: ${result.mathsWrong}</p>
      <p class="correct">Fen Bilimleri Doğru: ${result.scienceCorrect}</p>
      <p class="wrong">Fen Bilimleri Yanlış: ${result.scienceWrong}</p>
      <p>Türkçe Net: ${result.turkishNet.toFixed(2)}</p>
      <p>T.C. İnkılap Tarihi Net: ${result.historyNet.toFixed(2)}</p>
      <p>Din Kültürü ve Ahlak Bilgisi Net: ${result.religionNet.toFixed(2)}</p>
      <p>Yabancı Dil Net: ${result.englishNet.toFixed(2)}</p>
      <p>Matematik Net: ${result.mathsNet.toFixed(2)}</p>
      <p>Fen Bilimleri Net: ${result.scienceNet.toFixed(2)}</p>
      <p>Puan: ${result.score.toFixed(2)}</p>
      <button onclick="deleteResult('${result.examName}', this)"><i class="fas fa-trash"></i> Sonucu Sil</button>
    `;
    resultsDiv.appendChild(resultElement);
  });
}

// Load results when results.html is opened
if (document.body.contains(document.getElementById('results'))) {
  loadResults();
}

function loadChart() {
  const results = JSON.parse(localStorage.getItem('results')) || [];
  const labels = results.map(result => result.examDate);
  const scores = results.map(result => result.score);
  const turkishScores = results.map(result => result.turkishNet);
  const historyScores = results.map(result => result.historyNet);
  const religionScores = results.map(result => result.religionNet);
  const englishScores = results.map(result => result.englishNet);
  const mathsScores = results.map(result => result.mathsNet);
  const scienceScores = results.map(result => result.scienceNet);

  // Genel Puan Grafiği
  const ctxScore = document.getElementById('scoreChart').getContext('2d');
  new Chart(ctxScore, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Genel Puan',
        data: scores,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Tarih'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Puan'
          }
        }
      }
    }
  });

  // Türkçe Grafiği
  const ctxTurkish = document.getElementById('turkishChart').getContext('2d');
  new Chart(ctxTurkish, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Türkçe Net',
        data: turkishScores,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Tarih'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Net'
          }
        }
      }
    }
  });

  // Tarih Grafiği
  const ctxHistory = document.getElementById('historyChart').getContext('2d');
  new Chart(ctxHistory, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'T.C. İnkılap Tarihi Net',
        data: historyScores,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Tarih'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Net'
          }
        }
      }
    }
  });

  // Din Kültürü Grafiği
  const ctxReligion = document.getElementById('religionChart').getContext('2d');
  new Chart(ctxReligion, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Din Kültürü ve Ahlak Bilgisi Net',
        data: religionScores,
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: true,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Tarih'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Net'
          }
        }
      }
    }
  });

  // Yabancı Dil Grafiği
  const ctxEnglish = document.getElementById('englishChart').getContext('2d');
  new Chart(ctxEnglish, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Yabancı Dil Net',
        data: englishScores,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Tarih'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Net'
          }
        }
      }
    }
  });

  // Matematik Grafiği
  const ctxMaths = document.getElementById('mathsChart').getContext('2d');
  new Chart(ctxMaths, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Matematik Net',
        data: mathsScores,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Tarih'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Net'
          }
        }
      }
    }
  });

  // Fen Bilimleri Grafiği
  const ctxScience = document.getElementById('scienceChart').getContext('2d');
  new Chart(ctxScience, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Fen Bilimleri Net',
        data: scienceScores,
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Tarih'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Net'
          }
        }
      }
    }
  });
}

// Load chart when charts.html is opened
if (document.body.contains(document.getElementById('scoreChart'))) {
  loadChart();
}

// PDF İndirme İşlevi
function downloadPDF(filename, element) {
  const { jsPDF } = window.jspdf;
  html2canvas(element).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  });
}

// Sonuçları PDF Olarak İndir
document.getElementById('downloadResults')?.addEventListener('click', () => {
  const resultsElement = document.getElementById('results');
  downloadPDF('sonuclar.pdf', resultsElement);
});

// Grafik PDF Olarak İndir
document.getElementById('downloadCharts')?.addEventListener('click', () => {
  const chartsElement = document.body;
  downloadPDF('grafikler.pdf', chartsElement);
});