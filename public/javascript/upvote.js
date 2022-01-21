async function upvoteClickHandler(event) {
  event.preventDefault();
  // Get post id from url
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch('/api/posts/upvote', {
    method: 'PUT',
    body: JSON.stringify({
      post_id: id
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.reload(); // reload the page
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.upvote-btn')
  .addEventListener('click', upvoteClickHandler);
