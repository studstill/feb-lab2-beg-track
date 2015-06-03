/*********************************************************
LAB 2: LOOPY SCI-FI

Welcome to Lab 2 =)

Be sure to read all the comments!

All of the instructions are inline with the assignment below.
Look for the word TODO in comments.  Each TODO will have a
description of what is required.

To run this file (in the terminal) use: node lab2.js

*********************************************************/
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log("assertion failure: ", failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

 persons consumed  |  rate of consumption
 ------------------|---------------------
        0          |       1/hour
        1          |       2/hour
        2          |       3/hour
        3          |       4/hour

*/

// make a constructor function, called Blob, that makes blobs
function Blob(name) {
    this.name = name;
}

// create an instance of Blob named blob
var blob = new Blob(blob);

// declare variables & initial conditions for calculating the blob takeover
var personsConsumed = 0;
var personsRemaining = 1000;
var rateOfConsumption = 1;
var hoursSpentInDowington;

//use a loop to calc how long it took blob to finish with Dowington
for (i = 0, j = 1; i < personsRemaining; i++, j++) {
  hoursSpentInDowington = i;
  rateOfConsumption = j;
  personsRemaining = personsRemaining - rateOfConsumption;
}

 // assign hoursSpentInDowington the value of the above calculation
 hoursSpentInDowington = 43;

// create a function that takes a population for an arbitrary town, and the starting consumption rate, and returns the number of hours the blob needs to ooze its way through that town
function hoursToOoze(population, peoplePerHour) {
  var hours;
  var pop = population;
  var pph = peoplePerHour;

  if (population < 1) {
    hours = 0;
  } else {
    for (i = 0, j = pph; i < pop; i++, j++) {
      pph = j;
      hours = i;
      pop = pop - pph;
    }
  }
  return hours;
}

// create a method, Blob.hoursToOoze, and assign it the above function, hoursToOoze
Blob.prototype.hoursToOoze = hoursToOoze;

assert(blob.hoursToOoze(0, 1) === 0, "no people means no time needed.");
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  "hoursSpentInDowington should match hoursToOoze\"s result for 1000");

// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: "nuqneH",  // home planet is Qo"noS
  romulan: "Jolan\"tru", // home planet is Romulus
  "federation standard": "hello" // home planet is Earth
};

// define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method called sayHello.

function SentientBeing (homePlanet, language) {
  this.homePlanet = homePlanet;
  this.language = language;
  this.hello = hello[language];
  this.sayHello = function(sb) {
    console.log(this.hello);
    return sb.hello;
  }
}

var klingon = new SentientBeing('Qo"noS', "klingon");
var romulan = new SentientBeing("Romulus", "romulan");
var Human = new SentientBeing("Earth", "federation standard");

function Klingon() {}
function Romulan() {}
function Human() {}
Human.prototype = new SentientBeing("Earth", "federation standard")
Klingon.prototype = new SentientBeing('Qo"noS', "klingon");
Romulan.prototype = new SentientBeing("Romulus", "romulan");


assert((new Human()).sayHello(new Klingon()) === "nuqneH",
  "the klingon should hear nuqneH");

assert((new Human()).sayHello(new Romulan()) === "Jolan\"tru",
  "the romulan should hear Jolan\"tru");
assert((new Romulan()).sayHello(new Klingon()) === "nuqneH",
  "the klingon should hear nuqneH");
assert((new Romulan()).sayHello(new Human()) === "hello",
  "the human should hear hello");
assert((new Klingon()).sayHello(new Romulan()) === "Jolan\"tru",
  "the romulan should hear Jolan\"tru");
assert((new Klingon()).sayHello(new Human()) === "hello",
  "the human should hear hello");

//*********************************************************
// PROBLEM 3: Moar Loops. 20 points.
//
// Implement the following functions. Write at least 3
// assertions for each one
//*********************************************************
function max(array) {
  // return the largest number in the given array
  var newMax = 0;
  for (i = 0; i < array.length; i++) {
    if (array[i] > newMax) {
      newMax = array[i];
    }
  }
  return newMax;
}

assert(max([ 1, 3, 2 ]) === 3, "[1,3,2]");
assert(max([ 1, 5, 7, 9]) === 9, "[1,5,7,9]");
assert(max([1]) === 1, "[1]");
assert(max([ 2.33, 9.9999, 100.255, 6 ]) === 100.255, '[2.33,9.9999,100.255,6 ]');


function variablify(string) {
  var array = string.split(' ');
  var camelString = '';
  for (var i = 0; i < array.length; i++) {
    if (i === 0) {
      var firstWord = array[i];
      camelString += firstWord.toLowerCase();
    } else {
      var nextWord = array[i];
      camelString += nextWord.charAt(0).toUpperCase();
      for (var j = 1; j < nextWord.length; j++) {
        camelString += nextWord.charAt(j).toLowerCase();
      }
    }
  }
  return camelString;
}


// TODO: write three more assertions
assert(variablify("one two three") === "oneTwoThree",
  "variablify(\"one two three\")");

assert(variablify("This is my String") === "thisIsMyString",
  "variablify(\"This is my String\") should return 'thisIsMyString'");

assert(variablify("NEW VARIABLE") === "newVariable",
  "variablify(\"NEW VARIABLE\") should return 'newVariable'");

assert(variablify("CrAzY CASe") === "crazyCase",
  "variablify(\"CrAzY CASe\") should return 'crazyCase'");
//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************
