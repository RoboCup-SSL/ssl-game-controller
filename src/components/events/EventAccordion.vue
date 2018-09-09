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
    import BotTooFastInStop from "./inputs/BotTooFastInStop";

    export default {
        name: "EventAccordion",
        components: {
            BallLeftFieldGoalLine,
            BallLeftFieldTouchLine,
            BotTooFastInStop
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