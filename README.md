## Prerequist
- Node.js
- npm

## Project Setup
- run
```diff
npm i
```
- add transactions.csv file in root directory

## Problem requirement
- Given no parameters, return the latest portfolio value per token in USD.
- Given a token, return the latest portfolio value for that token in USD.
- Given a date, return the portfolio value per token in USD on that date.
- Given a date and a token, return the portfolio value of that token in USD on that date.



## How to run the program ?

> **Note:** Please add the transactions.csv in the root folder to run this program.

#### 1. Without any arguments

```diff
node app.js process
```

#### 2. With token as an argument

```diff
node app.js process --token BTC
```

or

```diff
node app.js process -t BTC
```

#### 3. With date as an argument

```diff
node app.js process --date 2023-26-26
```

or

```diff
node app.js process -d 2023-26-26
```

> _**Note**: Date need to be on YYYY-MM-DD format_

#### 4. With token and date as an argument

```diff
node app.js process --token BTC --date 2023-26-26
```

or

```diff
node app.js process -t BTC -d 2023-26-26
```

#### 5. For help

```diff
node app.js help
```

#### 5. For help related to process command

```diff
node app.js process --help
```

or

```diff
node app.js process -h
```


## Design decision taken to solve the problem

### 1. Parsing the CSV file

I have used event driven approach to parse the CSV. I have used `csv-parser` module for event driven approach. The advantage on event driven approach is that instead of loading the complete CSV it gives data in chunks, which solves our requirement and is also memory efficient and can parse file of any size. So, I decided to use event driven approach.

### 2. For Command Line Program

I have used `yargs` module in this node program as its help in creating our own command-line commands in node.js and makes command-line arguments flexible and easy to use.

### 4. Getting conveersation rate for token in USD from cryptocompare

I have cryptocompare API to get the conversation rate of the token in USD.


### 3. Storing cryptocompare api key on the .env file

Cryptocompare url and api key are stored on the .env file as it lets us to customize our individual working environment variables. .env file are not committed in the git so secret credentials will be safe from outside user. Since this is the assignment and need to share with you I have commeted the .env file.

### 4. Globally Available Commands

To make our command available globally,I add a shebang line to the top of app.js:

```shell
#!/usr/bin/env node
```

Next, bin property is added to our package.json file. This maps the command name (crpyto) to the name of the file to be executed:

```json
"bin": {
"crypto": "./app.js"
}
```

After that, installing this module globally and we have a working shell command.

```shell
npm install -g
```

Now we can run our command line application using `crypto` command from any directory.

Examples:

```shell
crypto process
```

```shell
crypto process -t BTC
```

