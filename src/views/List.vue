<template>
  <div class="listContainer">
    <div
      class="cabecera-inicio imagen-primera-noticia"
      :style="`background-image : url(${imagenPrimera}); `"
    >
      <img v-if="!loading" src="/img/mundicio.svg" alt class="logo-mundicio">
      <img v-if="!loading" @click.prevent="openCategories" src="/img/icono-menu.svg" alt class="icono-menu">
      <div v-if="loading" class="cargando">
        <Loading></Loading>
        <p class="parrafo-loading">Cargando noticias ...</p>
      </div>

      <div v-if="!loading">
        <transition name="fade">
          <div v-if="mostrar">
            <input
              type="text"
              v-model="busqueda"
              placeholder="Titulo de la noticia"
              class="input"
            >
            <img src="/img/icono-cross.svg" alt="" class="icono-cerrar-buscador" @click="mostrar = !mostrar">
          </div>
        </transition>
        <img v-if="!mostrar" @click="mostrar = !mostrar" src="/img/search.svg" alt class="icono-menu2">
      </div>
    </div>
    <div v-for="(noticia,pos) in arrayNoticiasFiltrado" :key="noticia.id" class="noticia">
      <router-link :to="{ name : 'news',params : {pos : pos} }" v-if="cleanHTML(noticia.content) != ''">
          <h1 class="noticia__titulo">{{ noticia.title }}</h1>
          <ol class="noticia__categoria">
              <li v-for="categoria in noticia.categories" :key="categoria.id">{{ categoria | limpiarHTML }}</li>
          </ol>
          <div class="noticia__tiempo">
            <p>{{ noticia.pubDate | tiempoTranscurrido}}</p>
            <p> Tiempo lectura : {{noticia.content | quitarHTML | tiempoLectura}} minutos</p>
          </div>

      </router-link>
    </div>
    <div v-if="menuCategorias" class="menu-categorias">
      <img src="/img/icono-cross-menu.svg" alt="" class="icono-cerrar-categorias" @click="menuCategorias = false">
      <h2>Categorías</h2>
      <ol class="menu-categorias__lista">
        <li @click="categoria_seleccionada = ''; menuCategorias = false"><a>Todas</a></li>
        <li v-for="categoria in arrayCategorias" @click="categoria_seleccionada = categoria; menuCategorias = flase" :key="categoria.id">
          <a>{{ categoria | limpiarHTML}}</a>
          </li>
      </ol>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import moment from "moment";
import { constants } from "fs";

moment.locale("es");

export default {
  name: "list",
  components: {
    moment,
    Loading
  },
  data: function() {
    return {
        arrayNoticias : [],
        totalResultados : 0,
        mostrar : false,
        imagenPrimera : '',
        busqueda : '',
        menuCategorias: false,
        categoria_seleccionada : '',
        loading : true,
        arrayCategorias : [],
    }

  },
  mounted: function() {
    this.getNews();
    let datos = JSON.parse(localStorage.getItem("baseDatos"));
  },methods:{
    getNews : function(){
     
    let that = this;

    axios.get(`https://cors-anywhere.herokuapp.com/https://api.rss2json.com/v1/api.json?cache=${Date.now()}&rss_url=https%3A%2F%2Fwww.abc.es%2Frss%2Ffeeds%2Fabc_ultima.xml%3Fcache%3D${Date.now()}?cache=${Date.now()}`)
        .then(function (response) {
        // handle success

        that.cleanArray(response.data.items);

        let bd = {
            "bd" : that.arrayNoticias
        };
        localStorage.setItem("baseDatos", JSON.stringify(bd));
        that.loading = false;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    },
    cleanHTML: function(texto) {
      return this.$options.filters.quitarHTML(texto);
    },
    cleanArray(noticias) {
      for (let item of noticias) {
        if (this.cleanHTML(item.content) != "") {
          this.arrayNoticias.push(item);
          this.imagenPrimera = this.arrayNoticias[0].thumbnail;
        } else {
        }
      }
    },
    openCategories : function(){

      for(let noticia of this.arrayNoticias){

          for(let categoria of noticia.categories){
            this.arrayCategorias.push(categoria);

            this.arrayCategorias = this._.uniq(this.arrayCategorias);
            //console.log(this.arrayCategorias);
          }
        this.menuCategorias = true;
      }
      
    }
  },
  filters: {
    tiempoTranscurrido: function(fecha) {
      let tiempo = moment(`${fecha}`).fromNow();

      return tiempo;
    },
    quitarHTML: function(texto) {
      return texto.replace(/<[^>]+>/g, "");
    },
    tiempoLectura: function(texto) {
      let palabras_minuto = 150;
      texto = texto.split(" ");
      return Math.ceil(texto.length / palabras_minuto);
     },
     limpiarHTML : function(texto){
        let that = this;
        texto = _.unescape(texto);
       return texto;
     }
  },
  computed : {
    arrayNoticiasFiltrado : function(){

      // BUSCADOR

      let lista = this.arrayNoticias;
      let that = this;

    if(this.busqueda != '') {
      lista = lista.filter(function (item) {

        return item.title.toUpperCase().includes(`${that.busqueda.toUpperCase()}`)
      });
    }

      if(this.categoria_seleccionada != '') {
        lista = lista.filter(function (item) {

          return item.categories.includes(that.categoria_seleccionada)
        });
      }
      return lista;
      /*for(let item of this.arrayNoticias){
        //console.log(item.categories.includes(this.categoria_seleccionada));
        if(
          this.busqueda == '' ||
          item.title.toUpperCase().includes(`${this.busqueda.toUpperCase()}`) ||
          this.categoria_seleccionada == '' ||
          item.categories.includes(this.categoria_seleccionada)
          ){
         
          lista.push(item);
          }
        
      }
      return lista;*/
    }
  }
};
</script>


<style scoped>

</style>

