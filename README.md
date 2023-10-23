# Forex Exchange API

* Forex Exchange API is a powerful tool for currency conversion, live exchange rate tracking, and historical exchange rate data retrieval.
* this API offers a range of functionalities for handling currency-related operations.

### Built With

* Node.js
* Express.js
* Mongodb
* mongoose
* JWT Authentication
* Redis

## Features
* Currency Conversion: Easily convert currencies with real-time exchange rates.
* Live Exchange Rate Tracking: Monitor the latest exchange rates for specific currencies.
* Historical Exchange Rates: Access the conversion rates between two currencies over the past 7 days.
* API Rate Limiting: Implement rate limiting to prevent abuse of the API.
* Caching with Redis: Utilize Redis for caching frequently accessed exchange rates.
* User Authentication: Secure your API with user authentication.
* Persistent Database Storage: Store historical exchange rate data in MongoDB for future analysis.
* Simple and Efficient: Designed with user-friendliness and efficiency in mind.

## Prerequisites
Before running the application, make sure you have the following prerequisites installed on your system:

* NPM (Node Package Manager)
* Node.js and npm installed
* MongoDB and a valid connection string
* Redis server
* API key from an exchange rate provider (e.g., exchangeratesapi.io)



### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Sunil-nith/Forex-Exchange-application
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Replace .env file credentials with your.
   

## Usage

* To run the Server, follow these steps:
1. Navigate to the project directory:
```sh
   cd Forex-Exchange-application
   ```

2. Run the Srever:
```sh
   npm start
   ```
3. Run Redis Server.
## API Endpoints
#### Base URL: http://localhost:3000
##### The API offers the following endpoints:

##### 1. User Signup
POST `/users/signup`
###### Request Parameters:

* email (string, required).
* password (string, required).

##### 2. User Signin
POST `/users/signin`
###### Request Parameters:

* email (string, required).
* password (string, required).
##### 3. Currency Conversion
POST `/money/convert`

Converts one currency to another.

###### Request Parameters:

* sourceCurrency (string, required): The source currency code (e.g., USD).
* targetCurrency (string, required): The target currency code (e.g., EUR).
* amount (number, required): The amount to convert.
##### 4. Live Exchange Rates
GET `/money/rates`

Get live exchange rates for supported currencies.
##### 5. Historical Exchange Rates
POST `/money/history`

Get historical exchange rates for two currencies over the past 7 days.

###### Request Parameters:

* sourceCurrency (string, required): The source currency code (e.g., USD).
* targetCurrency (string, required): The target currency code (e.g., EUR).

## Rate Limiting
To prevent abuse, this API has a rate limiting mechanism that allows a maximum of 100 requests per hour per IP address.

## Caching with Redis
Frequently accessed exchange rate data is cached in Redis, reducing external API calls and improving response times.

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, please create an issue or submit a pull request

## Contact

If you have any questions or need further assistance, please feel free to contact me at skjnv2009@gmail.com.


