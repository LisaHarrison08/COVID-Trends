-- Create tables for raw data to be loaded into

-- run this QUERY

CREATE TABLE merged_data (
States              VARCHAR(80) NOT NULL,
Dates               VARCHAR(80) NOT NULL,
SMA_retail_recreation   FLOAT,
SMA_grocery_pharmacy    FLOAT,
SMA_parks               FLOAT,
SMA_transit             FLOAT,
SMA_workplaces          FLOAT,
SMA_residential         FLOAT,
case_count				FLOAT,
new_case_count			FLOAT,
revenue_all				FLOAT,
revenue_ss60			FLOAT,
deaths					FLOAT
);




CREATE TABLE google_data (
States              VARCHAR(80) NOT NULL,
Dates               VARCHAR(80) NOT NULL,
Retail_Recreation   	FLOAT,
Grocery_Pharmacy    	FLOAT,
Parks               	FLOAT,
Transit             	FLOAT,
Workplaces          	FLOAT,
Residential         	FLOAT,
SMA_retail_recreation   FLOAT,
SMA_grocery_pharmacy    FLOAT,
SMA_parks               FLOAT,
SMA_transit             FLOAT,
SMA_workplaces          FLOAT,
SMA_residential         FLOAT
);

CREATE TABLE covid_data (
Dates       VARCHAR(80) NOT NULL,
States      VARCHAR(80) NOT NULL,
fips        INT     	NOT NULL,
cases       INT     	NOT NULL,
deaths      INT     	NOT NULL
);

CREATE TABLE us_data (
States              VARCHAR(80) NOT NULL,
Retail_Recreation   	FLOAT,
Grocery_Pharmacy    	FLOAT,
Parks               	FLOAT,
Transit             	FLOAT,
Workplaces          	FLOAT,
Residential         	FLOAT,
SMA_Retail_Recreation   FLOAT,
SMA_Grocery_Pharmacy    FLOAT,
SMA_Parks               FLOAT,
SMA_Transit             FLOAT,
SMA_Workplaces          FLOAT,
SMA_Residential         FLOAT,
Dates               VARCHAR(80) NOT NULL
);


SELECT g.states, g.dates, g.grocery_pharmacy, c.cases
FROM google_data g
JOIN covid_data c , us_data u
ON g.states = c.states, u.dates AND g.dates=c.dates, u.dates;

-- Include following if insufficient permission error in pandas:

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;

