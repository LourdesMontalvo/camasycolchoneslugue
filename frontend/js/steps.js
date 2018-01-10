;(function(){

 // $(".step:nth-child(1)").addClass("active")
  const selector ="#contact-form"
  //console.log($(".step.active").index())
  $(".step textarea").on("keydown",(ev)=>{
    if(ev.keyCode==13){
      ev.preventDefault()
      $(ev.target).blur() //se ejecuta cuando el usuario pierde el foco
    }
  })

  $(".path-step").on("click",(ev)=>{
    let $current_circle = $(ev.target)
    focus_circle($current_circle) 

    //Las funciones de abajo hacen lo mismo
    //$(".path-step.active").removeClass("active")
    //$current_circle.addClass("active")
    //console.log($current_circle.index(".path-step"))

    const position = $current_circle.index(".path-step") + 1
    let $test = $(".step:nth-child("+position+")")
    siguiente($test)
  })

  $(selector).find(".input").on("change",(ev)=>{
    const $input = $(ev.target)

    const $next_step = $input.parent().next(".step")

    const is_form_valid = es_valido_formulario()

    if(!is_form_valid && $next_step.length > 0){
      siguiente($next_step)
    }else{
      validar_formulario()
    }
    //console.log(es_valido_formulario())
    //console.log($el)
    //console.log("Cambie de valor")
  })  

  //Helpers
  function validar_formulario(){
    if(es_valido_formulario()){
      sendForm()
    }else{
      let $fieldset_invalido = $(selector).find(".input:invalid").first().parent()
      siguiente($fieldset_invalido)
    }
  }

  function es_valido_formulario(){
    return document.querySelector(selector).checkValidity()
  }

  function siguiente($next_step){
    $(".step.active").removeClass("active")
    $next_step.addClass("active")
    $next_step.find(".input").focus()
    //Coordinar los circulos
    const position = $next_step.index(".step") + 1

    //console.log(position)
    //$(".path-step.active").removeClass("active")
    const $circle = $(".path-step:nth-child("+position+")")
    focus_circle($circle)


    //$next_step.focus() //colocar el elemento en el siguiente cursor
  }

  function focus_circle($circle){
    $(".path-step.active").removeClass("active")
    $circle.addClass("active")
  }

  function sendForm(){ //Video 19 de Js de codFacilito
    //console.log($form.formObject())
    const $form = $(selector)
    $.ajax({
      url: $form.attr("action"),
      method: "POST",
      data: $form.formObject(),
      dataType: "json",
      success: function(){
        $form.slideUp()
        $("#info-contacto").html("Hemos recibido tu correo, pronto nos pondremos en contacto contigo")
      }
    })
  }

})()