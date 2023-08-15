window.onload = function () {
    document.getElementById('post').onclick=postTweet;
    const username=sessionStorage.getItem('username');
    console.log(username);
    document.getElementById('welcome').innerText='Welcome'+" "+username;

}

async function postTweet(event) {
    event.preventDefault();
    const content = document.getElementById('tweetContent').value;
    if (content.trim() === '') {
        alert('Please enter a tweet content.');
        return;
    }
    const token=sessionStorage.getItem('accessToken');
    try {
        const response = await fetch('http://localhost:3000/tweets/tweets', {
            method: 'POST',
            headers: {
                'Authorization':'Bearer '+ token,
            },
            body: JSON.stringify({ content}),
        });

        if (!response.ok) {
            throw new Error('Failed to post tweet.');
        } else if(response.ok) {
            window.location;
        }
    } catch (error) {
        console.error('Error posting tweet:', error);
    }
}


// async findAllTweets=

