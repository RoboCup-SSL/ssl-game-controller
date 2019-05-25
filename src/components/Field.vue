<template>
    <div class="container">
        <iframe :src="visionClientAddress"
                frameborder="none"
                v-if="showVisionClient"
                class="vision-client">
        </iframe>
        <div class="vision-client" v-show="!showVisionClient">
            <p>The <a href="https://github.com/RoboCup-SSL/ssl-vision-client" target="_blank">
                vision-client</a> is shown here, if it is running.</p>
            <p>It is expected to run at <a :href="visionClientAddress">{{visionClientAddress}}</a></p>
            <b-button variant="primary" @click="checkVisionClientAvailability">Reload</b-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Field",
        props: {
            visionClientAddress: {
                type: String,
                default: "http://localhost:8082"
            }
        },
        data() {
            return {
                showVisionClient: false
            }
        },
        methods: {
            checkVisionClientAvailability() {
                let rq = new XMLHttpRequest();

                rq.onreadystatechange = function (vm) {
                    if (this.readyState === XMLHttpRequest.DONE) {
                        vm.showVisionClient = this.status === 200;
                    }
                }.bind(rq, this);

                rq.open("GET", this.visionClientAddress);
                rq.send();
            }
        },
        mounted() {
            this.checkVisionClientAvailability();
        }
    }
</script>

<style scoped>

    .container {
        width: 100%;
        height: 90vh;
    }

    .vision-client {
        flex-grow: 1;
        width: 100%;
        height: 100%;
    }

    iframe {
        border: 0;
    }
</style>
