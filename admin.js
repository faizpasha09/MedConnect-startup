const API_BASE = "http://localhost:5000/api";


// ===== LOAD PENDING DOCTORS =====
async function loadPendingDoctors() {
    const res = await fetch(`${API_BASE}/admin/pending-doctors`);
    const doctors = await res.json();

    const list = document.getElementById("doctorList");

    if (doctors.length === 0) {
        list.innerHTML = "<p class='text-muted'>No pending doctors 🎉</p>";
        return;
    }

    list.innerHTML = doctors
        .map(
            (doc) => `
      <div class="card p-3 mb-3 shadow-sm">
        <h6 class="mb-1">${doc.name}</h6>
        <small class="text-muted">${doc.email} • ${doc.specialization}</small>

        <div class="mt-2">
          <button class="btn btn-success btn-sm"
            onclick="verifyDoctor(${doc.id})">
            Verify
          </button>
        </div>
      </div>
    `
        )
        .join("");
}

loadPendingDoctors();


// ===== VERIFY DOCTOR =====
async function verifyDoctor(id) {
    await fetch(`${API_BASE}/admin/verify/${id}`, {
        method: "PUT",
    });

    loadPendingDoctors();
}
