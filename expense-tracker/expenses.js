const expenseDesc = document.getElementById("description");
const ExpenseAmount = document.getElementById("amount");
const btn = document.getElementById("expenseSubmit");
const spentAmount = document.getElementById("totalSpent");
const expenseList = document.getElementById("expenseList");
const ErrorMessage = document.getElementById("errorMess");
const amountErr = document.getElementById("errorMessamount");
const resetStoragebtn = document.getElementById("ResetExpenses");

btn.addEventListener("click", () => {
  const description = expenseDesc.value.trim();
  const amount = ExpenseAmount.value.trim();
  ErrorMessage.innerHTML = "";
  amountErr.innerHTML = "";

  try {
    if (description === "") {
      ErrorMessage.innerHTML = `<p style="color:red;">Description cannot be empty!!</p>`;
      setTimeout(() => {
        ErrorMessage.innerHTML = "";
      }, 2000);
      return;
    }

    if (amount === "" || isNaN(amount)) {
      amountErr.innerHTML = `<p style="color:red;">Amount must be a number!!</p>`;
      setTimeout(() => {
        amountErr.innerHTML = "";
      }, 2000);
      return;
    }

    const data = JSON.parse(localStorage.getItem("Expenses")) || [];
    const newExpense = {
      des: description,
      amount: parseFloat(amount),
      id: new Date().toISOString(),
    };
    data.push(newExpense);
    localStorage.setItem("Expenses", JSON.stringify(data));

    showItem();
    expenseDesc.value = "";
    ExpenseAmount.value = "";
  } catch (err) {
    console.log("Error adding items", err);
  }
});

function DeleteItem(index) {
  const data = JSON.parse(localStorage.getItem("Expenses")) || [];
  const updated = data.filter((d) => d.id !== index);
  localStorage.setItem("Expenses", JSON.stringify(updated));
  showItem();
}

function showItem() {
  const data = JSON.parse(localStorage.getItem("Expenses")) || [];
  let TotalExp = 0;
  let listHTML = "";

  data.forEach((d) => {
    listHTML += `<li>${d.des} — ₹${parseFloat(d.amount).toFixed(2)} 
      <button data-id="${d.id}" class="delete-item">Delete</button></li>`;
    TotalExp += parseFloat(d.amount);
  });

  expenseList.innerHTML = listHTML;
  spentAmount.textContent = `Total Spent: ₹${TotalExp.toFixed(2)}`;

  document.querySelectorAll(".delete-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      DeleteItem(id);
    });
  });
}

resetStoragebtn.addEventListener("click", () => {
  localStorage.clear();
  expenseDesc.value = "";
  ExpenseAmount.value = "";
  expenseList.innerHTML = "";
  spentAmount.textContent = "Total Spent: ₹0.00";
});

showItem(); 
