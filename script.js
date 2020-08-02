const expense = document.querySelector(".expense");
const income = document.querySelector(".income");
const epenseDetail = document.querySelector(".expense-details");
const button = document.querySelector(".btn");
const description_2 = document.querySelector(".description-2");
const amount = document.querySelector("#amount");
let total = document.querySelector(".total");
let expenseTotal = 0;
let incomeTotal = 0;

getStoredTranscations();
function getStoredTranscations() {
  let transactions_ = JSON.parse(localStorage.getItem("transactions"));

  if (transactions_ !== null) {
    if (transactions_.length > 0) {
      transactions_.forEach((trans) => {
        epenseDetail.innerHTML += trans;
      });
    }
  }
}

function transction() {
  if (amount.value !== "" && description_2.value.trim() !== "") {
    let div = document.createElement("div");
    amount.value > 0
      ? div.setAttribute("class", "detail inc")
      : div.setAttribute("class", "detail exp");

    div.setAttribute("title",amount.value);
    div.innerHTML = `  <span class="close">
    X
</span>
<span class="description">
   ${description_2.value}
</span>
<span>R<span class="money">
  ${Math.abs(amount.value)}
</span>
</span>`;
    epenseDetail.appendChild(div);
    income.textContent = incomeTotal;
    amount.value = "";
    description_2.value = "";
    updateTransactions();
    storedTransactions();
  } else {
    let error = document.querySelector(".error");
    error.style.display = "block";
    setTimeout(() => {
      error.style.display = "none";
    }, 3000);
  }
}

function updateTransactions() {
  let detail_expense = document.querySelectorAll(".detail:not(.inc)");

  let expenseTotal = Array.from(detail_expense).reduce((acc, current) => {
    return (acc += +current.title);
  }, 0);

  let detail_income = document.querySelectorAll(".detail:not(.exp)");

  let incomeTotal = Array.from(detail_income).reduce((acc, current) => {
    return (acc += +current.title);
  }, 0);

  income.textContent = incomeTotal > 0 ? "+" + incomeTotal :   incomeTotal;

  expense.textContent = expenseTotal;

  if ( incomeTotal + expenseTotal < 0) {
    total.previousElementSibling.textContent = "-R";
    total.textContent = (+incomeTotal + +expenseTotal) * -1;
  } else {
    total.previousElementSibling.textContent = "R";
    total.textContent = +incomeTotal + +expenseTotal;
  }

  deleteTransactions();
  checkTransactions();
}

function storedTransactions() {
  let detail = document.querySelectorAll(".detail");
  let storedTransactions = [];
  detail.forEach((ele) => {
    storedTransactions.push(ele.outerHTML);
  });

  localStorage.setItem("transactions", JSON.stringify(storedTransactions));
}
updateTransactions();

button.addEventListener("click", transction);

function deleteTransactions() {
  const closeBtn = document.querySelectorAll(".close");
  closeBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.target.parentElement.remove();
      updateTransactions();
      storedTransactions();
    });
  });
}

function checkTransactions() {
  let detail = document.querySelectorAll(".detail");
  const center = document.querySelector(".center");

  if (detail.length == 0) {
    center.style.display = "block";
  } else {
    center.style.display = "none";
  }
}

checkTransactions();
