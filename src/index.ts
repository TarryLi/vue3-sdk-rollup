import { createApp } from "vue";
import Index from "./index.vue";

export const show = (id: string) => {
  const dom= document.createElement("div");
  dom.id = 'sdk-dom';
  document.body.appendChild(dom);
  createApp(Index).mount(id || dom)
}

