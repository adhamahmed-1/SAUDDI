const checkStatusBtn = document.getElementById("checkStatusBtn");
const statusResult = document.getElementById("statusResult");

checkStatusBtn.addEventListener("click", async () => {
  const bookingId = document.getElementById("bookingId").value.trim();

  if (!bookingId) {
    statusResult.style.color = "red";
    statusResult.innerText = "Please enter a Booking ID";
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:5001/api/bookings/${bookingId}`
    );

    const data = await res.json();

    if (!res.ok) {
      statusResult.style.color = "red";
      statusResult.innerText = data.message || "Booking not found";
      return;
    }

    statusResult.style.color = "lightgreen";
    statusResult.innerHTML = `
      <p><strong>Status:</strong> ${data.status}</p>
      <p><strong>Package:</strong> ${data.packageName}</p>
      <p><strong>Amount:</strong> ₹${data.amount}</p>
      <p><strong>Created At:</strong> ${new Date(
        data.createdAt
      ).toLocaleString()}</p>
    `;
  } catch (error) {
    statusResult.style.color = "red";
    statusResult.innerText = "Server error. Try again later.";
  }
});
