<template>
  <div class="news">
    <div class="header">
      <router-link class="header__regresar" :to="{ name:'list' }">
        <div id="svg"></div>
        <object id="my-svg" type="image/svg+xml" data="/img/icono-atras.svg"></object>
      </router-link>
      <div class="header__data">
        <div class="header__fecha">
          <p>
            12/11/2018
          </p>
        </div>
        <div class="header__categoria">
          <p>
            Categoría
          </p>
        </div>
        <div class="header__duracion">
          <p>
            Duración de lectura: 2 min
          </p>
        </div>
      </div>
    </div>
    <div class="news">
      <div class="news__main">
        <div class="news__main-title">
          <h1 class="news__main-title-text">
            Titulo noticia
          </h1>
          <p class="news__main-title-author">
            Autor de la noticia
          </p>
        </div>
      </div>
      <div class="news__noticia">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus suscipit esse eaque, quis neque laborum eius, nesciunt dolorum similique temporibus ducimus dolor cum soluta, et maxime rerum molestiae reiciendis voluptate?</p>
        <p>Magni excepturi repellat corrupti est quo nemo asperiores quis iste mollitia! Ut, molestias! Officia, neque mollitia? Unde doloremque eaque nihil soluta dignissimos! Quod mollitia provident nemo iste minima dolorem officiis!</p>
        <p>Nobis accusantium modi, temporibus facere minima soluta consequuntur sunt obcaecati quisquam consectetur molestiae praesentium et. Molestias maiores ea laboriosam explicabo cupiditate deserunt sed doloribus animi aut pariatur, officia, amet facere.</p>
      </div>
      <a href="#" class="news__enlace-fuente">Enlace a la noticia original</a>
    </div>
  </div>
</template>

<script>
</script>