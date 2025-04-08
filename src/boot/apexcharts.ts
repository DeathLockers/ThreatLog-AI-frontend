import { defineBoot } from '#q-app/wrappers'
import VueApexCharts from "vue3-apexcharts";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/boot-files
export default defineBoot(async ({ app }) => {
  app.use(VueApexCharts)
})

