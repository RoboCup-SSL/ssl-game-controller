<template>
    <svg class="field-canvas"
         :viewBox="viewBox">

        <!-- rotate field -->
        <g :transform="getFieldTransformation">

            <!-- draw field background -->
            <rect :x="-(fieldLength/2+boundaryWidth)"
                  :y="-(fieldWidth/2+boundaryWidth)"
                  :width="fieldLength+boundaryWidth*2"
                  :height="fieldWidth+boundaryWidth*2"
                  style="fill:green;fill-opacity:1;stroke:none"></rect>

            <!-- draw field borders -->
            <line v-show="!useShapesFromGeometry"
                  :x1="-fieldLength/2"
                  :y1="-fieldWidth/2"
                  :x2="-fieldLength/2"
                  :y2="fieldWidth/2"
                  style="stroke:white;stroke-width:10px"></line>
            <line v-show="!useShapesFromGeometry"
                  :x1="-fieldLength/2"
                  :y1="fieldWidth/2"
                  :x2="fieldLength/2"
                  :y2="fieldWidth/2"
                  style="stroke:white;stroke-width:10px"></line>
            <line v-show="!useShapesFromGeometry"
                  :x1="fieldLength/2"
                  :y1="fieldWidth/2"
                  :x2="fieldLength/2"
                  :y2="-fieldWidth/2"
                  style="stroke:white;stroke-width:10px"></line>
            <line v-show="!useShapesFromGeometry"
                  :x1="fieldLength/2"
                  :y1="-fieldWidth/2"
                  :x2="-fieldLength/2"
                  :y2="-fieldWidth/2"
                  style="stroke:white;stroke-width:10px"></line>
            <line v-show="!useShapesFromGeometry"
                  :x1="0"
                  :y1="fieldWidth/2"
                  :x2="0"
                  :y2="-fieldWidth/2"
                  style="stroke:white;stroke-width:10px"></line>
            <!-- center circle -->
            <circle v-show="!useShapesFromGeometry"
                    :r="centerCircleRadius"
                    style="stroke:white;stroke-width:10px;fill-opacity:0"></circle>
            <!-- penalty areas -->
            <rect v-show="!useShapesFromGeometry"
                  :x="-(fieldLength)/2"
                  :y="-(penAreaWidth)/2"
                  :width="penAreaDepth"
                  :height="penAreaWidth"
                  style="stroke: white;stroke-width:10px; fill-opacity:0"></rect>
            <rect v-show="!useShapesFromGeometry"
                  :x="(fieldLength/2)-penAreaDepth"
                  :y="-penAreaWidth/2"
                  :width="penAreaDepth"
                  :height="penAreaWidth"
                  style="stroke: white;stroke-width:10px; fill-opacity:0"></rect>

            <!-- goals -->
            <line :x1="-fieldLength/2"
                  :y1="-goalWidth/2"
                  :x2="-fieldLength/2-goalDepth"
                  :y2="-goalWidth/2"
                  style="stroke:black;stroke-width:10px"></line>
            <line :x1="-fieldLength/2"
                  :y1="goalWidth/2"
                  :x2="-fieldLength/2-goalDepth"
                  :y2="goalWidth/2"
                  style="stroke:black;stroke-width:10px"></line>
            <line :x1="-fieldLength/2-goalDepth"
                  :y1="-goalWidth/2"
                  :x2="-fieldLength/2-goalDepth"
                  :y2="goalWidth/2"
                  style="stroke:black;stroke-width:10px"></line>

            <line :x1="fieldLength/2"
                  :y1="-goalWidth/2"
                  :x2="fieldLength/2+goalDepth"
                  :y2="-goalWidth/2"
                  style="stroke:black;stroke-width:10px"></line>
            <line :x1="fieldLength/2"
                  :y1="goalWidth/2"
                  :x2="fieldLength/2+goalDepth"
                  :y2="goalWidth/2"
                  style="stroke:black;stroke-width:10px"></line>
            <line :x1="fieldLength/2+goalDepth"
                  :y1="-goalWidth/2"
                  :x2="fieldLength/2+goalDepth"
                  :y2="goalWidth/2"
                  style="stroke:black;stroke-width:10px"></line>

            <!-- lines from geometry -->
            <line v-for="l of lines"
                  v-bind:key="l"
                  :x1="l.p1.x"
                  :y1="l.p1.y"
                  :x2="l.p2.x"
                  :y2="l.p2.y"
                  style="stroke:white;stroke-width:10px"></line>

            <!-- arcs from geometry (only circles supported for now -->
            <circle v-for="a of arcs"
                    v-bind:key="a"
                    :cx="a.center.x"
                    :cy="a.center.y"
                    :r="a.radius"
                    style="stroke:white;stroke-width:10px;fill-opacity:0"></circle>

            <!-- robots -->
            <path v-for="r of getRobotsYellow"
                  v-bind:key="r"
                  :d="
            'M ' + r.x + r.botRightX() + ',' + r.y + r.botRightY() +
            'A ' + r.botRadius + ' ' + r.botRadius + ' 0 1 1 ' + r.x + r.botLeftX() + ',' + r.y + r.botLeftY() +
            'L ' + r.x + r.botRightX() + ','+ r.y + r.botRightY()"
                  style="stroke:black;stroke-width:0.3em;fill: yellow; fill-opacity:1"></path>

            <path v-for="r of getRobotsBlue"
                  v-bind:key="r"
                  :d="
            'M ' + r.x + r.botRightX() + ',' + r.y + r.botRightY() +
            'A ' + r.botRadius + ' ' + r.botRadius + ' 0 1 1 ' + r.x + r.botLeftX() + ',' + r.y + r.botLeftY() +
            'L ' + r.x + r.botRightX() + ','+ r.y + r.botRightY()"
                  style="stroke:black;stroke-width:0.3em;fill: blue; fill-opacity:1"></path>

            <!-- robot ids -->
            <text v-for="r of getRobotsYellow"
                  v-bind:key="r"
                  :x="r.x"
                  :y="r.y"
                  :dx="'-40'"
                  :dy="'45'"
                  :textLength="r.botRadius+20"
                  :lengthAdjust="'spacingAndGlyphs'"
                  class="bot-id"
                  style="stroke-width:0;fill: black">
                {{r.id}}
            </text>

            <text v-for="r of getRobotsBlue"
                  v-bind:key="r"
                  :x="r.x"
                  :y="r.y"
                  :dx="'-40'"
                  :dy="'45'"
                  :textLength="r.botRadius+20"
                  :lengthAdjust="'spacingAndGlyphs'"
                  class="bot-id"
                  style="stroke-width:0;fill: white">
                {{r.id}}
            </text>

            <!-- balls -->
            <circle v-for="r of balls"
                    v-bind:key="r"
                    :r="ballRadius"
                    :cx="r.x"
                    :cy="r.y"
                    style="stroke:black;stroke-width:0.3em;fill: orangered; fill-opacity:1">
            </circle>
            <circle v-for="r of balls"
                    v-bind:key="r"
                    :r="300"
                    :cx="r.x"
                    :cy="r.y"
                    style="stroke:red;stroke-width:0.5em; fill-opacity:0">
            </circle>
        </g>
    </svg>
</template>

<script>


    export default {
        name: "Field",
        data: function () {
            return {
                rotateField: true,
                useShapesFromGeometry: false,
                fieldWidth: 2000,
                fieldLength: 3000,
                boundaryWidth: 300,
                penAreaWidth: 1000,
                penAreaDepth: 500,
                goalWidth: 600,
                goalDepth: 180,
                centerCircleRadius: 500,
                ballRadius: 21.5,
                lines: [{p1: {x: 100, y: 100}, p2: {x: 500, y: 1000}}],
                arcs: [],
                robotsYellow: {},
                robotsBlue: {},
                balls: []
            }
        },
        computed: {
            getRobotsYellow() {
                return this.robotsYellow.values;
            },
            getRobotsBlue() {
                return this.robotsBlue.values;
            },
            getFieldTransformation() {
                if (this.rotateField) {
                    return 'rotate(90) scale(' + (this.fieldWidth / this.fieldLength) + ')';
                }
                return '';
            },
            viewBox() {
                return (-(this.fieldLength / 2 + this.boundaryWidth))
                    + ' ' + (-(this.fieldWidth / 2 + this.boundaryWidth))
                    + ' ' + (this.fieldLength + this.boundaryWidth * 2)
                    + ' ' + (this.fieldWidth + this.boundaryWidth * 2);
            }
        }
    }
</script>

<style scoped>

</style>