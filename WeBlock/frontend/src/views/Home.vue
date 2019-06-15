<template>
  <div class="home">
    <b-container class="fluid">
      <b-row align-h="center">
        <b-card
          header="Agendamentos futuros"
          header-tag="header"
          header-class="bg-secondary text-light"
          class="w-100"
        >
          <b-table :items="agendamentos">
          </b-table>
          <!-- <b-card-text> -->
            <!-- <b-list-group> -->
            <!-- <template v-for="(job, idj) in agendamentos"> -->
              <!-- <b-list-item :key="idj"> -->
                <!-- {{job}} -->
              <!-- </b-list-item> -->
            <!-- </template> -->
            <!-- </b-list-group> -->
          <!-- </b-card-text> -->
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {Client} from "@/api/rest-client";
import * as config from "@/config";

export default {
  name: "home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      agendamentos: []
    }
  },

  methods: {
    getAgendamentos() {
      this.agendamentos = [];
      Client.get(`/agenda/${config.SALA}`).then((resultado) => {
        this.agendamentos = resultado.data;
      }).catch((err) => {
        console.error(err);
      });
    }
  },

  created() {
    this.getAgendamentos();
  }
};
</script>
