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
            <template v-for="(item, idx) in porta">
              <div class="m-1">
                <div :class="`porta border border-` +((item.ativada)?'success':'danger')">
                  <b-button squared @click="acaoPorta(idx)" class="w-100 h-100"> 
                    <b-spinner v-if="item.loading"  type="grow" label="Spinning"></b-spinner>
                    <font-awesome-icon v-else-if="item.ativada" icon="ethernet" :style="{ color: 'MediumSeaGreen ' }" size="lg" /> 
                    <font-awesome-icon v-else icon="ethernet" :style="{ color: 'Salmon ' }" size="lg"/> 
                  </b-button>
                </div>
                <div class="bg-secondary">
                  <small class="text-light ">#{{idx + 1}}</small>
                </div>
              </div>
            </template>
          </b-row>
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "port-config",
  components: {
    // HelloWorld
  },

  data() {
    return {
      alertId: 0,
      porta: [],
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
        }, 1500);
      }

    }
  },

  created() {
    for(let i = 0; i < 24; i++) {
      this.porta.push({
        ativada: true,
        loading: false,
      })
    }
  }
};
</script>

<style>
.porta {
  width: 65px;
  height: 55px;
}
</style>
