<template>
  <div class="listContainer">
    <div class="cabecera-inicio imagen-primera-noticia" :style="`background-image : url(${imagenPrimera}); `">
      <img src="/img/mundicio.svg" alt="" class="logo-mundicio">

      <img src="/img/icono-menu.svg" alt="" class="icono-menu">
      <div>
          <transition name="fade">
            <input v-if="mostrar" type="text" v-model="busqueda" placeholder="Titulo de la noticia" class="input">
          </transition>
        <img @click="mostrar = !mostrar" src="/img/search.svg" alt="" class="icono-menu2">
      </div>
    </div>
    <div v-for="(noticia,pos) in arrayNoticias" :key="noticia.id" class="noticia">
      <router-link :to="{ name : 'news',params : {pos : pos} }" v-if="cleanHTML(noticia.content) != ''">
          <h1 class="noticia__titulo">{{ noticia.title }}</h1>
          <!--<p>{{ noticia.content | quitarHTML}}</p>-->
          <ol class="noticia__categoria">
              <li v-for="categoria in noticia.categories" :key="categoria.id">{{ categoria }}</li>
          </ol>
          <!--<img :src="noticia.thumbnail">-->
          <div class="noticia__tiempo">
            <p>{{ noticia.pubDate | tiempoTranscurrido}}</p>
            <p> Tiempo lectura : {{noticia.content | quitarHTML | tiempoLectura}} minutos</p>
          </div>
      </router-link>
    </div>
  </div>
</template>

<script>

import moment from 'moment';
import { constants } from 'fs';

moment.locale('es');

export default {

  name: 'list',
  components: {
    moment
  },
  data : function(){
    return {
        arrayNoticias : [],
        totalResultados : 0,
        mostrar : false,
        imagenPrimera : ''
    }
  },
  mounted : function(){

      this.getNews();

      let datos = JSON.parse(localStorage.getItem("baseDatos"));



  },methods:{
    getNews : function(){
     
     let that = this;
    let url = 'https://cors-anywhere.herokuapp.com/https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.abc.es%2Frss%2Ffeeds%2Fabc_ultima.xml';
    
    axios.get(url)
        .then(function (response) {
        // handle success

        that.cleanArray(response.data.items);

        let bd = {
            "bd" : that.arrayNoticias
        };
        localStorage.setItem("baseDatos", JSON.stringify(bd));
        
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    },
    cleanHTML : function(texto){
      
      return this.$options.filters.quitarHTML(texto);

    },
    cleanArray (noticias){
      
      for(let item of noticias){
        if(this.cleanHTML(item.content) != ''){
            this.arrayNoticias.push(item);
            this.imagenPrimera = this.arrayNoticias[0].thumbnail;
        }else{

        }
      }
      //console.log(this.arrayNoticias);
    }
    ,
  },filters :{
     tiempoTranscurrido : function(fecha){
           
        let tiempo = moment(`${fecha}`).fromNow();

        return tiempo;
     },
     quitarHTML : function(texto){

       return texto.replace(/<[^>]+>/g, '');
     },
     tiempoLectura : function(texto){

       let palabras_minuto = 150;
       texto = texto.split(' ');

        
       return Math.ceil(texto.length / palabras_minuto);


     }
  }
}
</script>



