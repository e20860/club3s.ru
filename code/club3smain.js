///////////////////////////////////////////////////////////////////////////////////////////
//
//                       CLUB3SMAIN.JS
//  основная страница скриптов клубу полковников 41 армии Три звезды
//
//////////////////////////////////////////////////////////////////////////////////////////
function main() {
   // Глобальные переменные
   var GRANTED = false;
   var urlMain = "docs/main.html";
   var urlStat = "docs/statut.html";
   var urlCodex= "docs/codex.html";
   var urlHist = "docs/history.html";
   var urlDuty = "docs/duty.html";
   var urlCont = "docs/contacts.html";
   var curUser = {"log": "","email": "","pass": ""};
   var notAllowed = "       Я НЕ УЗНАЮ ВАС В ГРИМЕ\n_____________________________________\n\nДанная информация доступна только\nзарегистрированным членам клуба";
   // Для страницы дежурного по клубу
   var aDuties = [
      {"pic":"Pics/duties/duty1.jpg","name":"гусар Летучий"},   
      {"pic":"Pics/duties/duty2.jpg","name":"гусар Залётный"},   
      {"pic":"Pics/duties/duty3.png","name":"гусар Красный"},   
      {"pic":"Pics/duties/duty4.jpg","name":"поручик Голицин"},   
      {"pic":"Pics/duties/duty5.jpg","name":"гусар Малёваный"},   
      {"pic":"Pics/duties/duty6.jpg","name":"гусар Клубный"}   
   ];
   var aMarazms= []; // Массив маразмов из json   
   var dMarazm = {"num":0, "text":""}; // дежурный маразм (сначала пустой)
   var usedMarazms = [];  // использованные маразмы
   //  то же для тостов 
   var aTosts = [];
   var dTost  = {"num":0, "text":""}; // дежурный тост как и маразм сначала пустой
   var usedTosts = [];  // использованные
   // и анекдотов
   var aAnecdots = []; // здесь хранятся все
   var dAnecdot  = {"num":0, "text":""}; // дежурный
   var usedAnecdots = [];  // использованные
   
   // Инициализаця
   
   $("#eml").val("");
   $("#pwd").val("");
   
   aMarazms   = fillMarazms(); // Массив маразмов
   aTosts     = fillTosts();   // и застольных тостов
   aAnecdots  = fillAnecdots();//а также анекдотов
   //-------------------------------------------------------------------------------------
   $("article").load(urlMain);
   
   var users = []; 
   
   //=====================================================================================  
   function getRandom(num) {
      // Получение случайного числа в диапазоне от 0 до num (исключая сам num)
      return Math.floor(Math.random()*num);
   }
   //-------------------------------------------------------------------------------------
   function getUserList() {
      var retList = [];
      $.get("docs/users1.json", function (data) {
      data.userList.forEach(function (elem) {
         retList.push(elem);      
      });
      },"json");
      return retList;      
   }
   //-------------------------------------------------------------------------------------
   function fillMarazms() {
      // Получение массива маразмов
      var aRet = [];
      $.get("docs/marazm.json", function (data) {
      data.marazms.forEach(function (elem) {
           aRet.push(elem);
     });
      },"json");

      return aRet;   
   }
   //-------------------------------------------------------------------------------------
   function fillTosts() {
      // Получение массива тостов
      var aRet = [];
      $.get("docs/fun/tosts.json", function (data) {
      data.tosts.forEach(function (elem) {
           aRet.push(elem);
     });
      },"json");
      
      return aRet;   
   }
   //-------------------------------------------------------------------------------------
   function fillAnecdots() {
      // Получение массива анекдотов
      var aRet = [];
      $.get("docs/fun/anecdots.json", function (data) {
      data.anecdots.forEach(function (elem) {
           aRet.push(elem);
     });
      },"json");
      
      return aRet;   
   }
   //-------------------------------------------------------------------------------------
   function getRandomMarazm() {
      // Получает случайный маразм из массива. Проверяет нет ли его среди использованных
      // и возвращает объект МАРАЗМ
      if (aMarazms.length == 0) {
         aMarazms = fillMarazms();
      }
 
      var rr, retM, aml = aMarazms.length; // array marazm length
      do {
         rr = getRandom(aml);      
         retM  =aMarazms[rr];  // Возвращаемое значение
         } while (usedMarazms.indexOf(rr) != -1);
      // поскольку вышли из цикла - значит значение - новое      
      usedMarazms.push(rr);  
      // проверяем не просмотрены ли все значения из массива, и если просмотрены - обнуляем
      if (usedMarazms.length == aml) {
         usedMarazms = [];
      } 
      return retM;
   }
   //-------------------------------------------------------------------------------------
   function getRandomTost() {
      // Получает случайный тост из массива. Проверяет нет ли его среди использованных
      // и возвращает объект ТОСТ
      if (aTosts.length == 0) {
         aTosts = fillTosts();
      }
 
      var rr, retT, atl = aTosts.length; // array tosts length
      do {
         rr = getRandom(atl);      
         retT  =aTosts[rr];  // Возвращаемое значение
         } while (usedTosts.indexOf(rr) != -1);
      // поскольку вышли из цикла - значит значение - новое      
      usedTosts.push(rr);  
      // проверяем не просмотрены ли все значения из массива, и если просмотрены - обнуляем
      if (usedTosts.length == atl) {
         usedTosts = [];
      } 
      return retT;
   }
   //-------------------------------------------------------------------------------------
   function getRandomAnecdot() {
      // Получает случайный танекдот из массива. Проверяет нет ли его среди использованных
      // и возвращает объект ТОСТ
      if (aAnecdots.length == 0) {
         aAnecdots = fillAnecdots();
      }
 
      var rr, retA, aal = aAnecdots.length; // array anecdots length
      do {
         rr = getRandom(aal);      
         retA  =aAnecdots[rr];  // Возвращаемое значение
         } while (usedAnecdots.indexOf(rr) != -1);
      // поскольку вышли из цикла - значит значение - новое      
      usedAnecdots.push(rr);  
      // проверяем не просмотрены ли все значения из массива, и если просмотрены - обнуляем
      if (usedAnecdots.length == aal) {
         usedAnecdots = [];
      } 
      return retA;
   }
   //-------------------------------------------------------------------------------------
   function fillDutyItems() {
      // Заполняет документацию дежурного по клубу
      
      // Структура страницы. Из внешнего файла подгружается долго, поэтому - вручную...
      var $art = $("article");
      $art.empty();      
      var aStruct = [
         '<p  class = "p1header">Документация дежурного по клубу</p>',
         '<div id="picduty"><img></div>',
         '<div id="marazm"></div>',
         '<div id="tost"></div>',
         '<div id="anecdot"></div>',
         '<div id="caricatura"></div>',
         '<div id="playlist"></div>'
         ];
         
      aStruct.forEach(function (cstr) {
         $art.append(cstr);      
      });   

      // Картинка дежурного    
        
      var oDuty = aDuties[getRandom(6)]; 
      var picDut= oDuty.pic;
      var namDut= "<p>" + oDuty.name +"</p>";
      var sign = "<p>Дежурный по клубу</p>" + namDut;
      
      $pd = $("#picduty img");
      $pd.attr("src",picDut );
      $pd.css("width","200px");
      $("#picduty").append(sign);

      // Маразм
     
      dMarazm = getRandomMarazm();
      var $mrm = $("#marazm"); 
      var tText = "<p>Дежурный маразм № " + dMarazm.num + "</p>" + "<p>" + dMarazm.text + "</p>";
      $mrm.append(tText);
            
      // Тост

      dTost = getRandomTost();
      var $tst = $("#tost"); 
      var tText = "<p>Дежурный тост № " + dTost.num + "</p>" + "<p>" + dTost.text + "</p>";
      $tst.append(tText);
      
      // Анекдот

      dAnecdot = getRandomAnecdot();
      var $ant = $("#anecdot");
      var tText = "<p>Дежурный анекдот № " + dAnecdot.num + "</p>" + "<p>" + dAnecdot.text + "</p>";
      $ant.append(tText);
      
      // Карикатура (картинка)    
  
      // в дальнейшем, количество галерей увеличить и выбирать случайную  
      $car = $("#caricatura");
      tText = "<p>Дежурные картинки:</p>";
      $car.append(tText);
      tText = '<a target="_blank" href="caricatura1.html">Галерея карикатур №1</a>';
      $car.append(tText);
      tText = '<a target="_blank" href="caricatura2.html">Галерея карикатур №2</a>';
      $car.append(tText);
      tText = '<a target="_blank" href="caricatura3.html">Галерея карикатур №3</a>';
      $car.append(tText);
      
      // И немного музыки
      
      $pl = $("#playlist");
      tText = "<p>Дежурная музыка (серьёзная)</p>";
      $pl.append(tText);
      tText = '<a target="_blank" href="playlist.html">Список воспроизведения</a>';
      $pl.append(tText);
      //------------------------------------------------------------
      
      // Слушатели. Для маразмов, анекдотов и тостов
      $mrm.click(function () {
         dMarazm = getRandomMarazm();
         var tText = "<p>Случайный маразм № " + dMarazm.num + "</p>" + "<p>" + dMarazm.text + "</p>";
         $mrm.empty();
         $mrm.append(tText);
      });   
      //------------------------
      $tst.click(function () {
         dTost = getRandomTost();
         var tText = "<p>Случайный тост № " + dTost.num + "</p>" + "<p>" + dTost.text + "</p>";
         $tst.empty();
         $tst.append(tText);   
      });   
         //---------------------
      $ant.click(function () {
         dAnecdot = getRandomAnecdot();      
         var tText = "<p>Случайный анекдот № " + dAnecdot.num + "</p>" + "<p>" + dAnecdot.text + "</p>";
         $ant.empty();
         $ant.append(tText);
      });         
            
      
   }
   //-------------------------------------------------------------------------------------
   function fillArticle(url) {
      // заполняет раздел article страницы
      $("article").load(url);  
   }   
   //-------------------------------------------------------------------------------------
   $("#main-menu li").bind("click",(function () {
    // Реакция на главное меню  
     var selected =  this.id;
     switch(selected) {
        case "main":
           fillArticle(urlMain);
           break;
        case "statut":
           fillArticle(urlStat);
           break;
        case "codex":
           fillArticle(urlCodex);
           break;
        case "history":
           if (GRANTED) {
              fillArticle(urlHist);
           } else {
              alert(notAllowed);
              fillArticle(urlMain);
              }
           break;
        case "duty":
           if (GRANTED) { 
              fillDutyItems();
           } else {
              alert(notAllowed);
              fillArticle(urlMain);
           }   
           break; 
        case "contacts":
           fillArticle(urlCont);
           break;
           
        default:
           fillArticle(urlMain);
           break;
     }   // switch
      
   })); //on click
   
   //-------------------------------------------------------------------------------------
   function checkLog() {
      // Проверка логина и пароля пользователя и соответствующая реакция
      if (users.length == 0) {
         // Если раньше не получали список пользователей
         users = getUserList();       
      }     
      // Сброс настроек до заводских
      var chk1 = false, chk2 = false;
      var $eml = $("#eml");
      var $pwd = $("#pwd");   
      GRANTED = false;
      $eml.css("background-color", "#fff")
      $pwd.css({"background-color": "#fff","color": "#000" });
      $("#usr").text("Вы не авторизованы");
      $("#logo").attr("src","Pics/3star3.png");
      users.forEach(function(user){
         if ($eml.val() == user.email) {
            curUser = user;
            $eml.css("background-color", "#80C8A0")
               if ($pwd.val() == curUser.pass) {
                   $pwd.css({"background-color": "#80C8A0","color": "#80C8A0" });
                   $("#usr").text(curUser.log);
                   GRANTED = true;
                   $("#logo").attr("src",curUser.pic);
               } // if #pwd                 
         } // if eml
         
      });     
         
   }
   //-------------------------------------------------------------------------------------   
   // Слушатели логина и пароля
   $("#eml").blur(function () {
      checkLog();
   });
   //---------------------------
   // У пароля - два слушателя (по уходу/переходу) и по нажатии кнопки ВВОД
   $("#pwd").blur(function () {
      checkLog();
   });
   $("#pwd").keyup(function(event){
    if(event.keyCode == 13){
        checkLog();
        event.preventDefault();
    }
});
 }  // main


//////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(main);















