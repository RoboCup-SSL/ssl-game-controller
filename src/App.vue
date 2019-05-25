<template>
    <div id="app">
        <div id="app-header">
            <ControlGeneral class="app-header-item"/>
            <GameState id="game-state" class="app-header-item"/>
        </div>
        <div id="main-elements">
            <div class="team-container">
                <TeamOverview class="team-views"/>
                <ControlTeam class="team-views" team-color="Yellow"/>
                <CurrentEvents class="team-views"/>
            </div>
            <div class="main-middle-container">
                <Events/>
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
            <div class="team-container">
                <ControlTeam class="team-views" team-color="Blue"/>
                <EventProposals class="team-views"/>
            </div>
        </div>
        <ControlMatch id="match-controls"/>
    </div>
</template>

<script>
    import GameState from './components/GameState.vue'
    import TeamOverview from "./components/team/TeamOverview";
    import ControlGeneral from "./components/control/ControlGeneral";
    import ControlTeam from "./components/control/ControlTeam";
    import ControlMatch from "./components/control/ControlMatch";
    import Events from "./components/events/Events";
    import EventProposals from "./components/events/EventProposals";
    import CurrentEvents from "./components/events/CurrentEvents";

    export default {
        name: 'app',
        components: {
            CurrentEvents,
            EventProposals,
            Events,
            ControlMatch,
            ControlTeam,
            ControlGeneral,
            TeamOverview,
            GameState
        },
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

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
    }

    #app-header {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: baseline;
        align-content: flex-start;
    }

    .app-header-item {
        margin: 0.3em;
    }

    #game-state {
        font-size: 1.2em;
        font-weight: bold;
    }

    #main-elements {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: stretch;
        align-content: flex-start;
        flex-grow: 1;
    }

    .main-middle-container {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-content: stretch;
        align-items: stretch;
        flex-grow: 1;
        height: 100%;
    }

    @media only screen and (max-width: 1600px) {
        .main-middle-container {
            order: 10;
        }
    }

    @-moz-document url-prefix() {
        /* CSS-Hack for limiting following style to Firefox only */
        .main-middle-container {
            /* Setting height to 100% in Chrome and Firefox has contradictory effects*/
            height: 100%;
        }
    }

    .vision-client {
        flex-grow: 1;
        width: 100%;
        height: 100%;
    }

    .team-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    #match-controls {
        width: 100%;
        position: fixed;
        bottom: 0;
        text-align: center;
    }

    .team-views {
        float: left;
        margin: 0.5em;
    }

    iframe {
        border: 0;
        width: 100%;
        height: 100%
    }
</style>
