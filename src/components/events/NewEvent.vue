<template>
    <div>
        <p>
            Choose a game event and issue it in the current match. Most events are usually issued automatically
            by automatic referees, but for testing purposes and manual corrections, events can be added here, too.
            Only a subset of available parameters is presented here.
        </p>
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
                <b-btn block href="#" v-b-toggle.accordion-event-repeated-foul variant="primary">Repeated Events</b-btn>
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
                <b-btn block href="#" v-b-toggle.accordion-event-unsporting-behavior variant="primary">Unsporting Behavior</b-btn>
            </b-card-header>
            <b-collapse id="accordion-event-unsporting-behavior" accordion="accordion-event-category" role="tabpanel">
                <b-card-body>
                    <p class="card-text">
                        <EventAccordion accordion-name="unsporting-behavior" :categories="unsportingBehaviorEvents"/>
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
                matchProceedingEvents: [
                    {name: 'Prepared for kickoff or penalty kick', component: 'Prepared'},
                    {name: 'No progress in game', component: 'NoProgressInGame'},
                    {name: 'Placement failed by the team in favor', component: 'PlacementFailedByTeamInFavor'},
                    {name: 'Placement failed by the opponent team', component: 'PlacementFailedByOpponent'},
                    {name: 'Placement succeeded', component: 'PlacementSucceeded'},
                ],
                ballLeftFieldEvents: [
                    {name: 'via touch line', component: 'BallLeftFieldTouchLine'},
                    {name: 'via goal line', component: 'BallLeftFieldGoalLine'},
                    {name: 'Goal', component: 'Goal'},
                    {name: 'Indirect Goal', component: 'IndirectGoal'},
                    {name: 'Chipped Goal', component: 'ChippedGoal'},
                ],
                minorOffenseEvents: [
                    {name: 'Ball was kicked aimlessly', component: 'AimlessKick'},
                    {name: 'Attacker failed to kick ball in time', component: 'KickTimeout'},
                    {name: 'Keeper held the ball too long', component: 'KeeperHeldBall'},
                    {name: 'Attacker double touched ball', component: 'AttackerDoubleTouchedBall'},
                    {name: 'Attacker was in opponent defense area', component: 'AttackerInDefenseArea'},
                    {name: 'Attacker touched keeper', component: 'AttackerTouchedKeeper'},
                    {name: 'Ball was dribbled too far', component: 'BotDribbledBallTooFar'},
                    {name: 'Ball was kicked too fast', component: 'BotKickedBallTooFast'},
                ],
                foulEvents: [
                    {
                        name: 'Attacker was too close to defense area during free kick',
                        component: 'AttackerTooCloseToDefenseArea'
                    },
                    {name: 'Opponent bot interfered ball placement procedure', component: 'BotInterferedPlacement'},
                    {name: 'Two bots crashed with similar speeds', component: 'BotCrashDrawn'},
                    {name: 'Bot crashed into another bot', component: 'BotCrashUnique'},
                    {name: 'Bot crashed into another bot - decided to continue', component: 'BotCrashUniqueContinue'},
                    {name: 'One bot pushed another one', component: 'BotPushedBot'},
                    {name: 'One bot pushed another one - decided to continue', component: 'BotPushedBotContinue'},
                    {name: 'Bot held ball deliberately', component: 'BotHeldBallDeliberately'},
                    {name: 'A bot tipped over', component: 'BotTippedOver'},
                    {name: 'Robot too fast during stop', component: 'BotTooFastInStop'},
                    {name: 'Defender was too close to kick point', component: 'DefenderTooCloseToKickPoint'},
                    {
                        name: 'Defender touched ball while partially inside defense area',
                        component: 'DefenderInDefenseAreaPartially'
                    },
                    {name: 'Defender touched ball in defense area', component: 'DefenderInDefenseArea'},
                ],
                repeatedEvents: [
                    {name: 'Multiple cards', component: 'MultipleCards'},
                    {name: 'Multiple placement failures', component: 'MultiplePlacementFailures'},
                    {name: 'Multiple fouls', component: 'MultipleFouls'},
                ],
                unsportingBehaviorEvents: [
                    {name: 'Minor unsporting behavior', component: 'UnsportingBehaviorMinor'},
                    {name: 'Major unsporting behavior', component: 'UnsportingBehaviorMajor'},
                ]
            }
        }
    }
</script>

<style scoped>

</style>