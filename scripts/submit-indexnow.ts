const HOST = 'wify.my';
const KEY = '3924f706987f48a09026e6d506509657';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// List of pages to submit
const urlList = [
    `https://${HOST}/`,
    `https://${HOST}/sitemap.xml`,
];

async function submitToIndexNow() {
    console.log(`🚀 Submitting ${urlList.length} URLs to IndexNow...`);
    
    // Bing (also shares with Yandex)
    const endpoint = 'https://api.indexnow.org/indexnow';
    
    const body = {
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: urlList
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(body),
        });

        if (response.status === 200 || response.status === 202) {
            console.log('✅ Success! URLs submitted to IndexNow.');
        } else {
            console.error(`❌ Error submitting: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error('Response:', text);
        }
    } catch (error) {
        console.error('❌ Network error:', error);
    }
}

submitToIndexNow();
