import React, { Component } from 'react';
export default class ReactArray extends Component {

    render() {
        const peopleObj = {
            jim: {
                name: "jim",
                age: 20
            },
            tim: {
                name: "tim",
                age: 22
            }
        }

        let fruits = ["apple", "Mango","Orange", "Grapes"];
        //=============================Append items to array===============================
        //Push: Muttable        2: Concat: Immutable
        console.log("Using Push:--------------")
        fruits.push("lichi");
        console.log(fruits);
        //The concat() method is used to merge two or more arrays.
        //This method does not change the existing arrays, but instead returns a new array.
         var arrayConcat=fruits.concat("guava");
        console.log("Using concat:--------------")
        console.log(fruits);
        console.log(arrayConcat)

       
        //======================filter=============================================================
        console.log("Filte-----------------------");
        console.log(fruits.filter(x => x != "apple"));

        //===============================Slice and splice=============================================
        let fruit = ["apple", "Mango", "Orange", "Grapes"];
        console.log("Using Slice : The original array will not be modified.------------");
      //  var fruitchange = fruit.slice(2);
        console.log(fruit.slice(2));
        console.log("Using Slice: selected from begin to end (end not included)")
        console.log(fruit.slice(2,3));
        
        //The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements.

        console.log("Using splice: insert at index 1-------------------------");
        fruits.splice(1, 0, 'abc');
        console.log(fruits);
        console.log("Using splice: replace element at index 2")
        fruits.splice(2, 2, 'xyz');2
        console.log(fruits);

        //=========================================convert object to array=============================

        console.log("object");
        console.log(peopleObj);
        //==============ist method=================
        var peopleArray = Object.values(peopleObj);
        console.log("Using :Object.values(peopleObj)");
        console.log(peopleArray);
        //==============2nd method=================
        peopleArray = Object.keys(peopleObj).map(i => peopleObj[i]);
        console.log("Using :Object.keys(peopleObj)");
        console.log(peopleArray);
        //==============3rd method=================
        peopleArray = Object.entries(peopleObj);
        console.log("Using :Object.entries(peopleObj)");
        console.log(peopleArray);
        //==============4th method=================
        peopleArray = Object.assign([], { ...peopleObj });
        console.log("Using :Object.assign([], {...peopleObj }");
        console.log(peopleArray);
        //==============5th method=================
        peopleArray = Array.from(Object.keys(peopleObj), k => peopleObj[k]);
        console.log("using :Array.from(Object.keys(peopleObj), k => peopleObj[k])");
        console.log(peopleArray);

        //=========================================convert array to object=============================
        var array1 = [1, 2, 3];
        var obj = {
            "om": "1",
            "two": "2",
            "three": 3
        }
            
        console.log("array to object using: ...array1------------------ ");
        console.log({ ...array1});

        //=========================================convert Array of array to array=============================
        //var test2d = [[1, 2], [2, 3], [3, 4]];
        
        //console.log("2d to 1d using: ...array1------------------------ ");
        //console.log([].concat.apply([], test2d));
        //console.log("Using reduce");
        //console.log(test2d.reduce((prev, next) => prev.concat(next)));


        return <h1>hello</h1>;
    }
}