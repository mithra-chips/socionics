<template>
    <div v-show="!loading.isLoading"><slot name="main"></slot></div>
    <v-container fluid v-show="loading.isLoading">
        <v-row align-content="center" class="fill-height" justify="center">
            <v-col class="text-subtitle-1 text-center" cols="12">
            数据请求中
            </v-col>
            <v-col cols="6">
                <v-progress-linear
                color="#5865f2"
                height="6"
                indeterminate
                rounded
                ></v-progress-linear>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading.store'
const loading = useLoadingStore();
</script>