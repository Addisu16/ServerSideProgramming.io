window.onload = function () {
    // document.getElementById('tweetform');
    // tweetform.addEventListener('submit', postTweet);
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
    try {
        const response = await fetch('http://localhost:3000/tweets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        });

        if (!response.ok) {
            throw new Error('Failed to post tweet.');
        } else {
            const newTweet = await response.json();
            const tweetElement = document.createElement('div');
            
            tweetElement.classList.add('tweet');
            tweetElement.textContent = newTweet.content;

            const tweetContainer = document.getElementById('tweetContainer');
            tweetContainer.appendChild(tweetElement);
             

            location.href = 'twitterPost.html';
            tweetform.reset();
        }
    } catch (error) {
        console.error('Error posting tweet:', error);
    }
}


