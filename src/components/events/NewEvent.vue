<template>
    <div class="game-controller-container">
        <p>
            Choose a game event and issue it in the current match. Most events are usually issued automatically
            by automatic referees,
            but for testing purposes and manual corrections,
            events can be added here,
            too.
            Only a subset of available parameters is presented here.
        </p>
        <div v-if="!showAll">
            <EventAccordion accordion-name="all" :categories="allManualEvents"/>
            <b-btn variant="primary" @click="showAll=true">Show all</b-btn>
        </div>
        <div v-if="showAll">
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-btn block href="#" v-b-toggle.accordion-event-match-proceeding variant="primary">Match proceeding
                    </b-btn>
                </b-card-header>
                <b-collapse id="accordion-event-match-proceeding" accordion="accordion-event-category" role="tabpanel">
                    <b-card-body>
                        <p class="card-text">
                            <EventAccordion accordion-name="match-proceeding" :categories="matchProceedingEvents"/>
                        </p>
                    </b-card-body>
                </b-collapse>
            </b-card>
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-btn block href="#" v-b-toggle.accordion-event-ball-left-field variant="primary">Ball left field
                    </b-btn>
                </b-card-header>
                <b-collapse id="accordion-event-ball-left-field" accordion="accordion-event-category" role="tabpanel">
                    <b-card-body>
                        <EventAccordion accordion-name="ball-left-field" :categories="ballLeftFieldEvents"/>
                    </b-card-body>
                </b-collapse>
            </b-card>
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-btn block href="#" v-b-toggle.accordion-event-minor-offense variant="primary">Minor Offense
                    </b-btn>
                </b-card-header>
                <b-collapse id="accordion-event-minor-offense" accordion="accordion-event-category" role="tabpanel">
                    <b-card-body>
                        <p class="card-text">
                            <EventAccordion accordion-name="minor-offense" :categories="minorOffenseEvents"/>
                        </p>
                    </b-card-body>
                </b-collapse>
            </b-card>
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-btn block href="#" v-b-toggle.accordion-event-foul variant="primary">Foul</b-btn>
                </b-card-header>
                <b-collapse id="accordion-event-foul" accordion="accordion-event-category" role="tabpanel">
                    <b-card-body>
                        <p class="card-text">
                            <EventAccordion accordion-name="foul" :categories="foulEvents"/>
                        </p>
                    </b-card-body>
                </b-collapse>
            </b-card>
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-btn block href="#" v-b-toggle.accordion-event-repeated-foul variant="primary">Repeated Events
                    </b-btn>
                </b-card-header>
                <b-collapse id="accordion-event-repeated-foul" accordion="accordion-event-category" role="tabpanel">
                    <b-card-body>
                        <p class="card-text">
                            <EventAccordion accordion-name="repeated-foul" :categories="repeatedEvents"/>
                        </p>
                    </b-card-body>
                </b-collapse>
            </b-card>
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-btn block href="#" v-b-toggle.accordion-event-unsporting-behavior variant="primary">Unsporting
                        Behavior
                    </b-btn>
                </b-card-header>
                <b-collapse id="accordion-event-unsporting-behavior" accordion="accordion-event-category"
                            role="tabpanel">
                    <b-card-body>
                        <p class="card-text">
                            <EventAccordion accordion-name="unsporting-behavior"
                                            :categories="unsportingBehaviorEvents"/>
                        </p>
                    </b-card-body>
                </b-collapse>
            </b-card>
        </div>
    </div>
</template>

<script>
    import EventAccordion from "./EventAccordion";
    import {
        ballLeftFieldEvents,
        foulEvents,
        matchProceedingEvents,
        minorOffenseEvents,
        repeatedEvents,
        unsportingBehaviorEvents
    } from "../../gameEvents";

    export default {
        name: "NewEvent",
        components: {EventAccordion},
        data() {
            return {
                showAll: false,
                matchProceedingEvents: matchProceedingEvents,
                ballLeftFieldEvents: ballLeftFieldEvents,
                minorOffenseEvents: minorOffenseEvents,
                foulEvents: foulEvents,
                repeatedEvents: repeatedEvents,
                unsportingBehaviorEvents: unsportingBehaviorEvents,
            }
        },
        computed: {
            allEvents() {
                return matchProceedingEvents.concat(ballLeftFieldEvents, minorOffenseEvents, foulEvents, repeatedEvents, unsportingBehaviorEvents);
            },
            allManualEvents() {
                return this.allEvents.filter(function (category) {
                    return category.type === 'manual'
                });
            }
        }
    }
</script>

<style scoped>

</style>
