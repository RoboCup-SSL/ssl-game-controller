<template>
    <div>
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle.accordion-event-ball-left-field variant="primary">Ball left field</b-btn>
            </b-card-header>
            <b-collapse id="accordion-event-ball-left-field" accordion="accordion-event-category" role="tabpanel">
                <b-card-body>
                    <EventAccordion accordion-name="ball-left-field" :categories="ballLeftFieldEvents"/>
                </b-card-body>
            </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle.accordion-event-minor-offense variant="primary">Minor Offense</b-btn>
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
                <b-btn block href="#" v-b-toggle.accordion-event-repeated-foul variant="primary">Repeated Foul</b-btn>
            </b-card-header>
            <b-collapse id="accordion-event-repeated-foul" accordion="accordion-event-category" role="tabpanel">
                <b-card-body>
                    <p class="card-text">
                        <EventAccordion accordion-name="repeated-foul" :categories="repeatedFoulEvents"/>
                    </p>
                </b-card-body>
            </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle.accordion-event-match-proceeding variant="primary">Match proceeding</b-btn>
            </b-card-header>
            <b-collapse id="accordion-event-match-proceeding" accordion="accordion-event-category" role="tabpanel">
                <b-card-body>
                    <p class="card-text">
                        <EventAccordion accordion-name="match-proceeding" :categories="matchProceedingEvents"/>
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
                    {name: 'Icing', component: 'Icing'},
                    {name: 'Goal', component: 'Goal'},
                    {name: 'Indirect Goal', component: 'IndirectGoal'},
                    {name: 'Chipped Goal', component: 'ChippedGoal'},
                ],
                minorOffenseEvents: [
                    {name: 'BotKickedBallTooFast', component: 'BotKickedBallTooFast'},
                    {name: 'BotDribbledBallTooFar', component: 'BotDribbledBallTooFar'},
                    {name: 'AttackerDoubleTouchedBall', component: 'AttackerDoubleTouchedBall'},
                    {name: 'AttackerTooCloseToDefenseArea', component: 'AttackerTooCloseToDefenseArea'},
                    {name: 'AttackerInDefenseArea', component: 'AttackerInDefenseArea'},
                    {name: 'AttackerTouchedKeeper', component: 'AttackerTouchedKeeper'},
                    {name: 'DefenderInDefenseAreaPartially', component: 'DefenderInDefenseAreaPartially'},
                    {name: 'KickTimeout', component: 'KickTimeout'},
                    {name: 'KeeperHeldBall', component: 'KeeperHeldBall'},
                ],
                foulEvents: [
                    {name: 'Bot crashed with similar speeds', component: 'BotCrashDrawn'},
                    {name: 'BotInterferedPlacement', component: 'BotInterferedPlacement'},
                    {name: 'A bot tipped over', component: 'BotTippedOver'},
                    {name: 'Bot crashed with different speeds', component: 'BotCrashUnique'},
                    {name: 'One bot pushed another one', component: 'BotPushedBot'},
                    {name: 'BotHeldBallDeliberately', component: 'BotHeldBallDeliberately'},
                    {name: 'Defender was too close to kick point', component: 'DefenderTooCloseToKickPoint'},
                    {name: 'Defender touched ball in defense area', component: 'DefenderInDefenseArea'},
                    {name: 'Robot too fast during stop', component: 'BotTooFastInStop'},
                ],
                repeatedFoulEvents: [
                    {name: 'UnsportiveBehaviorMinor', component: 'UnsportiveBehaviorMinor'},
                    {name: 'UnsportiveBehaviorMajor', component: 'UnsportiveBehaviorMajor'},
                    {name: 'MultipleFouls', component: 'MultipleFouls'},
                    {name: 'MultipleYellowCards', component: 'MultipleYellowCards'},
                ],
                matchProceedingEvents: [
                    {name: 'NoProgressInGame', component: 'NoProgressInGame'},
                    {name: 'PlacementFailedByTeamInFavor', component: 'PlacementFailedByTeamInFavor'},
                    {name: 'PlacementFailedByOpponent', component: 'PlacementFailedByOpponent'},
                ]
            }
        }
    }
</script>

<style scoped>

</style>