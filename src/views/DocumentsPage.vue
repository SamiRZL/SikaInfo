<template>
    <div class="home-container">

        <div class="aspects-wrapper">
            <div v-for="(aspect, index) in this.Store.aspectsList" :key="index" @click="pushAspectId(aspect?._id)"
                :class="{ 'aspects': true, 'active-aspect': aspect?._id === this.$route?.params?.aspect || (index == 0 && !this.$route?.params?.aspect) }">
                {{ aspect.name }}
            </div>
        </div>

        <div class="container-documents" v-if="this.Store.documents && this.Store.documents.length > 0">
            <div v-if="$i18n.locale === 'fr'" class="nbr-aspects">
                {{ this.Store.documents?.length }} <strong>{{ this.Store.documents[0]?.category?.name }}</strong> {{
                $t("en")
            }}
                <strong>{{
                    this.Store.documents[0]?.aspect?.name }}</strong>
            </div>
            <div v-else class="nbr-aspects">
                {{ this.Store.documents?.length }} :
                <strong>{{
                this.Store.documents[0]?.aspect?.name }}</strong> في <strong>{{
                this.Store.documents[0]?.category?.name
            }}</strong> عدد
            </div>


            <div :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'" class="nbr-aspects">
                <strong>{{ this.Store.documents[0]?.category?.name }}</strong> {{ $t("en") }} <strong>{{
                this.Store.documents[0]?.aspect?.name
            }}</strong> {{ $t('ajouté(e)s récemment') }} :
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
                {{ $t('Tout(e)s les') }} <strong>{{ this.Store.documents[0]?.aspect?.name }}</strong> {{ $t("en") }}
                <strong>{{
                this.Store.documents[0]?.category?.name }}</strong> :
            </div>
            <div class="documents-wrapper">
                <DocumentComponent v-for="(document, index) in this.Store.documents" :key="index"
                    :document="document" />
            </div>
        </div>
        <div class="not-found" v-else>
            <img src="../assets/file-document-svgrepo-com.svg" alt=""> Aucun document dans cette catégorie pour le
            moment
        </div>

    </div>
</template>

<script>
import DocumentComponent from "../components/Document";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useAuthStore } from "../store/index";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
export default {
    name: 'LandingPage',
    components: {
        DocumentComponent,
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            documents: [],
            aspects: [],
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
        pushAspectId(id) {
            this.$router.push({ path: '/', query: { aspectId: id } })

        }
    },
    mounted() {
        //this.Store.fetchAspectsByLanguage(this.Store.language);
        this.Store.fetchDocumentsByAspectAndCategory(this.$route?.params?.aspect, this.$route?.params?.category);
        this.Store.fetchAspectsByLanguage(this.$i18n.locale);



    }
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
    font-family: "Open Sans", serif;
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
    font-family: "Open Sans", serif;
    font-weight: 500;
    font-style: normal;
    border-radius: 3px;
    cursor: pointer;
    text-align: center;

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
    font-family: "Open Sans", serif;
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