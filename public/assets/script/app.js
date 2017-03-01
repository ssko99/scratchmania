'use strict';

$(document).ready(function() {

    var newCredit, totalCredit;
    window.onresize = function() {
        console.log('height: ' + window.innerHeight);
        console.log('width: ' + window.innerWidth);
        location.reload();
    }

    $('#newGame').on('click', function(event) {
        $.ajax({ url: "/game", method: "GET" })
            .done(function(Data) {
                location.reload();
            })
    });

    $('#addCredit').on('click', function(event) {
        event.preventDefault();
        totalCredit += parseInt(newCredit);
        var myId = $('#myId').val().trim();
        console.log(myId);
        console.log(totalCredit, newCredit);
        var userCredit = {
            id: myId,
            credits: totalCredit
        };
        console.log(userCredit);
        $.post("/game", userCredit,
            function(data) {
                if (data) {
                    if (newCredit > 0) {
                        alert("Yay! You are officially win $" +
                            newCredit + " !!!");
                    } else {
                        alert("Sorry you did not win.");
                    }
                }

                // reload the form
                location.reload();
            });

    });

    function shuffleArray(myList) {
        var i = myList.length - 1;
        var j, temp;
        while (i >= 1) {
            j = Math.floor(Math.random() * (i + 1)); // random element up to i, inclusive
            // swap i j
            temp = myList[i];
            myList[i] = myList[j];
            myList[j] = temp;
            i--;
        }
        return myList;
    }

    //first parameter is the id element.
    //second parameter is the number of picture to be displayed.
    function createWinnerRow(idarr, picArr) {
        var element;
        for (var i = 0; i < idarr.length; i++) {
            var tdname = '#t' + idarr[i];

            element = document.getElementById(idarr[i]);
            element.src = "assets/images/" + picArr[i] + ".png";
            ScratchCard(tdname, element);

        }

    }

    function displayPrize(prizeMultiple) {
        var element;

        var prizes = ['prizeone', 'prizetwo', 'prizethree', 'prizefour'];
        for (var i = 0; i < 4; i++) {
            element = document.getElementById(prizes[i]);
            element.innerHTML = '$  ' + prizeMultiple[i];
        }
    }
    // Function for creating a new list row for authors
    function displayAllRow(scratchData, winData, prizes) {
        var arr = [],
            arr1 = [],
            arr2 = [],
            arr3 = [],
            arr4 = [];
        var toparr = ['winone', 'wintwo', 'winthree', 'winfour'];
        var idarr = ['oneone', 'onetwo', 'onethree', 'onefour'];
        var idarr2 = ['twoone', 'twotwo', 'twothree', 'twofour'];
        var idarr3 = ['threeone', 'threetwo', 'threethree', 'threefour'];
        var idarr4 = ['fourone', 'fourtwo', 'fourthree', 'fourfour'];
        var idarr5 = ['fiveone', 'fivetwo', 'fivethree', 'fivefour'];
        for (var i = 0; i < 4; i++) {

            arr[i] = scratchData[i];
            arr1[i] = scratchData[i + 4];
            arr2[i] = scratchData[i + 8];
            arr3[i] = scratchData[i + 12];
            arr4[i] = scratchData[i + 16];

            if (winData[i] == arr[i] ||
                winData[i] == arr1[i] ||
                winData[i] == arr2[i] ||
                winData[i] == arr3[i] ||
                winData[i] == arr4[i]) {
                newCredit += prizes[i];
            }
        }

        createWinnerRow(toparr, winData);
        createWinnerRow(idarr, arr);
        createWinnerRow(idarr2, arr1);
        createWinnerRow(idarr3, arr2);
        createWinnerRow(idarr4, arr3);
        createWinnerRow(idarr5, arr4);
    }

    function getWinNumbers() {
        // $.get("/api/authors", function(data) {
        //   var rowsToAdd = [];
        //   for (var i = 0; i < data.length; i++) {
        //     rowsToAdd.push(createAuthorRow(data[i]));
        //   }
        //   renderAuthorList(rowsToAdd);
        //   nameInput.val("");
        // });
        var availableNum = [];
        var winNumbers = [];
        var prizeMultiple = [],
            prizes = [];
        for (var i = 1; i <= 40; i++) {
            availableNum.push(i);
        }
        totalCredit = parseInt($('#totalCredit').val().trim());

        newCredit = 0;

        if (totalCredit > 1100) {
            //not winning, randomly generate number;
            availableNum = shuffleArray(availableNum);
            winNumbers = availableNum.slice(0, 4);


            availableNum = shuffleArray(availableNum);
        } else {
            //  console.log('winning round');
            availableNum = shuffleArray(availableNum);
            winNumbers = availableNum.slice(8, 12);
        }

        //Determine the winning multiples;
        prizeMultiple = availableNum.slice(4, 8);
        prizes = prizeMultiple.map(function(val) {
            return val * 10;
        })

        displayPrize(prizes);
        displayAllRow(availableNum, winNumbers, prizes);
    }

    getWinNumbers();

});
