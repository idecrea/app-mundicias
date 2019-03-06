<template>
  <div class="listContainer">
    <div v-for="noticia in arrayNoticias" :key="noticia.id">
      <router-link :to="{ name : 'news'}">
        <div>
          <h1>{{ noticia.title }}</h1>
          <img :src="noticia.urlToImage">
        </div>
        <div>
          <p>{{ noticia.publishedAt | tiempoTranscurrido}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>

import moment from 'moment';

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
        pagina : 1
    }
  },
  mounted : function(){

      this.getNews(this.pagina);

  },methods:{
    getNews : function(pagina){
     
     let that = this;

      axios.get(`https://newsapi.org/v2/everything?sources=el-mundo&pageSize=100&page=${pagina}`)
        .then(function (response) {
        // handle success

        that.totalResultados = response.data.totalResults;
        that.arrayNoticias = response.data.articles;
        //console.log(that.arrayNoticias);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    }
  },filters :{
     tiempoTranscurrido : function(fecha){
           
        let tiempo = moment(`${fecha}`).fromNow();

        return tiempo;
     }
  }
}
</script>

<style scoped>
.listContainer{
  width: 100vw;
  height: 100vh;
}
</style>
