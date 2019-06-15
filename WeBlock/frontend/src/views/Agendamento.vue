<template>
  <div class="agendamento">
    <b-container class="fluid">
      <b-row align-h="justify">
        <b-card
          header="Novo agendamento"
          header-tag="header"
          header-class="bg-secondary text-light"
          class="w-100"
        > 
          <b-card-text>
            <b-row align-h="justify">
              <b-col sm="12" md="6">
                <div class="bg-secondary rounded-top">
                  <span class="text-light" >Horário fechamento</span>
                </div>
                <flat-pickr 
                  class="text-center w-100" 
                  v-model="picker0.date" 
                  :config="{
                    minDate: 'today',
                    dateFormat: 'd/m/Y H:i',
                    enableTime: true,
                    time_24hr: true,
                  }">
                  <input type="text" placeholder="Select Date.." data-input> <!-- input is mandatory -->
                </flat-pickr>
              </b-col>

              <b-col sm="12" md="6" class="mt-sm-2 mt-md-0">
                <div class="bg-secondary rounded-top">
                  <span class="text-light" >Horário abertura</span>
                </div>
                <flat-pickr 
                  class="text-center w-100" 
                  v-model="picker1.date" 
                  :config="{
                    minDate: 'today',
                    dateFormat: 'd/m/Y H:i',
                    enableTime: true,
                    time_24hr: true,
                  }">
                  <input type="text" placeholder="Select Date.." data-input> <!-- input is mandatory -->
                </flat-pickr>
              </b-col>

              <b-col sm="12" class="mt-2">
                <div class="bg-secondary rounded-top">
                  <span class="text-light" >Configuração</span>
                </div>
                <div class="border border-secondary p-1">
                  <div class="mt-1">
                    <template v-for="(item, idx) in porta">
                      <b-button squared :class="`border-0 bg-` + ((item.ativada)?'secondary':'success')" @click="acaoPorta(idx, 0)" style="width: 45px; height: 40px;"> 
                        <small> {{idx + 1}} </small>
                      </b-button>
                    </template>
                  </div>

                </div>
              </b-col>

            </b-row>

            <b-row class="mt-2">
              <b-col sm="12" md="6">
                <b-button class="w-100 btn-sm" @click="agendar()"> 
                  <b-spinner v-if="loading"  small label="Small Spinner"></b-spinner>
                  Agendar
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

export default {
  name: "agendamento",
  components: {

  },

  data() {
    return {
      loading: false,
      porta: [],
      picker0: {
        date: "",
      },

      picker1: {
        date: "",
      }
    }
  },

  computed : { 
    tpicker0 : function() {
      console.log(this.picker0.date.split(' ')[1])
      return  this.picker0.date.split(' ')[1];
    },

    dpicker0 : function() {
      console.log(this.picker0.date.split(' ')[0])
      return  this.picker0.date.split(' ')[0]
    },

    picker1Config: function() {
      return {
        minDate: this.dpicker0,
        dateFormat: 'd/m/Y H:i',
        enableTime: true,
        time_24hr: true
      }
    }
  },

  methods: {
    acaoPorta(idx, p) {
      switch(p) {
        case 0:
          this.porta[idx].ativada = !this.porta[idx].ativada;
          break;
      }
    },


    agendar() {
      this.loading = true;

      setTimeout(() => {
          let erro = false;
          if(!erro) {
            this.flashMessage.success({ title: 'Sucesso', message: 'Agendado com sucesso!'});
          } else {
            this.flashMessage.error({ title: 'Erro', message: 'Erro ao agendar'});
          }
          this.loading = false;
        }, 1000);
    }
  },


  created() {
    for(let i = 0; i < 24; i++) {
      this.porta.push({
        ativada: true,
      })
    }
  }
};
</script>
