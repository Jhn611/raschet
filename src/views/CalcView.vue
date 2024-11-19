<template>
      <div class="card card__xl">
        <h2>{{ calc_info.name }}</h2>
        <div class="card__main card__main__xl">
          <div class="card__main__inputs card__main__inputs__xl">
            <label class="input">
              <input
                v-model="calc_info.inp1"
                class="input__field"
                type="number"
                placeholder=" "
              />
              <span class="input__label">{{ calc_info.text1 }}</span>
              <img
                @click="clear('inp1')"
                class="input__img"
                src="../imgs/close.png"
                alt=""
              />
            </label>
  
            <label class="input">
              <input
                v-model="calc_info.inp2"
                class="input__field"
                type="number"
                placeholder=" "
              />
              <span class="input__label">{{ calc_info.text2 }}</span>
              <img
                @click="clear('inp2')"
                class="input__img"
                src="../imgs/close.png"
                alt=""
              />
            </label>

            <label class="input">
              <input
                v-model="calc_info.inp3"
                class="input__field"
                type="number"
                placeholder=" "
              />
              <span class="input__label">{{ calc_info.text3 }}</span>
              <img
                @click="clear('inp3')"
                class="input__img"
                src="../imgs/close.png"
                alt=""
              />
            </label>

            <label class="input">
              <input
                v-model="calc_info.inp4"
                class="input__field input__date"
                type="date"
                placeholder=" "
              />
              <span class="input__label">{{ calc_info.text4 }}</span>
              <img
                @click="clear('inp4')"
                class="input__img"
                src="../imgs/close.png"
                alt=""
              />
            </label>

            <label class="input">
              <input
                v-model="calc_info.inp5"
                class="input__field input__date"
                type="date"
                placeholder=" "
              />
              <span class="input__label">{{ calc_info.text5 }}</span>
              <img
                @click="clear('inp5')"
                class="input__img"
                src="../imgs/close.png"
                alt=""
              />
            </label>

            <label class="input">
              <input
                v-model="calc_info.inp6"
                class="input__field"
                type="number"
                placeholder=" "
              />
              <span class="input__label">{{ calc_info.text6 }}</span>
              <img
                @click="clear('inp6')"
                class="input__img"
                src="../imgs/close.png"
                alt=""
              />
            </label>
          </div>
          <div class="card__main__results">
            <p
              :class="{
                copy_animate_on: copy_flag ,
                copy_animate_off: copy_flag,
              }"
              class="copy_alert"
            >
              Скопированно!
            </p>
            <h3>годовая доходность:</h3>
            <div class="result_container">
              <p
                @click="copy(calc)"
                class="copyed_text"
              >
                {{ calc }}%
              </p>
            </div>
            <p class="note">нажмите на цифру чтобы скопировать</p>
          </div>
        </div>
        <p class="card__info">{{ calc_info.info }}</p>
      </div>
  </template>
  
  <script>
  import { useCookies } from "vue3-cookies";
  import { calculation_bonds } from "../EconomicCalcs.js";
  
  export default {
    setup() {
      const { cookies } = useCookies();
      return { cookies };
    },
    data() {
      return {
        copy_flag: false,
        calc_info:
          {
            name: "Калькулятор доходности облигаций",
            text1: "Номинал",
            text2: "Размер купона",
            text3: "Период купона",
            text4: "Дата погашения (или оферты)",
            text5: "Дата покупки", 
            text6: "Цена покупки",
            info: "",
            id: "first",
            inp1: "",
            inp2: "",
            inp3: "",
            inp4: "",
            inp5: "",
            inp6: "",
            func: "persent",
          }
      };
    },
    computed:{
      calc(){
        return calculation_bonds(this.calc_info.inp1, this.calc_info.inp2, this.calc_info.inp3, this.calc_info.inp4, this.calc_info.inp5, this.calc_info.inp6);
      }
    },
    methods: {
      clear(val) {
        switch (val) {
        case "inp1":
            this.calc_info.inp1 = "";
            break;
        case "inp2":
            this.calc_info.inp2 = "";
            break;
        case "inp3":
            this.calc_info.inp3 = "";
            break;
        case "inp4":
            this.calc_info.inp4 = "";
            break;
        case "inp5":
            calc_info.inp5 = "";
            break;
        case "inp6":
            this.calc_info.inp6 = "";
            break;
        default:
            console.error("Invalid input identifier:", val);
    }
      },
      copy(val) {
        navigator.clipboard.writeText(val);
        this.copy_flag = true;
        setTimeout(() => {
          this.copy_flag = false;
        }, 2500);
      },
    },
    mounted() {
        const inp1 = localStorage.getItem(`inp1`);
        if(inp1 != null){
          this.calc_info.inp1 = inp1;
        }
        const inp2 = localStorage.getItem(`inp2`);
        if(inp2 != null){
          this.calc_info.inp2 = inp2;
        }
        const inp3 = localStorage.getItem(`inp3`);
        if(inp3 != null){
          this.calc_info.inp3 = inp3;
        }
        const inp4 = localStorage.getItem(`inp4`);
        if(inp4 != null){
          this.calc_info.inp4 = inp4;
        }
        const inp5 = localStorage.getItem(`inp5`);
        if(inp5 != null){
          this.calc_info.inp5 = inp5;
        }
        const inp6 = localStorage.getItem(`inp6`);
        if(inp6 != null){
          this.calc_info.inp6 = inp6;
        }
      
    },
  
    watch: {
      calc_info: {
      handler(newVal, oldVal) {
        localStorage.setItem(`inp1`, newVal.inp1);
        localStorage.setItem(`inp2`, newVal.inp2);
        localStorage.setItem(`inp3`, newVal.inp3);
        localStorage.setItem(`inp4`, newVal.inp4);
        localStorage.setItem(`inp5`, newVal.inp5);
        localStorage.setItem(`inp6`, newVal.inp6);
      },
      deep: true,
    },
    }
  };
  </script>
  
  <style src="../main.css"></style>
  