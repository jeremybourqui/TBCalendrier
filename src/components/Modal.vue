<script setup>
    import {
        ref,
    } from 'vue';

    const props = defineProps({
        show: Boolean,

    });


</script>

<template>
    <div v-if="show" class="modal">
        <div class="modal-content">
            
            <p> test </p>

            <button class="modal-default-button" @click="$emit('close')">Retour</button>

            <div>
                <slot></slot>
            </div>

        </div>
    </div>
</template>

<style scoped>
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