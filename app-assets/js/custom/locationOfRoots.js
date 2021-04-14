document.addEventListener('DOMContentLoaded',()=>{

    let exp = document.getElementById('txtExp');
    let init_1 = document.getElementById('txtInit-1');
    let init_2 = document.getElementById('txtInit-2');
    let iterate = document.getElementById('txtIteration');
    let tol = document.getElementById('txtTolerance');

    let lblAns = document.getElementById('lblAns');
    let divAns = document.getElementById('divAns');
    let copyTxt = document.getElementById('copyTxt');
    let page = (window.location.pathname).split('/').pop();

    let updateTolVal = function (){
        try {
            tol.value =  getTol(
                checkNum(parseFloat(init_1.value)),
                checkNum(parseFloat(init_2.value)),
                checkNum(parseInt(iterate.value))
            );
        } catch (error) {
            tol.value =  null;
        }
    }
    let updateItrVal = function (){
        try{
            iterate.value = getIterate(
            checkNum(parseFloat(init_1.value)),
            checkNum(parseFloat(init_2.value)),
            checkNum(parseFloat(tol.value))
        );}catch(error){
            iterate.value =  null;
        }
        
    }
    if(page == "bisection.html"){
        //display the ans when btnCalc is clicked
        iterate.addEventListener('input',()=>{
            updateTolVal();
        });
    
        tol.addEventListener('input',()=>{
            updateItrVal();
        });
        document.getElementById('btnCalcBisection').addEventListener('click', ()=>{
                try {
                    lblAns.textContent = bisection( 
                        checkNum(parseFloat(init_1.value)), 
                        checkNum(parseFloat(init_2.value)), 
                        checkNum(parseInt(iterate.value)), 
                        checkFuntion(exp.value),
                        checkNum(parseFloat(tol.value))
                );
                } catch (error) {
                    if (error instanceof EvalError) {
                        // statements to handle EvalError exceptions
                        flagError(error.message);
                    } else {
                        // statements to handle any unspecified exceptions
                        flagError("One or more of the input expressions are invalid");
                    }
                }

            divAns.style.display = 'block';
            return;   
        });
    }else if(page == "false-position.html"){
        document.getElementById('btnCalcFalsePos').addEventListener('click', ()=>{
            try {
                lblAns.textContent = faslePosition( 
                    checkNum(parseFloat(init_1.value)), 
                    checkNum(parseFloat(init_2.value)), 
                    checkNum(parseInt(iterate.value)), 
                    checkFuntion(exp.value),
                    parseFloat(tol.value)
            );
            } catch (error) {
                if (error instanceof EvalError) {
                    // statements to handle EvalError exceptions
                    flagError(error.message);
                } else {
                    // statements to handle any unspecified exceptions
                    flagError("One or more of the input expressions are invalid");
                }
            }
        divAns.style.display = 'block';
        return;  
        });
    }else if(page == "secant.html"){
        document.getElementById('btnCalcSecant').addEventListener('click', ()=>{
            try {
                lblAns.textContent = secant( 
                    checkNum(parseFloat(init_1.value)), 
                    checkNum(parseFloat(init_2.value)), 
                    checkNum(parseInt(iterate.value)), 
                    checkFuntion(exp.value),
                    parseFloat(tol.value)
                );
            } catch (error) {
                if (error instanceof EvalError) {
                    // statements to handle EvalError exceptions
                    flagError(error.message);
                } else {
                    // statements to handle any unspecified exceptions
                    flagError("One or more of the input expressions are invalid");
                }
            }
        divAns.style.display = 'block';
        return;
        });
    }else if(page == "newton-raphson.html"){
        document.getElementById('btnCalcNewRaph').addEventListener('click', ()=>{
            try {
                lblAns.textContent = newtonRaphson( 
                    checkNum(parseFloat(init_1.value)), 
                    checkNum(parseInt(iterate.value)), 
                    checkFuntion(exp.value),
                    parseFloat(tol.value)
                );
            } catch (error) {
                if (error instanceof EvalError) {
                    // statements to handle EvalError exceptions
                    flagError(error.message);
                } else {
                    // statements to handle any unspecified exceptions
                    flagError("One or more of the input expressions are invalid");
                }
            }
            divAns.style.display = 'block';
            return; 
        });
    }
});

function checkFuntion(str){
    if(str.includes("f(x)") || str.includes("F(x)") || str.includes("f(X)") || str.includes("F(X)")){
        return str;
    }else{
        if(str.includes('x')) return "f(x) = " + str;
        else return "f(X) = " + str;
    }
}

