document.addEventListener('DOMContentLoaded', function() {
    const insertDataButton = document.getElementById('insertDataButton');
    const submitQueryButton = document.getElementById('submitQueryButton');
    const sqlQueryTextArea = document.getElementById('sqlQuery');
    const resultDiv = document.getElementById('result');

    const INSERT_API_URL = 'http://localhost:3050/comp4537lab5/backend/insert';
    const QUERY_API_URL = 'http://localhost:3050/comp4537lab5/backend/';

    insertDataButton.addEventListener('click', function() {
        const patients = [
            { name: 'Sara Brown', dateOfBirth: '1901-01-01' },
            { name: 'John Smith', dateOfBirth: '1941-01-01' },
            { name: 'Jack Ma', dateOfBirth: '1961-01-30' },
            { name: 'Elon Musk', dateOfBirth: '1999-01-01' }
        ];

        fetch(INSERT_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patients),
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
        const sqlQuery = sqlQueryTextArea.value.trim();
        const encodedSqlQuery = encodeURIComponent(sqlQuery);

        fetch(`${QUERY_API_URL}${encodedSqlQuery}`, {
            method: 'GET',
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
