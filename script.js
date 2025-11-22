const validPayload = {
    "status": true,
    "data": {
        "learnerTestAttemptId": "e1288d71-1ecb-43c2-b4d1-e724065fa013",
        "timeLeft": 2700,
        "title": "MOCK TEST",
        "sections": [
            {
                "id": "57d82046-ebf1-4d65-8735-7d1d3e2b9814",
                "title": "Section 1",
                "questions": []
            }
        ]
    }
};

const invalidPayload = {
    "status": false,
    "message": "This is just a random object",
    "info": {
        "someId": "12345"
    }
};

document.getElementById('valid-preview').innerHTML = `<pre>${JSON.stringify(validPayload, null, 2)}</pre>`;
document.getElementById('invalid-preview').innerHTML = `<pre>${JSON.stringify(invalidPayload, null, 2)}</pre>`;

function log(message, type = 'info') {
    const logContent = document.getElementById('log-content');
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    const time = new Date().toLocaleTimeString();
    entry.textContent = `[${time}] ${message}`;
    logContent.prepend(entry);
}

async function sendRequest(payload, type) {
    log(`Sending ${type} request...`);
    try {
        // Using jsonplaceholder.typicode.com to allow static hosting (e.g., GitHub Pages)
        // Burp Suite will still intercept the request as it leaves the browser.
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            log(`${type} request sent successfully (HTTP 200).`, 'success');
        } else {
            log(`Server returned error: ${response.status}`, 'error');
        }
    } catch (error) {
        log(`Network error: ${error.message}`, 'error');
    }
}

document.getElementById('btn-valid').addEventListener('click', () => {
    sendRequest(validPayload, 'Valid');
});

document.getElementById('btn-invalid').addEventListener('click', () => {
    sendRequest(invalidPayload, 'Invalid');
});
