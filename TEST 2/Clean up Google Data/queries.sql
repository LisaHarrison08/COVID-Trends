-- Create tables for raw data to be loaded into
CREATE TABLE google_data (
States              VARCHAR(80) NOT NULL,
Retail_Recreation   FLOAT,
Grocery_Pharmacy    FLOAT,
Parks               FLOAT,
Dates               VARCHAR(80) NOT NULL
);

CREATE TABLE covid_data (
Dates       VARCHAR(80) NOT NULL,
States      VARCHAR(80) NOT NULL,
fips        INT     NOT NULL,
cases       INT     NOT NULL,
deaths      INT     NOT NULL
);

SELECT g.states, g.dates, g.grocery_pharmacy, c.cases
FROM google_data g
JOIN covid_data c
ON g.states = c.states AND g.dates=c.dates;

