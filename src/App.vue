<template>
  <div class="container mx-auto font-mono">
    <form class="p-4" @submit.prevent="calcula(a, b)">
      <div class="flex items-center">
        <Input v-model:value.number="x5" label="x⁵ +" />
        <Input v-model:value.number="x4" label="x⁴ +" />
        <Input v-model:value.number="x3" label="x³ +" />
        <Input v-model:value.number="x2" label="x² +" />
        <Input v-model:value.number="x1" label="x +" />
        <Input v-model:value.number="x" label="" />
      </div>
      <div class="flex items-center mt-6">
        <Input v-model:value.number="a" label="X inicial (A)" />
        <Input v-model:value.number="b" label="X inicial (B)" />
        <Input v-model:value.number="epsilon" label="Precisão (ε)" />
      </div>
      <button
        type="submit"
        class="
          mt-6
          text-base
          font-medium
          rounded-lg
          px-4
          py-2
          bg-red-500
          text-white
        "
      >
        Calcular
      </button>
    </form>

    <table class="table-auto">
      <thead>
        <tr>
          <th>XA</th>
          <th>F( XA )</th>
          <th>XB</th>
          <th>F( XB )</th>
          <th>XN</th>
          <th>F( XN )</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ite, index) in iteracoes" :key="index">
          <td>{{ ite.xA }}</td>
          <td>{{ ite.fdeA }}</td>
          <td>{{ ite.xB }}</td>
          <td>{{ ite.fdeB }}</td>
          <td>{{ ite.xN }}</td>
          <td>{{ ite.fdeX }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import Input from "./components/Input.vue";
import { ref, reactive } from "vue";

const x5 = ref(1);
const x4 = ref(1);
const x3 = ref(1);
const x2 = ref(1);
const x1 = ref(1);
const x = ref(1);
const epsilon = ref(0.01);
const a = ref(0);
const b = ref(1);

const iteracoes = reactive([]);

function calculaFuncao(valor) {
  return Math.pow(valor, 3) - 9 * valor + 3;
  // return (
  //   x5 * Math.pow(valor, 5) +
  //   x4 * Math.pow(valor, 4) +
  //   x3 * Math.pow(valor, 3) +
  //   x2 * Math.pow(valor, 2) +
  //   x1 * valor +
  //   x
  // );
}

function calcula(xA, xB) {
  let xN = (xA + xB) / 2;
  let parada = Math.abs((xB - xA) / 2);
  let fdeA = calculaFuncao(xA);
  let fdeB = calculaFuncao(xB);
  let fdeX = calculaFuncao(xN);

  if (parada < epsilon.value) {
    iteracoes.push({ xA, fdeA, xB, fdeB, xN, fdeX });
    return iteracoes;
  }

  iteracoes.push({ xA, fdeA, xB, fdeB, xN, fdeX });

  if (fdeX < 0) {
    xB = xN;
    calcula(xA, xB);
  } else {
    xA = xN;
    calcula(xA, xB);
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  background-color: rgba(107, 114, 128, 1);
}
</style>
