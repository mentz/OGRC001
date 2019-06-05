<template>
  <div id="app">
    <div id="nav" v-if="!login">
      <b-row align-h="between" align-v="center">
        <b-col>
          <span>
            <h3><b>WeBlock</b></h3>
            <p style="margin: -10px 0 4px 0;">Bloqueio de navegação</p>
          </span>
        </b-col>
        <b-col>
          <router-link to="/">Home</router-link> |
          <router-link to="/agendamentos">Agendamentos</router-link>
        </b-col>
        <b-col>
          <b-button @click="logoff">
            Sair
          </b-button>
        </b-col>
      </b-row>
    </div>
    <b-container id="body" fluid>
      <router-view/>
    </b-container>
    <footer>
      <div id="footer">
        <b>WeBlock</b> © 2019
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    logoff() {
      alert("Desconectado :D\nTroque isso por uma função.");
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#body {
  background-color: #ffffff;
  padding: 2em;
  /* box-shadow: 0 0 23px #cccccc; */
  border-style: solid;
  border-color: #2c3e50;
  border-width: 1px 0 1px 0;
}

#nav {
  padding: 1.2em;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#footer {
  margin: 2em;
  /* padding: 1em; */
}
</style>
