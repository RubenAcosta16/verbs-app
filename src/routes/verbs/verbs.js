let introduccionAleatorio="<p class='text-p-sm w-75-sm mx-auto mb-5 intro-verbs'>Estan ordenados de forma aleatoria para poner en practica lo aprendido:</p>";
let introduccionBloque="<p class='text-p-sm w-75 mx-auto intro-verbs'>Estan ordenados por bloques para que asi sea mas facil el aprendizaje, la idea es aprender 1 bloque por dia:</p>";


function listaRandom(num){
    //aleatorio
    let lista = [];
    for(let i=0;i<num; i++){
        lista.push(i)
    }
    lista = lista.sort(function() {return     Math.random() - 0.5});
    //fin aleatorio

    return lista
}

function verbosRandom(verbosFetch){

    // let verbos=obtenerVerbos();
    // console.log(verbos)

    let lista=listaRandom(verbosFetch.length);
    // console.log(lista)

    // let li=[];
    let palabra=[];
    let span=[];

    for(let i=0;i<verbosFetch.length;i++){
        // li[i]+=i,"verbo",verbos[lista[i]];
        // palabra[i]=`${(i+1)} - ${v[verbos[lista[i]]][0]}`;
        palabra[i]=`${(i+1)} - ${verbosFetch[lista[i]].name}`;
        span[i]=`${verbosFetch[lista[i]].verb}`;
        

    }

    
    let devolver=[palabra,span];

    // console.log(devolver)
    return devolver;
}


function verbosOrdenados(verbosFetch){
    // console.log(verbosFetch[1])
    // let verbos=obtenerVerbos(verbosFetch);


    // let li=[];
    let palabra=[];
    let span=[];

    for(let i=0;i<verbosFetch.length;i++){
        // li[i]+=i,"verbo",verbos[lista[i]];
        palabra[i]=`${(i+1)} - ${verbosFetch[i].name}`;
        span[i]=`${verbosFetch[i].verb}`;
        

    }

    
    let devolver=[palabra,span];

    // console.log(devolver)
    return devolver;
}


function significadoOrdenados(verbosFetch){
    // let verbos=obtenerVerbos();


    // let li=[];
    let palabra=[];
    let span=[];

    for(let i=0;i<verbosFetch.length;i++){
        // li[i]+=i,"verbo",verbos[lista[i]];
        palabra[i]=`${(i+1)} - ${verbosFetch[i].verb}`;
        span[i]=`${verbosFetch[i].name}`;
        

    }

    
    let devolver=[palabra,span];

    // console.log(devolver)
    return devolver;
}

function significadosRandom(verbosFetch){

    // let verbos=obtenerVerbos();
    // console.log(verbos)

    let lista=listaRandom(verbosFetch.length);
    // console.log(lista)

    // let li=[];
    let palabra=[];
    let span=[];

    for(let i=0;i<verbosFetch.length;i++){
        // li[i]+=i,"verbo",verbos[lista[i]];
        palabra[i]=`${(i+1)} - ${verbosFetch[lista[i]].verb}`;
        span[i]=`${verbosFetch[lista[i]].name}`;
        

    }

    
    let devolver=[palabra,span];

    // console.log(devolver)
    return devolver;
}


// mostrar 
function mostrarVerbos(verbos,introduccion,switchBloque){
                

    contenedor.innerHTML=introduccion;
    let ul=document.createElement("ul");
    ul.classList.add("list");
    let switchVerbo=false;
    let c_bloque=1;


    for(let i=0;i<verbos[0].length;i++){
        let switchVerbo=false;
        let li=document.createElement("li");
        let span=document.createElement("span");
        let backImg=document.createElement("img");
            
        
            backImg.src="../img/arrow.svg";
            
            backImg.classList.add("img-back");
            span.classList.add("significado","text-p-sm");
            li.classList.add(i,"verbo");

            //hice esto para simplificar las cosas ul
        let palabra=document.createElement("span");
        palabra.classList.add("palabra")
            palabra.innerHTML=`${verbos[0][i]}`;
            
            span.innerHTML=`${verbos[1][i]}`;


            if((((i)%4==0) && !(verbos[0].length==(i+1)))&&switchBloque){
                
                let bloque=document.createElement("div");
                bloque.innerHTML=`
                <div class="separador-verbs">
                    <div class="line"></div>
                    <div class="num">${c_bloque}</div>
                    <div class="line"></div>
                </div>`;

                ul.appendChild(bloque);
                c_bloque++;
            }


            li.appendChild(palabra);
            palabra.appendChild(backImg);
            li.appendChild(span);
            ul.appendChild(li);
            contenedor.appendChild(ul);

        
        let verbo=document.querySelectorAll(".verbo");
            verbo[i].addEventListener("click",()=>{
                span.classList.toggle("significado-mostrar");

                backImg.classList.toggle("img-back-active");
//-----------------------------------------------------------------------
                let height=0;

        
                // console.log(span.scrollHeight);
                //tamaño minimo para que exita el menu y no se desborde, calcula la altura
        
                if(span.clientHeight=="0"){
                    height=span.scrollHeight;
                }
                span.style.height=height+"px";
//------------------------------------------------------------
            });

    }
}