const root = document.getElementById("root")

let uniqueIds = [];


const request = new XMLHttpRequest();

request.open("GET", "https://jsonplaceholder.typicode.com/posts");

request.send();

const handleLoadComments = () => {
    const comments = JSON.parse(request.responseText)
    renderComments(comments)
}

const handleLoadData = () => {
    request.removeEventListener("load", handleLoadData)
    const json = JSON.parse(request.responseText)
    
    request.open("GET", "https://jsonplaceholder.typicode.com/comments");
    
    request.send();
    
    
    request.addEventListener("load", handleLoadComments)
    
    renderPosts(json)
    
    
}


function renderComments(comments) {
    for(let i = 0; i < uniqueIds.length; i++) {
        const postNode = document.getElementById(`${uniqueIds[i]}`);
        
        const filteredComments = comments.filter(item => item.postId === uniqueIds[i]);
        
        const template = filteredComments.map(item => {
            return `
            <div class="comment">
            ${item.body}
            </div>
            `
        }).join("");
        postNode.innerHTML += template
        document.querySelector(`#P${postId} > button`).classList.add('hide')
    }
    
}





const renderPosts = (posts) => {
    const template = posts.map(post => {
        uniqueIds.push(post.id)
        return `
            <div id="P${post.id}" class="card">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <button class='' onclick='renderComments(${post.id})'>comment</button>
            </div>
        `
    }).join("");

    root.innerHTML = template
}

request.addEventListener("load", handleLoadData)