function flagError(err){
    let lblAnsPreamble = document.getElementById('ansPreamble');
    lblAnsPreamble.style.color = 'red';
    lblAnsPreamble.innerHTML = "** <b>Oops!</b>, " + err + " **";
}
function checkNum(num){
    if(isNaN(num)) throw new Error ( this + "is not a number");
    else return num;
}

function getIterate(int1, int2, tol){
    return Math.round(math.evaluate("(log(" + int2 + " - " + int1 + ") - log(" + tol + ")) / log(2)"  ));
    
}

function getTol(int1, int2, itr){
    return math.evaluate("(" + int2 + " - " + int1 + ") / 2^" + itr );
}
function fPrime(exp, symbol){
    const f = math.derivative(exp , symbol);
    return f.toString();
}


//###########################################################################################################
function bisection(initial_1, initial_2, iterations,expression, tol){
    let interval = [initial_1, initial_2];
    let x = [];
    let f = math.evaluate(expression);
    x.push(interval[0], interval[1]);
    for(i = 1; i <=  iterations; ++i){
        if( math.abs(f(x[x.length - 1])) <= tol ||
            x[x.length - 1] === x[x.length - 2] ||
            math.abs(interval[1] - interval[0]) / 2 < tol
        )break;
        if((f(interval[0]) * f(x[x.length - 1])) < 0 ){
            interval[1] = x[x.length - 1];
        }else if((f(interval[1]) * f(x[x.length - 1])) < 0 ){
            interval[0] = x[x.length - 1];
        }else{
            interval[0] = (interval[0] + interval[1]) / 2;
        }
        x.push( (interval[0] + interval[1]) / 2 );
    }
    if( !(isNaN(x[x.length - 1]))){
        return x[x.length - 1];
    }else{
        throw new Error ("Opps, The answer in not a number") ;
    }
}

//###########################################################################################################
function faslePosition(initial_1, initial_2, iterations,expression, tol){

    let interval = [initial_1, initial_2];
    let x = [];
    let f = math.evaluate(expression);
    x.push(interval[0], interval[1]);

    for(i = 1; i <=  iterations; ++i){
        if( math.abs(f(x[x.length - 1])) <= tol ||
            x[x.length - 1] === x[x.length - 2] ||
            math.abs(x[x.length - 1] - x[x.length - 2]) <= tol
        )break;
        if((f(interval[0]) * f(x[x.length - 1])) < 0 ){
            interval[1] = x[x.length - 1];
        }else if((f(interval[1]) * f(x[x.length - 1])) < 0 ){
            interval[0] = x[x.length - 1];
        }else if((f(interval[0]) * f(x[x.length - 1])) < 0) {
            throw new EvalError ("Root thus not lie in the inerval" );
        }
        x.push( interval[1] - ( (interval[1] - interval[0]) / 
        (f(interval[1]) - f(interval[0])) ) * f(interval[1]) 
    );
    }
    if( !(isNaN(x[x.length - 1]))){
        return x[x.length - 1];
    }else{
        throw new Error ("Opps, The answer in not a number") ;
    }
}
//###########################################################################################################
function secant(initial_1, initial_2, iterations,expression, tol){
    let x = [];
    let f = math.evaluate(expression);
    x.push(initial_1, initial_2);
    for(i = 1; i <=  iterations; ++i){
        if( math.abs(f(x[x.length - 1])) <= tol ||
            x[x.length - 1] === x[x.length - 2] ||
            math.abs(x[x.length - 1] - x[x.length - 2]) <= tol
        )break;
        x.push( x[x.length - 1] - ( (x[x.length - 1] - x[x.length - 2]) / 
            (f(x[x.length - 1]) - f(x[x.length - 2])) ) * f(x[x.length - 1]) 
        );
    }
    if( !(isNaN(x[x.length - 1]))){
        return x[x.length - 1];
    }else{
        throw new Error ("Opps, The answer in not a number") ;
    }
}

//###########################################################################################################

function newtonRaphson(initial, iterations,expression, tol){
    let x = [];
    let f = math.evaluate(expression);
    let f_derivative = math.evaluate(f.syntax + '=' + fPrime(expression, f.syntax[2]));
    x.push(initial);
    for(i = 1; i <=  iterations; ++i){
        if( math.abs(f(x[x.length - 1])) <= tol ||
             x[x.length - 1] === x[x.length - 2] ||
             math.abs(x[x.length - 1] - x[x.length - 2]) <= tol
        )break;
        x.push( x[x.length - 1] - ( f(x[x.length - 1]) / f_derivative(x[x.length - 1]) ) );
    }
    if( !(isNaN(x[x.length - 1]))){
        return x[x.length - 1];
    }else{
        throw new Error ("Opps, The answer in not a number") ;
    }
    
}




