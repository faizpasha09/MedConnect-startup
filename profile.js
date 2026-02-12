 const API = window.location.origin + "/api";
 const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", () => {

    if (!token) location.href = "index.html";

    const nameInput = document.getElementById("name");
    const professionInput = document.getElementById("profession");
    const aboutInput = document.getElementById("about");
    const form = document.getElementById("profileForm");
    const preview = document.getElementById("preview");
    const imageInput = document.getElementById("image");

    // LOAD PROFILE
    async function loadProfile() {
        const res = await fetch(`${API}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        nameInput.value = data.name || "";
        professionInput.value = data.profession || "";
        aboutInput.value = data.about || "";

        if (data.profile_image && preview) {
            preview.src = `${window.location.origin}${data.profile_image}`;
        }
    }

    loadProfile();

    // IMAGE PREVIEW
    imageInput.onchange = () => {
        if (imageInput.files[0] && preview) {
            preview.src = URL.createObjectURL(imageInput.files[0]);
        }
    };

    // UPDATE PROFILE
    form.onsubmit = async (e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append("name", nameInput.value);
        fd.append("profession", professionInput.value);
        fd.append("about", aboutInput.value);

        if (imageInput.files[0]) {
            fd.append("profile_image", imageInput.files[0]);
        }

        const res = await fetch(`${API}/profile`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: fd,
        });

        const data = await res.json();
        alert(data.message);

        loadProfile();
    };

});





