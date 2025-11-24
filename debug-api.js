const fetch = require('node-fetch');

async function testApi() {
    try {
        const response = await fetch('http://localhost:3000/api/projects/solar-automation-project');
        console.log('Status:', response.status);
        console.log('Redirected:', response.redirected);
        console.log('URL:', response.url);

        const text = await response.text();
        console.log('Body start:', text.substring(0, 100));

        if (text.includes('<!DOCTYPE html>')) {
            console.log('FAIL: API returned HTML (likely login page)');
        } else {
            console.log('SUCCESS: API returned JSON (probably)');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

testApi();
