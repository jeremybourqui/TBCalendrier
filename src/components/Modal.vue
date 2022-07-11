<script setup>
    import {
        ref,
        toRefs
    } from 'vue';

    const props = defineProps({
        show: Boolean,
        monthName: String
    });

    const { monthName } = toRefs(props);

</script>

<template>
    <div v-if="show" class="modal">
        <div class="modal-content">
            <slot></slot>

            <p> {{ monthName }} </p>

            <button class="modal-default-button" @click="$emit('close')">OK</button>
        </div>
    </div>
</template>

<style>
    .modal {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 95%;
        height: 90%;
        background-color: #fefefe;
        padding: 20px;
        border: 1px solid #888;
    }

</style>