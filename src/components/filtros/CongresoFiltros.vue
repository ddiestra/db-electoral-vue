<template>
  <div>
    <v-row class="decidebien-region" :class="`region_${currentRegion.codigo}`">
      <v-col cols="12">
        <div class="intro">
          <div>
            <img class="logo" src="../../assets/logo.png" />
          </div>
          <h1>Decide Bien: en</h1>
          <div class="region-selected">
            {{ currentRegion.region }}
          </div>
          <div class="curul-selected">
            Se eligiran {{ currentRegion.curul }} congresistas
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-flex md4 class="mb-2">
        <v-card class="pa-2 mx-2 grey lighten-4" shaped>
          <v-select
            :items="regiones"
            item-text="region"
            item-value="codigo"
            label="Elije tu departamento:"
            v-model="currentRegion"
            prepend-icon="mdi-map"
            color="secondary"
            :return-object="true"
            v-on:change="updateURLParams"
          ></v-select>
          <v-layout text-xs-center align-center justify-center>
            <v-fab-transition>
              <v-btn
                v-show="
                  $vuetify.breakpoint.xsOnly && $route.path.includes('congreso')
                "
                @click="drawerRight = !drawerRight"
                color="red darken-4"
                dark
              >
                <span class="white--text pl-2">Filtra Aquí</span
                ><v-icon>mdi-filter</v-icon>
              </v-btn>
            </v-fab-transition>
          </v-layout>
          <v-layout text-xs-center align-center justify-center>
            <v-fab-transition>
              <v-btn
                @click="onNoFiltrosClicked()"
                class="ma-2"
                tile
                outlined
                color="blue-grey"
                v-show="noFiltrosUsed()"
              >
                <v-icon left>mdi-map-marker-off</v-icon>Quitar Filtros
              </v-btn>
            </v-fab-transition>
          </v-layout>

          <!-- Container para el boton de Twitter -->
          <div class="fixedHeight">
            <div ref="container"></div>
          </div>

          <v-divider v-show="!$vuetify.breakpoint.xsOnly" />
          <v-chip
            v-if="f1"
            class="ma-2"
            close
            @click:close="
              f1 = false;
              updateURLQuery();
            "
          >
            <v-icon left>mdi-alert</v-icon>Sentencias
          </v-chip>
          <v-chip
            v-if="f2"
            class="ma-2"
            close
            @click:close="
              f2 = false;
              updateURLQuery();
            "
          >
            <v-icon left>mdi-alert</v-icon>Vacancia
          </v-chip>
          <v-chip
            v-if="f3"
            class="ma-2"
            close
            @click:close="
              f3 = false;
              updateURLQuery();
            "
          >
            <v-icon left>mdi-alert</v-icon>Paridad
          </v-chip>
          <v-chip
            v-if="f4"
            class="ma-2"
            close
            @click:close="
              f4 = false;
              updateURLQuery();
            "
          >
            <v-icon left>mdi-alert</v-icon>Militantes
          </v-chip>
          <v-chip
            v-if="f5"
            class="ma-2"
            close
            @click:close="
              f5 = false;
              updateURLQuery();
            "
          >
            <v-icon left>mdi-alert</v-icon>DemoInterna
          </v-chip>
          <v-divider v-show="!$vuetify.breakpoint.xsOnly" />
          <h3
            class="subheading font-weight-regular mb-2 mt2"
            v-show="!$vuetify.breakpoint.xsOnly"
          >
            ¿Qué filtros deseas aplicar?
            <a
              href="https://github.com/DecideBienpe/db-electoral-vue/blob/main/README.md"
              >info</a
            >
          </h3>
          <!-- TODO -->
          <v-expansion-panels
            v-bind:disabled="!noRegionSelected"
            v-show="!$vuetify.breakpoint.xsOnly || drawerRight"
          >
            <v-expansion-panel>
              <v-expansion-panel-header
                >Descartar listas que lleven candidatos con
                sentencias</v-expansion-panel-header
              >
              <v-expansion-panel-content>
                <v-row>
                  <v-col>
                    <v-checkbox
                      v-model="f1"
                      @change="updateURLQuery()"
                      color="info"
                      :label="`Descartar listas con sentenciados`"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Filtro-Vacancia:
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>
                    <v-checkbox
                      v-model="f2"
                      @change="updateURLQuery()"
                      color="info"
                      :label="
                        `Descartar partidos que votaron por la vacancia (Noviembre 2019)`
                      "
                    ></v-checkbox>
                    <small
                      >Partidos donde la mayoría de su bancada voto por la
                      vacancia</small
                    >
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header
                >Filtro: participacion mujer
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>
                    <v-checkbox
                      v-model="f3"
                      @change="updateURLQuery()"
                      color="info"
                      :label="
                        `Descartar listas cuya cabeza de lista NO es mujer`
                      "
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header
                >Descartar listas que NO promuevan democracia
                interna</v-expansion-panel-header
              >
              <v-expansion-panel-content>
                <v-row>
                  <v-col>
                    <v-checkbox
                      v-model="f4"
                      @change="updateURLQuery()"
                      color="info"
                      :label="
                        `Descartar listas donde el número 1 no fue electo en democracia interna`
                      "
                    ></v-checkbox>
                    <v-checkbox
                      v-model="f5"
                      @change="updateURLQuery()"
                      color="info"
                      :label="
                        `Descartar listas cuyas elecciones internas fueron por delegados`
                      "
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-flex>
      <!-- TODO -->
      <v-flex md8>
        <transition name="fade" appear>
          <resultados
            :current-region="currentRegion"
            :data-table1="filtroTabla1"
            :data-table2="filtroTabla2"
          ></resultados>
        </transition>
      </v-flex>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import Resultados from "../../components/Resultados.vue";
