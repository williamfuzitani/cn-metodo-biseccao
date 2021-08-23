<template>
  <div class="container h-full mx-auto font-mono">
    <form class="p-4" @submit.prevent="calcula(a, b, 1)">
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
      <div class="mt-6">
        <span
          class="
            mt-6
            text-base
            font-medium
            rounded-lg
            px-4
            py-2
            bg-blue-500
            text-white
          "
        >
          Resultado: {{ resultado?.xN ? resultado?.xN : "" }}
        </span>
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

    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table class="table-auto min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="
                px-6
                py-3
                text-left text-xs
                font-medium
                text-gray-500
                uppercase
                tracking-wider
              "
            >
              Iteração
            </th>
            <th
              class="
                px-6
                py-3
                text-left text-xs
                font-medium
                text-gray-500
                uppercase
                tracking-wider
              "
            >
              XA
            </th>
            <th
              class="
                px-6
                py-3
                text-left text-xs
                font-medium
                text-gray-500
                uppercase
                tracking-wider
              "
            >
              F( XA )
            </th>
            <th
              class="
                px-6
                py-3
                text-left text-xs
                font-medium
                text-gray-500
                uppercase
                tracking-wider
              "
            >
              XB
            </th>
            <th
              class="
                px-6
                py-3
                text-left text-xs
                font-medium
                text-gray-500
                uppercase
                tracking-wider
              "
            >
              F( XB )
            </th>
            <th
              class="
                px-6
                py-3
                text-left text-xs
                font-medium
                text-gray-500
                uppercase
                tracking-wider
              "
            >
              XN
            </th>
            <th
              class="
                px-6
                py-3
                text-left text-xs
                font-medium
                text-gray-500
                uppercase
                tracking-wider
              "
            >
              F( XN )
            </th>
            <th
              class="
                px-6
                py-3
                text-left text-xs
                font-medium
                text-gray-500
                uppercase
                tracking-wider
              "
            >
              Erro
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(ite, index) in iteracoes" :key="index">
            <td class="px-6 py-4 whitespace-nowrap">{{ ite.iteracao }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ ite.xA }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ ite.fdeA }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ ite.xB }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ ite.fdeB }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ ite.xN }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ ite.fdeX }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ ite.erro }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import Input from "./components/Input.vue";
import { ref, reactive, computed } from "vue";

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

const resultado = computed(() => {
  let [iteracao] = iteracoes.slice(-1);
  return iteracao;
});

function calculaFuncao(valor) {
  // return Math.pow(valor, 3) - 9 * valor + 3;
  return (
    x5.value * Math.pow(valor, 5) +
    x4.value * Math.pow(valor, 4) +
    x3.value * Math.pow(valor, 3) +
    x2.value * Math.pow(valor, 2) +
    x1.value * valor +
    x.value
  );
}

function calcula(xA, xB, iteracao) {
  let contador = iteracao;
  let erro = "-";
  let xN = (xA + xB) / 2;
  let parada = Math.abs((xB - xA) / 2);
  let fdeA = calculaFuncao(xA);
  let fdeB = calculaFuncao(xB);
  let fdeX = calculaFuncao(xN);

  if (contador != 1) {
    erro = xB - xA;
  }

  if (parada < epsilon.value) {
    iteracoes.push({ iteracao: contador, xA, fdeA, xB, fdeB, xN, fdeX, erro });
    return iteracoes;
  }

  iteracoes.push({ iteracao: contador, xA, fdeA, xB, fdeB, xN, fdeX, erro });

  contador += 1;

  if (fdeX < 0) {
    xB = xN;
    calcula(xA, xB, contador);
  } else {
    xA = xN;
    calcula(xA, xB, contador);
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
