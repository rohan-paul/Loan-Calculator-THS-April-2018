// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    // Hide results
    document.getElementById('results').style.display = 'none';
    // show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateLoanPayments, 1000);
    e.preventDefault();
});

/* Calculate Loan Payment Schedule

EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)

where P is Principle Loan Amount

r is rate of interest calculated in monthly basis it should be = Rate of Annual interest/12/100

if its 10% annual ,then its 10/12/100=0.00833

n is tenure in number of months
 */
function calculateLoanPayments() {
  console.log('Calculating...');

  const amount = document.getElementById('loan-amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const monthlyInterest = parseFloat(interest.value) / 100 / 12;
  const totalTenureInMonths = parseFloat(years.value) * 12;

  const x = Math.pow((1 + monthlyInterest), totalTenureInMonths);
  const monthlyEMI = (principal * monthlyInterest * x) / (x - 1);

  if (isFinite(monthlyEMI)) {
        monthlyPayment.value = monthlyEMI.toFixed(2);
        totalPayment.value = (monthlyEMI * totalTenureInMonths).toFixed(2);
        totalInterest.value = (totalPayment.value - principal).toFixed(2);

        // show result
        document.getElementById('results').style.display = 'block';

        // Hide loader
        document.getElementById('loading').style.display = 'none';
  } else {
      showError("Please check your number");
  }
}

function showError(error) {
  // When error occurs, hide results and loader and create a div for error
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'none';
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';

  // Get the card and heading elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 2 seconds
  setTimeout(clearError, 2000);

}

function clearError() {
    document.querySelector('.alert').remove();
}