import Twitter from "../../components/Twitter.vue";
import Vue from "vue";
import { EventBus } from "../../eventbus";
import FiltroMixin from "../../mixins/FiltroMixin";

export default {
  name: "congresoFiltros",
  components: {
    Resultados
  },
  mixins: [FiltroMixin],
  // TODO: cambiar el nombre de checkbox a algo mas chico para que el url sea mas corto
  // envolverlos en un objecto, por ex: checkboxes: {}
  data() {
    return {
      drawerRight: false,
      dialog: false,
      currentRegion: {
        default: {}
      }
    };
  },
  computed: {
    f1: {
      get() {
        return this.$store.state.filtros.f1;
      },
      set(value) {
        this.$store.commit("updateFiltro1", value);
      }
    },
    f2: {
      get() {
        return this.$store.state.filtros.f2;
      },
      set(value) {
        this.$store.commit("updateFiltro2", value);
      }
    },
    f3: {
      get() {
        return this.$store.state.filtros.f3;
      },
      set(value) {
        this.$store.commit("updateFiltro3", value);
      }
    },
    f4: {
      get() {
        return this.$store.state.filtros.f4;
      },
      set(value) {
        this.$store.commit("updateFiltro4", value);
      }
    },
    f5: {
      get() {
        return this.$store.state.filtros.f5;
      },
      set(value) {
        this.$store.commit("updateFiltro5", value);
      }
    },
    noRegionSelected() {
      return !!this.currentRegion.region;
    },
    regiones() {
      return this.$store.state.regiones;
    },
    listas() {
      return this.$store.state.listas;
    },
    filtroTabla1() {
      return this.uniqueFilter(
        this.listas
          .filter(this.regionFilter)
          .filter(this.sentencia1Filter)
          .filter(this.sentencia2Filter)
          .filter(this.genero1Filter)
          .filter(this.militantesFilter)
          .filter(this.agendaFilter),
        "Partido"
      );
    },
    filtroTabla2() {
      return this.listas
        .filter(this.regionFilter)
        .filter(this.sentencia1Filter)
        .filter(this.sentencia2Filter)
        .filter(this.genero1Filter)
        .filter(this.militantesFilter)
        .filter(this.agendaFilter);
    }
  },
  methods: {
    filterButtonClicked() {
      EventBus.$emit("button-clicked");
    },
    reAttachTwitterButton() {
      if (window.twttr) {
        var first =
          this.$refs &&
          this.$refs.container &&
          this.$refs.container.children &&
          this.$refs.container.children[0];

        var ComponentClass = Vue.extend(Twitter);
        var instance = new ComponentClass({
          propsData: { type: "primary" }
        });
        instance.$mount(); // pass nothing

        if (!first) {
          this.$refs &&
            this.$refs.container &&
            this.$refs.container.appendChild(instance.$el);
        } else {
          this.$refs &&
            this.$refs.container &&
            this.$refs.container.replaceChild(instance.$el, first);
        }

        if (window.twttr.widgets) {
          window.twttr.widgets.load();
        }
      }
    },
    onNoFiltrosClicked() {
      if (
        this.f1 == false &&
        this.f2 == false &&
        this.f3 == false &&
        this.f4 == false &&
        this.f5 == false
      ) {
        return;
      } else {
        this.f1 = false;
        this.f2 = false;
        this.f3 = false;
        this.f4 = false;
        this.f5 = false;
        this.updateURLQuery();
      }
    },
    noFiltrosUsed() {
      return this.f1 || this.f2 || this.f3 || this.f4 || this.f5;
    },
    // Este metodo actualiza el url cuando los checkboxes cambian
    updateURLQuery() {
      if (
        this.f1 === true ||
        this.f1 === false ||
        this.f2 === true ||
        this.f2 === false ||
        this.f3 === true ||
        this.f3 === false ||
        this.f4 === true ||
        this.f4 === false ||
        this.f5 === true
      ) {
        // TODO: refactorizar para evitar el error. Baja prioridad.
        // .push bota un error en el console cuando se trata ir al mismo route existente,
        this.$router
          .push({
            name: "congreso",
            params: {
              departamento: this.currentRegion.region
            },
            query: {
              f1: this.f1,
              f2: this.f2,
              f3: this.f3,
              f4: this.f4,
              f5: this.f5,
              favs: this.$route.query.favs,
              candidatos: this.$route.query.candidatos,
              stepper: this.$route.query.stepper
            }
          })
          .catch(err => {
            throw new Error(`Problem handling something: ${err}.`);
          });
      }
      this.sendToGA();
      this.reAttachTwitterButton();
    },
    // Este metodo actualiza el url cuando el departamento selecionado cambia
    updateURLParams() {
      if (this.currentRegion.region) {
        this.$router.push({
          name: "congreso",
          params: { departamento: this.currentRegion.region },
          query: {
            f1: this.f1,
            f2: this.f2,
            f3: this.f3,
            f4: this.f4,
            f5: this.f5,
            favs: this.$route.query.favs,
            candidatos: this.$route.query.candidatos
          }
        });
      }
      this.sendToGA();
      this.reAttachTwitterButton();
    },
    // Este metodo recibe un route (url) y parsea sus params y query
    // Usamos esto para poder compartir 'resultados' usando el url
    restoreTablesValues() {
      const urlDepto = this.$route.params.departamento;
      const queryParams = this.$route.query;

      if (urlDepto) {
        const newDefault = this.regiones.filter(
          region => region.region == urlDepto
        );

        if (newDefault && newDefault[0].region) {
          this.currentRegion = newDefault[0];
          this.f1 = queryParams.f1.toString() === "true";
          this.f2 = queryParams.f2.toString() === "true";
          this.f3 = queryParams.f3.toString() === "true";
          this.f4 = queryParams.f4.toString() === "true";
          this.f5 = queryParams.f5.toString() === "true";
          this.sendToGA();
          this.reAttachTwitterButton();
        }
      }
    },
    // Mandar la pagina visitada a Google Analytics como un custom event
    sendToGA() {
      window.gtag("event", "region_" + this.currentRegion.region, {
        url: this.$route.fullPath
      });
    }
  },
  mounted() {
    //listening for the custom event
    EventBus.$on("filter-change", () => {
      this.updateURLQuery();
    });
    // TODO: Discutir que tiene mas sentido, elegir un dpto por default o no:
    // Si seleccionamos una region automaticamente, los analytics reportaran esa region mucho mas que las demas
    // LLamada al API para tener las regiones, actualizar el store y luego restaurar la tabla de filtros.
    // Problema original es que esta funcion se llama antes que el store termine de conseguir la data de los partidos.
    // TODO: quizas hay manera de remover esta llamada.
    axios
      .get(
        "https://us-central1-zettai-tools.cloudfunctions.net/decidebien-api/regiones"
      )
      .then(response => {
        this.$store.commit("SET_REGIONES", response.data);
        this.restoreTablesValues();
      });
  }
};
</script>

<style scoped>
.fixedHeight {
  height: 75px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
