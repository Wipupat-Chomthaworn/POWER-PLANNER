<template>
    <div>
        <div id="inProgress">
            <p>In Progress!</p>
            <ul v-for="item in items">
                <li v-if="item.status='ip'">
                </li>
            </ul>
        </div>
        <div id="complete">
            <p>Complete!</p>
            <ul v-for="item in items">
                <li v-if="item.status='complete'">
                </li>
            </ul>
        </div>

    </div>
</template>
<script>
export default {
    name:"dashBoard",
    data(){
        return {
        message:"HI"
        }
    }
    }
</script>
<style>
</style>