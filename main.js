const API_BASE = "http://localhost:5000/api";


// ================= SIGNUP =================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = signupForm.querySelector('input[type="text"]').value;
        const email = signupForm.querySelector('input[type="email"]').value;
        const specialization = signupForm.querySelectorAll('input[type="text"]')[1].value;
        const password = signupForm.querySelector('input[type="password"]').value;

        try {
            const res = await fetch(`${API_BASE}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, specialization, password }),
            });

            const data = await res.json();

            alert(data.message);

            if (res.ok) {
                signupForm.reset();
            }
        } catch (err) {
            alert("Signup failed ❌");
        }
    });
}


// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        loginError.classList.add("d-none"); // hide old error

        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        try {
            const res = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            // ❌ If login failed → show red message
            if (!res.ok) {

                // 🔐 If verification pending → redirect page
                if (res.status === 403) {
                    window.location.href = "pending.html";
                    return;
                }

                loginError.textContent = data.message || "Login failed";
                loginError.classList.remove("d-none");
                return;
            }


            // ✅ Success
            localStorage.setItem("token", data.token);
            window.location.href = "dashboard.html";

        } catch (err) {
            loginError.textContent = "Server error. Try again later.";
            loginError.classList.remove("d-none");
        }
    });
}

