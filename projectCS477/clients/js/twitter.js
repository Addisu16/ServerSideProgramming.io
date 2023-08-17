window.onload = function () {
    document.getElementById('post').onclick = postTweet;
    populateTweetsContainer();
    window.location;
    document.getElementById('logout').onclick = logout;
    document.getElementById('profile').onclick = profile;
    const username = sessionStorage.getItem('username');

    document.getElementById('welcome').innerText = 'Welcome' + " " + username;

}
async function postTweet(event) {
    console.log('something')
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
                'Content-Type': 'application/json'
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

function createDivWithContent(content) {
    const div = document.createElement('div');
    div.textContent = content;
    return div;
}
async function populateTweetsContainer() {
    window.location;
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
        const responseData = await response.json();
        const tweetsContainer = document.getElementById('tweets-container');
        tweetsContainer.innerHTML = '';
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
function profile() {
    location.href = 'profile.html';
}

document.getElementById('post').addEventListener('click', function (event) {
    event.preventDefault();
    setTimeout(() => {
        location.reload();
    }, 0)
})
