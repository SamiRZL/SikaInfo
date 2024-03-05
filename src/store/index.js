import { defineStore } from 'pinia';
import axios from 'axios';



export const useAuthStore = defineStore('auth', {
    state: () => ({
        categoriesList: [],
        aspectsList: [],
        documents: [],
        AllDocuments: [],
        language: localStorage.getItem('language') || 'fr',
        isLoading: true,
    }),

    getters: {

    },

    actions: {

        fetchDocumentsByAspect(id) {
            this.isLoading = true;
            axios.get(`http://localhost:3000/documents/aspect/${id}`)
                .then((response) => {
                    this.documents = response.data.data
                    console.log("documents", this.documents);
                    this.isLoading = false;
                })
                .catch((error) => { console.error(error); this.isLoading = false; });
        },
        async fetchAspectsByLanguage(language) {
            try {

                const response = await axios.get(`http://localhost:3000/aspects/all-aspects/${language}`);
                this.aspectsList = response.data.aspects;

                const aspectId = this.$route?.query?.aspectId;

                if (aspectId !== undefined && aspectId !== null && aspectId !== "") {
                    this.fetchDocumentsByAspect(aspectId);
                } else {


                    const defaultAspectId = this.aspectsList[0]?._id;

                    if (defaultAspectId) {

                        await this.fetchDocumentsByAspect(defaultAspectId);
                    } else {
                        console.error("No default aspectId found.");
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },

        fetchDocuments(lang) {
            axios.get(`http://localhost:3000/documents/all-documents/${lang}`)
                .then((response) => { this.AllDocuments = response.data.data; console.log("documents ------------", this.documents) })
                .catch((error) => console.error(error));
        },

        fetchDocumentsByAspectAndCategory(aspectId, categoryId) {
            this.isLoading = true;
            axios.get(`http://localhost:3000/documents/aspect/${aspectId}/category/${categoryId}`)
                .then((response) => {
                    this.documents = response.data.data
                    console.log("documents", this.documents);
                    this.isLoading = false;
                })
                .catch((error) => { console.error(error); this.isLoading = false; });
        },
        fetchCategoriesByLanguage(language) {
            axios.get(`http://localhost:3000/categories/all-categories/${language}`)
                .then((response) => {
                    this.categoriesList = response.data.categories;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        setLanguage(language) {
            this.language = language;
            localStorage.setItem('language', language); // Save the language to localStorage
        },

    },
});