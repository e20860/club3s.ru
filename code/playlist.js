/* ///////////////////////////////////////////////////////////////////////////////////////////////////
                                            playlist.js
  Скрипты управления списком воспроизведения песен дежурного по клубу

*/ //////////////////////////////////////////////////////////////////////////////////////////////////

function playlist() {
   // Главная интегрирующая функция

   $( "#accordion" ).accordion();
   
   $("#accordion li").click(function () {
      var idmuz = this.firstChild.id;
      var muzname = this.firstChild.text;
      var mfile = "Audio/"+ idmuz.substr(0,1) + "/"+ idmuz.substr(2,2) + ".mp3";
      //console.log(mfile);
      var $player = $("#player");
      $player.empty();
      $player.attr("src",mfile);
      $player.attr("controls","controls");
      $player.attr("autoplay","autoplay");
      $("#plinfo").empty().html(muzname); 
         
   });

}


////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(playlist);