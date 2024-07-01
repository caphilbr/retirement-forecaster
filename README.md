# Retirement Forecaster

Check out the demo! 
https://www.loom.com/share/01e5e0b24396405ba1f603ef0e59aecb?sid=2f277b9e-942b-4422-8777-662d8e16b910

A web app to determine the sufficiency of your retirement savings. You create a 'Portfolio' which contains your starting balances, age, spending level, etc. You then create a 'Configuration', which tells the app how you want to forecast your savings (e.g., how to determine your annual savings in the future, your target retirement age, how much expenses will drop in retirement, how many scenarios you want to run, etc.). One might imagine running a few different Configurations to see how results are impacted with different inputs.

The app then runs the specified number of projection scenarios. The key result is 'Chance of Fund Exhaustion', which indicates how likely you are to run out of funds before dying! For those interested in the granular results, each scenario can be displayed, along with the year-by-year financial projection.

Other notable features include:

- auto-rebalancing based on age
- dynamic retirement age, pushing off retirement if funds are not sufficient
- asset yields, inflation and salary raises are each dynamically generated each year, based on a mean and standard deviation
- taxes are determined dynamically, using tax brackets and taking into consideration which type of retirement account withdrawals are from
- a choice of savings approach (fixed dollar, % of salary, or salary less expenses & taxes)

The calculation engine was built in Python, with results exposed via a Flask api. The user app was built with React, Express, and PostgreSQL (with Knex & Objection).
