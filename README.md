# Digital Currency Traede

Simple Node.js app using FTX API to get the pricing on any existing exchange market at the time.


## How to run?

Clone the repository and type in the following command to the terminal:

    npm install && npm start
 or you could use Docker:
 

    docker build . -t <image-name>
    docker run -p 3000:3000 <image-name>

App should be running on [localhost:3000](http://localhost:3000)

### Routes

    POST /quote
##### Request body
|  | type | value |
|--|--|--|
| action | string | "buy" or "sell"|
| base_currency | string | e.g "USD" |
| quote_currency | string | e.g "BTC" |
| amount | string | e.g "123" |

##### Response
|  | type | description |
|--|--|--|
| total | string | Total quantity of quote currency |
| price | string | The per-unit cost of the base currency |
| currency | string | The quote currency |
