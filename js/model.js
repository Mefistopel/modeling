function show(divid) // Для выбора моделирования
{
    if(document.getElementById(divid).style.display=="none")
    {document.getElementById(divid).style.display="block";    }
    else {document.getElementById(divid).style.display="none";    }
}
function someFunc1(){ //Ввод значений для первого звена
k = document.getElementById('сoeff').value.replace(',','.'); //коэфф усиления
T = document.getElementById('constT').value.replace(',','.'); //Постоянная времени
t = document.getElementById('lag').value.replace(',','.'); //Время
dt = document.getElementById('step').value.replace(',','.'); //Шаг дискретизации
getText1(k,T,t,dt,N); //передача параметров в функцию
document.getElementById("btn").onclick = someFunc1;}
function someFunc2(){ //Ввод значений для обратного
k = document.getElementById('сoeff').value.replace(',','.');
T = document.getElementById('constT').value.replace(',','.');
t = document.getElementById('lag').value.replace(',','.');
dt = document.getElementById('step').value.replace(',','.');
getText2(k,T,t,dt);
document.getElementById("btn").onclick = someFunc2;}
function getText1() { //Функция рассчета Y воздействия для первого звена
    var X = Math.ceil(t/dt);
    var tt = Math.ceil(t);
    var Y = [];
    var с1; c1 = Math.exp(-(dt/T));
    var c2; c2=(k*(1-c1));
    var summ =0; var summ2= 0; var summ3=0; var summ4=0;
   var text = document.getElementById('text'); //отсюда считываем все данные с поля для U
   var myList = text.value.split('\n');
      for (var i = 0; i < myList.length; i++) {
          myList[i]=myList[i].replace(',','.');
            if (i >= X)
            {     if (i == 0) {
                      Y[i] = ((myList[i-tt]*c2));
                  }
                  else {
                    Y[i] = '\n'+((myList[i-tt]*c2+c1*Y[i-1]));
                  }
            }
            else
            {if (i == 0) {
                  Y[i] = 0;}
                else {Y[i] = '\n'+0;}
            }
          summ = summ+  parseFloat(myList[i]); //суммирует все данные U
          summ2 = summ2+ parseFloat(Math.pow(myList[i],2)); //данные в квадрате U
          summ3 = summ3+  parseFloat(Y[i]); //суммирует все данные Y
          summ4 = summ4+ parseFloat(Math.pow(Y[i],2)); //данные в квадрате Y
   }
   mxU = Math.ceil(summ/myList.length); //мат ожидание U
   DxU = Math.ceil(summ2/myList.length)-Math.pow(mxU, 2); //дисперсия U
   mxY = Math.ceil(summ3/myList.length); //мат ожидание Y
   DxY = Math.ceil(summ4/myList.length)-Math.pow(mxY, 2); //дисперсия Y
  document.getElementById('mat_expectedU').innerHTML = mxU;
  document.getElementById('dispersionU').innerHTML = DxU;
  document.getElementById('mat_expectedY').innerHTML = mxY;
  document.getElementById('dispersionY').innerHTML = DxY;
  document.getElementById('content').innerHTML = Y.join('').replace( /\./g, "," );
  document.getElementById('afk').style.display = "inline";
  document.getElementById("end").onclick = getText1;
}
function getText2() {//Функция рассчета Y воздействия для обратного первого звена
   var X = Math.ceil(t/dt);
   var tt = Math.ceil(t);
   var Y = [];
   var с1; c1 = Math.exp(+(dt/T));
   var c2; c2=(k*(1-c1));
     var summ =0; var summ2=0;var summ3 =0; var summ4=0;
   var text = document.getElementById('text2');
   var myList = text.value.replace(',','.').split('\n');
      for (var i = 0; i < myList.length; i++) {
            if (i >= X)
            {
                  if (i==0) {
                        Y[i] = '\n'+((T+dt)/(myList[i-tt]*k*dt));
                  }
                  else {Y[i] = '\n'+((T+dt)/(myList[i-tt]*k*dt+T*Y[i-1]));}
            }
            else
            {
                if (i == 0) {
                  Y[i] = 0;}
                else {Y[i] = '\n'+0;}
            }
            summ = summ+  parseFloat(myList[i]); //суммирует все данные U
            summ2 = summ2+ parseFloat(Math.pow(myList[i],2)); //данные в квадрате U
            summ3 = summ3+  parseFloat(Y[i]); //суммирует все данные Y
            summ4 = summ4+ parseFloat(Math.pow(Y[i],2)); //данные в квадрате Y
   }
   mxU = Math.ceil(summ/myList.length); //мат ожидание U
   DxU = Math.ceil(summ2/myList.length)-Math.pow(mxU, 2); //дисперсия U
   mxY = Math.ceil(summ3/myList.length); //мат ожидание Y
   DxY = Math.ceil(summ4/myList.length)-Math.pow(mxY, 2); //дисперсия Y
  document.getElementById('mat_expected2U').innerHTML = mxU;
  document.getElementById('dispersion2U').innerHTML = DxU;
  document.getElementById('mat_expected2Y').innerHTML = mxY;
  document.getElementById('dispersion2Y').innerHTML = DxY;
  document.getElementById('content2').innerHTML = Y.join('').replace( /\./g, "," );
  document.getElementById("end2").onclick = getText2;
}
function interference(){

}
