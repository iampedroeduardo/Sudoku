function CriaPos(){
    j=0;
    for(c=0;c<3;c++){
        for(i=0;i<3;i++){
            pos[j]=[i,c];
            j++;
        }
    }
}
function TransformaPos(){
    pos.push(pos[1]);
    pos.push(pos[2]);
    pos.push(pos[0]);
    pos.shift();
    pos.shift();
    pos.shift();
}
function TransformaQuads(){
    for(c=0;c<3;c++){
        tab.push([]);
        hiddentab.push([])
        tab[c].push(quad1[c][0],quad1[c][1],quad1[c][2],quad2[c][0],quad2[c][1],quad2[c][2],quad3[c][0],quad3[c][1],quad3[c][2]);
        hiddentab[c].push(quad1[c][0],quad1[c][1],quad1[c][2],quad2[c][0],quad2[c][1],quad2[c][2],quad3[c][0],quad3[c][1],quad3[c][2]);
    }
    for(c=0;c<3;c++){
        tab.push([]);
        hiddentab.push([])
        tab[c+3].push(quad4[c][0],quad4[c][1],quad4[c][2],quad5[c][0],quad5[c][1],quad5[c][2],quad6[c][0],quad6[c][1],quad6[c][2]);
        hiddentab[c+3].push(quad4[c][0],quad4[c][1],quad4[c][2],quad5[c][0],quad5[c][1],quad5[c][2],quad6[c][0],quad6[c][1],quad6[c][2]);
    }
    for(c=0;c<3;c++){
        tab.push([]);
        hiddentab.push([])
        tab[c+6].push(quad7[c][0],quad7[c][1],quad7[c][2],quad8[c][0],quad8[c][1],quad8[c][2],quad9[c][0],quad9[c][1],quad9[c][2]);
        hiddentab[c+6].push(quad7[c][0],quad7[c][1],quad7[c][2],quad8[c][0],quad8[c][1],quad8[c][2],quad9[c][0],quad9[c][1],quad9[c][2]);
    }
}
function CriaTab(){
    quad1=[[],[],[]];
    quad2=[[],[],[]];
    quad3=[[],[],[]];
    quad4=[[],[],[]];
    quad5=[[],[],[]];
    quad6=[[],[],[]];
    quad7=[[],[],[]];
    quad8=[[],[],[]];
    quad9=[[],[],[]];
    nums=[1,2,3,4,5,6,7,8,9];
    for(j=1;j<10;j++){
        n=Math.floor(Math.random()*nums.length);
        num=nums[n];
        nums.splice(n,1);
        quad1[pos[0][0]][pos[0][1]]=num;
        quad2[pos[1][0]][pos[1][1]]=num;
        quad3[pos[2][0]][pos[2][1]]=num;
        quad4[pos[3][0]][pos[3][1]]=num;
        quad5[pos[4][0]][pos[4][1]]=num;
        quad6[pos[5][0]][pos[5][1]]=num;
        quad7[pos[6][0]][pos[6][1]]=num;
        quad8[pos[7][0]][pos[7][1]]=num;
        quad9[pos[8][0]][pos[8][1]]=num;
        TransformaPos();
    }
    TransformaQuads();
}
function EscondeTab(){
    for(c=0;c<40;c++){
        do{
            n1=Math.floor(Math.random()*9);
            n2=Math.floor(Math.random()*9);
        }while(tab[n1][n2]==0)
        tab[n1][n2]=0;
    }
}
function AumentaErro(){
    erros++
    div=document.getElementById("erros");
    div.innerHTML="Erros: "+erros+"/3";
    console.log(div);
    if(erros==3){
        tela=[
            '<div class="container">',
            '    <div class="box">',
            '        <h1>Sinto muito! Acabaram suas tentativas!</h1>',
            '        <a href="index.html"><button class="botao">Tentar Novamente</button></a>',
            '    <div>',
            '</div>'
        ]
        setTimeout(()=>{document.querySelector("body").innerHTML=tela.join("\n")},500);
    }
}
function TestaTab(){
    tof=true
    for(c=0;c<9;c++){
        for(i=0;i<9;i++){
            div=document.getElementById(""+c+i);
            if(div.innerHTML==""){
                tof=false;
            }
        }
    }
    if(tof){
        clearInterval(intervalo);
        tela=[
            '<div class="container">',
            '    <div class="box">',
            '        <h1>Parabéns! Você ganhou! Seu tempo foi de '+parseInt(tempo/60)+' minutos e '+tempo%60+' segundos</h1>',
            '        <a href="index.html"><button class="botao">Jogar Novamente</button></a>',
            '    <div>',
            '</div>'
        ]
        setTimeout(()=>{document.querySelector("body").innerHTML=tela.join("\n")},500);
    }
}
function TestaNumeros(){
    for(c=1;c<10;c++){
        tof=true;
        for(i=0;i<9;i++){
            tof2=false;
            for(j=0;j<9;j++){
                div=document.getElementById(""+i+j);
                if(div.innerHTML==""+c){
                    tof2=true;
                }
            }
            if(!tof2){
                tof=false;
            }
        }
        if(tof){
            div=document.getElementById(""+c);
            div.innerHTML=" ";
        }
        else{
            div=document.getElementById(""+c);
            div.innerHTML=""+c;
        }
    }
}
function Testa(){
    if(Number(document.getElementById(""+posicao[0]+posicao[1]).innerHTML)!=hiddentab[posicao[0]][posicao[1]]){
        div=document.getElementById(""+posicao[0]+posicao[1]);
        div.style.color="red";
        AumentaErro();
    }
    else{
        div=document.getElementById(""+posicao[0]+posicao[1]);
        div.style.color="blue";
        DestacaNumero(div.innerHTML);
        div=document.getElementById(""+posicao[0]+posicao[1]);
        posicao=0;
        div.setAttribute("onclick","DestacaNumero("+div.innerHTML+")");
        TestaTab();
        TestaNumeros();
    }
}
function ColocaNumero(){
    isso=this;
    div=document.getElementById(""+posicao[0]+posicao[1]);
    div.innerHTML=isso.innerHTML;
    Testa();
}
function DestacaNumero(numero){
    for(c=0;c<9;c++){
        for(i=0;i<9;i++){
            if(numero==document.getElementById(""+c+i).innerHTML){
                div=document.getElementById(""+c+i);
                div.setAttribute("class","sla");
            }
            else{
                div=document.getElementById(""+c+i);
                div.setAttribute("class","bloco");
            }
        }
    }
}
function DestacaEspaco(id){
    posi=[[],[],[],[],[],[],[],[],[]];
    for(c=0;c<9;c++){
        for(i=0;i<9;i++){
            if(c<3 && i<3){
                posi[0].push(""+c+i);
            }
            else if(c<3 && (i>2 && i<6)){
                posi[1].push(""+c+i);
            }
            else if(c<3 && (i>5 && i<9)){
                posi[2].push(""+c+i);
            }
            else if((c>2 && c<6) && i<3){
                posi[3].push(""+c+i);
            }
            else if((c>2 && c<6) && (i>2 && i<6)){
                posi[4].push(""+c+i);
            }
            else if((c>2 && c<6) && (i>5 && i<9)){
                posi[5].push(""+c+i);
            }
            else if((c>5 && c<9) && i<3){
                posi[6].push(""+c+i);
            }
            else if((c>5 && c<9) && (i>2 && i<6)){
                posi[7].push(""+c+i);
            }
            else if((c>5 && c<9) && (i>5 && i<9)){
                posi[8].push(""+c+i);
            }
        }
    }
    for(c=0;c<9;c++){
        for(i=0;i<9;i++){
            div=document.getElementById(""+c+i);
            div.setAttribute("class","bloco");
        }
    }
    for(c=0;c<9;c++){
        if(posi[c].includes(id)){
            for(i=0;i<9;i++){
                div=document.getElementById(posi[c][i]);
                div.setAttribute("class","sla");
            }
        }
    }
    for(c=0;c<9;c++){
        div=document.getElementById(id[0]+c);
        div.setAttribute("class","sla");
        div=document.getElementById(c+id[1]);
        div.setAttribute("class","sla");
    }
    div=document.getElementById(id);
    div.setAttribute("class","especifico");
}
function DesenhaTab(){
    quad1=document.getElementById("quad1");
    quad2=document.getElementById("quad2");
    quad3=document.getElementById("quad3");
    quad4=document.getElementById("quad4");
    quad5=document.getElementById("quad5");
    quad6=document.getElementById("quad6");
    quad7=document.getElementById("quad7");
    quad8=document.getElementById("quad8");
    quad9=document.getElementById("quad9");
    EscondeTab();
    for(c=0;c<9;c++){
        for(i=0;i<9;i++){
            div=document.createElement("div");
            div.setAttribute("id",""+c+i);
            div.setAttribute("class","bloco");
            if(tab[c][i]>0){
                texto=document.createTextNode(""+tab[c][i]);
                div.appendChild(texto);
                div.setAttribute("onclick","DestacaNumero("+tab[c][i]+");")
            }
            else{
                div.setAttribute("onclick","DestacaEspaco('"+c+i+"');posicao=["+c+","+i+"]");
            }
            if(c<3 && i<3){
                quad1.appendChild(div);
            }
            else if(c<3 && (i>2 && i<6)){
                quad2.appendChild(div);
            }
            else if(c<3 && (i>5 && i<9)){
                quad3.appendChild(div);
            }
            else if((c>2 && c<6) && i<3){
                quad4.appendChild(div);
            }
            else if((c>2 && c<6) && (i>2 && i<6)){
                quad5.appendChild(div);
            }
            else if((c>2 && c<6) && (i>5 && i<9)){
                quad6.appendChild(div);
            }
            else if((c>5 && c<9) && i<3){
                quad7.appendChild(div);
            }
            else if((c>5 && c<9) && (i>2 && i<6)){
                quad8.appendChild(div);
            }
            else if((c>5 && c<9) && (i>5 && i<9)){
                quad9.appendChild(div);
            }
        }
    }
}
function AumentarTempo(){
    tempo++
    min=""+parseInt(tempo/60);
    seg=""+tempo%60;
    if(min.length<2){
        min="0"+min;
    }
    if(seg.length<2){
        seg="0"+seg;
    }
    t=min+":"+seg;
    contador=document.getElementById("tempo");
    contador.innerHTML=t;
}
var tab=[], hiddentab=[];
var tempo=0;
var quad1=[[],[],[]],quad2=[[],[],[]],quad3=[[],[],[]],quad4=[[],[],[]],quad5=[[],[],[]],quad6=[[],[],[]],quad7=[[],[],[]],quad8=[[],[],[]],quad9=[[],[],[]];
var pos=[];
var posicao;
var erros=0;
CriaPos();
CriaTab();
DesenhaTab();
var intervalo=setInterval(AumentarTempo,1000);
um=document.getElementById("1");
um.addEventListener("click",ColocaNumero)
dois=document.getElementById("2");
dois.addEventListener("click",ColocaNumero);
tres=document.getElementById("3");
tres.addEventListener("click",ColocaNumero);
quatro=document.getElementById("4");
quatro.addEventListener("click",ColocaNumero);
cinco=document.getElementById("5");
cinco.addEventListener("click",ColocaNumero);
seis=document.getElementById("6");
seis.addEventListener("click",ColocaNumero);
sete=document.getElementById("7");
sete.addEventListener("click",ColocaNumero);
oito=document.getElementById("8");
oito.addEventListener("click",ColocaNumero);
nove=document.getElementById("9");
nove.addEventListener("click",ColocaNumero);
