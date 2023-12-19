const axios = require('axios');

const numberOfRequests = 10000;
const requests = Array.from({ length: numberOfRequests }, () => axios.post('http://localhost:5000/api/balance/increase/1', { amount: 2 }));

async function sendRequests() {
    try {
        const startTime = performance.now();

        const responses = await axios.all(requests.map(req => req.catch(err => err)));

        let successCount = 0;
        let errorCount = 0;

        responses.forEach(response => {
            if (response instanceof Error) {
                console.error('Request failed:', response.message);
                errorCount++;
            } else {
                successCount++;
            }
        });

        const executionTime = performance.now() - startTime;

        console.log(`Successful requests: ${successCount}`);
        console.log(`Failed requests: ${errorCount}`);
        console.log(`Execution time: ${executionTime / 1000} sec`);
    } catch (error) {
        console.error('Error sending requests:', error);
    }
}

sendRequests();