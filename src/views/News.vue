<template>
  <div class="news">
    <div class="header">
      <router-link class="header__regresar" :to="{ name:'list' }">
        <div class="header__regresar-flecha anime-inicio" id="flecha"></div>
      </router-link>
      <div v-if="baseDatos.length > 0" class="header__data">
        <div class="header__fecha">
          <p>
            {{noticia.pubDate | tiempoTranscurrido}}
          </p>
        </div>
        <div class="header__categoria">
          <p>
             {{ noticia.categories[0] }}
          </p>
        </div>
        <div class="header__duracion" >
          <p v-if="noticia.content !=''">
           Tiempo lectura : {{noticia.content | quitarHTML | tiempoLectura}} min
          </p>
        </div>
      </div>
    </div>
    <div class="news">
      <div class="news__main" :style="`background-image:url(${noticia.thumbnail})`">
        <div class="news__main-title">
          <h1 class="news__main-title-text">
            {{noticia.title}}
          </h1>
          <p class="news__main-title-author">
             {{noticia.author}}
          </p>
        </div>
      </div>
      <div class="news__noticia">
        <p>{{noticia.content | quitarHTML}}</p>
      </div>
      <a :href="noticia.link" class="news__enlace-fuente" target="_blank">Enlace a la noticia original</a>
    </div>
  </div>
</template>

<script>

import moment from 'moment';

moment.locale('es');

export default {
  name : 'news',
  components : {
  },
  data : function (){
    return {
       posicionPasada : 0,
       baseDatos : [],
       noticia : ''
    }
  },
  mounted : function(){

    let datos = JSON.parse(localStorage.getItem("baseDatos"));

    if(datos != null){
      this.baseDatos = datos.bd;
    }
    this.posicionPasada = this.$route.params.pos;
    
    this.noticia = this.baseDatos[this.posicionPasada];

    console.log(this.noticia);

    let flecha = document.querySelector('#flecha');
    setTimeout (function () {
        this.flecha.classList.remove('anime-inicio');
        this.flecha.classList.add('anime');
      }, 2000)

  },
  filters :{
      tiempoTranscurrido : function(fecha){  

        let tiempo = moment(`${fecha}`).fromNow();

        return tiempo;
      },
      quitarHTML : function(texto){

          let final = texto != undefined ? texto.replace(/<[^>]+>/g, '') : '';
          return final;
     },
      tiempoLectura : function(texto){

       let palabras_minuto = 150;
       texto = texto.split(' ');

       return Math.ceil(texto.length / palabras_minuto);

     }
    }
  }
</script>
