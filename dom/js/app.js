//put interpreter into strict mode
"use strict";


console.log("Total: " + numeral(BABYNAMES.length).format("0,0"));

function compareSex(sex) {
    return function(record) {
        return sex == record.sex;
    }
}

function compareByCount(rec1, rec2) {
    return rec1.count - rec2.count;
}

function descending(comparator) {
    return function(rec1, rec2) {
        return -(comparator(rec1, rec2));
    }
}

var females = BABYNAMES.filter(compareSex("F"));
females.sort(descending(compareByCount));
console.log("Number of females: " + females.length);

var males = BABYNAMES.filter(compareSex("M"));
console.log("Number of males: " + males.length);

var tbody = document.querySelector("tbody");

// try to make all functions except all the variables they need, rather than use global  variables
function render(records) {
    // clear out content, so re-rendering doesn't add on top of existing rows
    tbody.innerHTML = "";

    records.forEach(function(record) {
        var tr = document.createElement("tr");
        tr.classList.add("sex-" + record.sex.toLowerCase());

        var td = document.createElement("td");
        // .innerHTML is not safe, the browser will interpret HTML markup in the data
        // .textContent will not interpret, so it is considered safe
        td.textContent = record.name;
        tr.appendChild(td);

        td = document.createElement("td");
        td.textContent = record.sex;
        tr.appendChild(td);

        td = document.createElement("td");
        td.textContent = record.count;
        tr.appendChild(td);

        tbody.appendChild(tr);
    });
}

// render(BABYNAMES);

// see the top 100
render(females.slice(0,100));

var searchInput = document.getElementById("name-search-input");
searchInput.addEventListener("input", function() {
    // console.log("input event");
    var query = searchInput.value.toLowerCase();
    if (query.length < 2) {
        render(BABYNAMES);
        return;
    }
    var matches = BABYNAMES.filter(function(record) {
        // .indexOf will return a value of 0 or greater if the string exists in another string
        return record.name.toLowerCase().indexOf(query) >= 0;
    });
    render(matches);
});

var countColHeading = document.getElementById("count-col-header");
countColHeading.addEventListener("click", function() {
    // console.log("clicked col header");
    BABYNAMES.sort(descending(compareByCount));
    render(BABYNAMES);
});