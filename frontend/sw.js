const CACHE_NAME ="camitas-v1"

const cache_urls =[
                   "/offline/view.html",
                   "/offline/style.css",
                   "/offline/map.png"
                  ]


self.addEventListener("install",function(ev){
  console.log("SW instalada")

  caches.open(CACHE_NAME)
        .then(function(cache){
          console.log("Cache opened")
          return cache.addAll(cache_urls)
        })

})


self.addEventListener("activate",function(ev){
  //console.log("Activando")

  ev.waitUntil(
    caches.keys().then(function(cache_names){
      return Promise.all(
        cache_names.map(function(cache_name){
          if(CACHE_NAME !== cache_name){
            return caches.delete(cache_name)
          }
        })
      )
    })
  )

})

//Para trabajar online

self.addEventListener("fetch",function(ev){
  //console.log(ev.request)
  ev.respondWith(
    caches.match(ev.request)
      .then(function(response){
        if(response){ //En caso de que haya una respuesta
          console.log("Estoy en el cache y te ahorre una peticion")
          return response //Esta devolviendo del cache
        }
        console.log("No estoy en el cache")
        return fetch(ev.request)
      }).catch(function(err){
        if(ev.request.mode == "navigate"){
          return caches.match("/offline/view.html")
        }
      })
  )
})