<template>
<div id="app">
  <head>
    <link href="/your-path-to-fontawesome/css/all.css" rel="stylesheet">
  </head>

  <b-navbar type="dark" variant="secondary" class="d-none d-md-block">
    <b-navbar-nav>
      <b-nav-item class="w-100">
        <span class="text-light">fioreseNET v0.01</span>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>

  <b-container id="body" fluid class="mt-xs-2 mt-md-0">
    <b-row justify-content-md-center>
      <b-col>
        <b-card
          no-body
          class="overflow-hidden ml-auto mr-auto mt-sm-2 mt-lg-5"
          style="max-width: 900px;"
        >
          <b-row no-gutters class="h-100">
            <b-col md="4" lg="3" class="bg-secondary">
              <b-form-radio-group
                id="btn-radios-3"
                v-model="pagina"
                :options="options"
                buttons
                stacked
                name="radio-btn-stacked"
                class="w-100"
                @input="mudarPagina()"
              ></b-form-radio-group>
            </b-col>
            <b-col md="8" lg="9">
              <b-card-body>
                <b-card-text>
                  <router-view/>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
  <FlashMessage></FlashMessage>
</div>
</template>

<script>
export default {
  data() {
    return {
      pagina: "home",
      login: false,
      options: [
        { text: "Início", value: "/" },
        { text: "Configuração Portas", value: "/port-config" },
        { text: 'Agendamento', value: '/agendamento' },
        // { text: "Perfil", value: "perfil" },
        { text: "Sair", value: "logoff" }
      ]
    };
  },

  methods: {
    logoff() {
      window.document.close();
      alert("Sinta-se desconectado :D\nisso faz mais sentido se tivesse login.");
    },

    mudarPagina() {
      if (this.pagina != "logoff") this.$router.push(this.pagina);
      else this.logoff();
    },
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Tirei as bordas redondas de todos os componentes para ficar flat */
.b-form-radio-group .b-card {
  border-radius: 0 !important;
}
</style>
