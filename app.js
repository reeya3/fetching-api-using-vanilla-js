//querry selector
const postContainer = document.querySelector('.post-container');
const loading = document.querySelector('.loading');
const filter = document.querySelector('.filter');

//default limit and page
let limit= 4;
let page = 1;

// for getting post
async function getPost() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
  const data = await response.json();
  return data;
}

//for showing post in DOM
async function showPost() {
  const posts = await getPost();
  posts.forEach( post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
        </div>
    `;
    postContainer.appendChild(postEl)
  })
}
//show loader and fetch mre post
function showLoading() {
  loading.classList.add('show')

  setTimeout(() => {
    loading.classList.remove('show')

    setTimeout(() => {
      page++;
      showPost();
    },300);
  },1000) 
}

//filter post by input value

function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post')

  posts.forEach(post => {
    const postTitle = post.querySelector('.title').innerText.toUpperCase();
    const postBody = post.querySelector('.post-body').innerText.toUpperCase();

    if(postTitle.indexOf(term) > -1 || postBody.indexOf(term) > -1) {
      post.style.display = 'flex'
    }
    else {
      post.style.display = 'none'
    }
  })
}

showPost()

//for scroll 
window.addEventListener('scroll', () => {
  const{ scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if(scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading()
  }
});

//event listener for filter
filter.addEventListener('input', filterPosts)