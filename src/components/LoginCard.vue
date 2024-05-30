<template>
    <div v-if="Store.isOpenLogin" @click="Store.isOpenLogin = false" class="modal">
        <div class="login-container" @click.stop>
            <div class="title-container">
                <h1 v-if="source == 'document'">Entrez votre compte pour <br> pouvoir poursuivre </h1>
                <h1 v-else>Entrez votre compte SikaInfo</h1>
            </div>
            <form @submit.prevent="submit">
                <div class="input-wrapper">
                    <label for="email">Email</label>
                    <input v-model="email" placeholder="Enter your email" id="email" required type="text">
                </div>
                <div class="input-wrapper">
                    <label for="password">Password</label>
                    <input v-model="password" placeholder="*********" id="password" required type="text">
                </div>
                <button v-if="!loading" type="submit">Login</button>
                <button class="loading-btn" v-else>
                    <LoaderSpinner :color="'white'" />
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from "../store/index";
import axios from "axios";
import LoaderSpinner from "./LoaderSpinner"

export default {
    name: 'LoginCard',
    props: ['pdf', "source"],
    data() {
        return {
            loading: false,
            email: "",
            password: "",
        };
    },
    components: {
        LoaderSpinner
    },
    setup() {
        const Store = useAuthStore();
        return {
            Store
        };
    },
    /*  mounted() {
          document.body.addEventListener('click', this.handleClickOutside);
      },
      destroyed() {
          document.body.removeEventListener('click', this.handleClickOutside);
      },*/
    methods: {
        /*  handleClickOutside(event) {
              if (!this.$refs.loginModal.contains(event.target)) {
                  this.Store.isOpenLogin = false;
              }
          },*/
        submit() {
            this.loading = true;
            let user = {
                email: this.email,
                password: this.password,
            };
            axios.post("https://sika-info-server.vercel.app/users/loginUser", user, { withCredentials: true })
                .then(() => {
                    console.log("user logged successfully");
                    this.Store.isLogged = true;
                    this.loading = false;
                })
                .then(() => {
                    this.Store.getUser();
                    this.Store.isOpenLogin = false;
                    if (this.source === "document") this.Store.openNewWindow(this.pdf);
                })
                .catch((error) => { console.log("error logging user", error); this.loading = false; })
        }
    }
}
</script>

<style scoped>
.modal {
    display: flex;
    /* Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 9999;
    /* Sit on top */
    left: 0;
    align-items: center;
    justify-content: center;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgba(0, 0, 0, 0.4);
    /* Black w/ opacity */
}

.login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    padding: 3rem 1rem;
    flex-direction: column;
    gap: 3.5rem;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    gap: 2rem;
}

input {
    width: 100%;
    padding: 0.8rem 0.5rem;
    border-radius: 7px;
    border: 1px solid #BBBBBB;
    box-shadow: 0px 4px 10px rgba(21, 60, 245, 0.04);
}

label {
    font-weight: 600;
}

.input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: 100%;
    gap: 5px;
}

button {
    width: 100%;
    padding: 0.7rem 2rem;
    font-size: 1.3rem;
    background: #0090FF;
    color: #fff;
    font-weight: 600;
    border: none;
    border-radius: 7px;
    margin-top: 2rem;
    cursor: pointer;

    &:hover {
        opacity: 0.85;
    }
}

.loading-btn {
    display: flex;
    justify-content: center;
    align-items: center;
}

.title-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-align: center;
}

.icon {
    width: 20px;
    height: 20px;
}

h1 {
    font-size: 1.7rem;
    font-weight: 600;
}
</style>