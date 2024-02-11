const likedPosts =document.getElementById('likedPosts')

function getlike() {
    likedPosts.innerHTML = ''

    let likeList = JSON.parse(localStorage.getItem('wishlist')) || []
    likeList.map((item,index) => {
        postElement.className = 'post';
        postElement.innerHTML = `
            <img src="${response.url}" alt="Post Image">
             <div class="actions">
             <button onclick="likePost(${post.id})"><i class="fa-regular fa-heart"></i></button>
             <button onclick="savePost(${post.id})"><i class="fa-regular fa-bookmark"></i></button>
             <button onclick="commentPost(${post.id})"><i class="fa-regular fa-comment"></i></button>
            </div>
            <div class="user-info">
            <img src="https://i.pravatar.cc/50?u=${user.id}" alt="${user.username} Avatar">
                <span>${user.name}</span>
            </div>
           
            <h4>${post.title}</h4>
            <p>${post.body}</p>
            <div class="comments hidden" id="comments-${post.id}">
                <input type="text" placeholder="Yorumunuzu buraya yazın..." id="commentInput-${post.id}">
                <button onclick="commentPost(${post.id})">Yorum Yap</button>
                <div class="comments-list" id="commentsList-${post.id}"></div>
            </div>
        `;
        postListElement.appendChild(postElement);
    })
}
getlike();

function removefromwishlist(index){
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || []
    wishlist.splice(index,1)
    localStorage.setItem('wishlist',JSON.stringify(wishlist))
    getwishlist() 
}