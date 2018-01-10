;(function() {

  class UserLocation{
    static get(callback){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((location)=>{
          callback({
            lat: location.coords.latitude,
            lng: location.coords.longitude
          })
        })
      }else{
        alert("No pudimos detectar el lugar en el que te encuentras")
        return{
          lat:0,
          lng:0
        }
      }

      
    }
  }

  const my_place ={
    lat: -12.077081,
    lng: -77.016841
  }
  //console.log(google.maps);
  google.maps.event.addDomListener(window,"load",()=>{
    const map = new google.maps.Map(
      document.getElementById('map'),
      {
        center:my_place,
        zoom:15
      })

    const marker = new google.maps.Marker({
      map:map,
      position:my_place,
      title:"Camas y Colchones Lugue",
      visible: true
    })

      UserLocation.get((coords)=>{
        //alert("Ya tengo las coordenadas del usuario")
        //console.log(coords)
        //Calcular distancia de la colchoneria al usuario
        let origen = new google.maps.LatLng(coords.lat,coords.lng)
        let destino =new google.maps.LatLng(my_place.lat,my_place.lng)
        let service = new google.maps.DistanceMatrixService()

        service.getDistanceMatrix({
          origins:[origen],
          destinations:[destino],
          travelMode:google.maps.TravelMode.DRIVING
        },(response,status)=>{
          if(status === google.maps.DistanceMatrixStatus.OK){
            const duration_element = response.rows[0].elements[0]
            //console.log(duration_element)
            const duracion_viaje =duration_element.duration.text
            document.querySelector("#message")
                    .innerHTML = `Estas a ${duracion_viaje} de llegar a nuestra tienda 
                    <span class="dancing-script medium">Camas y Colchones Lugue</span>`
          }
        })


      })
    
  })


  



})()