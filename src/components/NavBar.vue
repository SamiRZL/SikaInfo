<template>
    <nav>
        <LoginCard :source="this.Store.source" :isOpen="this.Store.isOpenLogin" :pdf="this.Store.pdf" />
        <div class="left-side">
            <div @click="this.$router.push({
            path: `/`,
        });" class="logo">
                <img class="icon" src="../assets/logo_sika_final.png" alt="">

            </div>
            <div class="search-bar">
                <input :class="this.$i18n.locale == 'fr' ? 'input-french' : 'input-arabe'"
                    :placeholder="$t('Chercher un document')" v-model="inputSearched" type="text"><font-awesome-icon
                    class="icon" v-if="!inputSearched" :icon="['fas', 'magnifying-glass']" />
                <font-awesome-icon class="icon xmark" @click="this.inputSearched = ''" v-else
                    :icon="['fas', 'xmark']" />

                <div v-if="filteredDocuments" class="dropdown">
                    <div v-for="document in filteredDocuments" @click="openNewWindow(document.pdf)"
                        :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'" :key="document._id" class="document-row">{{
            document.title
        }}</div>
                </div>
            </div>
        </div>
        <div class="right">
            <button v-if="!this.Store.isLogged" @click="this.Store.source = 'navbar'; this.Store.isOpenLogin = true;">Se
                connecter</button>
            <h3 v-else>{{ this.Store.firstname }} {{ this.Store.lastname }}</h3>
            <div @click="openDropdown()" class="language-container">
                <h4 v-if="this.$i18n.locale == 'fr'">FRA</h4>
                <h4 v-else>عربية</h4>
                <font-awesome-icon v-if="!isOpen" class="dropdown-icon" :icon="['fas', 'caret-down']" />
                <font-awesome-icon v-else class="dropdown-icon" :icon="['fas', 'caret-up']" />
                <div @click="openDropdown()" v-if="isOpen" class="language-dropdown">
                    <div @click="changeLanguage('fr'); SwitchLocale('fr')">FRA</div>
                    <div @click="changeLanguage('ar'); SwitchLocale('ar')">عربية</div>
                </div>
            </div>
        </div>


    </nav>
</template>

<script>
import { useAuthStore } from "../store/index";
import LoginCard from "@/components/LoginCard"


export default {
    name: 'NavBar',
    components: {
        LoginCard
    },
    data() {
        return {
            isOpen: false,
            inputSearched: ''
        };
    },
    setup() {
        const Store = useAuthStore();
        return { Store };
    },
    methods: {
        openDropdown() {
            this.isOpen = !this.isOpen;
        },
        changeLanguage(language) {
            this.$router.push({
                path: `/`,
            });
            this.Store.setLanguage(language)
            this.Store.fetchAspectsByLanguage(this.Store.language);
            this.Store.fetchDocuments(this.Store.language);
            this.Store.fetchCategoriesByLanguage(this.Store.language);

        },
        SwitchLocale(lang) {
            this.isOpen = false;
            this.$i18n.locale = lang;
            console.log("current language:", this.$i18n.locale)

        },
        filterDocuments() {
            if (!this.inputSearched) {
                return;
            }

            return this.Store.AllDocuments.filter(document => document.title.includes(this.inputSearched));
        },
        openNewWindow(pdf) {
            const fullPath = `https://sika-info-server.vercel.app/${pdf}`;

            // Open the URL in a new window
            window.open(fullPath, '_blank');
        }
    },
    mounted() {
        this.Store.fetchDocuments(this.$i18n.locale);
        this.Store.getUser();
    },
    computed: {
        filteredDocuments() {
            return this.filterDocuments();
        },
    }
};
</script>

<style scoped>
nav {
    width: 100%;
    height: 5rem;
    background: #f39c12;
    display: flex;
    align-items: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    justify-content: space-between;
    position: fixed;
    z-index: 1000;

}

.left-side {
    display: flex;
    align-items: center;
    width: 80%;
    gap: 10rem;
    padding: 5rem;
}

.right {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: space-around;

}

button {
    background: #fff;
    color: #3498db;
    padding: 0.8rem;
    outline: none;
    border: none;
    font-size: 0.9rem;
    cursor: pointer;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    font-weight: 700;
    border-radius: 30px;

    &:hover {
        scale: 1.1;
        transition: scale 0.2s ease;
    }
}


.language-container {
    width: 4rem;
    height: 2.4rem;
    background: #fff;
    display: flex;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

    justify-content: center;
    align-items: center;
    gap: 7px;
    position: relative;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;


}

.language-dropdown {
    width: 4rem;
    height: auto;
    top: 90%;
    background: #fff;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 3px;
    border-radius: 0 0 5px 5px;
    border: 1px solid #ccc;
    border-top: none;
    cursor: pointer;


}

.language-dropdown>div {
    border-top: 1px solid #ccc;
    width: 90%;
    height: 30px;
    padding: 3px;
    font-size: small;

    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-style: normal;

    &:hover {
        color: #3498db;
    }
}



.logo {
    width: 5%;
    color: #fff;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Lobster';
    font-size: 2rem;
    cursor: pointer;



    span {
        color: #f39c12;
        font-family: 'Lobster';
        margin-right: 5px;
    }


}

.logo .icon {
    width: 60px;
    height: 60px;
}

.label {
    width: 150px;
    height: 30px;
}

h4 {
    color: #3498db;
    font-size: small;
}

h3 {
    color: #fff;
    font-size: 0.9rem;
}


.search-bar {
    width: 60%;
    background: #fff;
    height: auto;
    border-radius: 5px;
    display: flex;
    align-items: center;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 5px;
    position: relative;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

}

.dropdown {
    position: absolute;
    width: 100%;
    margin-top: 2px;
    top: 100%;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, .1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;

}

.document-row {
    padding: 1rem;
    border-bottom: 1px solid #ccc;
    width: 100%;
    cursor: pointer;

    &:hover {
        background: #efefef;
    }
}

.input-french {
    width: 90%;
    border: none !important;
    padding: 0.5rem;
    outline: none;
    text-align: start;
}

.input-arabe {
    width: 90%;
    border: none !important;
    padding: 0.5rem;
    outline: none;
    text-align: end;
}



.icon {
    stroke: #E8E8E8;
    width: 20px;
    height: 20px;
}

.xmark {
    border-radius: 50%;
    padding: 5px;

    &:hover {
        background: #efefef;
    }

}




.language-icon {
    width: 30px;
    height: 30px;
    color: #3498db;
}

.dropdown-icon {
    width: 20px;
    height: 20px;
    color: #3498db;

    &:hover .language-icon {
        opacity: 0.8;
    }

    &:hover {
        opacity: 0.8;
    }
}
</style>