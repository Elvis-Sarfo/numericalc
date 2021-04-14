document.addEventListener('DOMContentLoaded',()=>{

    let txtNum = document.getElementById('txtNum');
    let lblAns = document.getElementById('lblAns');
    let divAns = document.getElementById('divAns');
    let copyTxt = document.getElementById('copyTxt');
    let selectCalc = document.getElementById('selectCalc');
    let page = (window.location.pathname).split('/').pop();

if(page == "dec-bin.html"){
    //display the ans when btnCalc is clicked  
    document.getElementById('btnCalcDecBin').addEventListener('click', ()=>{
        if (isNaN(txtNum.value)){
            flagError(txtNum.value);
        }else{
            if(selectCalc.value == "decToBin") {
                preAns("decimal");
                lblAns.textContent = convertDecToOtherBase(txtNum.value, 2);
            }else if(selectCalc.value == "binToDec"){
                preAns("binary");
                lblAns.textContent = convertOtherBaseToDec(txtNum.value, 2);
            }
        }
        divAns.style.display = 'block';
        return;   
    });
}else if(page == "dec-octal.html"){
    document.getElementById('btnCalcDecOctal').addEventListener('click', ()=>{
        if (isNaN(txtNum.value)){
            flagError(txtNum.value); 
        }else{
            if(selectCalc.value == "decToOctal") {
                preAns("Octal");
                lblAns.textContent = convertDecToOtherBase(txtNum.value, 8);
            }else if(selectCalc.value == "OctalToDec"){
                preAns("decimal");
                lblAns.textContent = convertOtherBaseToDec(txtNum.value, 8);
            }
        }
        divAns.style.display = 'block';
        return; 
    });
}else if(page == "dec-hex.html"){
    document.getElementById('btnCalcDecHex').addEventListener('click', ()=>{
        if (false){
            flagError(txtNum.value); 
        }else{
            if(selectCalc.value == "decToHex") {
                preAns("hexadecimal");
                lblAns.textContent = convertDecToOtherBase(txtNum.value, 16);
            }else if(selectCalc.value == "HexToDec"){
                preAns("decimal");
                lblAns.textContent = convertOtherBaseToDec(txtNum.value, 16);
            }
        }
        divAns.style.display = 'block';
        return; 
    });
}

});

    //hide the ans when entering a number
    txtNum.addEventListener('focus', ()=>{
        lblAns.textContent = null;
        divAns.style.display = 'none';
        return
    });


     /*
    *Function to set the answer preamble
    *@para String
    *@return null
    */
    function preAns (strBase){
        document.getElementById('ansPreamble').textContent = "The " + strBase + " equivalent is: "
    }


    /*
    *Function to split a string into an array
    *@para String
    *@return Array with length two
    */
   function flagError(number){
       
    let lblAnsPreamble = document.getElementById('ansPreamble');
    lblAnsPreamble.style.color = 'red';
    lblAnsPreamble.innerHTML = "The number <b>" + number + "</b> is not a valid Integer";
    lblAnsPreamble.style.color = 'grey';
}

/*
    *Function to convert fractional number to binary 
    *@para number(fractional) below one
    *@return String 
    */
   function convertOtherBaseToDecFloat(number, base){
    let ans = 0, exp = -1;
    number  = number.split('');
    for(i = 0 ; i < number.length; ++i){
        if (base == 16){
            ans = ans + toDec(number[i]) * base**exp;
        }else{
            ans = ans + number[i] * base**exp;
        }
        --exp;
    }
    return ans;
}

/*
*Function to convert any base  to decimal
*@para String, 
*@return decimal number
*/
function convertOtherBaseToDecInt(number, base){
    let ans = 0;
    number  = number.split('');
    number = number.reverse();
    for(i = (number.length - 1) ; i >= 0 ; --i){
        if (base == 16){
            ans = ans + toDec(number[i]) * base**i;
        }else{
            ans = ans + number[i] * base**i;
        } 
    }
    return ans;
}

/*
*Function to convert real number to binary 
*@para String(real number) greater than zero
*@return String 
*/
function convertOtherBaseToDec(txtNum, base){
    let number = splitNum(txtNum);
    let integer = number[0], fraction =  number[1];
    if(number.length == 1 || fraction == '0' || fraction == ''){
        return convertOtherBaseToDecInt(integer, base);
    }else if(integer == '0' || integer == ''){
        return convertOtherBaseToDecFloat(fraction, base);
    }else{
        return convertOtherBaseToDecInt(integer, base) + convertOtherBaseToDecFloat(fraction, base);
    }
}

/*
*Function to split a string into an array
*@para String
*@return Array with length two
*/
function splitNum(number){
    return number.split('.',2);
}

/*
*Function to change decimal digits to base sixteen
*@para String
*@return an a number or alphabet between A to F
*/
function toHex(digit){
    switch(digit){
        case 10:
            return 'A';
        break
        case 11:
            return 'B';
        break
        case 12:
            return 'C';
        break
        case 13:
            return 'D';
        break
        case 14:
            return 'E';
        break
        case 15:
            return 'F';
        break
        default:
            return digit;    
        break
    }
}
function toDec(digit){
    switch(digit){
        case 'A':
        case 'a':
            return 10;
        break
        case 'B':
        case 'b':
            return 11;
        break
        case 'C':
        case 'c':
            return 12;
        break
        case 'D':
        case 'd':
            return 13;
        break
        case 'E':
        case 'e':
            return 14;
        break
        case 'F':
        case 'f':
            return 15;
        break
        default:
            return digit;    
        break
    }
}

/*
*Function to convert positive integer number to binary 
*@para number(positive integer) greater than one
*@return String 
*/
function convertIntDecToOtherBase(decNum, base){
    let N = decNum, b = [];
    while (N > 0 ){
        if (base == 16){
            b.push(toHex(N % base));
            N = (N -  toDec(b[b.length - 1])) / base;
        }else{
            b.push(N % base);
            N = (N - b[b.length - 1]) / base;
        }   
    }
    return b.reverse().join('');
}

/*
*Function to convert fractional number to binary 
*@para number(fractional) below one
*@return String 
*/
function convertFloatDecToOtherBase(fraction, base){
    let N = fraction * base, b = [];
    while (N > 0 ){
        if (base == 16){
            b.push(toHex(parseInt(N)));
            N = (N -  toDec(b[b.length - 1])) * base;
        }else{
            b.push(parseInt(N));
            N = (N - b[b.length - 1]) * base;
        } 
    }
    return b.join('');
}

/*
*Function to convert real number to binary 
*@para String(real number) greater than zero, base(intger)
*@return String 
*/
function convertDecToOtherBase(txtNum, base){
    let number = splitNum(txtNum);
    let integer = parseInt(number[0]) , fraction = parseFloat('0.' + number[1]) ;
    if(base == 16){
        integer = parseInt(toDec(number[0])) , fraction = parseFloat('0.' + toDec(number[1])) ;
    }
    if(number.length == 1 || fraction == '0.0' || fraction == ''){
        return convertIntDecToOtherBase(integer, base)
    }else if(integer == '0' || integer == ''){
        return '0.' + convertFloatDecToOtherBase(fraction, base);
    }else{
        return convertIntDecToOtherBase(integer, base) + '.' + convertFloatDecToOtherBase(fraction, base);
    }
}



//REGEXP
//Check if the string is an integer then convert to a number
function validateInt(str){
    if (/^[-+]?(\d+|Infinity)$/.test(str)){
        return Number(str)
    }else{
       return NaN;
    }
}




