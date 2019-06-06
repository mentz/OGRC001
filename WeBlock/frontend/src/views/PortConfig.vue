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
                <div class="border border-secondary">
                  #{{idx + 1}}
                </div>
                <div class="porta">
                  <b-button squared @click="acaoPorta(idx)" class="w-100 h-100"> 
                    <div v-if="item.loading" class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                    <font-awesome-icon v-else-if="item.ativada" icon="ethernet" :style="{ color: 'white' }"/> 
                    <font-awesome-icon v-else icon="ethernet" :style="{ color: 'black' }"/> 
                  </b-button>
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
      porta: [],
    }
  },

  methods: {
    acaoPorta(idx) {
      this.porta[idx].loading = true;
      
      setTimeout(() => {
        this.porta[idx].ativada = !this.porta[idx].ativada;
        this.porta[idx].loading = false;
      }, 1000);

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
  width: 60px;
  height: 50px;
}
</style>
