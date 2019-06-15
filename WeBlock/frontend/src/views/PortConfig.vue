<template>
  <div class="port-config">
    <b-container class="fluid">
      <b-row align-h="center">
        <b-card
          header="Configuração Portas"
          header-tag="header"
          header-class="bg-secondary text-light"
          class="w-100"
        > 
          <b-row align-h="center">
            <template v-for="(item, idx) in switches">
              <b-card class="w-100"
                :header="`Switch: ` + (item.name)"
                :key="idx">
                <b-row align-h="center">
                <template v-for="(porta, idy) in item.ports">
                  <div class="m-1" :key="idy">
                    <div :class="`porta border border-` +((porta.operStatus == 1)?'success':'danger')">
                      <b-button squared @click="acaoPorta(idx, idy)" class="w-100 h-100" :disabled="porta.disabled">
                        <b-spinner v-if="item.loading"  type="grow" label="Spinning"></b-spinner>
                        <font-awesome-icon v-else-if="porta.adminStatus == 2" icon="ethernet" :style="{ color: 'Secondary ' }" style="font-size: 2rem" />
                        <font-awesome-icon v-else-if="porta.operStatus == 1" icon="ethernet" :style="{ color: 'MediumSeaGreen ' }" style="font-size: 2rem" />
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
                </b-row>
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
    acaoPorta(sw, port) {
      if(!this.switches[sw].ports[port].loading) {
        this.switches[sw].ports[port].loading = true;
        let whatdo = this.switches[sw].ports[port].adminStatus == 1;
        
        let body = {openTime: (whatdo ? '':'now'), closeTime: (whatdo ? 'now':''), sw_ports: [String(port)]};
        Client.post(`/switch/${this.switches[sw].name}`, body).then((response) => {
          this.switches[sw].ports[port].loading = false;
          let msg = "Porta " + (port + 1) + " " + ((this.switches[sw].ports[port].adminStatus == 1) ? "desativada" : "ativada");
          this.flashMessage.success({ title: 'Sucesso', message: msg});
          this.updateSala();
        }).catch((err) => {
          console.error(err);
          this.switches[sw].ports[port].loading = false;
          let msg = "Erro ao " + ((this.switches[sw].ports[port].adminStatus) ? "desativar" : "ativar" ) + " porta " + (port + 1);
          this.flashMessage.error({ title: 'Erro', message: msg});
        });
      }
    },

    updateSala() {
      this.switches = [];
      Client.get(`/sala/${config.SALA}`).then((resultado) => {
        let switches = resultado.data;
        for (let sw of switches) {
          let portas = [];
          Client.get(`/switch/${sw.name}`).then((res2) => {
            let status = res2.data;
            for (let porta of status) {
              // console.log(porta);
              portas.push({
                number: porta.portNumber,
                disabled: sw.dont_block.includes(String(porta.portNumber)),
                adminStatus: porta.adminStatus,
                operStatus: porta.operStatus,
                loading: false
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
  },

  created() {
    this.updateSala();
  }
};
</script>

<style>
.porta {
  width: 65px;
  height: 55px;
}
</style>
