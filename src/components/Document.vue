<template>
  <div class="pdf-container">
    <div class="transparent"></div>
    <iframe class="pdf-iframe" :src="`https://sika-info-server.vercel.app/${this.document.pdf}#toolbar=0&view=FitH`"
      frameborder="0" scrolling="no"></iframe>
    <div class="separator"></div>
    <div :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'" class="info-document">
      <span class="category">{{ this.document.category.name }}</span>
      <span @click="openNewWindow(this.document.pdf)" class="title">{{
      this.document.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocumentComponent',
  props: ['document'],
  data() {
    return {
    };
  },
  methods: {
    openNewWindow(pdf) {
      const fullPath = `https://sika-info-server.vercel.app/${pdf}`;

      // Open the URL in a new window
      window.open(fullPath, '_blank');
    }
  }
};
</script>

<style scoped>
.pdf-container {
  display: flex;
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
  top: 0
}

.pdf-iframe {
  width: 100% !important;
  height: 240px !important;
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
  overflow: wrap;

  &:hover {
    text-decoration: underline;
    color: #3498db;
  }
}
</style>
