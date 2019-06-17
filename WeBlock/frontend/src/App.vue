<template>
<div id="app">
  <head>
    <link href="/your-path-to-fontawesome/css/all.css" rel="stylesheet">
  </head>

  <b-navbar type="dark" variant="secondary" class="d-none d-md-block">
    <b-navbar-nav>
      <b-nav-item class="w-100">
        <span class="text-light">
          <h3 style="display: inline; margin-right: 0.2em">
            <strong>weblock</strong>
          </h3>v1.0.1
        </span>
      </b-nav-item>

      <b-nav-item class="w-100">
        <div>
          <b-dropdown id="dropdown-offset" offset="25" :text="label" class="m-2">
            <b-dropdown-item
              v-for="(item, idx) in sala"
              href="#"
              @click="mudarSala(idx)"
            >{{item.sala}}</b-dropdown-item>
          </b-dropdown>
        </div>
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
                  <router-view v-if="idxSala != -1"/>
                  <b-card v-else bg-variant="warning" text-variant="white" class="text-center">
                    <b-card-text>Selecione uma sala!</b-card-text>
                  </b-card>
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
import { Client } from "@/api/rest-client";
import * as config from "@/config";
import { events } from "@/main";

export default {
  data() {
    return {
      label: "selecione a sala",
      pagina: "home",
      idxSala: -1,
      sala: [],
      login: false,
      options: [
        { text: "Início", value: "/" },
        { text: "Configuração Portas", value: "/port-config" },
        { text: "Agendamento", value: "/agendamento" },
        // { text: "Perfil", value: "perfil" },
        { text: "Sair", value: "logoff" }
      ]
    };
  },

  methods: {
    logoff() {
      window.document.close();
      alert(
        "Sinta-se desconectado :D\nisso faz mais sentido se tivesse login."
      );
    },

    mudarPagina() {
      if (this.pagina != "logoff") this.$router.push(this.pagina);
      else this.logoff();
    },

    mudarSala(idx) {
      this.label = this.sala[idx].sala;
      this.idxSala = idx;
      events.$emit("Home-getAgendamentos");
      events.$emit("Agendamento-refresh");
      events.$emit("PortConfig-updateSala");
    }
  },

  created() {
    console.log("criado!");
    Client.get(`sala`)
      .then(response => {
        this.sala = response.data;
      })
      .catch(err => {
        this.flashMessage.error({ title: "Erro", message: "Erro interno" });
      });
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
