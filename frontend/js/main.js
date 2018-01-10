if(navigator.serviceWorker){
  navigator.serviceWorker.register("/sw.js")
}


;(function(){

  let sticky = false
  let currentPosition =0
  const imageCounter = $("[data-name='image-counter']").attr("content")//no olvidarse de modifar el contador si aumento o disminuyo la cantidad de imagenes
  const email= "gianninalugue@hotmail.com"

  $("#contact-form").on("submit",function(ev){//Agregar un escucha o un listener
    ev.preventDefault()
    sendForm($(this))
    return false
  })

  //console.log(imageCounter - 1)
  $("sticky-navigation").removeClass("hidden")
  $("#sticky-navigation").slideUp(0)

  checkScroll()
  isOpen()

  $("#menu-opener").on("click",toggleNav)

  $(".menu-link").on("click",toggleNav)

  

  setInterval(()=>{

    if(currentPosition < imageCounter-1){
      currentPosition ++
    }else{
      currentPosition=0
    }
    $("#gallery .inner").css({
      left: "-"+currentPosition*100+"%"
    })

    //console.log("HOLAAA")
  },3000)

  console.log($(window).height());
  
  $(window).scroll(checkScroll)

  function checkScroll(){
    const inBotton = isInBottom()

    if(inBotton && !sticky){
      //Mostrar la navegacion
      //console.log("Cambiar la navegacion")
      sticky = true
      stickNavigation()
    }else if(!inBotton && sticky){
      //Ocultar la navegacion
      sticky = false
      //console.log("Conservar la navegacion")
      unStickNavigation()
    }
  }

  function isOpen(){
    //Reloj de 24 horas => 9am-19pm
    let date = new Date()
    const current_hour = date.getHours()

    //console.log(current_hour)

    if(current_hour < 9 || current_hour > 19){
      console.log("Cerrado")
      $("#is-open .text").html("Cerrado ahora <br> Abierto de Lun a Sab 9:00 am - 7:00pm")
    }
  }

  function toggleNav(){
    $("#responsive-nav ul").toggleClass("active")
    $("#menu-opener").toggleClass("glyphicon-menu-hamburger")
  }

  function stickNavigation(){
    $("#description").addClass("fixed").removeClass("absolute")
    
    $("#navigation").slideUp("fast") //Para ocultar
    $("#sticky-navigation").slideDown("fast") //Para mostrar
  }

  function unStickNavigation(){
    $("#description").removeClass("fixed").addClass("absolute")
    
    $("#navigation").slideDown("fast")
    $("#sticky-navigation").slideUp("fast")
  }

  
  /*function diHola(){
    $("#gallery .inner").css({
      left: "-100%"
    })
  }*/

  function isInBottom(){
    const $description = $("#description") //es una constante a menos que vaya a cambiar
    const descriptionHeight = $description.height()

    return $(window).scrollTop() > $(window).height() - (descriptionHeight*1.5)
  }


})()