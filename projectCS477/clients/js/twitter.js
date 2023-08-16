window.onload = function () {
    document.getElementById('post').onclick = postTweet;
    populateTweetsContainer();
    document.getElementById('logout').onclick = logout;
    const username = sessionStorage.getItem('username');

    document.getElementById('welcome').innerText = 'Welcome' + " " + username;

}

async function postTweet(event) {
    event.preventDefault();
    const content = document.getElementById('tweetContent').value;
    if (content.trim() === '') {
        alert('Please enter a tweet content.');
        return;
    }
    const token = sessionStorage.getItem('accessToken');
    try {
        const response = await fetch('http://localhost:3000/tweets/tweets', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({ content }),
        });

        if (!response.ok) {
            throw new Error('Failed to post tweet.');
        } else if (response.ok) {

            const contentA = document.getElementById('tweetContent');

            contentA.value = '';
        }
    } catch (error) {
        console.error('Error posting tweet:', error);
    }
}



// client.js

// Function to create a new div element with content
function createDivWithContent(content) {
    const div = document.createElement('div');
    div.textContent = content;
    return div;
}

// Function to populate the container with user-specific tweet contents
async function populateTweetsContainer() {
    const token = sessionStorage.getItem('accessToken');
    try {
        const response = await fetch('http://localhost:3000/tweets/tweets', {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tweet content.');
        }

        const responseData = await response.json(); // Parse the JSON response

        const tweetsContainer = document.getElementById('tweets-container');
        tweetsContainer.innerHTML = ''; // Clear previous content

        // Iterate through the userTweetContents object and create divs
        for (const username in responseData.userTweetContents) {
            const userDiv = document.createElement('div');
            userDiv.textContent = `Tweets by ${username}:`;

            const tweetContents = responseData.userTweetContents[username];
            tweetContents.forEach(content => {
                const tweetDiv = createDivWithContent(content);
                tweetDiv.innerHTML = content;
                userDiv.appendChild(tweetDiv);
            });

            tweetsContainer.appendChild(userDiv);
        }
    } catch (error) {
        console.error('Error populating tweets:', error);
    }
}


function logout() {
    location.href = 'login.html';
}