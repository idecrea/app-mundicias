<template>
  <div class="listContainer">

    <h1>Mundicias</h1>
    <div class="cabecera-inicio" :style="`background-image : url(${imagenPrimera});background-position : center center;background-size : cover;background-repeat : no-repeat`">
      <img src="/img/icono-menu.svg" alt="" class="icono-menu">
      <div>
          <transition name="fade">
            <input v-if="mostrar" type="text" v-model="busqueda" placeholder="Titulo de la noticia" class="input">
          </transition>
        <img @click="mostrar = !mostrar" src="/img/search.svg" alt="" class="icono-menu2">
      </div>
    </div>
    <div v-for="(noticia,pos) in arrayNoticias" :key="noticia.id">
      <router-link :to="{ name : 'news',params : {pos : pos} }" v-if="cleanHTML(noticia.content) != ''">
          <h1>{{ noticia.title }}</h1>
          <!--<img :src="noticia.thumbnail">-->
          <p>{{ noticia.pubDate | tiempoTranscurrido}}</p>
          <!--<p>{{ noticia.content | quitarHTML}}</p>-->
          <ol>
              <li v-for="categoria in noticia.categories" :key="categoria.id">{{ categoria }}</li>
          </ol>
          <p> Tiempo lectura : {{noticia.content | quitarHTML | tiempoLectura}} minutos</p>
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
      console.log(this.arrayNoticias);
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

<style scoped>
.listContainer{
  width: 100vw;
  height: 100vh;
}

.icono-menu2{
    position: absolute;
    width: 30px;
    padding: 1rem;
    right: 100px;
    border: 1px solid black;
    cursor: pointer;
}
.input{
  border: 1px solid black;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
