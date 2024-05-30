import { defineStore } from 'pinia';
import axios from 'axios';



export const useAuthStore = defineStore('auth', {
    state: () => ({
        categoriesList: [],
        aspectsList: [],
        documents: [],
        firstname: '',
        lastname: '',
        AllDocuments: [],
        source: '',
        language: localStorage.getItem('language') || 'fr',
        isLoading: true,
        isLogged: null,
        isOpenLogin: false,
        pdf: ''
    }),

    getters: {

    },

    actions: {
        openNewWindow(pdf) {
            this.pdf = pdf;
            if (this.isLogged) {
                this.isOpenLogin = false;
                const fullPath = `https://sika-info-server.vercel.app/${pdf}`;
                window.open(fullPath, '_blank');
            } else {
                this.isOpenLogin = true;
            }
        },
        getUser() {
            axios.get(`https://sika-info-server.vercel.app/users/loggedUser`, { withCredentials: true })
                .then((response) => {
                    console.log("user fetched", response.data);
                    this.isLogged = response.data.isLoggedIn;
                    this.firstname = response.data.user.firstname;
                    this.lastname = response.data.user.lastname;
                })
                .catch((error) => { console.log("error logging user", error); })
        },
        fetchDocumentsByAspect(id) {
            this.isLoading = true;
            axios.get(`https://sika-info-server.vercel.app/documents/aspect/${id}`)
                .then((response) => {
                    this.documents = response.data.data
                    console.log("documents", this.documents);
                    this.isLoading = false;
                })
                .catch((error) => { console.error(error); this.isLoading = false; });
        },
        async fetchAspectsByLanguage(language) {
            try {

                const response = await axios.get(`https://sika-info-server.vercel.app/aspects/all-aspects/${language}`);
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
            axios.get(`https://sika-info-server.vercel.app/documents/all-documents/${lang}`)
                .then((response) => { this.AllDocuments = response.data.data; console.log("documents ------------", this.documents) })
                .catch((error) => console.error(error));
        },

        fetchDocumentsByAspectAndCategory(aspectId, categoryId) {
            this.isLoading = true;
            axios.get(`https://sika-info-server.vercel.app/documents/aspect/${aspectId}/category/${categoryId}`)
                .then((response) => {
                    this.documents = response.data.data
                    console.log("documents", this.documents);
                    this.isLoading = false;
                })
                .catch((error) => { console.error(error); this.isLoading = false; });
        },
        fetchCategoriesByLanguage(language) {
            axios.get(`https://sika-info-server.vercel.app/categories/all-categories/${language}`)
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