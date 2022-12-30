<template>
    <div>
        <b-card no-body class="mb-1" v-for="(category, categoryId) in categories" :key="categoryId">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle="accordionName + '-' + categoryId" variant="secondary">
                    {{category.name}}
                </b-btn>
            </b-card-header>
            <b-collapse :id="accordionName + '-' + categoryId" :accordion="accordionName" role="tabpanel">
                <b-card-body>
                    <component :is="category.component"/>
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
</template>

<script>
    import AttackerDoubleTouchedBall from "./inputs/AttackerDoubleTouchedBall"
    import AttackerTouchedBallInDefenseArea from "./inputs/AttackerTouchedBallInDefenseArea"
    import AttackerTooCloseToDefenseArea from "./inputs/AttackerTooCloseToDefenseArea"
    import BallLeftFieldGoalLine from "./inputs/BallLeftFieldGoalLine"
    import BallLeftFieldTouchLine from "./inputs/BallLeftFieldTouchLine"
    import BotCrashDrawn from "./inputs/BotCrashDrawn"
    import BotCrashUnique from "./inputs/BotCrashUnique"
    import BotDribbledBallTooFar from "./inputs/BotDribbledBallTooFar"
    import BotHeldBallDeliberately from "./inputs/BotHeldBallDeliberately"
    import BotInterferedPlacement from "./inputs/BotInterferedPlacement"
    import BotKickedBallTooFast from "./inputs/BotKickedBallTooFast"
    import BotPushedBot from "./inputs/BotPushedBot"
    import BotTippedOver from "./inputs/BotTippedOver"
    import BotTooFastInStop from "./inputs/BotTooFastInStop"
    import DefenderInDefenseArea from "./inputs/DefenderInDefenseArea"
    import DefenderTooCloseToKickPoint from "./inputs/DefenderTooCloseToKickPoint"
    import PossibleGoal from "./inputs/PossibleGoal"
    import Goal from "./inputs/Goal"
    import AimlessKick from "./inputs/AimlessKick"
    import KeeperHeldBall from "./inputs/KeeperHeldBall"
    import NoProgressInGame from "./inputs/NoProgressInGame"
    import PlacementFailed from "./inputs/PlacementFailed"
    import UnsportingBehaviorMajor from "./inputs/UnsportingBehaviorMajor"
    import UnsportingBehaviorMinor from "./inputs/UnsportingBehaviorMinor"
    import PlacementSucceeded from "./inputs/PlacementSucceeded"
    import BoundaryCrossing from "./inputs/BoundaryCrossing";
    import PenaltyKickFailed from "@/components/create-event/inputs/PenaltyKickFailed.vue";

    export default {
        name: "EventAccordion",
        components: {
            AttackerDoubleTouchedBall,
            AttackerTouchedBallInDefenseArea,
            AttackerTooCloseToDefenseArea,
            BallLeftFieldGoalLine,
            BallLeftFieldTouchLine,
            BotCrashDrawn,
            BotCrashUnique,
            BotDribbledBallTooFar,
            BotHeldBallDeliberately,
            BotInterferedPlacement,
            BotKickedBallTooFast,
            BotPushedBot,
            BotTippedOver,
            BotTooFastInStop,
            BoundaryCrossing,
            DefenderInDefenseArea,
            DefenderTooCloseToKickPoint,
            Goal,
            PossibleGoal,
            AimlessKick,
            KeeperHeldBall,
            NoProgressInGame,
            PlacementFailed,
            UnsportingBehaviorMajor,
            UnsportingBehaviorMinor,
            PlacementSucceeded,
            PenaltyKickFailed,
        },
        props: {
            accordionName: {
                type: String
            },
            categories: {
                type: Array
            }
        }
    }
</script>

<style scoped>

</style>
