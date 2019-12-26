const container = document.querySelector("#body_calc");
const screen = document.querySelector('#screen_calc');
const txt_array = Array.from("> C/789*456-123+0.=");
const accepted_characters = Array.from("1234567890+-/*.")

const numbers = Array.from("1234567890");
const operators = Array.from("+-/*");
const dot = Array.from(".");
var dot_allow = true;

var last_type = "operator";

const reset_ch = "c";
const calculate_ch = ["=", "Enter", "ArrowRight"];
var arr = [];

var exception = true;

// const style_link = [] //0 means type of plain button, 1 means type of "="
// const style_array = []

// const rules = ["+", "", "operators"]

function buildCalc(){

    const table = document.createElement('table')

    for (i = 0; i < 5; i++) {
        //row
        const row = document.createElement('tr');
        container.appendChild(row);
        // const square_width = wrapper.style.width/grid_square;

        for (u = 0; u < 4; u++) {
            const col = document.createElement('td');
            but = document.createElement('button');
            but.classList.add("btn");
            but.id = txt_array[4 * i + u];
            but.textContent = txt_array[4*i+u];
            row.appendChild(col);
            col.appendChild(but);

            //todo generate geight and width values with java script not html
        }
    }
    

}


function keyPress(e){

    // screen.textContent = e.keyCode;
    updateScreen(e.key);

}

function updateScreen(n){

    accepted_types = [];
    

    console.log(arr);

    switch (defineType(arr[arr.length - 1])){

        case "operator":
            accepted_types = ["number"];
            dot_allow = true;
            break;
        
        case "number":
            accepted_types = ["number", "operator", "dot"];
            break;
        
        case "dot":
            accepted_types = ["number"];
            dot_allow=false;
            break;
        case "reset":
            accepted_types = ["number", "operator", "dot"];
            dot_allow = true;
            break;
        default:
            console.log("shit")
            exception=true;

    }

    temp = defineType(n);

    if (n == "Enter") {
        screen.textContent=operate(screen.textContent);
    }else if (accepted_types.some((el) => (el == temp))){
        if (n=="."&&!dot_allow) {n="";}
        screen.textContent += n;

    }else if (n==reset_ch){
        screen.textContent = "";
    }else if (n=="Backspace"){
        screen.textContent = screen.textContent.slice(0,-1);
        if (arr.length<2){
            exception=true;
        }
    }

    arr = (Array.from(screen.textContent));
    arr = arr.filter((el) => (((accepted_characters.some((e) => (e == el))))));
    
    // neatScreen()
}

function neatScreen(){

    const txt = Array.from(screen.textContent);
    slicing_points = "0";

    for (el in txt){
        if (operators.some((e)=>(txt[el])===e)){
            slicing_points += el;
        }
    }

    // screen.textContent=checkRules(txt);

    return slicing_points + `${txt.length - 1}`;

}

function operate(string_in){

    return eval(string_in);

    // var array_in = Array.from(string_in);
    // const slice_data = Array.from(neatScreen());

    // for (i=0;i<slice_data.length;i+=2){

    //     first = parseFloat((array_in.slice(slice_data[i], slice_data[i + 1])).join(''));
     
    //     last = parseFloat((array_in.slice((1 + (parseInt(slice_data[i + 1]))), (1 + parseInt(slice_data[i + 2])))).join(''));

    //     operation = array_in[slice_data[i + 1]];

    //     // console.log(first);
    //     // console.log(last);      

    //     // console.log(operation); 
    //     array_in = array_in.splice(slice_data[i], (1 + parseInt(slice_data[i + 2])));
    //     console.log(array_in)
    //     return calculate(first, last, operation);

    // }


}

function calculate(first,last,operation){

    ret = 0;

    switch (operation){

        case "+":
            ret = first + last;
            break;
        case "-":
            ret = first - last;
            break;
        case "*":
            ret = first * last;
            break;
        case "/":
            ret = first / last;
            break;
        default:
            break;
    }

    // console.log(ret);
    return ret;

}

function defineType(c){

    n= c;
    ret ="";

    if (numbers.some((el) => (el == n))){
        ret = "number";
    }else if (operators.some((el) => (el == n))) {
        ret = "operator";
    }else if (dot.some((el) => (el == n))) {
        ret = "dot";
    }else if (n=="c"){
        ret = "reset";
        exception=true;
    }else {
        
        if (exception){
            ret = "operator";
            exception=false;
        }else{
            ret="biggie smalls"
        }
    }
    // console.log(ret);
    return ret;
}
// function checkRules(in_arr){

//     //1--23++3

//     out_str ="";
//     last = "";

    
//     return ;

// }

window.addEventListener('keydown', keyPress);
buildCalc();

