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
    import BallLeftFieldGoalLine from "./inputs/BallLeftFieldGoalLine";
    import BallLeftFieldTouchLine from "./inputs/BallLeftFieldTouchLine";
    import BotCrashDrawn from "./inputs/BotCrashDrawn"
    import BotCrashUnique from "./inputs/BotCrashUnique"
    import BotPushedBot from "./inputs/BotPushedBot"
    import BotTippedOver from "./inputs/BotTippedOver"
    import BotTooFastInStop from "./inputs/BotTooFastInStop"
    import ChippedGoal from "./inputs/ChippedGoal"
    import DefenderInDefenseArea from "./inputs/DefenderInDefenseArea"
    import DefenderTooCloseToKickPoint from "./inputs/DefenderTooCloseToKickPoint"
    import Goal from "./inputs/Goal"
    import Icing from "./inputs/Icing"
    import IndirectGoal from "./inputs/IndirectGoal"

    export default {
        name: "EventAccordion",
        components: {
            BallLeftFieldGoalLine,
            BallLeftFieldTouchLine,
            BotCrashDrawn,
            BotCrashUnique,
            BotPushedBot,
            BotTippedOver,
            BotTooFastInStop,
            ChippedGoal,
            DefenderInDefenseArea,
            DefenderTooCloseToKickPoint,
            Goal,
            Icing,
            IndirectGoal,
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