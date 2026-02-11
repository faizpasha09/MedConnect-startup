const API_BASE = window.location.origin + "/api";
const token = localStorage.getItem("token");

if (!token) window.location.href = "index.html";

function getDoctorIdFromToken() {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
}

// ================= LOAD DOCTOR =================
async function loadDoctor() {
    const res = await fetch(`${API_BASE}/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
        localStorage.removeItem("token");
        return (window.location.href = "index.html");
    }

    const data = await res.json();

    document.getElementById("doctorName").textContent = data.name;
    document.getElementById("welcomeName").textContent = data.name;
}

loadDoctor();
loadPosts();   // ← add this if missing


// ================= CREATE POST =================
const postForm = document.getElementById("postForm");

postForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const textarea = postForm.querySelector("textarea");
    const fileInput = postForm.querySelector('input[type="file"]');

    const formData = new FormData();
    formData.append("content", textarea.value);

    if (fileInput.files[0]) {
        formData.append("image", fileInput.files[0]);
    }

    const res = await fetch(`${API_BASE}/posts`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
        postForm.reset();
        loadPosts();
    }
});



// ================= LOAD FEED =================
async function loadPosts() {
    const res = await fetch(`${API_BASE}/posts`);
    const posts = await res.json();

    const feed = document.getElementById("feed");

    feed.innerHTML = posts
        .map(
            (post) => `
     <div class="card shadow-sm p-3 mb-3 post-card">

  <!-- Header -->
  <div class="d-flex align-items-center mb-2">

    <img 
      src="${post.profile_image
                    ? `http://localhost:5000$${window.location.origin}${post.profile_image}`
                    : 'https://via.placeholder.com/40'}"
      class="post-dp me-2"
    />

    <div>
      <h6 class="mb-0">${post.name}</h6>
      <small class="text-muted">${post.profession || ""}</small>
    </div>
    
  </div>
  
  <p class="mt-3 mb-2 post-content">${post.content}</p>

  ${post.image
                    ? `<img src="${post.image}" class="img-fluid post-image mb-2" />`
                    : ""
                }

                
  <div class="post-actions">

  <span class="like-btn" onclick="toggleLike(${post.id})">
    ❤️ ${post.like_count}
  </span>

  ${post.doctor_id === getDoctorIdFromToken()
                    ? `<span class="delete-btn" onclick="deletePost(${post.id})">Delete</span>`
                    : ""
                }

</div>


  <!-- Comments -->
  <div class="mt-2">
    ${post.comments
                    .map(
                        (c) => `
          <div class="comment-text border-top pt-2 mt-2">
            <strong>${c.name}:</strong> ${c.content}
          </div>
        `
                    )
                    .join("")}
  </div>

  <!-- Add comment -->
  <form onsubmit="addComment(event, ${post.id})" class="mt-2">
    <input class="form-control form-control-sm comment-input"
      placeholder="Write a comment..." required />
  </form>

  <small class="text-muted d-block mt-2">
    ${new Date(post.created_at).toLocaleString()}
  </small>
</div>

    `
        )
        .join("");
}

// ❤️ Toggle Like
async function toggleLike(postId) {
    await fetch(`${API_BASE}/posts/${postId}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
    });

    loadPosts();
}


// 💬 Add Comment
async function addComment(e, postId) {
    e.preventDefault();

    const input = e.target.querySelector("input");
    const content = input.value;

    await fetch(`${API_BASE}/posts/${postId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
    });

    input.value = "";
    loadPosts();
}

async function deletePost(postId) {
    if (!confirm("Delete this post?")) return;

    await fetch(`${API_BASE}/posts/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });

    loadPosts();
}


// ================= LOGOUT =================
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
});

