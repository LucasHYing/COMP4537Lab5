document.addEventListener('DOMContentLoaded', function() {
    const insertDataButton = document.getElementById('insertDataButton');
    const submitQueryButton = document.getElementById('submitQueryButton');
    const sqlQueryTextArea = document.getElementById('sqlQuery');
    const resultDiv = document.getElementById('result');

    const INSERT_API_URL = 'https://nainzhou.com/comp4537lab5/backend';
    const QUERY_API_URL = 'https://nainzhou.com/comp4537lab5/backend'; // Adjust if necessary for different endpoints

    insertDataButton.addEventListener('click', function() {
        const patients = [
            { name: 'Sara Brown', dateOfBirth: '1901-01-01' },
            { name: 'John Smith', dateOfBirth: '1941-01-01' },
            { name: 'Jack Ma', dateOfBirth: '1961-01-30' },
            { name: 'Elon Musk', dateOfBirth: '1999-01-01' }
        ];

        patients.forEach(patient => {
            fetch(INSERT_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patient),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Patient inserted:', data);
                resultDiv.textContent += `Patient inserted successfully. Insert ID: ${data.insertId}\n`;
            })
            .catch((error) => {
                console.error('Insertion error:', error);
                resultDiv.textContent += `Error: ${error}\n`;
            });
        });
    });

    submitQueryButton.addEventListener('click', function() {
        const sqlQuery = sqlQueryTextArea.value.trim();
        const isSelectQuery = sqlQuery.toLowerCase().startsWith('select');
        
        fetch(isSelectQuery ? QUERY_API_URL : INSERT_API_URL, {
            method: isSelectQuery ? 'GET' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: isSelectQuery ? null : JSON.stringify({ query: sqlQuery }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Query success:', data);
            resultDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        })
        .catch((error) => {
            console.error('Query error:', error);
            resultDiv.textContent += `Error: ${error}\n`;
        });
    });
});
