# <center> Currency Library Guide </center>

## What is it ?

*Currency* is a library to convert amount from a chosen currency to another one.
To do so, we use the library *money* that makes the conversion depending on the given rate.

## Installing

First of all, fork the project.
Then tou can clone your forked project using
````
$ cd "/path/to/workspace"
$ git clone https://github.com/YOUR_USERNAME/3-musketeers.git
````
Then, you must install all the packages

using npm:

````
$ npm install
````
or using yarn:
````
$ yarn install
````
___

Congratulations !

Now you can run *currency* using
````
$ node cli.js
````

## How can I use it ?

Once all the packages are installed, you can start using *currency* library.
By default, you'll see that it converts 1USD to BTC (Bitcoin).
> $ node cli.js 
1 USD = 0.0001149659183535041 BTC

If you want to change these parameters, you just have to run cli.js this way :

````
$ node cli.js amount 'currency to convert' 'converted curreny'
````

Another example of usage is given if you run
````
$ node cli.js --help
````

You can use most of the physical currencies + Bitcoin in both way.


## Example

>$ node cli.js 100 EUR USD
100 EUR = 111.16999999999999 USD

Here we converted 100 EUR in USD.

## Tests

You will find in this project the file *index.test.js* in which there are several unit tests.
Theses tests are here to test the capacities of the library and to make sure every situation is working.
To run these tests :
````
$ npm test
````













