// ================ SIGNUP =================
const API_BASE = window.location.origin + "/api";

const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = signupForm.querySelector('input[name="name"]').value;
        const email = signupForm.querySelector('input[name="email"]').value;
        const specialization = signupForm.querySelector('input[name="specialization"]').value;
        const password = signupForm.querySelector('input[name="password"]').value;

        try {
            const res = await fetch(`${API_BASE}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, specialization, password }),
            });

            const data = await res.json();
            alert(data.message || "Signup successful");
        } catch (err) {
            console.error("Signup error:", err);
            alert("Something went wrong");
        }
    });
}



// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = loginForm.querySelector('input[name="email"]').value;
        const password = loginForm.querySelector('input[name="password"]').value;

        try {
            const res = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // ✅ TOKEN save (important)
                localStorage.setItem("token", data.token);

                // ✅ REDIRECT to dashboard
                window.location.href = "/dashboard.html";
            } else {
                alert(data.message || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Something went wrong");
        }
    });
}
e.preventDefault();


