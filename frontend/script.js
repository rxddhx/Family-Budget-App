const API_URL = "http://127.0.0.1:5000";

// FINANCE DATA

async function saveFinanceData() {

    const incomeInput =
        document.getElementById("incomeInput");

    const spendingInput =
        document.getElementById("spendingInput");

    let income = 0;

    // Adults can add income
    if(incomeInput) {

        income = incomeInput.value;
    }

    const spending =
        spendingInput.value;

    // Save income
    if(income > 0) {

        await fetch(API_URL + "/add", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                type: "income",
                amount: income
            })
        });
    }

    // Save spending
    await fetch(API_URL + "/add", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            type: "expense",
            amount: spending
        })
    });

    alert("Data saved!");

    loadSummary();
}

// DASHBOARD SUMMARY

async function loadSummary() {

    const response =
        await fetch(API_URL + "/summary");

    const data =
        await response.json();

    const incomeElement =
        document.getElementById(
            "totalIncome"
        );

    const spendingElement =
        document.getElementById(
            "totalSpending"
        );

    const savingsElement =
        document.getElementById(
            "totalSavings"
        );

    if(incomeElement) {

        incomeElement.innerText =
            data.income;
    }

    if(spendingElement) {

        spendingElement.innerText =
            data.expenses;
    }

    if(savingsElement) {

        savingsElement.innerText =
            data.savings;
    }
}

loadSummary();

// SIGNUP PAGE LOGIC

const userType =
    document.getElementById("userType");

if(userType){

    userType.addEventListener(
        "change",
        function() {

            const parentSection =
                document.getElementById(
                    "parentSection"
                );

            if(userType.value === "child") {

                parentSection.style.display =
                    "block";

            } else {

                parentSection.style.display =
                    "none";
            }
        }
    );
}

function checkUserType() {

    const savedUserType =
        localStorage.getItem(
            "userType"
        );

    const incomeSection =
        document.getElementById(
            "incomeSection"
        );

    // Hide income for children
    if(savedUserType === "child") {

        if(incomeSection) {

            incomeSection.style.display =
                "none";
        }
    }
}

checkUserType();

// BUDGETING

function saveBudget() {

    const foodBudget =
        document.getElementById(
            "foodBudget"
        ).value;

    const shoppingBudget =
        document.getElementById(
            "shoppingBudget"
        ).value;

    const entertainmentBudget =
        document.getElementById(
            "entertainmentBudget"
        ).value;

    localStorage.setItem(
        "foodBudget",
        foodBudget
    );

    localStorage.setItem(
        "shoppingBudget",
        shoppingBudget
    );

    localStorage.setItem(
        "entertainmentBudget",
        entertainmentBudget
    );

    alert("Budget saved!");
}

// GOALS

function saveGoal() {

    const goalName =
        document.getElementById(
            "goalName"
        ).value;

    const goalAmount =
        document.getElementById(
            "goalAmount"
        ).value;

    localStorage.setItem(
        "goalName",
        goalName
    );

    localStorage.setItem(
        "goalAmount",
        goalAmount
    );

    // Show goal on page
    const goalDisplay =
        document.getElementById(
            "goalDisplay"
        );

    if(goalDisplay) {

        goalDisplay.innerText =
            goalName +
            " - $" +
            goalAmount;
    }

    alert("Goal created!");
}