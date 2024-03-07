document.getElementById('insertForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    
    fetch('http://nainzhou.com/comp4537lab5/backend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            dateOfBirth: dateOfBirth
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert("Patient inserted successfully. Insert ID: " + data.insertId);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.getElementById('queryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const patientId = document.getElementById('patientId').value;
    
    fetch(`http://nainzhou.com/comp4537lab5/backend?patientid=${patientId}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        document.getElementById('result').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
