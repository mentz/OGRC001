<template>
  <div class="agendamento">
    <b-container class="fluid">
      <b-row align-h="center">
        <b-card
          header="Novo agendamento"
          header-tag="header"
          header-class="bg-secondary text-light"
          class="w-100"
        >
          <b-card-text>
            <b-row align-h="center">
              <b-col sm="12" md="6">
                <div class="bg-secondary rounded-top">
                  <span class="text-light">Horário fechamento</span>
                </div>
                <flat-pickr
                  id="pickr0"
                  class="text-center w-100"
                  v-model="picker0.date"
                  :config="{
                    minDate: 'today',
                    dateFormat: 'd/m/Y H:i',
                    enableTime: true,
                    time_24hr: true,
                  }"
                >
                  <input type="text" placeholder="Select Date.." data-input>
                  <!-- input is mandatory -->
                </flat-pickr>
              </b-col>

              <b-col sm="12" md="6" class="mt-sm-2 mt-md-0">
                <div class="bg-secondary rounded-top">
                  <span class="text-light">Horário abertura</span>
                </div>
                <flat-pickr
                  id="pickr1"
                  class="text-center w-100"
                  v-model="picker1.date"
                  :config="{
                    minDate: 'today',
                    dateFormat: 'd/m/Y H:i',
                    enableTime: true,
                    time_24hr: true,
                  }"
                >
                  <input type="text" placeholder="Select Date.." data-input>
                  <!-- input is mandatory -->
                </flat-pickr>
              </b-col>

              <b-col sm="12" class="mt-2">
                <template v-for="(item, idx) in switches">
                  <span :key="idx">
                    <div class="bg-secondary rounded-top">
                      <span class="text-light">Switch: {{item.name}}</span>
                    </div>
                    <div class="border border-secondary p-1">
                      <div class="mt-1">
                        <template v-for="(porta, idy) in item.ports">
                          <b-button
                            squared
                            :class="`border-0 bg-` + ((porta.marcado)?'success':'secondary')"
                            @click="acaoPorta(porta)"
                            style="width: 45px; height: 40px;"
                            :disabled="porta.disabled"
                            :key="idy"
                          >
                            <small>{{idy + 1}}</small>
                          </b-button>
                        </template>
                      </div>
                    </div>
                  </span>
                </template>
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col sm="12" md="6">
                <b-button class="w-100 btn-sm" @click="agendar()">
                  <b-spinner v-if="loading" small label="Small Spinner"></b-spinner>Agendar
                </b-button>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { Client } from "@/api/rest-client";
import * as config from "@/config";
import { events } from "@/main";

export default {
  name: "agendamento",
  components: {},

  data() {
    return {
      loading: false,
      porta: [],
      picker0: {
        date: ""
      },

      picker1: {
        date: ""
      },

      switches: []
    };
  },

  computed: {
    tpicker0: function() {
      console.log(this.picker0.date.split(" ")[1]);
      return this.picker0.date.split(" ")[1];
    },

    dpicker0: function() {
      console.log(this.picker0.date.split(" ")[0]);
      return this.picker0.date.split(" ")[0];
    },

    date0: function() {
      return document.querySelector("#pickr0")._flatpickr.selectedDates[0];
    },

    date1: function() {
      return document.querySelector("#pickr1")._flatpickr.selectedDates[0];
    },

    picker1Config: function() {
      return {
        minDate: this.dpicker0,
        dateFormat: "d/m/Y H:i",
        enableTime: true,
        time_24hr: true
      };
    }
  },

  methods: {
    acaoPorta(porta) {
      porta.marcado = !porta.marcado;
    },

    refresh() {
      this.switches = [];
      Client.get(`/sala/${this.getSwitch.sala}`).then(resultado => {
        let switches = resultado.data;
        for (let sw of switches) {
          let portas = [];
          for (let i = 0; i < sw.port_quantity; i++) {
            portas.push({
              number: i + 1,
              disabled: sw.dont_block.includes(String(i + 1)),
              marcado: false
            });
          }
          this.switches.push({
            name: sw.name,
            ports: portas
          });
          // Client.get(`/switch/${sw.name}`).then(res2 => {
          //   let status = res2.data;
          //   for (let porta of status) {
          //     portas.push({
          //       number: porta.portNumber,
          //       disabled: sw.dont_block.includes(String(porta.portNumber)),
          //       marcado: false
          //     });
          //   }
          // });
        }
      });
    },

    agendar() {
      this.loading = true;

      this.switches.forEach(x => {
        let sw_ports = [];

        x.ports.forEach(xx => {
          if (xx.marcado) sw_ports.push(xx.number);
        });

        if (sw_ports.length > 0) {
          let body = {
            openTime: this.date1,
            closeTime: this.date0,
            sw_ports: sw_ports
          };

          console.log(body);

          Client.post(`/switch/${x.name}`, body)
            .then(resultado => {
              this.flashMessage.success({
                title: "Sucesso",
                message: "Agendado com sucesso!"
              });
            })
            .catch(erro => {
              this.flashMessage.error({
                title: "Erro",
                message: "Erro ao agendar"
              });
            })
            .finally(() => {
              this.loading = false;
            });
        } else this.loading = false;
      });
    }
  },

  created() {
    this.refresh();
    events.$on("Agendamento-refresh", () => {
      this.refresh();
    });
  },

  computed: {
    getSwitch: function() {
      return this.$parent.sala[this.$parent.idxSala];
    }
  }
};
</script>
