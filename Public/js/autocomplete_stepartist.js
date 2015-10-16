/*****************************************************
 *
 * File:            autocomplete_stepartist.js
 * Authors:         Roy Van Liew and Jie Lou
 * Last Modified:
 * Description:     Step Artist autocomplete feature
 *
 ****************************************************/

function autocompleteStepArtist() {

	//record the autocomplete content
	var hints;

	//to record which row is selected now
	var rowNumber = -1;

	//record the content of the input field
	var content;

	const $autoComplete = $('.autocompleteStepArtist');

	//same to set this attribute in the browser
	$autoComplete.attr('autocomplete', 'off');

	$autoComplete.bind('propertychange input focus', function (event) {

		/**
		 * every time the search field got the new input
		 * the row number should count from -1 again
		 * -1 represents the input field
		 */
		rowNumber = -1;
		content = $autoComplete.val();

		//when click the search field, the field get focus
		//refer to .autocomplete field
		const $this = $(this);

		//
		//everytime input remove the previous data
		$(hints).remove(); //remove from the global variable
		hints = document.createElement('div'); //assign to the global variable
		const $hints = $(hints);
		$hints.addClass('hints');

		$hints.css({
			top : '35px',
			left : '15px',
			width : '100%'
		});

		/**
		 * what DOM should be
		 * <div class="col-xs-8 col-sm-6">
		 *   <input id="inputString" class="form-control autocomplete" type="text" style="" maxlength="50" value="" name="inputString" autocomplete="off">
		 *   <div class="hints" style="">
		 *      <table id="hintTable" class="table table-bordered table-hover" cellspacing="0" cellpadding="2" style="">
		 *
		 * $this.parent() refers to the parent of 'class = autocomplete', make the 'hints' and 'autocomplete' the same level
		 */
		$hints.appendTo($this.parent());

		$.ajax({

			type : 'GET',
			url : '/autoCompleteProcessStepArtist',
			dateType : 'json',
			data : {
				inputString : $this.val()
			},
			success : function (json) {

				var htmlcode = "<table style=\"background-color:#FFF;\" class=\"table table-bordered\" id='hintTable' cellspacing='0' cellpadding='2'><tbody>";

				var hintLength = json.length;
				if (hintLength > 10) {
					hintLength = 10;
				}

				for (var i = 0; i < hintLength; i++) {

					// var songName = json[i].stepper;
                    var songName = json[i];
                    var songArr_OriginalCase = songName.trim().split(/\s+/);
                    var songArr = songName.toLocaleLowerCase().trim().split(/\s+/);
                    var songArrLen = songArr.length;

					//the name will be shown in the table row
					var showName = '';
                    var newsongDisplayName = '';

					//record if this name has been matched yet
					var nameMap = {};

					//false means not matched yet
					nameMap[songName] = false;

					//record the input string from the front end
					var contentArr = content.toLocaleLowerCase().trim().split(/\s+/);
                    var contentLen = contentArr.length;
                    
                    // For each part of the song Name
                    for (var j = 0; j < songArrLen; j++) {
                        
                        var songPart = songArr[j];
                        var found = false;
                        
                        // For each field entered in the input string
                        for (var k = 0; k < contentLen; k++ ) {
                            
                            var partInput = contentArr[k];
                            var pos = songPart.indexOf(partInput);
                            
                            if (pos !== -1) {
                                nameMap[songName] = true;
                                var part1 = songArr_OriginalCase[j].substring(0, pos);
                                var part2 = '<b><span style="background-color: #EFEFEE;">' + songArr_OriginalCase[j].substring(pos, pos + partInput.length) + '</span></b>';
                                var part3 = songArr_OriginalCase[j].substring(pos + partInput.length, songArr_OriginalCase[j].length);
                                var newsongPart = part1 + part2 + part3 + " ";
                                newsongDisplayName += newsongPart;
                                found = true;
                                break;
                            } else {
                                continue;
                            }
                            
                        }
                        
                        // If the input part wasn't found in the song part, just add original song part without formatting.
                        if (!found) {
                            newsongDisplayName += songArr_OriginalCase[j] + " ";
                        }
                        
                    }
                    
                    newsongDisplayName = newsongDisplayName.trim();
                    
                    if (nameMap[songName]) {
                        showName = newsongDisplayName;   
                    } else {
                        showName = songName;
                    }

					htmlcode += "<tr id=" + i + "><td>" + newsongDisplayName + "</td></tr>"

				}
				htmlcode += "</tbody></table>";
				$hints.html(htmlcode);

			}

		});

	});

	/**
	 * For bold and color the words
	 */
	function splitString(str) {

		//cannot accept undefined string value
		const len = str.length;
		var i = 0,
		j = 0;
		const res = [];

		for (i = 0; i < len; ) {
			if (!isCharacter(str[i])) {
				i++;
			} else {
				j = i;
				while (isCharacter(str[j]) && j != len) {
					j++;
				}
				res.push(str.substring(i, j));
				i = j;
			}
		}

		return res;

	}

	function isCharacter(character) {
		if (character >= 'a' && character <= 'z' || character >= 'A' && character <= 'Z' || character === "'" || character === '-') {
			return true;
		} else {
			return false;
		}
	}

	//blur occurs when user click other place of the browser
	$autoComplete.blur(function () {
		$(hints).fadeOut('fast');
	});

	/**
	 * keyboard events

	 * use rowNumber to record which row is selected now
	 * every time trigger the keydown event of $('.autocomplete')
	 * use :eq selector to get the selected row

	 * requirements
	 * if the keyboard moved to the first row, next keyup will go to the search field
	 * if the keyboard moved to the last row, next keydown will go to the search field
	 * when keyboard is moving, set the value of the row to the search field
	 * when the keyboard moves back to the search field, show the user's original input strings
	 *
	 */

	$autoComplete.keydown(function (event) {

		//get the number of tr
		var hintNum = $('.hints tr').length;

		//use the rowNumber to get the position
		//console.log("hint num = " + hintNum);
		if (event.keyCode === 40) { //down

			rowNumber++;

			if (rowNumber === hintNum) {

				//the last row of hint, should go back to the search field
				$autoComplete.val(content);
				$('.hints tr:eq(' + ((hintNum) - 1) + ')').removeAttr('class').removeAttr('style');
				rowNumber = -1; //set back to the search field

			} else {

				$('.hints tr:eq(' + ((rowNumber) - 1) + ')').removeAttr('class').removeAttr('style');
				$('.hints tr:eq(' + (rowNumber) + ')').addClass('selectedtr').css('background-color', '#F5F5F5');
				$autoComplete.val($('.hints tr:eq(' + (rowNumber) + ')').text());

			}

		} else if (event.keyCode === 38) { //up

			rowNumber--;

			//one more up, is the search field
			if (rowNumber === -1) {

				//clear all the styles in the hint table
				$autoComplete.val(content);
				$('.hints tr').removeAttr('class').removeAttr('style');

			}

			//if it is in the search field, and one more up leads to the last line
			else if (rowNumber === -2) {

				//
				rowNumber = hintNum - 1;
				$('.hints tr:eq(' + (rowNumber) + ')').addClass('selectedtr').css('background-color', '#F5F5F5');
				$autoComplete.val($('.hints tr:eq(' + (hintNum - 1) + ')').text());

			} else {

				$('.hints tr:eq(' + ((rowNumber) + 1) + ')').removeAttr('class').removeAttr('style');
				$('.hints tr:eq(' + (rowNumber) + ')').addClass('selectedtr').css('background-color', '#F5F5F5');
				$autoComplete.val($('.hints tr:eq(' + (rowNumber) + ')').text());

			}

		} else if (event.keyCode === 13) { //enter

			//after click, the hint field should disappear
			$(hints).fadeOut('fast');

		}

	});

	/****************** mouse events **********************/

	//'.hints td' good way to select the elements

	$(document).delegate('.hints td', 'mouseover', function () {

		//element td's parent() is element tr
		var $nowtr = $(this).parent();

		//remove all the attributes in all the <tr> elements
		$nowtr.siblings('tr').removeAttr('class').removeAttr('style');

		//mistaken..
		$nowtr.addClass('selectedtr').css('background-color', '#F5F5F5');

		//set a new row number
		rowNumber = $('.selectedtr').attr('id');

	});

	$(document).delegate('.hints td', 'click', function () {

		//get the search field
		$('input').val($(this).text());

		//after click, the hint field should disappear
		$(hints).fadeOut('fast');

		//after select the name the user needs,
		//reset the characters that remains
		var remaining_chars = 50 - $('input').val().length;
		$('#characters').text('Characters Remaining: ' + remaining_chars);

	});

}