document.addEventListener('DOMContentLoaded', function() {
    const insertDataButton = document.getElementById('insertDataButton');
    const submitQueryButton = document.getElementById('submitQueryButton');
    const sqlQueryTextArea = document.getElementById('sqlQuery');
    const resultDiv = document.getElementById('result');

    const API_URL = 'https://nainzhou.com/comp4537lab5/backend'; // Change to your server's domain

    insertDataButton.addEventListener('click', function() {
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([
                { name: 'Sara Brown', dateOfBirth: '1901-01-01' },
                { name: 'John Smith', dateOfBirth: '1941-01-01' },
                { name: 'Jack Ma', dateOfBirth: '1961-01-30' },
                { name: 'Elon Musk', dateOfBirth: '1999-01-01' }
            ]),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Insert response:', data);
            resultDiv.textContent += `Patients inserted successfully.\n`;
        })
        .catch((error) => {
            console.error('Insert error:', error);
            resultDiv.textContent += `Insert error: ${error}\n`;
        });
    });

    submitQueryButton.addEventListener('click', function() {
        const query = sqlQueryTextArea.value.trim();
        const isSelect = query.toLowerCase().startsWith('select');

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: query }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Query response:', data);
            resultDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        })
        .catch((error) => {
            console.error('Query error:', error);
            resultDiv.textContent += `Query error: ${error}\n`;
        });
    });
});
