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
                    <b-card
                      header="Inicio"
                      header-tag="header"
                      header-class="bg-secondary text-light"
                      class="w-100"
                    > 
                      <b-card-text>
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

                        <div class="mt-1">
                          <template v-for="(item, idx) in porta0">
                            <b-button squared :class="`bg-` +((item.ativada)?'success':'danger')" @click="acaoPorta(idx, 0)" style="width: 45px; height: 40px;"> 
                              <small> {{idx + 1}} </small>
                            </b-button>
                          </template>
                        </div>
                      </b-card-text>
                    </b-card>
                  </b-col>


                  <b-col sm="12" md="6">
                    <b-card
                      header="Fim"
                      header-tag="header"
                      header-class="bg-secondary text-light"
                      class="w-100"
                    > 
                      <b-card-text>
                        <flat-pickr 
                          class="text-center w-100" 
                          v-model="picker1.date" 
                          :config="picker1Config">
                          <input type="text" placeholder="Select Date.." data-input> <!-- input is mandatory -->
                        </flat-pickr>

                        <div class="mt-1">
                          <template v-for="(item, idx) in porta1">
                            <b-button squared :class="`bg-` +((item.ativada)?'success':'danger')" @click="acaoPorta(idx, 1)" style="width: 45px; height: 40px;"> 
                              <small> {{idx + 1}} </small>
                            </b-button>
                          </template>
                        </div>
                      </b-card-text>
                    </b-card>
                  </b-col>
                </b-row>

                <b-row class="mt-2">
                  <b-col sm="12" md="6" offset-md="6">
                    <b-button class="w-100"> 
                      Agendar
                    </b-button>
                  </b-col>
                </b-row>


              </b-card-text>
            </b-card>

            <b-card
              header="Lista Agendamentos"
              header-tag="header"
              header-class="bg-secondary text-light"
              class="w-100 mt-4"
            > 
              <b-card-text>

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
      porta0: [],
      porta1: [],

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
          this.porta0[idx].ativada = !this.porta0[idx].ativada;
          break;

        case 1:
          this.porta1[idx].ativada = !this.porta1[idx].ativada;
          break;
      }
    }
  },


  created() {
    for(let i = 0; i < 24; i++) {
      this.porta0.push({
        ativada: false,
      });

      this.porta1.push({
        ativada: true,
      })
    }
  }
};
</script>
