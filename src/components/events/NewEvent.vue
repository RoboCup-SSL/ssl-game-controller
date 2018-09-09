<template>
    <div>
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle.accordion-event-category1 variant="primary">Ball left field</b-btn>
            </b-card-header>
            <b-collapse id="accordion-event-category1" accordion="accordion-event-category" role="tabpanel">
                <b-card-body>
                    <EventAccordion accordion-name="ball-left-field" :categories="ballLeftFieldEvents"/>
                </b-card-body>
            </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle.accordion-event-category2 variant="primary">Foul</b-btn>
            </b-card-header>
            <b-collapse id="accordion-event-category2" accordion="accordion-event-category" role="tabpanel">
                <b-card-body>
                    <p class="card-text">
                        <EventAccordion accordion-name="foul" :categories="foulEvents"/>
                    </p>
                </b-card-body>
            </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle.accordion-event-category3 variant="primary">Match proceeding</b-btn>
            </b-card-header>
            <b-collapse id="accordion-event-category3" accordion="accordion-event-category" role="tabpanel">
                <b-card-body>
                    <p class="card-text">
                        TODO
                    </p>
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
</template>

<script>
    import EventAccordion from "./EventAccordion";

    export default {
        name: "NewEvent",
        components: {EventAccordion},
        data() {
            return {
                ballLeftFieldEvents: [
                    {name: 'Via goal line', component: 'BallLeftFieldGoalLine'},
                    {name: 'Via touch line', component: 'BallLeftFieldTouchLine'},
                ],
                foulEvents: [
                    {name: 'Robot too fast during stop', component: 'BotTooFastInStop'},
                ]
            }
        }
    }
</script>

<style scoped>

</style>