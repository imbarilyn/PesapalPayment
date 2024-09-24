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
  <div class=" flex  justify-center h-screen overflow-y-hidden">
    <div class="lg:py-8 grid  rounded-xl">
      <div class="flex justify-center items-center flex-col  w-full">
        <h1 class="text-white font-bold md:!text-6xl text-2xl">Choose  your plan</h1>
        <p class="text-white font-semibold text-2xl pt-6">Unlock endless possibilities</p>
      </div>
      <div class="md:grid md:grid-cols-6 carousel rounded-box">
        <div v-for="plan in plans" :key="plan.id" class="carousel-item w-full rounded-xl md:col-span-2 flex justify-center items-center">
          <div class="plan-card  shadow-2xl rounded-xl px-4 py-6" :class="[plan.name === 'Enterprise Package'? 'border-2  border-soko-500': 'border-soko-500/60']">
            <div class="lg:space-y-4">
              <div class="flex flex-col gap-3">
                <div class="flex justify-between lg:flex-row flex-col">
                  <div class="flex gap-1 ">
                    <span class="material-icons text-rose-500">workspace_premium</span>
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
<!--    <div class="carousel rounded-box w-64">-->
<!--      <div class="carousel-item w-full">-->
<!--        <img-->
<!--          src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"-->
<!--          class="w-full"-->
<!--          alt="Tailwind CSS Carousel component" />-->
<!--      </div>-->
<!--      <div class="carousel-item w-full">-->
<!--        <img-->
<!--          src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"-->
<!--          class="w-full"-->
<!--          alt="Tailwind CSS Carousel component" />-->
<!--      </div>-->
<!--      <div class="carousel-item w-full">-->
<!--        <img-->
<!--          src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"-->
<!--          class="w-full"-->
<!--          alt="Tailwind CSS Carousel component" />-->
<!--      </div>-->
<!--      <div class="carousel-item w-full">-->
<!--        <img-->
<!--          src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"-->
<!--          class="w-full"-->
<!--          alt="Tailwind CSS Carousel component" />-->
<!--      </div>-->
<!--      <div class="carousel-item w-full">-->
<!--        <img-->
<!--          src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"-->
<!--          class="w-full"-->
<!--          alt="Tailwind CSS Carousel component" />-->
<!--      </div>-->
<!--      <div class="carousel-item w-full">-->
<!--        <img-->
<!--          src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"-->
<!--          class="w-full"-->
<!--          alt="Tailwind CSS Carousel component" />-->
<!--      </div>-->
<!--    </div>-->

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
