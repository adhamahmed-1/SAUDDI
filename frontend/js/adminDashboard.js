const token = localStorage.getItem("adminToken");
const table = document.getElementById("bookingTable");

let allBookings = [];

async function loadBookings() {
  const res = await fetch("http://localhost:5000/api/bookings", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  allBookings = await res.json();
  renderBookings(allBookings);
}

function renderBookings(bookings) {
  table.innerHTML = "";

  bookings.forEach(b => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${b.bookingId}</td>
      <td>${b.name}</td>
      <td>${b.email}</td>
      <td>${b.phone}</td>
      <td>
        <span class="status ${b.status}">${b.status}</span>
      </td>
      <td>${new Date(b.createdAt).toLocaleDateString()}</td>
      <td>
        <select class="action" onchange="updateStatus('${b._id}', this.value)">
          <option ${b.status === "pending" ? "selected" : ""}>pending</option>
          <option ${b.status === "approved" ? "selected" : ""}>approved</option>
          <option ${b.status === "rejected" ? "selected" : ""}>rejected</option>
        </select>
      </td>
    `;

    table.appendChild(row);
  });
}

async function updateStatus(id, status) {
  await fetch(`http://localhost:5000/api/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ status })
  });

  loadBookings();
}

function applyFilters() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const status = document.getElementById("statusFilter").value;

  let filtered = allBookings.filter(b =>
    b.bookingId.toLowerCase().includes(search) ||
    b.name.toLowerCase().includes(search) ||
    b.email.toLowerCase().includes(search)
  );

  if (status !== "all") {
    filtered = filtered.filter(b => b.status === status);
  }

  renderBookings(filtered);
}

function logout() {
  localStorage.removeItem("adminToken");
  window.location.href = "index.html";
}

loadBookings();
