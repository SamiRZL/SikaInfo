<template>
  <div class="pdf-container">
    <VuePdfEmbed :source="pdfUrl" :height="270" :width="auto" :page="1" class="pdf-viewer" />
    <div class="separator"></div>
    <div :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'" class="info-document">
      <span class="category">{{ document.category.name }}</span>
      <span @click="this.Store.source = 'document'; this.Store.openNewWindow(document.pdf)" class="title">{{
      document.title
    }}</span>
    </div>
  </div>
</template>

<script>
import VuePdfEmbed from 'vue-pdf-embed'
import { useAuthStore } from "../store/index";

// essential styles
import 'vue-pdf-embed/dist/style/index.css'

// optional styles
import 'vue-pdf-embed/dist/style/annotationLayer.css'
import 'vue-pdf-embed/dist/style/textLayer.css'

export default {
  name: 'DocumentComponent',
  components: {
    VuePdfEmbed,
  },
  props: ['document'],
  data() {
    return {
      pdfUrl: `https://sika-info-server.vercel.app/${this.document.pdf}`,
    };
  },
  setup() {
    const Store = useAuthStore();
    return {
      Store
    };
  },
  methods: {

  }
}
</script>

<style scoped>
.pdf-container {
  display: flex;
  width: 230px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: auto;
  position: relative;
  border: 1px solid #ccc;
  padding: 0.6rem 0.6rem 1.5rem 0.6rem;
  gap: 1rem;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, .1);
  border-radius: 10px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &&:hover {
    transform: scale(1.05);
    /* Adjust the scale factor as needed */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
}

.transparent {
  position: absolute;
  width: 100%;
  height: 70%;
  top: 0;
}

.pdf-viewer {
  width: auto;
  border: 2px solid rgb(50, 54, 57);
  /* Set your desired border style, color, and width */
}

.separator {
  width: 100%;
  height: 1px;
  background: #ccc;
}

.info-document {
  width: 100%;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: start;
  gap: 5px;
  height: 100px;
  margin-top: -10px;
}

.category {
  color: #3498db;
  font-weight: 600;
}

.title {
  cursor: pointer;
  font-weight: 700;

  &:hover {
    text-decoration: underline;
    color: #3498db;
  }
}
</style>
