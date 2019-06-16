<template>
  <div class="home">
    <b-container class="fluid">
      <b-row align-h="center">
        <b-card no-body class="w-100">
          <!-- 
          header="Agendamentos futuros"
          header-tag="header"
          header-class="bg-secondary text-light"
          -->

          <b-table :fields="fields" :items="agendamentos">
            <template slot="actions" slot-scope="row">
              <b-button size="sm" @click="removerAgendamento(row.item.jobName)" class="mr-1">Remover</b-button>
            </template>
          </b-table>
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Client } from "@/api/rest-client";
import * as config from "@/config";

export default {
  name: "home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      agendamentos: [],
      fields: [
        { key: "jobName", label: "Agendamento" },
        { key: "actions", label: "Ações" }
      ]
    };
  },

  methods: {
    getAgendamentos() {
      this.agendamentos = [];
      Client.get(`/agenda/${config.SALA}`)
        .then(resultado => {
          this.agendamentos = resultado.data;
        })
        .catch(err => {
          console.error(err);
        });
    },
    removerAgendamento(jobName) {
      if (confirm(`Deseja remover o agendamento:\n"${jobName}" ?`)) {
        Client.delete(`/agenda/${jobName}`)
          .then(resultado => {
            this.flashMessage.success({
              title: "Muito bem!",
              message: "Agendamento removido com sucesso."
            });
          })
          .catch(error => {
            this.flashMessage.error({
              title: "Puts :/",
              message: "Agendamento não removido."
            });
          })
          .finally(() => {
            this.getAgendamentos();
          });
      }
    }
  },

  created() {
    this.getAgendamentos();
  }
};
</script>

<style>
.hidden_header {
  display: none;
}
</style>