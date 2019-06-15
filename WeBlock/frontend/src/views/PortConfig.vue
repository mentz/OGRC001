<template>
  <div class="port-config">
    <b-container class="fluid">
      <b-row align-h="justify">
        <b-card
          header="Configuração Portas"
          header-tag="header"
          header-class="bg-secondary text-light"
          class="w-100"
        > 
          <b-row align-h="center">
            <template v-for="(item, idx) in switches">
              <b-card
                :header="`Switch: ` + (item.name)"
                :key="idx">
                <template v-for="(porta, idy) in item.ports">
                  <div class="m-1" :key="idy">
                    <div :class="`porta border border-` +((porta.operStatus == 1)?'success':'danger')">
                      <b-button squared @click="acaoPorta(idy)" class="w-100 h-100"> 
                        <b-spinner v-if="item.loading"  type="grow" label="Spinning"></b-spinner>
                        <font-awesome-icon v-else-if="item.ativada" icon="ethernet" :style="{ color: 'MediumSeaGreen ' }" style="font-size: 2rem" />
                        <font-awesome-icon v-else icon="ethernet" :style="{ color: 'Salmon ' }" style="font-size: 2rem"/> 
                      </b-button>
                    </div>
                    <div class="bg-secondary">

                      <small class="text-light ">
                        {{idy + 1}}
                      </small>
                    </div>
                  </div>
                </template>
              </b-card>
            </template>
          </b-row>
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import {Client} from "@/api/rest-client";
import * as config from "@/config";

export default {
  name: "port-config",
  components: {
    // HelloWorld
  },

  data() {
    return {
      alertId: 0,
      switches: [],
    }
  },

  methods: {

    acaoPorta(idx) {
      if(!this.porta[idx].loading) {
        this.porta[idx].loading = true;
        
        setTimeout(() => {
          let erro = false;
          if(!erro) {
            this.porta[idx].ativada = !this.porta[idx].ativada;
            let msg = "Porta " + (idx + 1) + " " + ((this.porta[idx].ativada) ? "ativada" : "desativada");
            this.flashMessage.success({ title: 'Sucesso', message: msg});
          } else {
            let msg = "Erro ao " + ((this.porta[idx].ativada) ? "desativar" : "ativar" ) + " porta " + (idx + 1);
            this.flashMessage.error({ title: 'Erro', message: msg});
          }
          this.porta[idx].loading = false;
        }, 500);
      }

    }
  },

  created() {
    Client.get(`/sala/${config.SALA}`).then((resultado) => {
      let switches = resultado.data;
      for (let sw of switches) {
        let portas = [];
        Client.get(`/switch/${sw.name}`).then((res2) => {
          let status = res2.data;
          for (let porta of status) {
            console.log(porta);
            portas.push({
              number: porta.portNumber,
              disabled: sw.dont_block.includes(String(porta.portNumber)),
              adminStatus: porta.adminStatus,
              operStatus: porta.operStatus
            });
          }
          this.switches.push({
            name: sw.name,
            ports: portas
          });
        });
      }
    });
  }
};
</script>

<style>
.porta {
  width: 65px;
  height: 55px;
}
</style>
