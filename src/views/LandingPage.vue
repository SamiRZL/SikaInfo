<template>
    <div v-if="!this.Store.isLoading" class="home-container">
        <div class="aspects-wrapper">
            <div v-for="(aspect, index) in this.Store.aspectsList" :key="index" @click="this.pushAspectId(aspect?._id)"
                :class="{ 'aspects': true, 'active-aspect': aspect?._id === this.$route.query?.aspectId || (index == 0 && !this.$route?.query?.aspectId) }">
                {{ aspect.name }}
            </div>
        </div>
        <div class="container-documents" v-if="this.Store.documents && this.Store.documents.length > 0">
            <div v-if="$i18n.locale === 'fr'" class="nbr-aspects">
                {{ this.Store.documents.length }} <strong>{{ this.Store.documents[0]?.aspect?.name }}</strong>
            </div>
            <div v-else dir="'rtl'" class="nbr-aspects">
                {{ this.Store.documents.length }} : <strong>{{ this.Store.documents[0]?.aspect?.name }}</strong> عدد
            </div>
            <div class="category-container">
                <div v-for="(category, index) in this.Store.categoriesList" :key="index"
                    @click="navigateToDocumentPath(category?._id)" class="category">{{ category.name }}</div>
            </div>

            <div :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'" class="nbr-aspects">
                <strong>{{ this.Store?.documents[0]?.aspect?.name }}</strong> {{ $t('ajouté(e)s récemment') }} :
            </div>

            <swiper class="swiper-container" :modules="modules" :slides-per-view="4" :space-between="50" navigation
                :pagination="{ clickable: true }" :loop="true" :scrollbar="{ draggable: true }" @swiper="onSwiper"
                @slideChange="onSlideChange" :autoplay="{ delay: 2500, disableOnInteraction: true }" :speed="500">
                <swiper-slide class="swiper-slide" v-for="(document, index) in this.Store.documents.slice(-5)"
                    :key="index">
                    <DocumentComponent :document="document" />
                </swiper-slide>
            </swiper>
            <div :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'" class="nbr-aspects">
                {{ $t('Tout(e)s les') }} <strong>{{ this.Store.documents[0]?.aspect?.name }}</strong> :
            </div>

            <div class="documents-wrapper">
                <DocumentComponent v-for="(document, index) in this.Store.documents" :key="index"
                    :document="document" />
            </div>
        </div>

        <div class="not-found" v-else>
            <img src="../assets/file-document-svgrepo-com.svg" alt=""> Aucun document dans cet aspect pour le moment
        </div>
    </div>
    <div v-else class="loading-container">
        <LoaderSpinner :color="blue" />
    </div>
</template>

<script>
import DocumentComponent from "../components/Document";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useAuthStore } from "../store/index";
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
export default {
    name: 'LandingPage',
    components: {
        DocumentComponent,
        Swiper,
        SwiperSlide,
        LoaderSpinner
    },
    data() {
        return {

        };
    },

    setup() {
        const Store = useAuthStore();
        const onSwiper = (swiper) => {
            console.log(swiper);
        };
        const onSlideChange = () => {
            console.log('slide change');
        };
        return {
            onSwiper,
            onSlideChange,
            modules: [Navigation, Autoplay, Pagination, Scrollbar, A11y],
            Store
        };
    },

    methods: {
        navigateToDocumentPath(id) {
            let aspectId = this.$route?.query?.aspectId || (this.Store.aspectsList[0]?._id);
            let path = `documents/${aspectId}/${id}`;

            this.$router.push({ path });
        },
        pushAspectId(id) {
            this.$router.push({ query: { aspectId: id } });
            this.Store.fetchDocumentsByAspect(id);

        }
    },
    mounted() {
        this.Store.fetchAspectsByLanguage(this.$i18n.locale);
        this.Store.fetchCategoriesByLanguage(this.$i18n.locale);
    },

};
</script>

<style scoped>
@import 'swiper/css';
@import 'swiper/css/navigation';
@import 'swiper/css/pagination';

.home-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 9rem 5rem;
    gap: 2rem;

}

.container-documents {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.not-found {
    display: flex;
    width: 100%;
    height: 50vh;
    align-items: center;
    justify-content: center;
    padding: 9rem 5rem;
    gap: 2rem;
    font-size: 2rem;
    font-weight: 700;
    color: #8D8D8D;
}

.loading-container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.aspects-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}

.category-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* Creates 4 columns with equal width */
    gap: 10px;
    width: 80%;
    /* Adjust the gap between columns */
}

.documents-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* Creates 4 columns with equal width */
    gap: 50px;
    width: 85%;
}

.category {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
    flex-grow: 1;
    background: #f2f2f2;
    cursor: pointer;
    font-family: "Noticia Text", serif;
    font-weight: 500;
    font-style: normal;

    &:hover {
        background: #323232;
        color: #fff;
    }
}

.aspects-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* Creates 4 columns with equal width */
    gap: 10px;
    width: 80%;
    border-bottom: 1px solid #8EC8F6;
    padding-bottom: 1rem;

}

.nbr-aspects {
    font-size: 1.7rem;
    font-weight: 600;
}

.aspects {
    border: 1.5px solid #3498db;
    background: #3498db;
    color: #fff;
    padding: 0.5rem 1rem;
    flex-grow: 1;
    font-size: 1.5rem;
    font-family: "Noticia Text", serif;
    font-weight: 500;
    font-style: normal;
    border-radius: 3px;
    cursor: pointer;
    text-align: center;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, .1);


    &:hover {
        background: #f39c12;
        color: #fff;
        border: 1.5px solid #f39c12;
    }
}

strong {
    color: #3498db;
}

.active-aspect {
    background: #f39c12;
    color: #fff;
    border: 1.5px solid #f39c12;
    padding: 0.5rem 1rem;
    flex-grow: 1;
    font-size: 1.5rem;
    font-family: "Noticia Text", serif;
    font-weight: 500;
    font-style: normal;
    border-radius: 3px;
    cursor: pointer;
    text-align: center;
}

.swiper-container {
    width: 100%;
    height: 500px;
    padding: 2rem 3rem;
    background: #E6F4FE;
    border-radius: 20px;
    border: 1px solid #ACD8FC;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, .1);

}

.swiper-slide {
    width: 20%;
}
</style>