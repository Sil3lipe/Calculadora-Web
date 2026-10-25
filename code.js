//CALCULATOR PROGRAM

const display = document.getElementById("display");

function appendToDisplay(input){
    // Se estiver com "Error", reseta para "0" antes de continuar
    if (display.value === "Error") {
        display.value = "0";
    }

    // Impede fechar parênteses ")" logo no início quando o visor ainda é "0"
    if (display.value === "0" && input === ")") {
        return;
    }

    // Se o visor for "0" e o usuário digitar um número (0 a 9) ou "(", substitui o "0"
    if (display.value === "0" && /^[0-9(]$/.test(input)) {
        display.value = input;
    } else {
        display.value += input;
    }
}

function clearDisplay(){
    display.value = "0"; 
}

function calculate(){
    try{
        // Permite multiplicação implícita com parênteses: ex. 2(3+4) vira 2*(3+4)
        const expression = display.value
            .replace(/(\d)\(/g, "$1*(")
            .replace(/\)(\d)/g, ")*$1")
            .replace(/\)\(/g, ")*(");

        display.value = eval(expression);
    }
    catch(error){
        display.value = "Error";
    }
}

document.addEventListener("keydown", function(event) {
    const key = event.key;

    // 1. Números (0 a 9), operadores (+, -, *, /), ponto decimal e parênteses
    if (/^[0-9+\-*/.()]$/.test(key)) {
        appendToDisplay(key);
    }
    // 2. Caso o usuário aperte vírgula no teclado numérico, converte para ponto
    else if (key === ",") {
        appendToDisplay(".");
    }
    // 3. Enter ou "=" para calcular o resultado
    else if (key === "Enter" || key === "=") {
        event.preventDefault(); // Evita que o Enter acione o último botão clicado na tela
        calculate();
    }
    // 4. Backspace para apagar apenas o último caractere digitado
    else if (key === "Backspace") {
        if (display.value.length <= 1 || display.value === "Error") {
            display.value = "0";
        } else {
            display.value = display.value.slice(0, -1);
        }
    }
    // 5. Escape (Esc) ou "c" para limpar tudo
    else if (key === "Escape" || key.toLowerCase() === "c") {
        clearDisplay();
    }
});
