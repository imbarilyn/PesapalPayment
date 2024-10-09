<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSubscriptionStore } from '@/stores'
import { onBeforeMount, onMounted, ref } from 'vue'
import DialogModal from '@/views/toasts/DialogModal.vue'

const router = useRouter()
const purchasePlan = (slug: string) => {
  router.push({
    name: 'sign-up',
    params: {package_slug: slug}
  })

  console.log('Purchasing Plan')
}

const subscriptionStore = useSubscriptionStore()
// const purchasePlan = () => {
//   subscriptionStore.subscription()
//   console.log(subscriptionStore.iframeContent)
//
// }
export interface PlanSubscription {
  id:  string
  name: string
  description: string
  num_of_users: string
  slug: string
  "date": string
  "price": string
}


const plans = ref<PlanSubscription[]>([])

subscriptionStore.getPackages().then((response) => {
  console.log('response from plans',response)
  if(response){
    plans.value = response
    console.log('These are the plans',plans.value)
  }
})



</script>

<template>
  <div class=" flex  justify-center h-screen overflow-y-auto">
    <div class="lg:py-8 grid  rounded-xl">
      <div class="flex justify-center items-center sticky top-0 flex-col backdrop-blur">
        <h1 class="text-white font-bold md:!text-6xl text-2xl">Choose  your plan</h1>
        <p class="text-white font-semibold text-2xl md:pt-6 pt-2">Unlock endless possibilities</p>
      </div>
      <div class="grid grid-cols-6 gap-4 md:gap-4 pt-10 mx-6 ">
        <div v-for="plan in plans" :key="plan.id" class=" w-full rounded-xl md:col-span-2 col-span-6 flex justify-center items-center">
          <div class="shadow-2xl  rounded-xl px-4 py-6" :class="[plan.name === 'Enterprise Package'? 'border-2  border-soko-500': 'border-soko-500/60']">
            <div class="lg:space-y-4">
              <div class="flex flex-col gap-3">
                <div class="flex justify-between lg:flex-row flex-col">
                  <div class="flex gap-1 ">
                    <span class="material-icons text-soko-500" v-if="plan.name === 'Enterprise Package'">workspace_premium</span>
                    <span class="material-icons text-soko-300" v-if="plan.name==='Standard Package'"> pattern </span>
                    <span class="material-icons text-soko-300" v-if="plan.name==='Premium Package'"> military_tech </span>
                    <span class="material-icons text-soko-300" v-if="plan.name==='Free Package'"> insights</span>
                    <h1 class="text-xl pb-3 text-white">{{plan.name}}</h1>
                  </div>
                  <div v-if="plan.name === 'Enterprise Package'">
                    <button class="btn btn-sm px-6 bg-soko-100 text-white">
                      <span class="font-medium text-soko-700">Popular</span>
                    </button>
                  </div>
                </div>
                <div class="pb-8">
                  <p class="lg:text-md text-sm text-white">
                    {{plan.description}}
                  </p>
                </div>
              </div>
              <div class="text-sm">
                <div class="flex flex-col space-y-3">
                  <div class="pb-6">
                    <h1 class="!text-3xl font-bold inline text-white">KSH. {{plan.price}}</h1>
                    <span class="text-white">/month</span>
                  </div>
                  <div class="w-full pb-6 btn btn-sm" @click="purchasePlan(plan.slug)"
                       :class="[plan.name !== 'Enterprise Package'? 'bg-gradient-to-r from-soko-100 via-soko-400 to-soko-700 hover:from-soko-700 via-soko-400 t0-soko-100 ': 'hover:bg-soko-400']">
                      <span class="py-1.5 font-medium" :class="[plan.name !== 'Enterprise Package'? 'text-white': 'text-soko-400 hover:text-white']">Purchase Plan</span>

                  </div>

                  <div class="flex">
                    <span class="material-icons-outlined text-soko-300">check_circle</span>
                    <p class="text-white">Up to 5 Users</p>
                  </div>
                  <div class="flex">
                    <span class="material-icons-outlined text-soko-300">check_circle</span>
                    <p class="text-white">Up to 5 Users</p>
                  </div>
                  <div class="flex">
                    <span class="material-icons-outlined text-soko-300">check_circle</span>
                    <p class="text-white">Up to 5 Users</p>
                  </div>
                <div class="flex">
                  <span class="material-icons-outlined text-soko-300">check_circle</span>
                  <p class="text-white">Up to 5 Users</p>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<style>
#background {
  height: 100%;
  background: radial-gradient(circle, #23697b, #04243D);
}

@media (max-width: 768px){
  .plan-card {
    border: 2px solid #23697b;
  }

}

</style>
