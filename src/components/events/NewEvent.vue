<template>
    <div>
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
                        <EventAccordion accordion-name="repeated-foul" :categories="secondaryEvents"/>
                    </p>
                </b-card-body>
            </b-collapse>
        </b-card>
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
                    {name: 'via goal line', component: 'BallLeftFieldGoalLine'},
                    {name: 'via touch line', component: 'BallLeftFieldTouchLine'},
                    {name: 'Icing', component: 'Icing'},
                    {name: 'Goal', component: 'Goal'},
                    {name: 'Indirect Goal', component: 'IndirectGoal'},
                    {name: 'Chipped Goal', component: 'ChippedGoal'},
                ],
                minorOffenseEvents: [
                    {name: 'Ball was kicked too fast', component: 'BotKickedBallTooFast'},
                    {name: 'Ball was dribbled too far', component: 'BotDribbledBallTooFar'},
                    {name: 'Attacker double touched ball', component: 'AttackerDoubleTouchedBall'},
                    {
                        name: 'Attacker was too close to defense area during free kick',
                        component: 'AttackerTooCloseToDefenseArea'
                    },
                    {name: 'Attacker was in opponent defense area', component: 'AttackerInDefenseArea'},
                    {name: 'Attacker touched keeper', component: 'AttackerTouchedKeeper'},
                    {
                        name: 'Defender touched ball while partially inside defense area',
                        component: 'DefenderInDefenseAreaPartially'
                    },
                    {name: 'Attacker failed to kick ball in time', component: 'KickTimeout'},
                    {name: 'Keeper held the ball too long', component: 'KeeperHeldBall'},
                ],
                foulEvents: [
                    {name: 'Two bots crashed with similar speeds', component: 'BotCrashDrawn'},
                    {name: 'Opponent bot interfered ball placement procedure', component: 'BotInterferedPlacement'},
                    {name: 'A bot tipped over', component: 'BotTippedOver'},
                    {name: 'Bot crashed into another bot', component: 'BotCrashUnique'},
                    {name: 'One bot pushed another one', component: 'BotPushedBot'},
                    {name: 'Bot held ball deliberately', component: 'BotHeldBallDeliberately'},
                    {name: 'Defender was too close to kick point', component: 'DefenderTooCloseToKickPoint'},
                    {name: 'Defender touched ball in defense area', component: 'DefenderInDefenseArea'},
                ],
                secondaryEvents: [
                    {name: 'Bot crashed into another bot - decided to continue', component: 'BotCrashUniqueContinue'},
                    {name: 'One bot pushed another one - decided to continue', component: 'BotPushedBotContinue'},
                    {name: 'Robot too fast during stop', component: 'BotTooFastInStop'},
                    {name: 'Minor unsportive behavior', component: 'UnsportiveBehaviorMinor'},
                    {name: 'Major unsportive behavior', component: 'UnsportiveBehaviorMajor'},
                    {name: 'Multiple fouls', component: 'MultipleFouls'},
                    {name: 'Multiple yellow cards', component: 'MultipleYellowCards'},
                ],
                matchProceedingEvents: [
                    {name: 'No progress in game', component: 'NoProgressInGame'},
                    {name: 'Placement failed by the team in favor', component: 'PlacementFailedByTeamInFavor'},
                    {name: 'Placement failed by the opponent team', component: 'PlacementFailedByOpponent'},
                ]
            }
        }
    }
</script>

<style scoped>

</style>