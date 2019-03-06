<template>
  <div class="listContainer">

  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'list',
  components: {

  },
  data : function(){
    return {
        arrayNews : []
    }
  },
  mounted : function(){

    let that = this;

    axios.get('https://newsapi.org/v2/top-headlines?sources=el-mundo')
      .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }
}
</script>

<style scoped>
.listContainer{
  width: 100vw;
  height: 100vh;
}
</style>

