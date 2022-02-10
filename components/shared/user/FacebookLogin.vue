<template>
  <div class="my_acc_container">
    <h2 class="my_acc_subtitle">FACEBOOK LOGIN</h2>
    <client-only>
        <v-facebook-login  v-model="fb.model"
            class="btn btn_grey btn_custom"
            :app-id="fb.app_id"
            :version="fb.version"
            :login-options="fb.options"
            @sdk-init="handleSdkInit"
            @login="fbLogin"></v-facebook-login>
    </client-only>
  </div>
</template>

<script>
export default {
    middleware: 'auth',
    name: "Facebook",
    components: {
      VFacebookLogin: () =>
        process.client ? import('vue-facebook-login-component') : null,
    },
    data(){
        return {
            fb: {
                app_id: '2088893704619503',
                version: 'v12.0',
                options: { scope: 'email' },
                FB: {},
                scope: {},
                model: {},
                user_id: null,
            },
        }
    },
    methods: {
        handleSdkInit({ FB, scope }) {
            this.fb.FB = FB
            this.fb.scope = scope

            FB.getLoginStatus((response) => {
                if (response.status === 'connected') {
                    this.fbLoginResponse(response);
                }
            });
        },
        fbLogin(response) {
            if (response) {
                this.fbLoginResponse(response);
            }
        },
        fbLoginResponse(response) {
            this.fb.user_id = response.authResponse.userID;

            let formData = {};
            formData.fb_user_id = response.authResponse.userID

            this.$axios.post('/save-facebook-credentials', formData)
            .then(()=>{

            })
            .catch((err) => {
                this.showFailMsg("Something went wrong!");
            })
        },
    }
}
</script>

<style scoped>
    .btn_custom{
        padding: 0 10px !important;
    }
</style>
